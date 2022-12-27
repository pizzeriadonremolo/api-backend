import { Router } from "express";
import OrderModel from "../schemas/orderSchema.js";
import dotenv from "dotenv";
import userJWTDTO from "../helpers/JWT.js";
import createOrder from "../controllers/createOrder.js";
import editOrder from "../controllers/editOrder.js";
import getOrder from "../controllers/getOrder.js";

dotenv.config({ path: "../.env" });

const orderRouter = Router();
orderRouter.post("/", createOrder);

orderRouter.put("/order/:id", editOrder);

orderRouter.get("/order/:id", getOrder);

orderRouter.delete("/order:id", userJWTDTO, async (req, res) => {
  const number = req.params.id;

  if (!number) return res.status(404).res({ error: "Pedido no encontrado." });
  await OrderModel.destroy({
    where: {
      number,
    },
  });

  return res.status(200).send({ error: "Pedido cancelado" });
});

export default orderRouter;
