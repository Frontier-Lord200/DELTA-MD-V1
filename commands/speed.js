const {
  zokou
} = require("../framework/zokou");
function delay(_0x25f170) {
  console.log("â±ï¸ delay for " + _0x25f170 + 'ms');
  return new Promise(_0x529a1f => setTimeout(_0x529a1f, _0x25f170));
}
zokou({
  'nomCom': "ping",
  'desc': "To check bot response time",
  'Categorie': "General",
  'reaction': '🚔',
  'fromMe': "true"
}, async (_0x4cfdc6, _0x41d5d3, _0x546e3d) => {
  const {
    ms: _0x2c968b
  } = _0x546e3d;
  const _0x5a815c = Array.from({
    'length': 0x3
  }, () => Math.floor(Math.random() * 10000 + 1000));
  const _0x451c3b = _0x5a815c.map(_0x526b71 => "🟢 PONG: " + _0x526b71 + " 🟢").join("\n");
  const _0x41d2b1 = {
    'externalAdReply': {
      'title': "DELTA-MD-V1 My Ultra Speed Response",
      'body': "Ping Results : " + _0x451c3b,
      'sourceUrl': "https://whatsapp.com/channel/0029Vb5Xj7xGzzKYC7hKle2b",
      'thumbnailUrl': "https://files.catbox.moe/a368g4.jpg",
      'mediaType': 0x1,
      'showAdAttribution': true
    }
  };
  const _0x54ea81 = {
    'displayName': "DELTA-MD-V1 Support",
    'vcard': "BEGIN:VCARD\nVERSION:3.0\nFN: DELTA-MD-V1\nORG: DELTA-MD-V1 Nexus;\nTEL;type=CELL;type=VOICE;waid=263788521064:+263789699200
    'externalAdReply': {
      'title': "DELTA-MD-V1- System Uptime",
      'body': "Bot has been running for: " + _0x2f3abc,
      'sourceUrl': "https://whatsapp.com/channel/0029Vb5Xj7xGzzKYC7hKle2b",
      'thumbnailUrl': "https://files.catbox.moe/a368g4.jpg",
      'mediaType': 0x1,
      'showAdAttribution': true
    }
  };
  const _0x297b69 = {
    'displayName': "DELTA-MD-V1 Support",
    'vcard': "BEGIN:VCARD\nVERSION:3.0\nFN: DELTA-MD-V1 MD\nORG: DELTA-MD-V1 Nexus;\nTEL;type=CELL;type=VOICE;waid=263788521064:+263789699200\nEND:VCARD"
  };
  await _0x161605.sendMessage(_0x205206, {
    'text': "*DELTA-MD-V1 UPTIME* " + _0x2f3abc,
    'contextInfo': _0xae590,
    'contacts': {
      'displayName': "DELTA-MD-V1 Verified Contact",
      'contacts': [_0x297b69]
    },
    'quoted': _0x4e9ae0
  });
  console.log("Uptime sent successfully with contact and context info!");
});
module.exports = {
  'delay': delay
};
