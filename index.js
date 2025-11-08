const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

// ✅ Correct middleware usage
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded());
const UserRoute = require('./routes/UserRoute');
const ProductRouter =  require('./routes/ProductRouter');
const CustomerRouter = require('./routes/CustomerRouter');
const OrderRoute = require('./routes/OrderRoute');  

const PORT = process.env.SERVER_PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://nawodyadb:Nikeshi%401234@devopscluster.oc3i8e4.mongodb.net/pos_system_devops?retryWrites=true&w=majority&appName=devopscluster'
// ✅ Fix: Proper promise chaining and route placement
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    // ✅ Move this outside of `.then()` or at least after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// ✅ Move routes outside connection logic
app.get('/test', (req, res) => {
  res.json({ message: 'API is working' });
});

app.use('/api/v1/users', UserRoute);
app.use('/api/v1/products', ProductRouter);
app.use('/api/v1/customers', CustomerRouter);
app.use('/api/v1/orders', OrderRoute);  