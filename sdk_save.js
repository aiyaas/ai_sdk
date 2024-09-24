'use strict';

module.exports = (userText, responseText) => {
    require('fs').appendFileSync('./mcs_/mcs_sdk_msg.ini', `INPUT:  ${userText}\nAI_SDK:  ${responseText}\n\n`, (error) => {
        if (error) console.error(error.stack);
    });
};
