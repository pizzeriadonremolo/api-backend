const prodEval = (array) => {
    for (let i = 0; i < array.length; i++) {
      for (let j = i+1 ; j < array.length; j++) {
       if(array[i].cantPedidos < array[j].cantPedidos){
         let aux = array[i]; 
         array[i] = array[j];
         array[j] = aux
       } 
      }
    }
    return array;
  };
  
export default prodEval;


