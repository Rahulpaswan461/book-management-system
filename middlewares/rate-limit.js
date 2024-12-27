const rateLimit = require("express-rate-limit")

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { error: 'Too many requests, please try again later.' },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const logRequestDetails = (req, res, next) => {
    const { method, url } = req;
    const timestamp = new Date().toISOString();
  
    console.log(`[${timestamp}] ${method} ${url}`);
    next(); // Pass control to the next middleware
  };

module.exports = {
    limiter,
    logRequestDetails
}