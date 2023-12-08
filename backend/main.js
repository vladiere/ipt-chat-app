const socket = require('./utils/socket');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const authRoute = require('./routes/auth.route');
const refreshRoute = require('./routes/refresh.route');
const userRoute = require('./routes/user.route');

const app = express();
const PORT = process.env.PORT || 4300;
const http = require('http').createServer(app);
const allowedOrigins = ['http://localhost:9000'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed origin'));
    }
  }
}

app.use(express.static(path.join(__dirname, 'publiv')));
app.use(express.json());
app.use(bodyParser.json());


app.use(cors(corsOptions));

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'OK' });
});

app.use('/api/', authRoute);
app.use('/api/', refreshRoute);
app.use('/api/', userRoute);

socket.initializeSocket(http);

http.listen(PORT, () => {
  console.info(`Server is running on PORT: ${PORT}`);
})
