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
            // return ctx.badRequest(
            //     null,
            //     formatError({
            //         id: 'Auth.form.error.email.provide',
            //         message: 'Please provide your username or your e-mail.',
            //     })
            // );
            console.log("invalid email");
        }

        const user = await strapi.db.query('plugin::users-permissions.user').findOne({
            select: ['email', 'password', 'id'],
            where: {
                email: params.identifier,
            }

        });

        if ( user == null ) {
            console.log(params);
            return console.log("user is null");
        }

        console.log(params);
        // const validPassword = validatePassword(params.current_password, user.password);

        // function validatePassword(password, hash) {
        //     return bcrypt.compareSync(password, hash);
        // }

        const validPassword = bcrypt.compareSync(params.current_password, user.password);

        if (!validPassword) {
            console.log("Password is invalid");
        } else {

            const newPassword = bcrypt.hashSync(params.new_password, bcrypt.genSaltSync(8), null);

            await strapi.db.query('plugin::users-permissions.user').update({
                where: { id: user.id },
                data: {
                    password: newPassword,
                },
            });

            ctx.send({message: "OK"});
        }
    }

}));