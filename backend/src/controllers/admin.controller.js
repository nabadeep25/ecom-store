const {
  getAllDiscountCodes,
  getStoreData,
} = require("../services/store.service");

/**
 * Controller function for store purchase statistics
 * @param {*} req
 * @param {*} res
 *
 */
const getStoreStats = (req, res) => {
  try {
    const stats = getStoreData();

    return res.status(200).json({
      success: true,
      stats,
      message: "Store stats fetched successfully ",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
/**
 * Controller function for fetching all discount codes
 * @param {*} req
 * @param {*} res
 *
 */
const getDiscountCodes = (req, res) => {
  try {
    let codes = getAllDiscountCodes();

    return res.status(200).json({
      success: true,
      discountCodes: codes,
      message: codes.length
        ? "Discount code fetched successfully "
        : "Discount code not generated",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
module.exports = {
  getDiscountCodes,
  getStoreStats,
};
