"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;
// module.exports = createCoreRouter("api::event.event");
const defaultRouter = createCoreRouter("api::event.event");

const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      if (!routes) routes = innerRouter.routes.concat(extraRoutes);
      return routes.reverse();
    },
  };
};

const myExtraRoutes = [
  {
    method: "GET",
    path: "/events/me",
    handler: "event.me",
  },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
