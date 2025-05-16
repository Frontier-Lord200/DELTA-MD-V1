/*
Project Name : DELTA-MD-V1
Creator      : USMAN & Frontier
Repo         : https://github.com/Frontier-Lord200/DELTA-MD-V1 
Support      : wa.me/263788521064 
*/

const config = require('../settings');
const { malvin, commands } = require('../malvin');
const os = require("os");
const { runtime } = require('../lib/functions');
const axios = require('axios');
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

malvin({
    pattern: "support",
    alias: "follow",
    desc: "base",
    category: "support",
    react: "📡",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {

        // Get the current time for dynamic greeting
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        let dec = `
╭────────────≫
┋ 🌟 *ᴅᴇᴠᴇʟᴏᴘᴇʀ* : *ᴍʀ Frontier(🇿🇼)* 🌍
┋ 🚀 *ᴍᴏᴅᴇ* : *${config.MODE}*
┋ ⚡ *ᴘʀᴇғɪx* : *${config.PREFIX}*
┋ 🧩 *ᴠᴇʀsɪᴏɴ* : ${config.version}
┋ ⏳ *ᴜᴘᴛɪᴍᴇ* : _${runtime(process.uptime())}_
┋ 🕰️ *ᴄᴜʀʀᴇɴᴛ ᴛɪᴍᴇ* : _${currentTime}_
╰────────────≫

   💬 *DELTA-MD-V1 sᴜᴘᴘᴏʀᴛ ʟɪɴᴋs* ↷

${readMore}
\`🔔 ᴄʜᴀɴɴᴇʟ🩵\`
🔗 https://whatsapp.com/channel/0029Vb5Xj7xGzzKYC7hKle2b

\`👥 ɢʀᴏᴜᴘ💙\`
🔗 https://chat.whatsapp.com/FxIS5n8QVH1C4nyLimey5V

\`🎥 ʏᴛ ᴄʜᴀɴɴᴇʟ🚀\`
🔗 https://youtube.com/@impactmd

\`💻 USMAN & Frontier\` *Developer🧑‍💻*
🔗 wa.me/263788521064?text=Support!

> 💎 *ᴊᴏɪɴ DELTA-MD-V1 ᴄʜᴀɴɴᴇʟ* 👑
`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/2rvshj.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: '🪀『 DELTA-MD-V1 』🪀',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Send audio message with a fun personalized touch
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/XdKing2/MALVIN-DATA/raw/refs/heads/main/autovoice/menu2.mp3' },
            mimetype: 'audio/mp3',
            ptt: true
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`*⚠️ Oops! Something went wrong:* ${e.message}`);
    }
});

//  USMAN & Frontier
