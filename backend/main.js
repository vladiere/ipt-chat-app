const os = require('os');
const socket = require('./utils/socket');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const authRoute = require('./routes/auth.route');
const refreshRoute = require('./routes/refresh.route');
const userRoute = require('./routes/user.route');

const networkInterfaces = os.networkInterfaces();
const app = express();
const PORT = process.env.PORT || 4545;
const http = require('http').createServer(app);
const allowedOrigins = ['http://localhost:9000', 'http://192.168.48.193:90'];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed origin'));
//     }
//   }
// }

const ipAddress = Object.keys(networkInterfaces)
  .map((interfaceName) =>
    networkInterfaces[interfaceName].find(
      (address) => !address.internal && address.family === 'IPv4'
    )
  )
  .filter(Boolean)[0].address;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.json());


app.use(cors({ origin: "*" }));

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'OK' });
});

app.use('/api/', authRoute);
app.use('/api/', refreshRoute);
app.use('/api/', userRoute);

socket.initializeSocket(http);

const server = http.listen(PORT, () => {
  const serverInfo = server.address();
  console.info(`Backend URL------------> http://localhost:${PORT}/\n\t\t\t http://${ipAddress}:${serverInfo.port}`);
})
