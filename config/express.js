
import express from 'express';
import morgan from 'morgan';
import orderRouter from '../router/order.routes.js';
import productsRouter from '../router/products.routes.js'
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const App = express();

// Middlewares
App.use(express.json());
App.use(morgan('dev'));
App.use(cors());
App.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
App.use(bodyParser.json({ limit: '50mb' }));
App.use(cookieParser());
App.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', '*');
  res.header("Access-Control-Allow-Origin", "*");;
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Routes
App.use('/products', productsRouter);
App.use('/checkout', orderRouter);

export default App;