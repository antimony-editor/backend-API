class WebhookService {
    constructor () {
        /**
         * The webhook url to send events and logs
         * @type {?string}
         */
        this.webhookURL = process.env.WEBHOOK_URL;

        /**
         * Whether or not we can send events through the webhook
         * @type {boolean}
         */
        this.canSend = !!this.webhookURL;
    }

    /**
     * Send a message through the webhook
     * @param {object} message Message to send
     * @returns {Promise<Response>}
     */
    async send (message) {
        if (!this.canSend) {
            return;
        }

        const response = await fetch(this.webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        });

        return response;
    }
}

export default new WebhookService();