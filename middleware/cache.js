const NodeCache = require("node-cache");
const cache = new NodeCache();

module.exports = (duration) => (req, res, next) => {
  if (req.method !== "GET") {
    res.status(400).json({ msg: "Not a get request can't cache data" });
    return next();
  }

  const key = req.originalUrl;
  const cacheResponse = cache.get(key);

  if (cacheResponse) {
    res
      .status(200)
      .json({ msg: "Cache Response: " + JSON.stringify(cacheResponse) });
  } else {
    res.originalSend = res.send;
    res.send = (body) => {
      res.originalSend(body);
      cache.set(key, body, duration);
    };
    next();
  }
};
