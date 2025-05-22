const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou({ nomCom: "menu1", categorie: "menu1" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");
    let coms = {};
    let mode = "public";

    if ((s.MODE).toLowerCase() !== "yes") {
        mode = "private";
    }

    cm.map((com) => {
        if (!coms[com.categorie]) {
            coms[com.categorie] = [];
        }
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `
╭──────────────┈⊷`
│◦➛╭────────────⊷
│◦➛ 𝙾𝚠𝚗𝚎𝚛 : ${s.OWNER_NAME}
│◦➛ 𝙿𝚛𝚎𝚏𝚒𝚡 : [ ${s.PREFIXE} ]
│◦➛ 𝙼𝚘𝚍𝚎 : ${mode}
│◦➛ 𝚁𝚊𝚖  : 8/132 GB
│◦➛ 𝙳𝚊𝚝𝚎  : ${date}
│◦➛ 𝙿𝚕𝚊𝚝𝚏𝚘𝚛𝚖 : ${os.platform()}
│◦➛ 𝙲𝚛𝚎𝚊𝚝𝚘𝚛 : ɴᴊᴀʙᴜʟᴏ ᴊʙ
│◦➛ 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 : ${cm.length}
│◦➛ 𝚃𝚑𝚎𝚖𝚎 : JB
│◦➛╰────────────⊷
╰──────────────┈⊷\n
`;

    let menuMsg = `DELTA-MD-V1 ᴄᴍᴅ`;
    
    for (const cat in coms) {
        menuMsg += `
╭─•〔 *${cat}* 〕─┈⊷`
│◦➛╭────────────⊷ `;
        for (const cmd of coms[cat]) {
            menuMsg += `          
│◦➛ ${s.PREFIXE}  ${cmd}`;    
        }
        menuMsg += `
│◦➛╰────────────⊷
╰──────────────┈⊷`;
    }
    
    menuMsg += `
> @ᴍᴀᴅᴇ ʙʏ Frontier sir 2025\n`;

    try {
        const senderName = nomAuteurMessage || message.from;  // Use correct variable for sender name
        await zk.sendMessage(dest, {
            text: infoMsg + menuMsg,
            contextInfo: {
                mentionedJid: [senderName],
                externalAdReply: {
                    title: "DELTA-MD-V1 𝗠𝗘𝗡𝗨 𝗟𝗜𝗦𝗧",
                    body: "Tap here my friend join channel update",
                    thumbnailUrl: "https://files.catbox.moe/a368g4.jpg",
                    sourceUrl: "https://whatsapp.com/channel/0029Vb5Xj7xGzzKYC7hKle2b",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    } catch (error) {
        console.error("Menu error: ", error);
        repondre("🥵🥵 Menu error: " + error);
    }
});
