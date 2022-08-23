"use strict";

const { createCoreController } = require("@strapi/strapi").factories;
const { sanitize } = require("@strapi/utils");

module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  find: async (ctx) => {
    const entity = await strapi.service("api::event.event").custom_find();
    const sanitizedEntity = await sanitize.contentAPI.output(entity);

    return { succes: true, count: entity.length, data: sanitizedEntity };
  },

  create: async (ctx) => {
    ctx.request.body.user = ctx.state.user.id;
    const entity = await strapi
      .service("api::event.event")
      .custom_create(ctx.request.body);
    const sanitizedEntity = await sanitize.contentAPI.output(entity);

    return { succes: true, data: sanitizedEntity };
  },

  findOne: async (ctx) => {
    const entity = await strapi
      .service("api::event.event")
      .custom_findOne(ctx.params.id);

    if (!entity) return ctx.notFound(`No data with id: ${ctx.params.id}`);

    const sanitizedEntity = await sanitize.contentAPI.output(entity);
    return { succes: true, data: sanitizedEntity };
  },

  update: async (ctx) => {
    let entity = await strapi
      .service("api::event.event")
      .custom_findOne(ctx.params.id);

    if (!entity) return ctx.notFound(`No data with id: ${ctx.params.id}`);
    if (entity.user.id !== ctx.state.user.id)
      return ctx.unauthorized(`You can't update this entry`);

    entity = await strapi
      .service("api::event.event")
      .custom_update(ctx.params.id, ctx.request.body);

    const sanitizedEntity = await sanitize.contentAPI.output(entity);
    return { succes: true, data: sanitizedEntity };
  },

  delete: async (ctx) => {
    let entity = await strapi
      .service("api::event.event")
      .custom_findOne(ctx.params.id);

    if (!entity) return ctx.notFound(`No data with id: ${ctx.params.id}`);
    if (entity.user.id !== ctx.state.user.id)
      return ctx.unauthorized(`You can't delete this entry`);

    entity = await strapi
      .service("api::event.event")
      .custom_delete(ctx.params.id);

    await sanitize.contentAPI.output(entity);
    return { succes: true, data: {} };
  },

  me: async (ctx) => {
    const user = ctx.state.user;
    if (!user) return ctx.notFound("No authorization header was found");

    const entity = await strapi
      .service("api::event.event")
      .custom_find({ userID: user.id });

    const sanitizedEntity = await sanitize.contentAPI.output(entity);
    return { succes: true, count: entity.length, data: sanitizedEntity };
  },
}));
