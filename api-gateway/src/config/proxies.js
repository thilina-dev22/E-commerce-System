module.exports = {
  users: { target: 'http://localhost:3001', changeOrigin: true },
  products: { target: 'http://localhost:3002', changeOrigin: true },
  orders: { target: 'http://localhost:3003', changeOrigin: true },
  cart: { target: 'http://localhost:3004', changeOrigin: true }
};
