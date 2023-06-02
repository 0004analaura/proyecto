// Import the functions you need from the SDKs you need
import { initializeApp }  from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import {getAuth, GoogleAuthProvider, signInWithPopup}
from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js'
import{getDatabase, ref, onValue, update, push,child}
from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1F__HMn_t3BdXjw2PtQLP_NIpozkGEbA",
  authDomain: "analaura0907239832.firebaseapp.com",
  projectId: "analaura0907239832",
  storageBucket: "analaura0907239832.appspot.com",
  messagingSenderId: "699820403518",
  appId: "1:699820403518:web:df5feeb57b96262fa29a6f",
  measurementId: "G-SD606P9T82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


//Aca inicia mi programa.
var usuarioConectado = document.getElementById('usuarioConectado');
var botonIniciar = document.getElementById('botonIniciar');
var botonCerrar = document.getElementById('botonCerrar')
var textoMensaje = document.getElementById('textoMensaje');
var mensajesChat = document.getElementById('mensajesChat')
var nombreUsuarioConectado = ""; 

botonIniciar.onclick = async function(){
  //Obtenemos la logica de autenticacion 
var auth = getAuth();
//creamos el proveedor en este caso es Google.
var provider = new GoogleAuthProvider();
auth.language = "es";
var response = await signInWithPopup(auth, provider)
usuarioConectado.innerText = response.user.email;
botonCerrar.style.display = "block";
botonIniciar.style.display ="none";
nombreUsuarioConectado = response.user.email;
escucharYDibujarMensajes();

}
botonCerrar.onclick = async function(){
  var auth = getAuth();
  await auth.signOut();
  botonCerrar.style.display = "none";
  botonIniciar.style.display = "block";
  usuarioConectado.innerText = "No Conectado";
 nombreUsuarioConectado ="";
 
}

textoMensaje.onkeydown = async function(event){
  if(event.key == "Enter"){
   if(nombreUsuarioConectado == ""){
    alert("El usuario debe iniciar sesion");
    return; 
   }
var db = getDatabase(); 
var referenciaMensajes = ref(db, "mensajes");
var nuevaLlave =  push(child(ref(db),"mensajes")).key; 
var nuevosDatos = {
   [nuevaLlave]: {
     usuario: nombreUsuarioConectado,
     mensaje: textoMensaje.value,
     fecha: new Date().toLocaleDateString()
       }
}
textoMensaje.value = ""
update(referenciaMensajes, nuevosDatos)
  }
}

function escucharYDibujarMensajes ( ){
  //Referencia a base datos firebase
  var db = getDatabase();
var referenciaMensajes = ref(db, "mensajes");
onValue(referenciaMensajes,  function(datos){
  var valoresObtenidos = datos.val();
  //console.log(valoresObtenidos)
  mensajesChat.innerHTML = "";
  Object.keys(valoresObtenidos).forEach(llave=>{
    var mensaje = valoresObtenidos[llave];
    mensajesChat.innerHTML += "<div class='nombre-usuario'>" + mensaje.usuario +"</div>"
    mensajesChat.innerHTML += "<div class='mensaje-chat'>" + mensaje.mensaje + "</div>"
    mensajesChat.innerHTML += "<div>" + mensaje.fecha + "</div><hr></hr>"; 
  }) 
}) 
   
}