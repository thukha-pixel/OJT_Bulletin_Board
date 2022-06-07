'use strict';

/**
 *  password controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const bcrypt = require('bcrypt');


module.exports = createCoreController("api::password.password", ({ strapi }) => ({

    index: async ctx => {
        const params = ctx.request.body;
        if (!params.identifier) {
            console.log("email is required");
        }


        const user = await strapi.db.query('plugin::users-permissions.user').findOne({
            select: ['email', 'password', 'id'],
            where: {
                email: params.identifier
            }

        });
        console.log(user);
        const validPassword = validatePassword(params.password, user.password);
        function validatePassword(password, hash) {
            return bcrypt.compareSync(password, hash);
        }


        if (!validPassword) {
            console.log("Password is invalid");
        } else {
            const newPassword = bcrypt.hashSync(params.newPassword, bcrypt.genSaltSync(8), null);
            await strapi.db.query('plugin::users-permissions.user').update({
                where: { id: user.id },
                data: {
                    password: newPassword,
                },
            });
            ctx.send({ message: 'OK' });
        }
    }


}));