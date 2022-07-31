const PROXY_CONFIG = [
  {
    context: [
      "/v1/"
    ],
    target: "http://localhost:8080/",
    changeOrigin: true,
    secure: false
  }
];

module.exports = PROXY_CONFIG;
