import { Router } from "express";
import OrderModel from '../schemas/orderSchema.js';
import sendMenssage from '../helpers/menssage.js'
import idGen from "../helpers/idgen.js";
import { SignJWT } from 'jose';
import dotenv from 'dotenv';
import userJWTDTO from "../helpers/JWT.js";
import RecoPedidos from "../controllers/recomendations.js";
import ipModel from "../schemas/ipuserSchema.js";
import ProductsSchema from "../schemas/productsSchema.js";


dotenv.config({path:'../.env'});

const orderRouter = Router();
orderRouter.post("/", async(req, res) => {
  const {
    order,
    address,
    phone,
    price,
    comment,
    clientIp,
    pago
  } = req.body;


  // const Clients = await ipModel.findOne({
  //   where:{
  //     ip:clientIp
  //   }
  // })

  // if(!Clients){
  // await ipModel.create({
  //     ip: clientIp,
  //   })
  // }
  
   const number = idGen();
   const arryOrder = order.map(e => `${e.cartQuantity}-${e.title}`);
   await RecoPedidos(arryOrder);
   const StrOrder = arryOrder.toString()


  const newOrder =  await OrderModel.create({ 
     order:StrOrder,
     address,
     phone,
     price,
     comment,
     number,
     clientIp,
     pago
     });

    

 
  const url = sendMenssage(newOrder);

  const jwtConstructor = new SignJWT({ id: newOrder.number });
  
  const encoder = new TextEncoder();

  const jwt = await jwtConstructor
      .setProtectedHeader({
          alg: 'HS256',
          typ: 'JWT',
      })
      .setIssuedAt()
      .setExpirationTime('15m')
      .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

  return res.status(200).send({ jwt, url });
});


orderRouter.put('/order:id', async (req, res) => {
  const number = req.params.id;
  const newOrder = OrderModel.findOne({
    where:{
      number
    }
 });

 if(!newOrder) return res.status(404).send({error:'Pedido inexistente. Intente de nuevo.'});

 const {
    order,
    address,
    phone,
    price,
    comment
      } = req.body;

    newOrder.order = order
    newOrder.address = address
    newOrder.phone = phone
    newOrder.price = price  
    newOrder.comment = comment
    newOrder.save(); 
  return res.status(200).send({error:'Pedido editado exitosamente'});
});



orderRouter.get('/order/:id', async (req, res) => {
  const number = req.params.id;
  const order = await OrderModel.findOne({
    where:{
      number
    }
   });
  if (!order) return res.status(401).send({error:'No existe ese pedido'});
   
   order.order = order.order.split(',');


  return res.status(200).json(order);
});





orderRouter.delete('/order:id', userJWTDTO, async (req, res) => {
  const number = req.params.id.substring(1);

  if(!number) return res.status(404).res({error:'Pedido no encontrado.'}); 
  await OrderModel.destroy({
    where: {
     number
    },
  });

return res.status(200).send({error:'Pedido cancelado'});
});

orderRouter.get('/historyOrder/:id', async (req, res) => {
  const {id} = req.params;
  const clientHistory = await ipModel.findOne({
    where:{
      id
    }

  })
  return res.json(clientHistory);
} )

export default orderRouter;