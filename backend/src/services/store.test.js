const { DISCOUNT_ORDER_FREQUENCY } = require("../config");
const {
  getAllItems,
  items,
  orders,
  carts,
  discountCodes,
  setItems,
  getItemById,
  decreaseStockById,
  addToCart,
  getUserCart,
  resetUsercart,
  addUserOrder,
  setOrders,
  generateDiscountCode,
  setOrderCount,
  setDiscountCodes,
  validateDiscountCode,
  markDiscountCodeUsed,
  getAllDiscountCodes,
  getStoreData,
} = require("./store.service");

describe("getAllItems", () => {
  it("should return an array of items when called", () => {
    const result = getAllItems();
    expect(Array.isArray(result)).toBe(true);
  });

  it("should return an empty array when there are no items", () => {
    const emptyItem = [];
    setItems(emptyItem);
    const result = getAllItems();
    expect(result).toEqual(emptyItem);
  });

  it("should return null or throw an error when items is undefined or null", () => {
    setItems(null);
    const result = getAllItems();
    expect(result).not.toBeUndefined();
    expect(result).not.toBeNull();
  });

  it("should return items in the correct order", () => {
    setItems(items);
    const result = getAllItems();
    expect(result).toEqual(items);
  });
});

describe("getItemById", () => {
  it("should return an item object when a valid itemId is passed", () => {
    const itemId = 1;
    const result = getItemById(itemId);
    expect(result).toEqual({ id: 1, name: "Item 1", price: 100, stock: 100 });
  });

  it("should return null when an invalid itemId is passed", () => {
    const itemId = 5;
    const result = getItemById(itemId);
    expect(result).toBeNull();
  });

  it("should return null when itemId is null", () => {
    const itemId = null;
    const result = getItemById(itemId);
    expect(result).toBeNull();
  });

  it("should return null when itemId is undefined", () => {
    const itemId = undefined;
    const result = getItemById(itemId);
    expect(result).toBeNull();
  });

  it("should return null when itemId is not a number", () => {
    const itemId = "1";
    const result = getItemById(itemId);
    expect(result).toBeNull();
  });
});

describe("decreaseStockById", () => {
  it("should decrease stock of an item with sufficient stock", () => {
    const itemId = 1;
    const quantity = 5;
    const result = decreaseStockById(itemId, quantity);
    const itemData = getItemById(itemId);
    expect(result).toBe(true);
    expect(itemData.stock).toBe(95);
  });

  it("should throw error when item not found", () => {
    const itemId = 10;
    const quantity = 5;
    expect(() => decreaseStockById(itemId, quantity)).toThrowError(
      "Product not found"
    );
  });
  it("should throw error when item has insufficient stock", () => {
    const itemId = 1;
    const quantity = 500;
    expect(() => decreaseStockById(itemId, quantity)).toThrowError(
      "Insuffiecient product stock"
    );
  });
});

describe("addToCart", () => {
  it("should add a new item to an empty cart when valid userId, itemId, and quantity are provided", () => {
    const userId = 1;
    const itemId = 2;
    const quantity = 1;
    carts[userId] = undefined;
    const result = addToCart(userId, itemId, quantity);
    expect(result).toBe(true);
    expect(carts[userId]).toEqual([{ itemId, quantity }]);
  });

  it("should add a new item to an existing cart when valid userId, itemId, and quantity are provided", () => {
    const userId = 1;
    const itemId = 1;
    const quantity = 1;
    carts[userId] = [{ itemId: 2, quantity: 2 }];
    const result = addToCart(userId, itemId, quantity);
    expect(result).toBe(true);
    expect(carts[userId]).toEqual([
      { itemId: 2, quantity: 2 },
      { itemId, quantity },
    ]);
  });

  it("should add an existing item to an existing cart when valid userId, itemId, and quantity are provided", () => {
    const userId = 1;
    const itemId = 2;
    const quantity = 1;
    carts[userId] = [{ itemId, quantity: 2 }];
    const result = addToCart(userId, itemId, quantity);
    expect(result).toBe(true);
    expect(carts[userId]).toEqual([{ itemId, quantity: 3 }]);
  });

  it("should not add an item with quantity 0 when valid userId, itemId, and quantity are provided", () => {
    const userId = 1;
    const itemId = 2;
    const quantity = 0;
    carts[userId] = undefined;
    const result = addToCart(userId, itemId, quantity);
    expect(result).toBe(false);
    expect(carts[userId]).toBeUndefined();
  });

  it("should not add an item with negative quantity when valid userId, itemId, and quantity are provided", () => {
    const userId = 1;
    const itemId = 2;
    const quantity = -1;
    carts[userId] = undefined;
    const result = addToCart(userId, itemId, quantity);
    expect(result).toBe(false);
    expect(carts[userId]).toBeUndefined();
  });
});

