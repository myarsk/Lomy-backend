//Node.js 10.14.0
//Plain Javascript and Node.js is supported
// html/css is not supported here 

const { request } = require('express');
const { isEmpty } = require('lodash');

class RequestServiceImpl {
  constructor() {
    this.LOCALHOST_IPV4 = '127.0.0.1';
    this.LOCALHOST_IPV6 = '0:0:0:0:0:0:0:1';
  }

  getClientIP(request) {
    let ipAddress = request.headers['x-forwarded-for'];

    if (isEmpty(ipAddress) || ipAddress.toLowerCase() === 'unknown') {
      ipAddress = request.headers['proxy-client-ip'];
    }

    if (isEmpty(ipAddress) || ipAddress.toLowerCase() === 'unknown') {
      ipAddress = request.headers['wl-proxy-client-ip'];
    }

    if (isEmpty(ipAddress) || ipAddress.toLowerCase() === 'unknown') {
      ipAddress = request.connection.remoteAddress;

      if (this.LOCALHOST_IPV4 === ipAddress || this.LOCALHOST_IPV6 === ipAddress) {
        try {
          const inetAddress = require('os').networkInterfaces();
          ipAddress = inetAddress['eth0'][0].address;
        } catch (e) {
          console.error(e);
        }
      }
    }

    if (!isEmpty(ipAddress) && ipAddress.length > 15 && ipAddress.indexOf(',') > 0) {
      ipAddress = ipAddress.substring(0, ipAddress.indexOf(','));
    }

    return ipAddress;
  }
}

module.exports = RequestServiceImpl;