const path = require('path');
const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');



const PORT = process.env.PORT || 5000
const corsOptions = {
    origin: "https://prove-341.herokuapp.com/",
    optionsSuccessStatus: 200
};
const MONGODB_URL = process.env.MONGODB_URL;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    family: 4
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('61f585951f8ce038f8492349')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    // 'mongodb+srv://byuiUser:m7CwE7DyUqGQCFbo@cluster0.9q9ak.mongodb.net/Prove?retryWrites=true&w=majority'
    MONGODB_URL, options
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'test',
          email: 'test@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
