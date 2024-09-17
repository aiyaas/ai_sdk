'use strict';
module.exports = (userText, responseText) => {
    const fs = require('fs');
    fs.appendFileSync('mcs_sdk_msg.ini', `INPUT:  ${userText}\nAI_SDK:  ${responseText}\n\n`, (error) => {
        if (error) console.error(error.stack);
    });
};

