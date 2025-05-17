const { malvin, commands } = require('../malvin');

malvin({
    pattern: "owner",
    alias: ["developer", "dev"],
    desc: "Displays the developer info",
    category: "owner",
    react: "👨‍💻",
    filename: __filename
}, async (conn, mek, m, {
    from, reply, pushname
}) => {
    try {
        const name = pushname || "there";

        const text = `
╭─⌈ *DELTA-MD-V1 𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗥* ⌋──
│
│ 👋 Hello SOLDIER *${name}*,
│
│ 🤖 I’m *DELTA-MD-V1 own*, a multi-functional
│    WhatsApp Bot built to assist you!
│
│ 👨‍💻 *OWNER DETAILS:*
│ ───────────────
│ 🧠 *Name* : USMAN & FRONTIER-X
│ 🕯️ *Age* : +⚒️
│ ☎️ *Contact* : wa.me/+923127067592+263788521064 
│ ▶️ *YouTube* : IMPACT TEAM TECH 
│    https://youtube.com/@impactmd
│ ⚡ Powered by *Delta Force*
│
╰───────────────
        `.trim();

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/2rvshj.jpg' },
                caption: text,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398430045533@newsletter',
                        newsletterName: '🪀『 DELTA-MD-V1 』🪀',
                        serverMessageId: 143
                    },
                    externalAdReply: {
                        title: "DELTA-MD-V1 Bot",
                        body: "Created with love by USMAN SIR & FRONTIER-X-45H",
                        thumbnailUrl: 'https://files.catbox.moe/2rvshj.jpg',
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        showAdAttribution: true,
                        mediaUrl: "https://youtube.com/@impactmd-",
                        sourceUrl: "https://youtube.com/@impactmd"
                    }
                }
            },
            { quoted: mek }
        );
    } catch (e) {
        console.error("Error in .dev command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
