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

    const {name, address, phone, comment, pago} = req.body;
    newOrder.phone = phone;
    newOrder.name = name;
    newOrder.pago = pago;
    newOrder.address = address;
    newOrder.comment = comment;
    await newOrder.save();
    return res.status(200).json({ newOrder });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