describe("getUserCart", () => {
  it("should return the cart object when the user ID exists in the carts object", () => {
    const userId = 1;
    carts[userId] = { item: 1, quantity: 1 };
    expect(getUserCart(userId)).toEqual({ item: 1, quantity: 1 });
  });

  it("should return undefined when the user ID does not exist in the carts object", () => {
    const userId = 2;
    expect(getUserCart(userId)).toBeUndefined();
  });

  it("should return undefined when the user ID is null", () => {
    const userId = null;
    expect(getUserCart(userId)).toBeUndefined();
  });

  it("should return undefined when the user ID is not a string", () => {
    const userId = 123;
    expect(getUserCart(userId)).toBeUndefined();
  });
});

describe("resetUsercart", () => {
  it("should reset the user cart when valid userId is passed", () => {
    const userId = 1;
    carts[userId] = [{ itemId: 1, quantity: 1 }];
    resetUsercart(userId);
    expect(carts[userId]).toEqual([]);
  });

  it("should not throw an error when an invalid userId is passed", () => {
    const userId = null;
    expect(() => resetUsercart(userId)).not.toThrow();
  });

  it("should not modify the carts object when an invalid userId is passed", () => {
    const userId = null;
    const initialCarts = { ...carts };
    resetUsercart(userId);
    expect(carts).toEqual(initialCarts);
  });

  it("should set an empty array to the users cart even if the users cart is already empty in the carts object", () => {
    const userId = "validUserId";
    carts[userId] = [];
    resetUsercart(userId);
    expect(carts[userId]).toEqual([]);
  });
});

describe("addUserOrder", () => {
  it("should add a new order to the orders object for a given user ID", () => {
    const userId = 1;
    const userCart = [{ itemId: 1, quantity: 1 }];
    const cartTotal = 100;
    const appliedDiscount = 10;

    addUserOrder(userId, userCart, cartTotal, appliedDiscount);

    expect(orders[userId]).toHaveLength(1);
    expect(orders[userId][0].cart).toEqual(userCart);
    expect(orders[userId][0].total).toEqual(cartTotal);
    expect(orders[userId][0].discount).toEqual(appliedDiscount);
  });

  it("should not add a new order if user ID is not provided", () => {
    setOrders({});
    const userCart = [{ itemId: 1, quantity: 1 }];
    const cartTotal = 100;
    const appliedDiscount = 10;

    const result = addUserOrder(
      undefined,
      userCart,
      cartTotal,
      appliedDiscount
    );

    expect(result).toBeNull();
  });

  it("should not add a new order if userCart is not provided", () => {
    setOrders({});
    const userId = 1;
    const cartTotal = 100;
    const appliedDiscount = 10;

    const result = addUserOrder(userId, undefined, cartTotal, appliedDiscount);

    expect(result).toBeNull();
  });

  it("should not add a new order if cartTotal is not provided", () => {
    setOrders({});
    const userId = 1;
    const userCart = [{ itemId: 1, quantity: 1 }];
    const appliedDiscount = 10;

    const result = addUserOrder(userId, userCart, undefined, appliedDiscount);

    expect(result).toBeNull();
  });
});

describe("generateDiscountCode", () => {
  it("should return a discount code when order count is a multiple of DISCOUNT_ORDER_FREQUENCY", () => {
    setOrderCount(DISCOUNT_ORDER_FREQUENCY);
    const result = generateDiscountCode();
    expect(result).not.toBeNull();
    expect(discountCodes[result]).toEqual({ used: false });
  });

  it("should return null when order count is not a multiple of DISCOUNT_ORDER_FREQUENCY", () => {
    setOrderCount(DISCOUNT_ORDER_FREQUENCY - 1);
    const result = generateDiscountCode();
    expect(result).toBeNull();
  });
});

