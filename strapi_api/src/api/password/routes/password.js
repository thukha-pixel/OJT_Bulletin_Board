'use strict';

/**
 * password router.
 */

// const { createCoreRouter } = require('@strapi/strapi').factories;

// module.exports = createCoreRouter('api::password.password');

module.exports = {
    routes: [
        {
            method: "PATCH",
            path: "/password",
            handler: "password.index",
        },
    ],
};
