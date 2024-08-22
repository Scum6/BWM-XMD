const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUJaUWlLT29hVHlEM1AwejZMbGlOK3VQUzBYS0dCUEs2b0JLaENOM0htUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0srbVNEV0UxM1o2L284Q0RBZzVad3dRMVJjdjUyUWRDemM3OU1iREFVTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFRGxDbFJITkdDenBIR0hHRWgrWktUNHdDN1FIQ2ozVnVEZFdYcmwyOEdVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaaFEvZnNXdTFKcFA0dkc5dFJScnUwQzYvQkM3NHBPMUZDK3p5djRSV1JNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVOVXJVYlVxQlJqK2JNSzhOZWdZWE5LMWRESldYNlJLV3lUT0swWE5JVUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVBeFA3a2lmRDhub1FPOHE4bGtiSFpHMnpUMFNjUFhKcVFxc3hKalpPa289In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkJCN1VUaGNXK1daVHB3ZHhtQVVBVm9YblhUSE9ZODRQd2JBMHRRNFJsVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0hFaVgwWHlHakNjMTVlaGZNaklyeHdGMDBCYU9wRDhNTjJGZFJzamRFRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ildpd29hWHQ3WjE0RDJwVU9iNmZCa3k5ZGpjVjExVGtsdzJtWnlhRERYZHRNeE5xYjBPa3UreXRaQVBnbHVUY2x4dUlxVk12RXlxb2RmZ2lFYmVVSmh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTUsImFkdlNlY3JldEtleSI6InRaT1VMaC9sTE56VDlwcFk5RXkxQytzWHN6L3R1ckhJbEdpaitEUEYyMXc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlNzb0NYQ21EVEdhQ0FxSzFNNUhmYWciLCJwaG9uZUlkIjoiNTIzMzFjZWQtZGE1Mi00ODNiLWE0YWQtNWE2YjU5YzI3YTU1IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNXM05lc245bWRwanh5bDFGRDNNVU5OZDdSVT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCdExwNllSM0dQQWoxcjArSkE2T2NXSmczS3M9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNFFFNzlLMUEiLCJtZSI6eyJpZCI6IjI1NDcyODUxMTc0NDo2M0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUHJhL1F3UTc2T2V0Z1lZQVNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTG5sKzFTSXVIVUhNWW13ajZLK2V3bjRTdk9Eb1diWHhzWFEwaGtHV0RDaz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiSTgvdHpRRTA1WWlqS2hFeXlnTTd5ZkpzaDh3aHo0L05oZE8zR0JaL1RKWXV2all0Z0RDL21xL1NCQlI0MWZoWWlBZ3hOdVRITmprblYxN2w4U2lxQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6Ijh0NVBFRVNtSmtSaXdyeDlHZEgvKzI3dHhNNzMvbW9aT2ZoQmZCeFFuOFdvYVZIbU9ZWFpUclFYWEdIYkZYakgvL3lMWlBUeE82MWsrTVFpMjg1SmpRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzI4NTExNzQ0OjYzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlM1NWZ0VWlMaDFCekdKc0kraXZuc0orRXJ6ZzZGbTE4YkYwTklaQmxnd3AifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjQzNTUwNjgsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRE5pIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});


