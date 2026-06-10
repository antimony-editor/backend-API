import rateLimit from 'express-rate-limit';

export default rateLimit({
    windowMs: 5 * 60 * 1000, // 5 Minutes
    limit: 50,
});
