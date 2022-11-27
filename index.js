import sequelize from "./config/db.js";
import dotenv from "dotenv";
import httpServer from "./config/http.js";
import products from './products/products.js'
import ProductsSchema from "./schemas/productsSchema.js";


dotenv.config({ path: "./.env" });

async function bootstrap() {
  await sequelize.sync({ force: true });
  httpServer.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    createProducts();
  });
console.clear();
}

bootstrap();

const createProducts = async () =>{
  products.map(async product =>{
    const producto = await ProductsSchema.create({
      imgUrl: product.imgUrl,
      title: product.title,
      price: product.price,
      category: product.category,
      cantPedidos: 0
    })
  })
  
}