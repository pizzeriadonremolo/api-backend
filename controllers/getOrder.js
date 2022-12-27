import OrderModel from "../schemas/orderSchema.js";
import ProductsSchema from "../schemas/productsSchema.js";

export default async function getOrder(req, res) {
  try {
    const number = req.params.id;
    const order = await OrderModel.findOne({
      where: {
        number,
      },
    });
    if (!order) return res.status(404).send({ error: "No existe ese pedido" });
    order.order = await order.order.split(",");

    const products = [];
    for (let i = 0; i < order.order.length; i++) {
      const data = order.order[i].split("-");
      const product = await ProductsSchema.findOne({
        where: {
          title: data[1],
        },
      });
      product.cartQuantity = data[0];
      products.push(product);
    }

    order.order = products;

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
