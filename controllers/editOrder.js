import OrderModel from "../schemas/orderSchema.js";

export default async function editOrder(req, res) {
  const number = req.params.id;
  try {
    const newOrder = await OrderModel.findOne({
      where: {
        number,
      },
    });
    if (!newOrder)
      return res
        .status(404)
        .send({ error: "Pedido inexistente. Intente de nuevo." });

    const { order, address, phone, price, comment } = req.body;
    const arryOrder = order.map((e) => `${e.cartQuantity}-${e.title}`);
    const StrOrder = arryOrder.toString();
    newOrder.order = StrOrder;
    newOrder.address = address;
    newOrder.price = price;
    newOrder.comment = comment;
    await newOrder.save();
    return res.status(200).json({ newOrder });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
