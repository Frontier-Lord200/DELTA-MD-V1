const {
  zokou
} = require("../framework/zokou");
const yts = require("yt-search");
zokou({
  'nomCom': "play2",
  'categorie': "Download",
  'reaction': '🎶'
}, async (_0x3bb19c, _0x1b59c4, _0x1ac9b2) => {
  const {
    ms: _0x57f480,
    repondre: _0x1ae903,
    arg: _0x546fcc
  } = _0x1ac9b2;
  if (!_0x546fcc[0]) {
    _0x1ae903("Please insert a song name.");
    return;
  }
  try {
    let _0x5cd887 = _0x546fcc.join(" ");
    let _0x322f75 = [];
    const _0x1b000a = await yts(_0x5cd887);
    _0x322f75 = _0x1b000a.videos;
    if (_0x322f75 && _0x322f75.length > 0) {
      const _0x165324 = _0x322f75[0].url;
      const _0xd95cfd = await fetch("https://api.dreaded.site/api/ytdl/audio?url=$" + encodeURIComponent(_0x165324) + "&apikey=" + "gifted");
      const _0x257cbf = await _0xd95cfd.json();
      if (_0x257cbf.status === 200 && _0x257cbf.success) {
        const _0x53c40a = _0x257cbf.result.download_url;
        const _0xd636ce = {
          'image': {
            'url': _0x322f75[0].thumbnail
          },
          'caption': "*DELTA-MD-V1 MUSIC PLAYER*\n\n╭───────────────◆\n│ *Title:* " + _0x322f75[0].title + "\n│ *Quality:* mp3 (320kbps)\n│ *Duration:* " + _0x322f75[0].timestamp + "\n│ *Viewers:* " + _0x322f75[0].views + "\n│ *Uploaded:* " + _0x322f75[0].ago + "\n│ *Artist:* " + _0x322f75[0].author.name + "\n╰────────────────◆\n⦿ *Direct YtLink:* " + _0x165324 + "\n\n╭────────────────◆\n> *https://whatsapp.com/channel/0029Vb5Xj7xGzzKYC7hKle2b* \n╰─────────────────◆"
        };
        await _0x1b59c4.sendMessage(_0x3bb19c, _0xd636ce, {
          'quoted': _0x57f480
        });
        await _0x1b59c4.sendMessage(_0x3bb19c, {
          'audio': {
            'url': _0x53c40a
          },
          'mimetype': "audio/mp4"
        }, {
          'quoted': _0x57f480
        });
        _0x1ae903("*enjoy music is life my friend*...");
      } else {
        _0x1ae903("Failed to download audio. Please try again later.");
      }
    } else {
      _0x1ae903("No audio found.");
    }
  } catch (_0x1eb46b) {
    console.error("Error from API:", _0x1eb46b);
    _0x1ae903("An error occurred while searching or downloading the audio." + _0x1eb46b);
  }
});
zokou({
  'nomCom': "song2",
  'categorie': "Download",
  'reaction': '💿'
}, async (_0x1edfc4, _0x1eac3a, _0x566003) => {
  const {
    ms: _0x3c5056,
    repondre: _0x29c04a,
    arg: _0xd269b3
  } = _0x566003;
  if (!_0xd269b3[0]) {
    _0x29c04a("Please insert a song name.");
    return;
  }
  try {
    let _0x3f3369 = _0xd269b3.join(" ");
    let _0x3dc8e2 = [];
    const _0x27469b = await yts(_0x3f3369);
    _0x3dc8e2 = _0x27469b.videos;
    if (_0x3dc8e2 && _0x3dc8e2.length > 0) {
      const _0x573538 = _0x3dc8e2[0].url;
      const _0x434f90 = await fetch("https://api.giftedtech.web.id/api/download/dlmp3?url=$" + encodeURIComponent(_0x573538) + "&apikey=" + "gifted");
      const _0x3bdb70 = await _0x434f90.json();
      if (_0x3bdb70.status === 200 && _0x3bdb70.success) {
        const _0x50496d = _0x3bdb70.result.download_url;
        const _0x1a6ee9 = {
          'image': {
            'url': _0x3dc8e2[0].thumbnail
          },
          'caption': "*DELTA-MD-V1 AUDIO DOWNLOADER*\n\n╭───────────────◆\n│ *Title:* " + _0x3dc8e2[0].title + "\n│ *Quality:* mp3 (320kbps)\n│ *Duration:* " + _0x3dc8e2[0].timestamp + "\n│ *Viewers:* " + _0x3dc8e2[0].views + "\n│ *Uploaded:* " + _0x3dc8e2[0].ago + "\n│ *Artist:* " + _0x3dc8e2[0].author.name + "\n╰────────────────◆\n⦿ *Direct YtLink:* " + _0x573538 + "\n\n╭────────────────◆\n> *https://whatsapp.com/channel/0029Vb5Xj7xGzzKYC7hKle2b*\n╰─────────────────◆"
        };
        await _0x1eac3a.sendMessage(_0x1edfc4, _0x1a6ee9, {
          'quoted': _0x3c5056
        });
        await _0x1eac3a.sendMessage(_0x1edfc4, {
          'document': {
            'url': _0x50496d
          },
          'mimetype': "audio/mp4"
        }, {
          'quoted': _0x3c5056
        });
        _0x29c04a("*enjoy music is life my friend*");
      } else {
        _0x29c04a("Failed to download audio. Please try again later.");
      }
    } else {
      _0x29c04a("No audio found.");
    }
  } catch (_0x1b302b) {
    console.error("Error from API:", _0x1b302b);
    _0x29c04a("An error occurred while searching or downloading the audio." + _0x1b302b);
  }
});
zokou({
  'nomCom': "videow",
  'categorie': "Download",
  'reaction': '🎥'
}, async (_0x1865cc, _0x52cb5d, _0x3ecbfa) => {
  const {
    ms: _0x4b29db,
    repondre: _0x53a005,
    arg: _0x256e4c
  } = _0x3ecbfa;
  if (!_0x256e4c[0]) {
    _0x53a005("Please insert a song/video name.");
    return;
  }
  try {
    let _0x1a81ab = _0x256e4c.join(" ");
    let _0x336257 = [];
    const _0x484e5e = await yts(_0x1a81ab);
    _0x336257 = _0x484e5e.videos;
    if (_0x336257 && _0x336257.length > 0) {
      const _0x3cf1db = _0x336257[0].url;
      const _0x3650ad = await fetch("https://api.davidcyriltech.my.id/download/ytmp4?url=" + encodeURIComponent(_0x3cf1db) + "&apikey=" + "gifted");
      const _0x161135 = await _0x3650ad.json();
      if (_0x161135.status === 200 && _0x161135.success) {
        const _0xbcbf5f = _0x161135.result.download_url;
        const _0x426211 = {
          'image': {
            'url': _0x336257[0].thumbnail
          },
          'caption': "*DELTA-MD-V1 Video downloader*\n\n╭───────────────◆\n│ *Title:* " + _0x336257[0].title + "\n│ *Quality:* 720p-HD\n│ *Duration:* " + _0x336257[0].timestamp + "\n│ *Viewers:* " + _0x336257[0].views + "\n│ *Uploaded:* " + _0x336257[0].ago + "\n│ *Artist:* " + _0x336257[0].author.name + "\n╰────────────────◆\n⦿ *Direct YtLink:* " + _0x3cf1db + "\n\n╭────────────────◆\n> *https://whatsapp.com/channel/0029Vb5Xj7xGzzKYC7hKle2b*\n╰─────────────────◆"
        };
        await _0x52cb5d.sendMessage(_0x1865cc, _0x426211, {
          'quoted': _0x4b29db
        });
        await _0x52cb5d.sendMessage(_0x1865cc, {
          'video': {
            'url': _0xbcbf5f
          },
          'caption': "*Generated By Sir Frontier*",
          'mimetype': "video/mp4"
        }, {
          'quoted': _0x4b29db
        });
        _0x53a005("*enjoy music is life my friend*...");
      } else {
        _0x53a005("Failed to download the video. Please try again later.");
      }
    } else {
      _0x53a005("No videos found.");
    }
  } catch (_0x4ccb17) {
    console.error("Error from API:", _0x4ccb17);
    _0x53a005("An error occurred while searching or downloading the video." + _0x4ccb17);
  }
});
zokou({
  'nomCom': "videodoc",
  'categorie': "Download",
  'reaction': '🎥'
}, async (_0x24206b, _0x2303c4, _0x1a65e4) => {
  const {
    ms: _0x338395,
    repondre: _0x1768d5,
    arg: _0x576c
  } = _0x1a65e4;
  if (!_0x576c[0]) {
    _0x1768d5("Please insert a song/video name.");
    return;
  }
  try {
    let _0x2e8cd2 = _0x576c.join(" ");
    let _0x1e97ca = [];
    const _0x29006e = await yts(_0x2e8cd2);
    _0x1e97ca = _0x29006e.videos;
    if (_0x1e97ca && _0x1e97ca.length > 0) {
      const _0x46850e = _0x1e97ca[0].url;
      const _0x39f848 = await fetch("https://api.davidcyriltech.my.id/download/ytmp4?url=" + encodeURIComponent(_0x46850e) + "&apikey=" + "gifted");
      const _0x13a5a8 = await _0x39f848.json();
      if (_0x13a5a8.status === 200 && _0x13a5a8.success) {
        const _0x38041c = _0x13a5a8.result.download_url;
        const _0x410c5f = {
          'image': {
            'url': _0x1e97ca[0].thumbnail
          },
          'caption': "*DELTA-MD-V1 Video Downloader*\n\n╭───────────────◆\n│ *Title:* " + _0x1e97ca[0].title + "\n│ *Quality:* 720p-HD\n│ *Duration:* " + _0x1e97ca[0].timestamp + "\n│ *Viewers:* " + _0x1e97ca[0].views + "\n│ *Uploaded:* " + _0x1e97ca[0].ago + "\n│ *Artist:* " + _0x1e97ca[0].author.name + "\n╰────────────────◆\n⦿ *Direct YtLink:* " + _0x46850e + "\n\n╭────────────────◆\n> *https://whatsapp.com/channel/0029Vb5Xj7xGzzKYC7hKle2b* \n╰─────────────────◆"
        };
        await _0x2303c4.sendMessage(_0x24206b, _0x410c5f, {
          'quoted': _0x338395
        });
        await _0x2303c4.sendMessage(_0x24206b, {
          'document': {
            'url': _0x38041c
          },
          'caption': "*Generated By DELTA-MD-V1*",
          'mimetype': "video/mp4"
        }, {
          'quoted': _0x338395
        });
        _0x1768d5("*enjoy music is life my friend*...");
      } else {
        _0x1768d5("Failed to download the video. Please try again later.");
      }
    } else {
      _0x1768d5("No videos found.");
    }
  } catch (_0x31b31b) {
    console.error("Error from API:", _0x31b31b);
    _0x1768d5("An error occurred while searching or downloading the video." + _0x31b31b);
  }
});