describe("validateDiscountCode", () => {
  it("should return true when discount code exists and is not used", () => {
    const discountCodes = {
      code1: { used: false },
      code2: { used: true },
    };
    setDiscountCodes(discountCodes);
    expect(validateDiscountCode("code1")).toBe(true);
  });

  it("should return false when discount code does not exist", () => {
    const discountCodes = {
      code1: { used: false },
      code2: { used: true },
    };
    setDiscountCodes(discountCodes);
    expect(validateDiscountCode("code3")).toBe(false);
  });

  it("should return false when discount code exists but is already used", () => {
    const discountCodes = {
      code1: { used: false },
      code2: { used: true },
    };
    setDiscountCodes(discountCodes);
    expect(validateDiscountCode("code2")).toBe(false);
  });

  it("should return false when input is not provided", () => {
    const discountCodes = {
      code1: { used: false },
      code2: { used: true },
    };
    setDiscountCodes(discountCodes);
    expect(validateDiscountCode()).toBe(false);
  });

  it("should return false when input is null", () => {
    const discountCodes = {
      code1: { used: false },
      code2: { used: true },
    };
    setDiscountCodes(discountCodes);
    expect(validateDiscountCode(null)).toBe(false);
  });
});

describe("markDiscountCodeUsed", () => {
  it("should mark discount code as used in discountCodes object", () => {
    const newDiscountCodes = {
      code1: { used: false },
    };
    setDiscountCodes(newDiscountCodes);
    const result = markDiscountCodeUsed("code1");
    expect(result).toEqual({ used: true });
  });

  it("should return null if input is null ", () => {
    const newDiscountCodes = {
      code1: { used: false },
    };
    setDiscountCodes(newDiscountCodes);
    const result = markDiscountCodeUsed(null);
    expect(result).toBeNull();
  });
  it("should return null if input is undefined ", () => {
    const newDiscountCodes = {
      code1: { used: false },
    };
    setDiscountCodes(newDiscountCodes);
    const result = markDiscountCodeUsed(undefined);
    expect(result).toBeNull();
  });
});

describe("getAllDiscountCodes", () => {
  it("should return an array of discount codes with their usage status", () => {
    const discountCodes = {
      code1: { used: false },
      code2: { used: true },
    };
    setDiscountCodes(discountCodes);
    const result = getAllDiscountCodes();
    expect(result).toEqual([
      { code: "code1", used: false },
      { code: "code2", used: true },
    ]);
  });

  it("should return an empty array when there are no discount codes", () => {
    setDiscountCodes({});
    const result = getAllDiscountCodes();
    expect(result).toEqual([]);
  });
});

describe("getStoreData", () => {
  it("should return an object with all properties when orders exist", () => {
    setItems(items);
    const orders = {
      1: [
        {
          cart: [
            { itemId: 1, quantity: 1 },
            { itemId: 2, quantity: 1 },
          ],
          total: 100,
          discount: 10,
        },
      ],
    };
    setOrders(orders);
    const discountCodes = {
      code1: { used: false },
      code2: { used: true },
    };
    setDiscountCodes(discountCodes);
    const result = getStoreData();

    expect(result.totalPurchaseAmount).toEqual(100);
    expect(result.totalDiscountAmount).toEqual(10);
    expect(result.discountCodes).toHaveLength(2);
    expect(result.itemCountList).toHaveLength(2);
    expect(result.itemCountList[0].count).toEqual(1);
  });

  it("should return an object with all properties set to 0 or empty arrays when no orders exist", () => {
    setItems(items);
    setOrders({});
    setDiscountCodes({});

    const result = getStoreData();
    const expected = {
      totalPurchaseAmount: 0,
      totalDiscountAmount: 0,
      discountCodes: [],
      itemCountList: [],
    };
    expect(result).toEqual(expected);
  });

  it("should calculate the correct totalPurchaseAmount and totalDiscountAmount for multiple orders", () => {
    setItems(items);
    const orders = {
      1: [
        {
          cart: [{ itemId: 1, quantity: 1 }],
          total: 100,
          discount: 10,
        },
      ],
      2: [
        {
          cart: [{ itemId: 1, quantity: 1 }],
          total: 100,
          discount: 10,
        },
      ],
    };
    setOrders(orders);
    const discountCodes = {
      code1: { used: false },
      code2: { used: true },
    };
    setDiscountCodes(discountCodes);
    const result = getStoreData();

    expect(result.totalPurchaseAmount).toEqual(200);
    expect(result.totalDiscountAmount).toEqual(20);
    expect(result.discountCodes).toHaveLength(2);
    expect(result.itemCountList).toHaveLength(1);
    expect(result.itemCountList[0].count).toEqual(2);
  });
});
