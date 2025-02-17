const axios = require("axios");

GenerateToken = async () => {
    try {
        const res = await axios({
            url: process.env.PAYPAL_BASE + '/v1/oauth2/token',
            method: 'post',
            data: 'grant_type=client_credentials',
            auth: {
                username: process.env.PAYPAL_CLINET_ID,
                password: process.env.PAYPAL_CLINET_SECRET
            }
        });
        return res.data.access_token;
    } catch (err) {
        console.error("PayPal Token Error:", err.response ? err.response.data : err.message);
        return null;
    }
};

exports.RequestOrderPayment = async ({ amount, items }) => {
    const token = await GenerateToken();
    if (!token) throw "Failed to generate PayPal token";

    const bodyData = {
        intent: "CAPTURE",
        purchase_units: [
            {
                invoice_id: "90210",
                amount: {
                    currency_code: "USD",
                    value: amount,
                    breakdown: {
                        item_total: { currency_code: "USD", value: amount },
                    }
                },
                items: items
            }
        ],
        application_context: {
            payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
            landing_page: "LOGIN",
            shipping_preference: "NO_SHIPPING",
            user_action: "PAY_NOW",
            return_url: process.env.REDIRECT_URL,
            cancel_url: process.env.CANCEL_URL
        }
    };

    const response = await axios({
        url: process.env.PAYPAL_BASE + '/v2/checkout/orders',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        data: bodyData
    });

    return { redirect_url: response.data.links.find(link => link.rel === 'approve').href }
};
