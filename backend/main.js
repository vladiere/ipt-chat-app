const socket = require('./utils/socket');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoute = require('./routes/auth.route');
const refreshRoute = require('./routes/refresh.route');

const app = express();
const PORT = process.env.PORT || 4300;
const http = require('http').createServer(app);
const allowedOrigins = ['http://localhost:9000'];

app.use(express.json());
app.use(bodyParser.json());

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed origin'));
    }
  }
}

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'OK' });
});

app.use('/api/', authRoute);
app.use('/api/', refreshRoute);

socket.initializeSocket(http);

http.listen(PORT, () => {
  console.info(`Server is running on PORT: ${PORT}`);
})
