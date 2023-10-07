const crypto = require("crypto");
const { DISCOUNT_ORDER_FREQUENCY } = require("../config");
const items = [
  { id: 1, name: "Item 1", price: 100, stock: 100 },
  { id: 2, name: "Item 2", price: 200, stock: 50 },
  { id: 3, name: "Item 3", price: 500, stock: 100 },
  { id: 4, name: "Item 4", price: 1000, stock: 20 },
];

const carts = {};
const orders = {};
const discountCodes = {};
let orderCount = 0;

const getAllItems = () => {
  return items;
};
const getItemById = (itemId) => {
  const item = items.find((i) => i.id === itemId);
  return item;
};

function decreaseStockById(id, quantity) {
  const item = getItemById(id);
  if (item) {
    if (item.stock >= quantity) {
      item.stock -= quantity;
      return true;
    } else {
      throw new Error("Insuffiecient product stock");
    }
  }
  throw new Error("Product not found");
}
const addToCart = (userId, itemId, quantity) => {
  if (!carts[userId]) {
    carts[userId] = [];
  }
  const existingCartItem = carts[userId].find((item) => item.itemId === itemId);
  if (existingCartItem) {
    existingCartItem.quantity += quantity;
  } else {
    carts[userId].push({ itemId, quantity });
  }

  
  return decreaseStockById(itemId, quantity);
};
const getUserCart = (userId) => {
  return carts[userId];
};
const resetUsercart = (userId) => {
  carts[userId] = [];
};

const addUserOrder = (userId, userCart, cartTotal, appliedDiscount) => {
  orderCount++;
  if (!orders[userId]) {
    orders[userId] = [];
  }

  orders[userId].push({
    cart: userCart,
    total: cartTotal,
    discount: appliedDiscount,
  });
};

const generateDiscountCode = () => {
  if (orderCount % DISCOUNT_ORDER_FREQUENCY === 0) {
    const discountCode = crypto.randomBytes(6).toString("hex");
    discountCodes[discountCode] = { used: false};
    return discountCode;
  }
  return null;
};

const validateDiscountCode = (discountCode) => {
  const codeData = discountCodes[discountCode];
  if (!codeData) return false;
  if (codeData.used) return false;
  return true;
};
const markDiscountCodeUsed = (discountCode) => {
 discountCodes[discountCode]={used:true};
    
  };
module.exports = {
  generateDiscountCode,
  validateDiscountCode,
  getItemById,
  addToCart,
  getUserCart,
  addUserOrder,
  resetUsercart,
  getAllItems,
  markDiscountCodeUsed
};
