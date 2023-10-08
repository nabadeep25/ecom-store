const {
  getItemById,
  addToCart,
  getUserCart,
  validateDiscountCode,
  generateDiscountCode,
  addUserOrder,
  resetUsercart,
  getAllItems,
  markDiscountCodeUsed,
} = require("../services/store.service");

/**
 * Controller for adding items to user cart
 * @param {*} req
 * @param {*} res
 *
 */
const addToUserCart = (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;
    // input validation
    if (!userId || typeof userId !== "number") {
      return res.status(400).json({ error: "Invalid userId" });
    }

    if (!itemId || typeof itemId !== "number") {
      return res.status(400).json({ error: "Invalid itemId" });
    }

    if (!quantity || typeof quantity !== "number" || quantity <= 0) {
      return res.status(400).json({ error: "Invalid quantity" });
    }
    // getting item info
    const item = getItemById(itemId);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }
    // checking if item has enough stock
    if (item.stock >= quantity) {
      addToCart(userId, item.id, quantity);
      return res
        .status(200)
        .json({ success: true, message: "Item added to cart" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Item out of stock" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};
/**
 * Controller for user cart checkout
 * @param {*} req
 * @param {*} res
 *
 */
const checkout = (req, res) => {
  try {
    const { userId, discountCode } = req.body;
    //input validation
    if (!userId || typeof userId !== "number") {
      return res.status(400).json({ error: "Invalid userId" });
    }
    // get user cart
    const userCart = getUserCart(userId);
    // return error if cart is empty
    if (!userCart || userCart.length < 1) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }
    // calculating price
    let cartTotal = userCart
      .map(({ itemId, quantity }) => {
        let item = getItemById(itemId);
        return item ? item.price * quantity : 0;
      })
      .reduce((a, b) => a + b, 0);

    let appliedDiscount = 0;
    // validating discount code if discount code sent from client
    if (discountCode) {
      const isValid = validateDiscountCode(discountCode);

      if (isValid) {
        // applying discount if code is vali and marking the code as used
        appliedDiscount = 0.1 * cartTotal;
        cartTotal -= appliedDiscount;
        markDiscountCodeUsed(discountCode);
      }
    }
    // add order to user order list
    addUserOrder(userId, userCart, cartTotal, appliedDiscount);
    // reseting user cart to empty
    resetUsercart(userId);
    // generate discount code if the condition is true
    generateDiscountCode();

    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
      totalAmount: cartTotal,
      discountApplied: appliedDiscount,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};
/**
 * Controller for fetching all items
 * @param {*} req
 * @param {*} res
 *
 */
const getItems = (req, res) => {
  try {
    const items = getAllItems();
    if (!items?.length) {
      return res.status(404).json({ success: false, message: "No Item found" });
    }

    return res.status(200).json({
      success: true,
      items,
      message: "Item list fetched successfully ",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
/**
 * Controller for getting user cart data
 * @param {*} req
 * @param {*} res
 *
 */
const getCart = (req, res) => {
  try {
    const { userId } = req.query;
    // validation
    if (!userId || isNaN(parseInt(userId))) {
      return res.status(400).json({ error: "Invalid userId" });
    }
    let userCart = getUserCart(userId);
    if (userCart) {
      // populating item details in cart array
      userCart = userCart.map((data) => {
        let item = getItemById(data.itemId);
        if (item) {
          delete item.stock;
          data.item = item;
        }

        return data;
      });
    }
    return res.status(200).json({
      success: true,
      cart: userCart ?? [],
      message: "cart fetched successfully ",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
module.exports = {
  addToUserCart,
  checkout,
  getItems,
  getCart,
};
