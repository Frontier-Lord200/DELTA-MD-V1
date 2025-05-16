const fs = require('fs');
const path = require('path');
const config = require('../settings')
const {malvin , commands} = require('../malvin')


//auto recording
malvin({
  on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {       
 if (config.AUTO_RECORDING === 'true') {
                await conn.sendPresenceUpdate('recording', from);
            }
         } 
   );
