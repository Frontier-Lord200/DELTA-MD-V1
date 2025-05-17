const { malvin } = require('../malvin');
const { ytsearch } = require('@dark-yasiya/yt-dl.js');
const axios = require('axios');
const fs = require('fs');
const config = require('../settings');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

malvin({
    pattern: "play",
    alias: ["ytplay", "ytmp3"],
    react: "📲",
    desc: "Download YouTube song or video",
    category: "download",
    use: '.play <song name or YouTube URL>',
    filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
    try {
        if (!q && !m.quoted) return reply("❓ What song or URL do you want to download? You can also reply to a message with a URL.");
        
        let input = q || (m.quoted && m.quoted.text);
        if (!input) return reply("❌ No valid input provided!");

        let isAudio = !input.toLowerCase().includes("video");

        await reply("🔍 Searching, please wait...");

        const search = await ytsearch(input);
        if (!search.results.length) return reply("❌ No results found!");

        const vid = search.results[0];
        const title = vid.title.replace(/[^a-zA-Z0-9 ]/g, "");
        const duration = vid.timestamp;
        const videoUrl = vid.url;
        const thumbnail = vid.thumbnail;
        const outputPath = path.join(__dirname, `${title}.mp3`);

        const apis = [
            `https://xploader-api.vercel.app/ytmp3?url=${videoUrl}`,
            `https://apis.davidcyriltech.my.id/youtube/mp3?url=${videoUrl}`,
            `https://api.ryzendesu.vip/api/downloader/ytmp3?url=${videoUrl}`,
            `https://api.dreaded.site/api/ytdl/audio?url=${videoUrl}`
        ];

        if (isAudio) {
            for (const api of apis) {
                try {
                    const res = await axios.get(api);
                    const data = res.data;
                    if (!(data.status === 200 || data.success)) continue;

                    const audioUrl = data.result?.downloadUrl || data.url;
                    if (!audioUrl) continue;

                    const stream = await axios({ url: audioUrl, method: "GET", responseType: "stream" });
                    if (stream.status !== 200) continue;

                    return ffmpeg(stream.data)
                        .toFormat('mp3')
                        .save(outputPath)
                        .on('end', async () => {
                            await conn.sendMessage(from, {
                                document: { url: outputPath },
                                mimetype: 'audio/mp3',
                                fileName: `${title}.mp3`,
                                caption: `🎶 *Title:* ${vid.title}\n⏱️ *Duration:* ${duration}\n\n> Powered by USMAN & Frontier`,
                                thumbnail: { url: thumbnail }
                            }, { quoted: mek });
                            fs.unlinkSync(outputPath);
                        })
                        .on('error', err => reply("❌ Conversion failed\n" + err.message));
                } catch (err) {
                    continue;
                }
            }
            return reply("❌ All APIs failed or are down.");
        }

    } catch (e) {
        console.error(e);
        reply("❌ Something went wrong\n" + e.message);
    }
});
