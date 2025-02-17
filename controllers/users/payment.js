const ResponseHandler = require("../../utils/ResponseHandler");
const { RequestOrderPayment } = require("../../utils/PaymentServices");
const SeatsCrud_crud = require("../../services/seats-crud");
const SeatModule = new SeatsCrud_crud();

const requestPayment = async (req, res) => {
    const responseHandler = new ResponseHandler(res);
    try {
        const { checkout } = req.body;

        if (!checkout || !Array.isArray(checkout) || checkout.length === 0) {
            return responseHandler.error("Invalid checkout data", 400);
        }

        const seats = await SeatModule.filterBy({
            _id: { $in: checkout }
        });

        if (!seats || seats.length === 0) {
            return responseHandler.error("No seats found for given IDs", 404);
        }

        const paymentData = {
            amount: seats.reduce((total, seat) => total + seat.price, 0).toFixed(2),
            items: seats.map(seat => ({
                id: seat._id,
                name: seat.name,
                description: seat.description,
                unit_amount: { currency_code: "USD", value: seat.price },
                quantity: "1",
            }))
        };
        
        const payment = await RequestOrderPayment(paymentData);
        return responseHandler.success(payment, "Payment created successfully", 201);
    } catch (error) {
        return responseHandler.error(error.message, 500, error);
    }
}


module.exports = {
    requestPayment
}