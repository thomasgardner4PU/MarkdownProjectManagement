require('./models/db');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHandlebars = require('express-handlebars');
const projectsController = require('./controller/projectController');



let app = express();
let port = 5000

// middleware
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(bodyParser.json()); // it will eb converting all the request data to json format

// configuring the views of application
app.set('views', path.join(__dirname, '/views/'));

//load public
app.use("/public", express.static(path.join(__dirname, "public")));

app.engine('hbs', expressHandlebars.engine({
    extname:'hbs',
    defaultLayout:'mainLayout',
    layoutDir: __dirname + '/views/',
}));

app.set('view engine', 'hbs'); // successfully configured the express handlebars

// configuring the route for the home page
app.get('/register', (req, res) => {
    res.render(path.join(__dirname+'/views/project/register.hbs'));
});



app.listen(port, () => {
    console.log(`Listening to server on port ${port}!`);
});

app.use('/project', projectsController);


// Web socket stuff

const websocket = require("ws")

const wss = new websocket.Server({ port: 4500 });

/*
 'ws' refers to a single connection to the server-side, where as 'wss' refers to the server
* */
wss.on("connection", ws => {
    console.log("new client connected!");

    ws.on("message", data => { // 'data' refers to the actual information which the client side has sent to the server
        console.log(`Client has sent us: ${data}`);

        // ws.send(data.toString());


        if (data === "list_updated") {

            console.log("📃 The list has been updated")

            // Tells each client that the list has been updated
            wss.broadcast("client_the_list_has_been_updated");

        }
        // ws.send("command: refresh")
    });

    ws.on("close", () => {
        console.log("Client has disconnected");
    });

});


// sends a socket message to every connected client
wss.broadcast = function broadcast(msg) {
    console.log(msg);
    wss.clients.forEach(function each(client) {
        client.send(msg);
    });
};