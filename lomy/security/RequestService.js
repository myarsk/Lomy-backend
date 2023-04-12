//Node.js 10.14.0
//Plain Javascript and Node.js is supported
// html/css is not supported here 

// Node.js version
const getClientIP = (req) => {
  const ip =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  return ip.split(',')[0];
};

module.exports = { getClientIP };