

const { isJidGroup } = require('@whiskeysockets/baileys');
const { loadMessage, getAnti } = require('../data');
const config = require('../settings');

const DeletedText = async (conn, mek, jid, deleteInfo, isGroup, update) => {
    const messageContent = mek.message?.conversation || mek.message?.extendedTextMessage?.text || 'Unknown content';
    deleteInfo += `\n\n💬 *Content:* ${messageContent}`;

    await conn.sendMessage(
        jid,
        {
            text: deleteInfo,
            contextInfo: {
                mentionedJid: isGroup ? [update.key.participant, mek.key.participant] : [update.key.remoteJid],
            },
        },
        { quoted: mek },
    );
};

const DeletedMedia = async (conn, mek, jid, deleteInfo) => {
    const antideletedmek = structuredClone(mek.message);
    const messageType = Object.keys(antideletedmek)[0];

    if (antideletedmek[messageType]) {
        antideletedmek[messageType].contextInfo = {
            stanzaId: mek.key.id,
            participant: mek.sender,
            quotedMessage: mek.message,
        };
    }

    if (messageType === 'imageMessage' || messageType === 'videoMessage') {
        antideletedmek[messageType].caption = `🖼️ *Media Recovered!*\n\n${deleteInfo}`;
        await conn.relayMessage(jid, antideletedmek, {});
    } else if (messageType === 'audioMessage' || messageType === 'documentMessage') {
        await conn.sendMessage(jid, { text: `📁 *File Recovered!*\n\n${deleteInfo}` }, { quoted: mek });
    }
};

const AntiDelete = async (conn, updates) => {
    for (const update of updates) {
        if (update.update.message === null) {
            const store = await loadMessage(update.key.id);
            if (!store || !store.message) continue;

            const mek = store.message;
            const isGroup = isJidGroup(store.jid);
            const antiDeleteType = isGroup ? 'gc' : 'dm';
            const antiDeleteStatus = await getAnti(antiDeleteType);
            if (!antiDeleteStatus) continue;

            const deleteTime = new Date().toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });

            let deleteInfo, jid;

            if (isGroup) {
                const groupMetadata = await conn.groupMetadata(store.jid);
                const groupName = groupMetadata.subject;
                const sender = mek.key.participant?.split('@')[0];
                const deleter = update.key.participant?.split('@')[0];

                deleteInfo = `🚫 *AntiDelete Triggered!*\n\n🕒 *Time:* ${deleteTime}\n👥 *Group:* ${groupName}\n❌ *Deleted by:* @${deleter}\n✉️ *Sender:* @${sender}`;
                jid = config.ANTI_DEL_PATH === "log" ? conn.user.id : store.jid;
            } else {
                const senderNumber = mek.key.remoteJid?.split('@')[0];
                const deleterNumber = update.key.remoteJid?.split('@')[0];

                deleteInfo = `🚫 *AntiDelete Triggered!*\n\n🕒 *Time:* ${deleteTime}\n❌ *Deleted by:* @${deleterNumber}\n✉️ *Sender:* @${senderNumber}`;
                jid = config.ANTI_DEL_PATH === "log" ? conn.user.id : update.key.remoteJid;
            }

            if (mek.message?.conversation || mek.message?.extendedTextMessage) {
                await DeletedText(conn, mek, jid, deleteInfo, isGroup, update);
            } else {
                await DeletedMedia(conn, mek, jid, deleteInfo);
            }
        }
    }
};

module.exports = {
    DeletedText,
    DeletedMedia,
    AntiDelete,
};

// by Frontier King
