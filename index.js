// Biến môi trường 
require('dotenv').config()

/* In ra biến môi trường
 console.log(process.env.SERECT_KEYS);
*/

// Require Module
// Install các gói node module package cần thiết
const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const cookieParser = require('cookie-parser')
const { reset } = require('nodemon');
const csrf = require('csurf')
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })

// Kế thừa 
const controller = require('./controller/user.controller');
const userRoute = require('./routes/user.route');
const loginRoute = require('./routes/login.route');
const signUpRoute = require('./routes/signUp.route');
const productRoute = require('./routes/product.route');
const cardRoute = require('./routes/card.route');
const tranferRoute = require('./routes/transfer.route');
const productApi = require('./api/routes/product.route');

const login = require('./controller/auth.login.controller');

// Khai báo biến và phương thức
const app = express();

// Dùng pug làm view thông qua Express
app.set('view engine', 'pug'); 
app.set('views', './views');

// Dùng gói parse data cookie
app.use(cookieParser('serect'));
app.use(morgan('combined'));

// Express sử dụng json và encode
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', productApi);
//app.use(csrf({ cookie: true }));

// Folder public cho phép tất cả mọi người có thể truy cập
app.use(express.static('public'));

// Các routes được truyền từ Controller folder rồi export sang index.js import sử dụng. Rút gọn code
app.use('/signup', signUpRoute, login.signIn, userRoute);
app.use('/users', login.confirmCookie, userRoute);
app.use('/login', loginRoute);
app.use('/product', productRoute);
app.use('/card', cardRoute);
app.use('/transfer', login.confirmCookie, tranferRoute);

// Lắng nghe Servers
app.listen(process.env.PORT, () => {
    console.log("Express đang chạy ở %d và hiển thị Pug", process.env.PORT )
})

// Render giao diện home từ folder Controller
app.get('/', controller.getMainPage);