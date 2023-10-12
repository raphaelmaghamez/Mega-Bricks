import { StartTimer } from './timer.js';

const palco = document.getElementById("palco");
const num_objetos = document.getElementById("num_objetos");
const txt_qtde = document.getElementById("txt_qtde");
const btn_add = document.getElementById("btn_add");
const btn_remover = document.getElementById("btn_remover");

let larguraPalco = palco.offsetWidth;
let alturaPalco = palco.offsetHeight;
let bolas = [];
let numBola = 0;
let tamanho_flip = 170;
let px_flip = 0;
let seconds = 225;
let score=0;
let bricks = [];

//let px_brick = 200;
//let py_brick = 300;
const widht_brick = 30;
const height_brick = 15;


window.onload = function () {
    let duration = seconds;
    let display = document.querySelector('#timer');
    StartTimer(duration, display);//timer.js
}


//console.log('larguraPalco:' + larguraPalco);
//console.log('alturaPalco:' + alturaPalco);
//console.log();


class Brick {
    constructor(px, py) {
        this.px_brick = px;
        this.py_brick = py;
        this.id = Date.now() + "_" + Math.floor(Math.random() * 100000000000000000);
        const div = document.createElement('div');
        div.setAttribute('id', this.id);
        div.setAttribute('class', 'bricks');
        div.setAttribute('style', `left: ${this.px_brick}px; top: ${this.py_brick}px; width: ${widht_brick}px; height: ${height_brick}px;`);
        palco.appendChild(div);
        this.eu = document.getElementById(this.id) //DOM

    }

    remover_brick = () => {
        //clearInterval(this.controle)
        bricks = bricks.filter((b) => {
            if (b.id != this.id)
                return true;
        })
        this.eu.remove();
        //numBola--;
        //num_objetos.value = numBola;
    };

};




class Flipper {
    constructor() {
        this.id = Date.now() + "_" + Math.floor(Math.random() * 100000000000000000);
        const div = document.createElement('div');
        div.setAttribute('id', this.id);
        div.setAttribute('class', 'flipper');
        div.setAttribute('style', `left: 0px; top: ${alturaPalco - 10}px; width: ${tamanho_flip}px; height: 8px; background-color: #bd9d58`);
        palco.appendChild(div);
        this.eu = document.getElementById(this.id) //DOM
        console.log(this.eu);
        console.log(this);

    }

    desenharFlipper() {

    };
}



class bola {

    constructor(arrayBolas, palco) {
        //console.log('larguraPalco:'+ larguraPalco);
        //console.log('alturaPalco:'+ alturaPalco);
        this.tam = 15;
        //console.log('tam:'+ this.tam);
        this.r = Math.floor(Math.random() * 255);
        //console.log('r:' + this.r);
        this.g = Math.floor(Math.random() * 255);
        //console.log('g:'+this.g);
        this.b = Math.floor(Math.random() * 255);
        //console.log('b:'+ this.b);
        this.px = Math.floor(Math.random() * (larguraPalco - this.tam));
        //console.log('px:'+ this.px);
        this.py = Math.floor(Math.random() * (alturaPalco - this.tam));
        //console.log('py:'+ this.py);
        this.velx = 1;
        //console.log('vx:'+ this.velx);
        this.vely = 1;
        //console.log('vy:'+ this.vely);
        this.dirx = (Math.random * 10) > 5 ? 1 : -1;
        //console.log('dirx:'+ this.dirx);
        this.diry = (Math.random * 10) > 5 ? 1 : -1;
        //console.log('diry:'+ this.diry);
        this.palco = palco;
        //console.log('palco:' + this.palco);
        this.arrayBolas = arrayBolas;
        //console.log(this.arrayBolas);
        this.id = Date.now() + "_" + Math.floor(Math.random() * 100000000000000000);
        //console.log();
        this.desenhar();
        this.controle = setInterval(this.controlar, 2);
        this.eu = document.getElementById(this.id) //DOM
        this.flipper = false;
        console.log(this.eu);
        numBola++;
        //console.log('numbolas:'+ numBola);
        num_objetos.value = numBola;
    }

    minhaPos = () => {
        return this.bolas.indexOf(this);
    };

    remover = () => {
        clearInterval(this.controle)
        bolas = bolas.filter((b) => {
            if (b.id != this.id)
                return true;
        })
        this.eu.remove();
        numBola--;
        num_objetos.value = numBola;
    };

    desenhar = () => {
        const div = document.createElement('div');
        div.setAttribute('id', this.id);
        div.setAttribute('class', 'bola');
        div.setAttribute('style', `left: ${this.px}px; top:${this.py}px; width:${this.tam}px; height:${this.tam}px; background-color: rgb(${this.r},${this.g},${this.b})`);
        palco.appendChild(div);
    };

