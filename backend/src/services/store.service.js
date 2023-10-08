const crypto = require("crypto");
const { DISCOUNT_ORDER_FREQUENCY } = require("../config");
let items = [
  { id: 1, name: "Nike Green", price: 100, stock: 100, image:'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80' },
  { id: 2, name: "Nike White", price: 200, stock: 50 ,image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80'},
  { id: 3, name: "Nike black", price: 500, stock: 100 ,image:'https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2030&q=80'},
  { id: 4, name: "Bata Brown", price: 1000, stock: 20,image:'https://images.unsplash.com/photo-1531310197839-ccf54634509e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80' },
];

let carts = {};
let orders = {};
let discountCodes = {};
let orderCount = 0;

const getAllItems = () => {
  return items.slice() ?? [];
};
const getItemById = (itemId) => {
  const item = items.find((i) => i.id === itemId);
  return item ? Object.assign({},item) : null;
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
  const item = getItemById(itemId);
  if (quantity < 1) return false;
  if (!item) return false;

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
  if (!userId || !userCart || isNaN(cartTotal) || isNaN(appliedDiscount))
    return null;
  orderCount++;
  if (!orders[userId]) {
    orders[userId] = [];
  }

  orders[userId].push({
    cart: userCart,
    total: cartTotal,
    discount: appliedDiscount,
  });
  return orders;
};

const generateDiscountCode = () => {
  if (orderCount % DISCOUNT_ORDER_FREQUENCY === 0) {
    const discountCode = crypto.randomBytes(6).toString("hex");
    discountCodes[discountCode] = { used: false };
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
  if (!discountCode) return null;
  discountCodes[discountCode] = { used: true };
  return discountCodes[discountCode];
};

const getAllDiscountCodes = () => {
  return Object.keys(discountCodes).map((code) => {
    return { code: code, used: discountCodes[code].used };
  });
};

const getStoreData = () => {
  const allOrder = Object.keys(orders).reduce((acc, key) => {
    acc.push(...orders[key]);
    return acc;
  }, []);

  let totalPurchaseAmount = 0;
  let totalDiscountAmount = 0;
  let itemCount = {};
  allOrder.forEach((order) => {
    order.cart.forEach((product) => {
      const itemId = product.itemId;
      const quantity = product.quantity;

      if (itemCount[itemId]) {
        itemCount[itemId].count += quantity;
      } else {
        itemCount[itemId] = { count: quantity, item: getItemById(itemId) };
      }
    });
    totalPurchaseAmount += order.total;
    totalDiscountAmount += order.discount;
  });
  const discountCodes = getAllDiscountCodes();
  const itemCountList = Object.values(itemCount);
  return {
    totalPurchaseAmount,
    totalDiscountAmount,
    discountCodes,
    itemCountList,
  };
};

const setItems = (value) => {
  items = value;
};
const setOrders = (value) => {
  orders = value;
};
const setOrderCount = (value) => {
  if (!isNaN(value)) orderCount = value;
};
const setDiscountCodes = (value) => {
  discountCodes = value;
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
  markDiscountCodeUsed,
  getAllDiscountCodes,
  getStoreData,
  items,
  carts,
  orders,
  orderCount,
  discountCodes,
  setItems,
  decreaseStockById,
  setOrders,
  setOrderCount,
  setDiscountCodes,
};
