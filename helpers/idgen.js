let numTransfers = '0000000000';
let i = 1;

const idGen = ()=> {
    const num = parseInt(numTransfers) + i;
    i++;
    let nums = numTransfers + num;
    if(nums.length >= 12){
        nums = nums.substring(1);
    }

    return nums
}

export default idGen;