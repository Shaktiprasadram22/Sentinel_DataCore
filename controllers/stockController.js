// // controllers/stockController.js
// const Stock = require("../models/Stock");

// // Get all stocks
// exports.getStocks = async (req, res) => {
//   try {
//     const stocks = await Stock.find();
//     res.json(stocks);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Get a single stock by symbol
// exports.getStock = async (req, res) => {
//   try {
//     const stock = await Stock.findOne({
//       symbol: req.params.symbol.toUpperCase(),
//     });
//     if (!stock) return res.status(404).json({ message: "Stock not found" });
//     res.json(stock);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Add a new stock (admin only)
// exports.addStock = async (req, res) => {
//   try {
//     const { symbol, sector, lastPrice, volume, resistance, support } = req.body;
//     let stock = await Stock.findOne({ symbol: symbol.toUpperCase() });
//     if (stock) return res.status(400).json({ message: "Stock already exists" });

//     stock = new Stock({
//       symbol: symbol.toUpperCase(),
//       sector,
//       lastPrice,
//       volume,
//       resistance,
//       support,
//     });
//     await stock.save();
//     res.json(stock);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Update a stock (admin only)
// exports.updateStock = async (req, res) => {
//   try {
//     const updates = req.body;
//     updates.updatedAt = Date.now();
//     const stock = await Stock.findOneAndUpdate(
//       { symbol: req.params.symbol.toUpperCase() },
//       updates,
//       { new: true }
//     );
//     if (!stock) return res.status(404).json({ message: "Stock not found" });
//     res.json(stock);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Delete a stock (admin only)
// exports.deleteStock = async (req, res) => {
//   try {
//     const stock = await Stock.findOneAndDelete({
//       symbol: req.params.symbol.toUpperCase(),
//     });
//     if (!stock) return res.status(404).json({ message: "Stock not found" });
//     res.json({ message: "Stock deleted" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
//////////
// controllers/stockController.js
const Stock = require("../models/Stock");
const { cache } = require("../middleware/cacheMiddleware"); //Aita add karithili same as newsController.js

/**
 * Get all stocks
 * Public endpoint
 */
exports.getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get a single stock by symbol
 * Public endpoint
 */
exports.getStock = async (req, res) => {
  try {
    const stock = await Stock.findOne({
      symbol: req.params.symbol.toUpperCase(),
    });
    if (!stock) return res.status(404).json({ message: "Stock not found" });
    res.json(stock);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Add stock(s)
 * Admin only, supports both single and bulk insert
 */
exports.addStock = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      // Bulk insert: ensure all symbols are uppercase
      const stocksToInsert = req.body.map((stock) => ({
        ...stock,
        symbol: stock.symbol.toUpperCase(),
      }));
      const stocks = await Stock.insertMany(stocksToInsert);
      res.json(stocks);
    } else {
      // Single insert
      const { symbol, sector, lastPrice, volume, resistance, support } =
        req.body;
      let stock = await Stock.findOne({ symbol: symbol.toUpperCase() });
      if (stock)
        return res.status(400).json({ message: "Stock already exists" });

      stock = new Stock({
        symbol: symbol.toUpperCase(),
        sector,
        lastPrice,
        volume,
        resistance,
        support,
      });
      await stock.save();
      res.json(stock);
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update a stock by symbol
 * Admin only
 */
exports.updateStock = async (req, res) => {
  try {
    const updates = req.body;
    updates.updatedAt = Date.now();
    const stock = await Stock.findOneAndUpdate(
      { symbol: req.params.symbol.toUpperCase() },
      updates,
      { new: true }
    );
    if (!stock) return res.status(404).json({ message: "Stock not found" });
    res.json(stock);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Delete a stock by symbol
 * Admin only
 */
exports.deleteStock = async (req, res) => {
  try {
    const stock = await Stock.findOneAndDelete({
      symbol: req.params.symbol.toUpperCase(),
    });
    if (!stock) return res.status(404).json({ message: "Stock not found" });
    res.json({ message: "Stock deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
