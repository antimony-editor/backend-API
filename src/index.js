import express from 'express';
import path from 'path';
import { globSync } from 'tinyglobby';

import 'dotenv/config';

const app = express();

// Load endpoints into express
const endpointFolder = path.resolve('./src/endpoints');
for (const endpoint of globSync('src/endpoints/**/*.js')) {
    const mod = await import(path.resolve(endpoint));
    mod.default(app);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT);
});
