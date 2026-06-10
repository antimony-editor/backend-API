import crypto from 'crypto';
import rateLimit from 'express-rate-limit';
import webhookService from '../services/webhook.js';

export default rateLimit({
    windowMs: 5 * 60 * 1000, // 5 Minutes
    limit: 50,
    handler: (req, res) => {
        const hash = crypto
            .createHash('sha256')
            .update(req.ip)
            .digest('base64');

        webhookService.send({
            embeds: [
                {
                    title: 'Request ratelimit',
                    description: `IP hash: ${hash}`,
                    color: 0xff0000,
                },
            ],
        });

        res.sendStatus(429);
    },
});
