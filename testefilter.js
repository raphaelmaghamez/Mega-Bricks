const maior18 = (valor)=>{
    if(valor<18)
    return false;
else return true;
}

const idades = [6,15,16,17,18,20,25,28,36,90];
const maior = idades.filter(maior18)

//console.log(idades)
console.log(maior)