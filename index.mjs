'use strict';

import readline from 'readline';
import chalk from 'chalk';
import API_KEYS from './mcs_/570.js';
import SAVE_TO_MSG from './sdk_file.js';

const main = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = () => {
    main.question(chalk.bold.green.underline('ORDER:  '), async (userText) => {
        if (userText.toLowerCase() === 'exit') return main.close();

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEYS[0]}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'gemini-1.5-flash',
                    contents: [{ parts: [{ text: userText }] }]
                })
            });

            const data = await response.json();
            let task_msg = await  data?.candidates[0]?.content?.parts[0]?.text.replace(/(\*+|`+)/g, '');
            SAVE_TO_MSG(userText, task_msg);

            console.log(chalk.bold.underline('GEMINI:  ') + chalk.grey(task_msg) +'\n');
        } catch (error) {
            console.error(error.stack);
        }

        askQuestion();
    });
};

setTimeout(() => askQuestion(), 2000);
                                     
