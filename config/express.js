
import express from 'express';
import morgan from 'morgan';
import orderRouter from '../router/order.routes.js';
import productsRouter from '../router/products.routes.js'
import cors from 'cors';

const App = express();

// Middlewares
App.use(express.json());
App.use(morgan('dev'));
App.use(cors());
App.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})


// Routes
App.use('/products', productsRouter);
App.use('/checkout', orderRouter);

export default App;