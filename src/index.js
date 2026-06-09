import express from 'express';
import path from 'path';
import { globSync } from 'tinyglobby';

import databaseService from './services/database.js';
import webhookService from './services/webhook.js';

import 'dotenv/config';

const app = express();

const services = {
    database: databaseService,
    webhook: webhookService,
};

// Load endpoints into express
for (const endpoint of globSync('src/endpoints/**/*.js')) {
    const mod = await import(path.resolve(endpoint));
    mod.default(app, services);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT);
});