    controle_bordas = () => {


        for (const brick of bricks) {
            

            if (this.px - brick.px_brick <= widht_brick && this.px - brick.px_brick >= -this.tam && this.py - brick.py_brick == -height_brick) {
                this.diry = -1; //toque por cima no brick
                console.log('tocou em cima');
                brick.remover_brick();
                console.log(brick.px_brick);
                console.log(brick.py_brick);
                score=score + 15;
                document.getElementById('total_score').innerHTML=score;
            }

            if (this.px - brick.px_brick <= widht_brick && this.px - brick.px_brick >= -this.tam && this.py - brick.py_brick == height_brick) {
                this.diry = 1; //toque por baixo no brick
                console.log('tocou em baixo');0
                brick.remover_brick();
                console.log(this.px);
                console.log(this.py);
                console.log(brick.px_brick);
                console.log(brick.py_brick);
                score=score + 15;
                document.getElementById('total_score').innerHTML=score;

            }

      
            if (this.px - brick.px_brick == widht_brick && this.py - brick.py_brick < height_brick && this.py - brick.py_brick > -height_brick)  //toque na lateral direita brick
            {
                //this.diry = 1;
                this.dirx = 1;
                console.log('tocou na direita');               
                brick.remover_brick();
                score=score + 15;
                document.getElementById('total_score').innerHTML=score;


            }
            if (this.px + this.tam == brick.px_brick && this.py - brick.py_brick < height_brick && this.py - brick.py_brick > -height_brick)  //toque na lateral esquerda brick
            {
                //this.diry = 1;
                this.dirx = -1;
                console.log('tocou na esquerda');
                brick.remover_brick();
                score=score + 15;
                document.getElementById('total_score').innerHTML=score;


            }

        }


        if (this.px + this.tam >= larguraPalco) {
            this.dirx = -1;
            //bola vai pra esquerda ao tocar no limite direito
        }
        else if (this.px < 0) {
            this.dirx = 1;
            //bola vai pra direita ao tocar no limite esquerdo
        }
        if (this.py + this.tam >= alturaPalco - 9 && this.px - px_flip < tamanho_flip && this.px - px_flip > 0) {
            this.diry = -1;
            //ir para cima
            if (this.px - px_flip < tamanho_flip * 0.25) {
                //console.log('_____________');
                console.log('px:' + this.px);
                console.log('px_flip:' + px_flip);
                console.log('px-px_flip:' + (this.px - px_flip));
                console.log('tamanho_flip : ' + tamanho_flip * 0, 25);
                console.log('Bola pra esquerda 2');
                this.dirx = -1;
                //this.velx = 1;
                //clearInterval(this.controle);
                //this.controle = setInterval(this.controlar, 1);
                this.flipper = true;
                //bola vai para esquerda ao tocar no lado esquerdo da palheta
            }
            else if (this.px - px_flip < tamanho_flip * 0.5) {
                //console.log('_____________');
                console.log('px:' + this.px);
                //console.log('px_flip:' + px_flip);
                //console.log('px-px_flip:' + (this.px - px_flip));
                //console.log('tamanho_flip metade: ' + tamanho_flip/2);
                console.log('Bola pra esquerda 1');
                this.dirx = -1;
                //this.diry = -1;
                //bbbb
                //clearInterval(this.controle);
                //this.controle = setInterval(this.controlar, 2);
                this.flipper = true;
                //bola vai para direita ao tocar no lado esquerdo da palheta
            }

            else if (this.px - px_flip < tamanho_flip * 0.75) {
                //console.log('_____________');
                console.log('px:' + this.px);
                //console.log('px_flip:' + px_flip);
                //console.log('px-px_flip:' + (this.px - px_flip));
                //console.log('tamanho_flip metade: ' + tamanho_flip/2);
                console.log('Bola pra direita 1');
                this.dirx = 1;
                //this.diry = -1;
                //clearInterval(this.controle);
                //this.controle = setInterval(this.controlar, 2);
                this.flipper = true;
                //bola vai para direita ao tocar no lado direito da palheta
            }

            else if (this.px - px_flip < tamanho_flip * 1) {
                //console.log('_____________');
                console.log('px:' + this.px);
                //console.log('px_flip:' + px_flip);
                //console.log('px-px_flip:' + (this.px - px_flip));
                //console.log('tamanho_flip metade: ' + tamanho_flip/2);
                console.log('Bola pra direita 2');
                this.dirx = 1;
                //this.velx = 1;
                //this.diry = -0.5;
                //clearInterval(this.controle);
                //this.controle = setInterval(this.controlar, 1);
                this.flipper = true;
                //bola vai para direita ao tocar no lado direito da palheta
            }


        }
        else if (this.py < 0) {
            this.diry = 1;
            //bola vai pra baixo ao tocar no limite superior

        }



    }
    controlar = () => {
        this.controle_bordas();
        this.px += this.dirx * this.velx;
        //console.log(this.px);
        this.py += this.diry * this.vely;
        //console.log(this.py);

        if (this.flipper) {
            //console.log(this.dirx);
            //this.dirx=this.dirx/Math.abs(this.dirx);
            //this.flipper=false;
        }

        this.eu.setAttribute('style', `left: ${this.px}px; top:${this.py}px; width:${this.tam}px; height:${this.tam}px; background-color: rgb(${this.r},${this.g},${this.b})`);

        if ((this.px > larguraPalco) || (this.py > alturaPalco)) {
            this.remover();
        }

    };



};

