import 'dotenv/config';
import path from 'path';
import express from 'express';
import rateLimit from 'express-rate-limit';
import gracefulShutdown from 'http-graceful-shutdown';
import { globSync } from 'tinyglobby';

import databaseService from './services/database.js';
import webhookService from './services/webhook.js';

const app = express();

app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 5 Minutes
    limit: 50,
}));

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

gracefulShutdown(app);