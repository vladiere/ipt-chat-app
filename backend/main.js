const socket = require('./utils/socket');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoute = require('./routes/auth.route');
const refreshRoute = require('./routes/refresh.route');

const app = express();
const PORT = process.env.PORT || 4300;
const http = require('http').createServer(app);

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:9000"
}));

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'OK' });
});

app.use('/api/', authRoute);
app.use('/api/', refreshRoute);

socket.initializeSocket(http);

http.listen(PORT, () => {
  console.info(`Server is running on PORT: ${PORT}`);
})
