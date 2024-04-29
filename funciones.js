let segundos;
let intervalo;
let clave;
let pausa;

console.log(convierteBinario(128));
fondo=document.getElementById('principal');
let userNum=document.getElementById('numIng');
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
function enJuego(){
    document.getElementById('activar30').style.display='none';
    document.getElementById('activar15').style.display='none';
    document.getElementById('activar10').style.display='none';
    document.getElementById('parar').style.display='inline';
    var botonesBomba = document.querySelectorAll(".bNum");
     
// Desactivar cada botón
botonesBomba.forEach(function(boton) {
    boton.disabled = false;
});
    
}





function inicializo_contador(num){
    segundos=num;
    pausa=false;
    userNum.innerHTML="";
    
    fondo.style.backgroundImage="url('./img/angar.jpg')";
    clave= getRandomNumber(1, 101);
    console.log(clave);
    enJuego();
    document.getElementById('bin').innerHTML=convierteBinario(clave);
    cuentaRegresiva();
}
function presionoNum(num){
    
    let numIng;
    
    if(num!=-1){

    
    
numIng=  userNum.innerHTML+num;
userNum.innerHTML=numIng;

    }
}
function borrarNum(){
    userNum.innerHTML="";
}
function convierteBinario(num){
let exponente=[128,64,32,16,8,2,1];
let binario=[0,0,0,0,0,0,0,0];
let suma=0;
for(i=0;i<8;i++){
    if((suma+exponente[i])<=num){
        suma=exponente[i]+suma;
        binario[i]=1;
    }
}



    return binario;
}

function verificar_clave(){



if(clave==parseInt(userNum.innerHTML)){
    clearInterval();
    pausa=true;
}

else 
{ userNum.innerHTML="";
    let audio3=document.getElementById("error");
    audio3.play();
   
}

}

function showWIN() {
    
        Swal.fire({
            title: "FELCIDIDADES!",
            text: "DESACTIVASTE LA BOMBA",
            imageUrl: "./img/homer-simpson.gif",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image"
        });
        detenerCuentaRegresiva();
}
function showLoose() {
    
    Swal.fire({
        title: "Tiempo terminado",
        text: "La clave era "+clave,
        imageUrl: "./img/exploto.gif",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image"
    });

}




function detenerCuentaRegresiva() {
    clearInterval(intervalo); 
    document.getElementById('activar30').style.display='inline';
    document.getElementById('activar15').style.display='inline';
    document.getElementById('activar10').style.display='inline';
    document.getElementById('parar').style.display='none';
    document.getElementById('bin').innerHTML="";
    var botonesBomba = document.querySelectorAll(".bNum");
     
// Desactivar cada botón
botonesBomba.forEach(function(boton) {
    boton.disabled = true;
});
    pausa=true;
    
}


function cuentaRegresiva() {
    let pantalla = document.getElementById("pantalla");
    pantalla.style.color = "green";
    
    // Actualizar el contador cada segundo
    intervalo = setInterval(function() {
        var audio1 = document.getElementById("beep");
        audio1.play();
        segundos--;

        // Mostrar el tiempo restante
        if (segundos < 10)
            pantalla.innerHTML = "0" + segundos;
        else
            pantalla.innerHTML = segundos;

        if (segundos < 5) {
            pantalla.style.color = "red";
        }

        if (segundos <= 0 || pausa==true) {
           
            
            if(pausa==true)
            {
                showWIN();
                let audio2=document.getElementById('win');
                audio2.play();
                pausa=false;
               

            }
            if(segundos<=0){
                pantalla.innerHTML="BOOM"
                fondo.style.backgroundImage = "url('./img/explosion.jpg')";
                var audio = document.getElementById("explosion");
                userNum.innerHTML='PERDISTE!!';
                detenerCuentaRegresiva();
                
                audio.play();
                showLoose();
                
            }
             clearInterval(intervalo);
             pausa=false;
            
        }
    }, 1000); // 1000 milisegundos = 1 segundo
} // 1000 milisegundos = 1 segundo
