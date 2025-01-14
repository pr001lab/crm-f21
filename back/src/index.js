'use strict';

const {
  createProduct,
  setProductStatus,
} = require('../config/utils/product-database.ts');
const {createClient} = require('../config/utils/client-database.ts');
module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    let interval;
    var io = require('socket.io')(strapi.server.httpServer, {
      cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
      },
    });

    // io.use(async (socket, next) => {
    //   console.log('========io.use==========')
    //   //console.log(socket.handshake.query.token)
    //   // console.log(socket.handshake.headers['x-clientid'])
    //   console.log(socket.handshake.auth.token)
    //   console.log('=========io.use=========')
    //   // try {
    //   //   //Socket Authentication
    //   //   let result = await strapi.plugins[
    //   //     'users-permissions'
    //   //     ].services.jwt.verify(socket.handshake.query.token);
    //   //   //Save the User ID to the socket connection
    //   //   socket.user = result.id;
    //     next();
    //   // } catch (error) {
    //   //   console.log(error)
    //   // }
    // }).on('connection', function (socket) {});

    io.on('connection', function (socket) {
      socket.emit(
        'SocketUserConnected',
        JSON.stringify({ message: `Socket: User ${socket.id} connected` }),
      );
      console.log('User connected');

      socket.on(
        'addProduct',
        async ({ name, description, price }, callback) => {
          try {
            const product = await createProduct({
              name,
              description,
              price,
              socket
            });
            if (product) {
              callback(product);
              socket.broadcast.emit('newProductAdded', { product });
            }
          } catch (err) {
            console.log({ err });
            callback({ type: 'error', message: err });
            console.log('Error happened. Please try again');
          }
        },
      );

      socket.on(
        'addClient',
        async ({ name, company, email, jwt }, callback) => {
          const decoded = await strapi.plugins[
            "users-permissions"
            ].services.jwt.verify(jwt);

          const user = await strapi.entityService.findOne(
            "plugin::users-permissions.user",
            decoded.id
          );

          try {
            const client = await createClient({
              name,
              company,
              email,
              user
            });
            if (client) {
              callback(client);
              socket.emit('newClientAdded', { client });
            }
          } catch (err) {
            console.log({ err });
            callback({ type: 'error', message: err });
            console.log('Error happened. Please try again');
          }
        },
      );

      socket.on('setProductStatus', async ({ id, productStatus }, callback) => {
        try {
          const product = await setProductStatus(id, productStatus);
          if (product) {
            callback();
            socket.broadcast.emit('setProductStatus', { product });
          }
        } catch (err) {
          console.log({ err });
          callback({ type: 'error', message: err });
          console.log('Error happened. Please try again');
        }
      });

      socket.on('disconnect', () => {
        console.log('user disconnected');
        clearInterval(interval);
      });
    });

    strapi.io = io;
  },
};
