import sendMenssage from "../helpers/menssage.js";
import idGen from "../helpers/idgen.js";
import { SignJWT } from "jose";
import RecoPedidos from "../helpers/recomendations.js";
import OrderModel from "../schemas/orderSchema.js";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

export default async function createOrder(req, res) {
  const { order, address, phone, price, comment, pago, name } = req.body;
  try {
    const number = idGen();
    const arryOrder = order.map((e) => `${e.cartQuantity}-${e.title}`);
    await RecoPedidos(arryOrder);
    const StrOrder = arryOrder.toString();

    const jwtConstructor = new SignJWT({ id: number });

    const encoder = new TextEncoder();

    const jwt = await jwtConstructor
      .setProtectedHeader({
        alg: "HS256",
        typ: "JWT",
      })
      .setIssuedAt()
      .setExpirationTime("5m")
      .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    const newOrder = await OrderModel.create({
      order: StrOrder,
      address,
      phone,
      price,
      comment,
      number,
      pago,
      name,
      jwt
    });

    const url = sendMenssage(newOrder);
   

    return res.status(200).json({ jwt, url });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
