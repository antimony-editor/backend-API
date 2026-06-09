/**
 * /status endpoint
 * @param {import('express').Express} app Express app
 */
export default (app) => {
    app.get("/status", (req, res) => {
        res.json({ status: "healthy" });
    });
};