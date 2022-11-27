import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import OrderModel from "./orderSchema.js";

const ipModel = sequelize.define(
    "ipModel",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique:true
            },
        ip: {
            type: DataTypes.STRING,
            unique:true
        }
    }
);

ipModel.hasMany(OrderModel, {
    foreinkey: "clientIp",
    sourceKey: "ip",
  });
ipModel.belongsTo(OrderModel, { 
    foreinkey: "clientIp", 
    targetId: "ip" 
  });


export default ipModel;