const express = require('express');
const xss = require('xss-clean');
const hpp = require('hpp');
const helmet = require('helmet');
const userPlanRoute = require('./routes/planRoutes/userPlanRoutes');
const productRoute = require('./routes/productRoute/productRoutes');
const categoryRoute = require('./routes/categoryRoutes/categoryRoutes');
const galleryRoute = require('./routes/galleryRoute/galleryRoutes');
const notificationRoute = require('./routes/notificationRoute/notificationRoutes');
const wishlistRoute = require('./routes/wishlistRoute/wishlistRoutes');
const faqsRoute = require('./routes/FAQsRoutes/FAQsRoutes');
const userRoute = require('./routes/userRoutes/userRoutes');
const authRoute = require('./routes/authRoutes/authRoutes');
const sellProductRoute = require('./routes/sellProductRoute/sellProductRoutes');
const googleRoute = require('./routes/socialAuthRoutes/googleAuthRoutes');
const facebookRoute = require('./routes/socialAuthRoutes/facebookAuthRoutes');
const postRoute = require('./routes/postRoute/postRoutes');
const passport = require('passport');
const productCountRoute = require('./routes/countRoutes/countRoutes');
const publicGalleryAndProductRoute = require('./routes/publicGalleryAndProductRoute/publicGalleryAndProductRoute');
const planRoutes = require('./routes/planRoutes/planRoutes');
const adminRoutes = require('./routes/adminRoutes/index');
const contactRoute = require('./routes/contactRoute/contactRoutes');
const notificationSettingRoute = require('./routes/notificationSettingRoutes/notificationSettingRoutes');

const AppError = require('./utils/appError');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { sequelize } = require('./models');
const { sendSuccess, sendInternalError } = require('./utils/customResponse');
const path = require('path');
const cookieSession = require('cookie-session');
const fileUpload = require('express-fileupload');
dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true });
require('./passportConfiguration/index')();
require('./passportConfiguration/googleAuth')();
require('./passportConfiguration/facebookAuth')();

app.use(
  cookieSession({
    name: 'session',
    keys: ['key'],
    maxAge: 30 * 24 * 60 * 60 * 100,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(require('cookie-parser')());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());
app.use(helmet());
app.use(morgan('combined'));
app.use(fileUpload({ limits: { fileSize: 1024 * 1024 } }));

app.get('/health', async (req, res) => {
  const failureMessage =
    'Internal server error or couldnt connect with database.';
  try {
    await sequelize.authenticate();
    return sendSuccess(res, 'Server looks healthy!');
  } catch (error) {
    return sendInternalError(res, failureMessage);
  }
});

app.use('/notificationSetting', notificationSettingRoute);
app.use('/facebook', facebookRoute);
app.use('/google', googleRoute);
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/category', categoryRoute);
app.use('/gallery', galleryRoute);
app.use('/post', postRoute);
app.use('/notification', notificationRoute);
app.use('/wishlist', wishlistRoute);
app.use('/faq', faqsRoute);
app.use('/plan', planRoutes);
app.use('/sellProduct', sellProductRoute);
app.use('/dashboard', productCountRoute);
app.use('/homePage', publicGalleryAndProductRoute);
app.use('/userPlan', userPlanRoute);
app.use('/admin', adminRoutes);
app.use('/contact', contactRoute);
app.use('/', (req, res) => {
  const err = new AppError(404, 'fail', 'undefined route');
  console.log('err: ', err);
  res.status(404).send();
});

module.exports = app;
