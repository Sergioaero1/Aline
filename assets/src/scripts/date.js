function hrsAtual() {  // função criada aqui no js. chatgtp q me ensinou.
    const horasReal = document.getElementById('horas');
    const data = new Date();
    const hora = data.getHours();
    const minutos = data.getMinutes();
    const segundos = data.getSeconds();
    horasReal.innerHTML = `<strong>HORAS:</strong> ${hora}:${minutos}:${segundos}`
}
//hrsAtual();    // aqui, fora do bloco da função, chamar a função criada aqui. ensino do chatgtp

setInterval(hrsAtual, 1000);  // aqui,fora do bloco da função, é para atualizar os segundos da hora. ensino do chatgpt ()

