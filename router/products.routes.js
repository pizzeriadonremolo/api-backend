import { Router } from "express";
import ProductsSchema from "../schemas/productsSchema.js";
//import products from '../products/products.js'
import prodEval from "../helpers/EvaluacionProd.js";
const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  const products = await ProductsSchema.findAll({});
  res.json(products);
});

productsRouter.get("/pizzas", async (req, res) => {
  const pizzas = await ProductsSchema.findAll({
    where: {
      category: "Pizzas",
    },
  });
  res.json(pizzas);
});

productsRouter.get("/postres", async (req, res) => {
  const postres = await ProductsSchema.findAll({
    where: {
      category: "Postres",
    },
  });
  res.json(postres);
});

productsRouter.get("/bebidas", async (req, res) => {
  const bebidas = await ProductsSchema.findAll({
    where: {
      category: "Bebidas",
    },
  });
  res.json(bebidas);
});

productsRouter.get("/empanadas", async (req, res) => {
  const empanadas = await ProductsSchema.findAll({
    where: {
      category: "Empanadas",
    },
  });
  res.json(empanadas);
});

productsRouter.get("/recomendados", async (req, res) => {
  const productos = await ProductsSchema.findAll({});
  const recomendados = await prodEval(productos);
  res.json(recomendados);
});

export default productsRouter;
