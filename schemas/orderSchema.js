import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const OrderModel = sequelize.define(
  "OrderModel",
  {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
  number:{
    type: DataTypes.STRING,
    require:true,
    unique:true
  },
  order:{
    require:true,
    type: DataTypes.STRING
  },
  phone:{
    type: DataTypes.STRING,
    require:true
  }
  ,
  address:{
      type: DataTypes.STRING,
    require:true
    },
  price:{
      type: DataTypes.STRING,
    require:true
    },
  comment:{
      type: DataTypes.STRING
  },
  pago:{
      type: DataTypes.STRING
  },
  name:{
    type:DataTypes.STRING
  },
  jwt:{
    type:DataTypes.TEXT
  }
},{
 timestamps:false
});

export default OrderModel;