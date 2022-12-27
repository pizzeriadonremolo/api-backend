const prodEval = async (array) => {
  const res = await array.sort((a, b) => a.cantPedidos - b.cantPedidos);
  return res;
};

export default prodEval;
