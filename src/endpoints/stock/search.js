/**
 * /stock/search endpoint
 * Forwards a request to pexels API
 * @param {import('express').Express} app Express app
 * @returns {Promise<void>}
 */
export default (app) => {
    app.get('/stock/search', async (req, res) => {
        // 'type' query is optional and will fallback to 'image'
        if (!req.query.query || !req.query.page) {
            return res
                .status(400)
                .send('Missing either "query" or "page" query');
        }

        const query = encodeURIComponent(req.query.query);
        const page = encodeURIComponent(req.query.page);
        const type = req.query.type;

        const url =
            type === 'video'
                ? `https://api.pexels.com/v1/videos/search?query=${query}&page=${page}`
                : `https://api.pexels.com/v1/search?query=${query}&page=${page}`;

        const response = await fetch(url, {
            cache: 'force-cache',
            headers: {
                Authorization: process.env.PEXELS_API_KEY,
            },
        });

        if (!response.ok) {
            const text = await response.text();
            console.warn(
                `Failed pexels.com/v1/search: ${response.status} ${response.statusText} ${text}`,
            );
            res.status(response.status).send(response.statusText);
            return;
        }

        const json = await response.json();
        if (type === 'video') {
            res.json(json.videos);
        } else {
            res.json(json.images);
        }
    });
};
