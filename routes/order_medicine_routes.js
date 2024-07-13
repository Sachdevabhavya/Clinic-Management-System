const express = require("express");
const order_control = require("../controllers/order-medicine-controller");
const store_img = require("../middleware/prescription_image")

const order_router = express.Router();

order_router.get("/doctor_login/:loginId/orders", order_control.getAllOrders);
order_router.get("/doctor_login/:loginId/orders/:orderId", order_control.getOrderById);
order_router.post("/patient_login/:loginId/place_order", store_img ,  order_control.placeOrder);

module.exports = order_router;
