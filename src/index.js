import connectDB from './connectDB.js';
import app from './app.js';

connectDB();

process.loadEnvFile();
const PORT = process.env.PORT || 5000;

app.get('/', function (req, res) {
  res.send('Hello India World!');
});
app.listen(PORT, function () {
  console.log('Example app listening on port 3000!');
});
