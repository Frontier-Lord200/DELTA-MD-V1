/*
Project Name : DELTA-MD-V1 
Creator      : Sir USMAN & FRONTIER 
Repo         : https://github.com/Frontier-Lord200/DELTA-MD-V1 
*/   

const axios = require("axios");
const { malvin } = require("../malvin");

// Command: bible
malvin({
    pattern: "bible",
    desc: "Fetch Bible verses by reference.",
    category: "search",
    react: "📖",
    filename: __filename
}, async (conn, mek, m, { args, reply }) => {
    try {
        // Check if a reference is provided
        if (args.length === 0) {
            return reply(`⚠️ *Please provide a Bible reference.*\n\n📝 *Example:*\n.bible John 1:1`);
        }

        // Join the arguments to form the reference
        const reference = args.join(" ");

        // Call the API with the reference
        const apiUrl = `https://bible-api.com/${encodeURIComponent(reference)}`;
        const response = await axios.get(apiUrl);

        // Check if the response contains data
        if (response.status === 200 && response.data.text) {
            const { reference: ref, text, translation_name, book_name, chapter, verse } = response.data;

            // Format the response with more metadata
            reply(
                `📜 *IMPACT 𝘽𝙄𝘽𝙇𝙀 𝙑𝙀𝙍𝙎𝙀 𝙁𝙊𝙐𝙉𝘿!*\n\n` +
                `📖 *𝑹𝒆𝒇𝒆𝒓𝒆𝒏𝒄𝒆:* ${ref}\n` +
                `📚 *𝑩𝒐𝒐𝒌:* ${book_name}\n` +
                `🔢 *𝑪𝒉𝒂𝒑𝒕𝒆𝒓:* ${chapter}\n` +
                `🔤 *𝑽𝒆𝒓𝒔𝒆:* ${verse}\n\n` +
                `📖 *𝑻𝒆𝒙𝒕:* ${text}\n\n` +
                `🗂️ *𝑻𝒓𝒂𝒏𝒔𝒍𝒂𝒕𝒊𝒐𝒏:* ${translation_name}\n\n` +
                `> © Delta md ʙɪʙʟᴇ`
            );
        } else {
            reply("❌ *Verse not found.* Please check the reference and try again.");
        }
    } catch (error) {
        console.error(error);
        reply("⚠️ *An error occurred while fetching the Bible verse.* Please try again.");
    }
});
