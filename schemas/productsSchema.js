import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

/*
aca me falta definir bien el esquema de pedido con Rod
 */

const ProductsSchema = sequelize.define(
  "ProductsSchema",
  {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
  title:{
    type: DataTypes.STRING,
    require:true,
    unique:true
  },
  category:{
    type: DataTypes.STRING,
    require:true,
  },
  price:{
      type: DataTypes.INTEGER,
    require:true
    },
  imgUrl:{
      type: DataTypes.STRING,
    require:true
    },
    cantPedidos:{
      type: DataTypes.INTEGER,
    require:false
    }
},{
 timestamps:true
});

export default ProductsSchema;