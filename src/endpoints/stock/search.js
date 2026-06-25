/**
 * /stock/search endpoint
 * Forwards a request to the Pexels API.
 *
 * Query parameters:
 *   - query (required)
 *   - page (required)
 *   - type (optional: "image" | "video", defaults to "image")
 *
 * @param {import('express').Express} app Express app
 */
export default (app) => {
    app.get('/stock/search', async (req, res) => {
        const { query, page, type = 'image' } = req.query;

        if (!query || !page) {
            return res
                .status(400)
                .send('Missing either "query" or "page" query');
        }

        const encodedQuery = encodeURIComponent(query);
        const encodedPage = encodeURIComponent(page);

        const url =
            type === 'video'
                ? `https://api.pexels.com/videos/search?query=${encodedQuery}&page=${encodedPage}`
                : `https://api.pexels.com/v1/search?query=${encodedQuery}&page=${encodedPage}`;

        try {
            const response = await fetch(url, {
                cache: 'force-cache',
                headers: {
                    Authorization: process.env.PEXELS_API_KEY,
                },
            });

            if (!response.ok) {
                const text = await response.text();
                console.warn(
                    `Failed Pexels request: ${response.status} ${response.statusText} ${text}`,
                );

                return res.status(response.status).send(response.statusText);
            }

            const json = await response.json();

            if (type === 'video') {
                return res.json(json.videos ?? []);
            }

            return res.json(json.photos ?? []);
        } catch (err) {
            console.error('Pexels request failed:', err);
            return res.status(500).send('Internal server error');
        }
    });
};
