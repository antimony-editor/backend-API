import 'dotenv/config';
import path from 'path';
import express from 'express';
import { globSync } from 'tinyglobby';
import rateLimit from './util/ratelimit.js';

import databaseService from './services/database.js';
import webhookService from './services/webhook.js';

const app = express();

app.use(rateLimit);

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
