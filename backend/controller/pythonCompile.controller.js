// ../controller/pythonCompile.js

import { exec } from 'child_process';

export const pythonCompile = async (req , res , next ) =>{
    const pythonCode = req.body.code;
    exec(`python3 -c "${pythonCode}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).json({ result: `Error: ${error.message}` });
            return;
        }
        if (stderr) {
            console.error(`Error: ${stderr}`);
            res.status(500).json({ result: `Error: ${stderr}` });
            return;
        }
        res.json({ result: stdout });
    });
};