const flip = new Flipper();
let n_bricks = 500;
let bricks_px = [];
let bricks_py = [];
let bricks_py_inicial = 300;


//criar array de tijolos
for (let length_nlinhas = 0, j = 0; bricks_px.length < n_bricks && bricks_py_inicial>= height_brick; length_nlinhas++, bricks_py_inicial = bricks_py_inicial - height_brick) {

    let smaller = Math.random(), bigger = Math.random();
    if (smaller>bigger){
        let aux;
        aux=bigger;
        bigger=smaller;
        smaller=aux;
    }
    console.log('opa');
    if (length_nlinhas == n_bricks) break;
    //console.log('Length: ' + length_nlinhas);
    //console.log('bricks_px.length  ' + bricks_px.length );
    //console.log('bricks_py_inicial: ' + bricks_py_inicial);


    for (let i = Math.floor(larguraPalco * smaller); i < Math.floor(larguraPalco * bigger) && bricks_px.length < n_bricks; i += widht_brick, j++) {
        //if (bricks_px.length == n_bricks) break;
        //console.log(i);
        //console.log(j);
        //console.log(bricks_py_inicial);
        //console.log(larguraPalco*0.7);
        //console.log(larguraPalco*0.3);
        //console.log(larguraPalco);
        bricks_px[j] = i;
        bricks_py[j] = bricks_py_inicial;

    }
    
}

//console.log(bricks_px);   
//console.log(bricks_py);  

for (let i = 0; i < n_bricks; i++) {
    //console.log('bricks_px: ' + bricks_px[i]);
    //console.log('bricks_py: ' + bricks_py[i]);
    if(bricks_px[i]!=undefined&&bricks_py[i]!=undefined)
    bricks.push(new Brick(bricks_px[i], bricks_py[i]));
}

console.log(bricks);
console.log(bricks_px.length);
console.log('FIIIM');

//flip.desenharFlipper();


window.addEventListener("resize", (evt) => {
    larguraPalco = palco.offsetWidth;
    alturaPalco = palco.offsetHeight;
    flip.desenharFlipper();
    //console.log(Date.now());
});


btn_add.addEventListener("click", (evt) => {
    const qtde = txt_qtde.value;
    //console.log(qtde);
    for (let i = 0; i < qtde; i++) {
        //console.log(i);
        bolas.push(new bola(bolas, palco));
    }
});


btn_remover.addEventListener("click", (evt) => {

    //console.log('almoço');
    bolas.map((b) => {
        b.remover();
    }
        //remover bolas 
    )

});


let teclaDireitaPressionada = false;
let teclaEsquerdaPressionada = false;




//let intervalo;
//let teclaPressionada = false;

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight' && !teclaDireitaPressionada) {
        teclaDireitaPressionada = true;
        teclaEsquerdaPressionada = false;
        // Lidar com o primeiro pressionamento da seta direita
        //console.log('Seta direita pressionada');
        // Iniciar um loop usando requestAnimationFrame
        function loop() {
            //console.log('Seta direita está sendo mantida pressionada');
            // Adicione aqui o código para ação contínua
            if (px_flip <= larguraPalco - tamanho_flip) {
                px_flip = px_flip + 12;
                //console.log(px_flip);
                // console.log(flip);          
                flip.eu.setAttribute('style', `left: ${px_flip}px; top: ${alturaPalco - 10}px; width: ${tamanho_flip}px; height: 8px; background-color: #bd9d58`);
            }

            if (teclaDireitaPressionada) {
                requestAnimationFrame(loop);
            }
        }
        loop();
    }
    if (event.key === 'ArrowLeft' && !teclaEsquerdaPressionada) {
        teclaEsquerdaPressionada = true;
        teclaDireitaPressionada = false;
        // Lidar com o primeiro pressionamento da seta direita
        //console.log('Seta direita pressionada');
        // Iniciar um loop usando requestAnimationFrame
        function loop() {
            //console.log('Seta direita está sendo mantida pressionada');
            // Adicione aqui o código para ação contínua
            if (px_flip >= 0) {
                px_flip = px_flip - 12;
                //console.log(px_flip);
                //console.log(flip);         
                flip.eu.setAttribute('style', `left: ${px_flip}px; top: ${alturaPalco - 10}px; width: ${tamanho_flip}px; height: 8px; background-color: #bd9d58`);
            }
            if (teclaEsquerdaPressionada) {
                requestAnimationFrame(loop);
            }
        }
        loop();
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key === 'ArrowRight') {
        teclaDireitaPressionada = false;
        // Lidar com a liberação da seta direita
        //console.log('Seta direita liberada');
    }
    if (event.key === 'ArrowLeft') {
        teclaEsquerdaPressionada = false;
        // Lidar com a liberação da seta direita
        //console.log('Seta direita liberada');
    }
});

