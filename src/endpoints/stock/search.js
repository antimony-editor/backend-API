/**
 * /stock/search endpoint
 * Forwards a request to pexels API
 * @param {import('express').Express} app Express app
 * @returns {Promise<void>}
 */
export default (app) => {
    app.get('/stock/search', async (req, res) => {
        if (!req.query.query || !req.query.page) {
            return res.status(400).send('Missing either "query" or "page" query');
        }

        const query = encodeURIComponent(req.query.query);
        const page = encodeURIComponent(req.query.page);

        const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&page=${page}`, {
            headers: {
                'Authorization': process.env.PEXELS_API_KEY
            }
        });

        if (!response.ok) {
            const text = await response.text();
            console.warn(`Failed pexels.com/v1/search: ${response.status} ${response.statusText} ${text}`);
            res.status(response.status).send(response.statusText);
            return;
        }

        const json = await response.json();
        res.json(json.photos);
    });
};