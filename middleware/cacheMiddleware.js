// const { LRUCache } = require("lru-cache"); // Correct import for v7+
// const cache = new LRUCache({ max: 100, ttl: 1000 * 60 }); // Correct usage

// module.exports = (req, res, next) => {
//   if (req.method !== "GET") return next();
//   const key = req.originalUrl;
//   const cached = cache.get(key);
//   if (cached) return res.json(cached);
//   res.sendResponse = res.json;
//   res.json = (body) => {
//     cache.set(key, body);
//     res.sendResponse(body);
//   };
//   next();
// };
// middleware/cacheMiddleware.js
const { LRUCache } = require("lru-cache");
const cache = new LRUCache({ max: 100, ttl: 1000 * 60 }); // 100 items, 1 min TTL

const cacheMiddleware = (req, res, next) => {
  if (req.method !== "GET") return next();
  const key = req.originalUrl;
  const cached = cache.get(key);
  if (cached) return res.json(cached);
  res.sendResponse = res.json;
  res.json = (body) => {
    cache.set(key, body);
    res.sendResponse(body);
  };
  next();
};

module.exports = cacheMiddleware;
module.exports.cache = cache; // <-- Export the cache instance
