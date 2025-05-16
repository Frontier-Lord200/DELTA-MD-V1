const config = require('../settings');
const { malvin } = require('../malvin');
const axios = require('axios');

/**
 * Helper function to check if a value is a "true" boolean state.
 * @param {any} value - The value to check.
 * @returns {boolean} - Returns true if the value is "true", false otherwise.
 */
function isEnabled(value) {
    return value && value.toString().toLowerCase() === 'true';
}

/**
 * Helper function to generate the formatted list of settings with emojis.
 * @returns {string} - The formatted string of all settings with corresponding emojis.
 */
function generateSettingsList() {
    const settingsList = [
        { name: 'Status View', key: 'AUTO_STATUS_SEEN', emoji: '👁️' },
        { name: 'Status Reply', key: 'AUTO_STATUS_REPLY', emoji: '💬' },
        { name: 'Auto Reply', key: 'AUTO_REPLY', emoji: '↩️' },
        { name: 'Auto Sticker', key: 'AUTO_STICKER', emoji: '🖼️' },
        { name: 'Auto Voice', key: 'AUTO_VOICE', emoji: '🔊' },
        { name: 'Custom Reacts', key: 'CUSTOM_REACT', emoji: '👍' },
        { name: 'Auto React', key: 'AUTO_REACT', emoji: '💥' },
        { name: 'Delete Links', key: 'DELETE_LINKS', emoji: '🔗' },
        { name: 'Anti-Link', key: 'ANTI_LINK', emoji: '🚫' },
        { name: 'Anti-Bad Words', key: 'ANTI_BAD', emoji: '🛑' },
        { name: 'Auto Typing', key: 'AUTO_TYPING', emoji: '⌨️' },
        { name: 'Auto Recording', key: 'AUTO_RECORDING', emoji: '🎙️' },
        { name: 'Always Online', key: 'ALWAYS_ONLINE', emoji: '🌐' },
        { name: 'Public Mode', key: 'PUBLIC_MODE', emoji: '🌍' },
        { name: 'Read Message', key: 'READ_MESSAGE', emoji: '📖' },
    ];

    return settingsList.map(s => 
        `🔹 *${s.emoji} ${s.name}:* ${isEnabled(config[s.key]) ? "✅ Enabled" : "❌ Disabled"}`
    ).join('\n');
}

malvin({
    pattern: 'env',
    alias: ['setting', 'allvar'],
    desc: 'View and manage bot settings',
    category: 'main',
    react: '⚙️',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Generate the formatted settings message with emojis
        const settingsMessage = `
╭━━━〔 *DELTA-MD-V1 SETTINGS* 〕━━━┈⊷
┃ *💎 Current Configurations:*
┃──────────────────────
${generateSettingsList()}
╰━━━━━━━━━━━━━━━━━━━━┈⊷

🔗 *Description:* ${config.DESCRIPTION || 'No description available'}

`;

        // Image & Audio URLs (with fallbacks in case of missing values)
        const imageUrl = config.IMAGE_URL || 'https://files.catbox.moe/2rvshj.jpg';
        const audioUrl = config.AUDIO_URL || 'https://github.com/Frontier-Lord200/DELTA-MD-V1-DATA/raw/refs/heads/main/autovoice/menu.m4a';

        // Send settings message with an image
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: settingsMessage,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363398430045533@newsletter',
                    newsletterName: "Frontier King",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Send an audio response (PTT Voice Message)
        await conn.sendMessage(from, {
            audio: { url: audioUrl },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

    } catch (e) {
        console.error("❌ Error in env command:", e);
        reply("⚠️ An error occurred while fetching the settings. Please try again.");
    }
});
