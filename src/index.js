import express from "express";
import fs from "fs";
import path from "path";

import "dotenv/config";

const app = express();

// Load endpoints into express
const endpointFolder = path.resolve('./src/endpoints/v1');
for (const endpoint of fs.readdirSync(endpointFolder)) {
    if (!endpoint.endsWith('.js')) {
        continue;
    }
    
    const mod = await import(path.join(endpointFolder, endpoint));
    mod.default(app);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);
});