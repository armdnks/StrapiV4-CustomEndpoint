"use strict";

// https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/entity-service/crud.html
// https://docs.strapi.io/developer-docs/latest/development/backend-customization/controllers.html#adding-a-new-controller

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::event.event", ({ strapi }) => ({
  custom_find: async (options) => {
    const data = await strapi.entityService.findMany("api::event.event", {
      fields: ["id", "title", "slug", "description"],
      populate: {
        user: { fields: ["username", "email"] },
      },
    });

    if (options) {
      return data
        .map((item) => item)
        .filter((data) => {
          if (data.user !== null) {
            return data.user.id === Object.values(options)[0];
          }
        });
    }

    return data;
  },

  custom_create: async (data) => {
    return await strapi.entityService.create("api::event.event", { data });
  },

  custom_findOne: async (id) => {
    const data = await strapi.entityService.findOne("api::event.event", id, {
      fields: ["id", "title", "slug", "description"],
      populate: {
        user: { fields: ["username", "email"] },
      },
    });
    return data;
  },

  custom_update: async (id, data) => {
    return await strapi.entityService.update("api::event.event", id, {
      data,
    });
  },

  custom_delete: async (id) => {
    return await strapi.entityService.delete("api::event.event", id);
  },
}));
