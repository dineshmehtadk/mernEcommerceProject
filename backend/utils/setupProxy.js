const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(proxy("/api/v1", { // https://github.com/chimurai/http-proxy-middleware
    target: "http://localhost:3000",
    secure: false
  }));
};
