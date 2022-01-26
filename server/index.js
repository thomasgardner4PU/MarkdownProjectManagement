// const websocket = require('ws');
// const e = require("express");
//
// const wss = new websocket.Server({ port: 8082 });
//
// /*
//  'ws' refers to a single connection to the server-side, where as 'wss' refers to the server
// * */
// wss.on("connection", ws => {
//     console.log("new client connected!");
//
//     ws.on("message", data => { // 'data' refers to the actual information which the client side has sent to the server
//         console.log(`Client has sent us: ${data}`);
//
//         ws.send(data.toString());
//     })
//
//     ws.on("close", () => {
//         console.log("Client has disconnected");
//     });
//
//     // ws.onmessage = (event) => {
//     //     console.log("connected to DB");
//     //     testConnection();
//     // };
//     //
//     // async function testConnection(){
//     //     await sequelize.authenticate().then(() => {
//     //         console.log("connected to DB");
//     //     })
//     //         .catch((err) => {
//     //             console.log(err);
//     //         })
//     // }
// });