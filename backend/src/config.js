require("dotenv").config();
const PORT = process.env.PORT;
const DISCOUNT_ORDER_FREQUENCY = process.env.DISCOUNT_ORDER_FREQUENCY;
module.exports = {
  PORT,
  DISCOUNT_ORDER_FREQUENCY,
};
