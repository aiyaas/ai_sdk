import readline from 'readline';
import chalk from 'chalk';
import API_KEY from './mcs_/api_key.js';
import saveToMsg from './sdk_save.js';

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

'use strict';
const askQuestion = () => {
    const removeMarkdown = (text) => {
        // Manually remove markdown symbols
        return text.replace(/(\*+|`+)/g, '');
    };

    read.question('🌿:  ', async (userText) => {
        if (userText.toLowerCase() === 'esc') {
            read.close();
            return;
        }

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'gemini-1.5-flash',
                    contents: [{ parts: [{ text: userText }] }]
                })
            });

            const data = await response.json();
            let contents = data?.candidates[0]?.content?.parts[0]?.text;

            contents = removeMarkdown(contents);
            saveToMsg(userText, contents);

            console.log('💬:  ' + chalk.grey(contents) +'\n');
        } catch (error) {
            console.error(error.stack);
        }

        askQuestion();
    });
};

askQuestion(); //main @ai_sdk
