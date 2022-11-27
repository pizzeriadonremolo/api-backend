import ProductsSchema from "../schemas/productsSchema.js";


const RecoPedidos = async (pedidos)=>{

    pedidos.forEach(async element => {
    const pedidoData = element.split('-');
    
        const cantidad = pedidoData[0];
        const title = pedidoData[1];
        const product = await ProductsSchema.findOne({
            where: {
                title
            }
     
        })
    product.cantPedidos= product.cantPedidos + parseInt(cantidad); 
    await product.save();
    console.log(product.cantPedidos)
    

})};

export default RecoPedidos;