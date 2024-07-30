const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      runtimeCaching: [
        {
          urlPattern: new RegExp("^https://dummyjson.com/"),
          handler: "NetworkFirst",
          options: {
            cacheName: "api-cache",
          },
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
          handler: "CacheFirst",
          options: {
            cacheName: "image-cache",
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            },
          },
        },
        {
          urlPattern: /\.(?:js|css)$/,
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "static-resources",
          },
        },
        {
          urlPattern: new RegExp("^https://to-do-list-tau-eosin.vercel.app/"),
          handler: "NetworkFirst",
          options: {
            cacheName: "html-cache",
          },
        },
      ],
    },
  },
});
