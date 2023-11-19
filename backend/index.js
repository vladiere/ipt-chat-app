const express = require('express');
const bodyParser = require('body-parser');
const socketIOService = require('./services/websocket.service');
const cors = require('cors');

const userRoute = require('./routers/user.route');
const refreshROuter = require('./routers/refresh.route')

const app = express();
const PORT = 8080;
const http = require('http').createServer(app);

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, DELETE, POST, PUT');
        return res.status(200).json({});
    }

    next();
})


app.use('/api/', userRoute);
app.use('/api/', refreshROuter);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    return res.status(404).json({
        message: error.message
    })
})

socketIOService.initializeWebSocket(http);

http.listen(PORT, () => {
    console.info(`Server listening on PORT: ${PORT}`);
});
