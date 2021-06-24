//se importan las funciones de cantidad del logo del carro y cantidad del precio total
//para que se actializen los numeros con los botones de vaciar carrito y finalizar compra
import {  cantidadProductosCarrito, totalProductosCarrito } from "./app.js"

//se crea una funcion de eventos para poder exportarlos 
//y lograr un codigo mas ordenado
function eventos(){

  //BOTON CERRAR ALERTA de "se agrego correctamente el producto"
  $(".buttonCerrar").click(function() {
    $(".alert-productoAgregado").fadeOut();
  });
  
  //BOTON VACIAR CARRITO
  $("#boton-vaciar").click(function() {
    //hace una pregunta de confirmacion para vaciar el carrito
    var opcion = confirm("¿Seguro queres vaciar el carrito?");
    //si la opcion es "aceptar" remueve el carro y oculta los botone de vaciar/comprar
    //el mensaje y el formulario de finalizar compra
    if (opcion == true) {
      $(".carritoProducto").remove();
      $(".carrito-vacio").fadeIn(1000);
      $(".botones-Comprar-Vaciar").css({"display" :"none"});
      $(".mensajeFinalizarCompra").css({"display" :"none"});
      $(".formularioCompra").css({"display" :"none"});
      cantidadProductosCarrito()
      totalProductosCarrito()
    } 

  });
         
  //BOTON COMPRAR que hace que aparezca el mensaje y la seccion de Finalizar Compra    
  $("#boton-comprar").click(function() {
    $(".mensajeFinalizarCompra").fadeIn(1000);
    $(".formularioCompra").fadeIn(1000);
    cantidadProductosCarrito()
    totalProductosCarrito()  
  });
      
  //BOTON FINALIZAR COMPRA que recorre los imputs para chequear que no esten vacios    
  $("#finalizarCompra").click(function () {
    //si estan vacios aparece el mensaje de completar los datos
    if ($("#nombre").val().trim() === "" ) { 
      $(".errordatos").fadeIn(1000);
    }
    else if ( $("#correo").val().trim() === ""){
      $(".errordatos").fadeIn(1000);
    } 
    else if ( $("#direccion").val().trim() === ""){
      $(".errordatos").fadeIn(1000);
    } 
    //si no estan vacios toma los imputs y los plasma en un alert      
    else{
      var nombre = $("#nombre").val();
      var correo = $("#correo").val();
      var direccion = $("#direccion").val();
      alert("Gracias por tu compra " + nombre + ". Te enviaremos la factura a tu correo: " + correo + ". El pago lo deberas realizar en tu domicilio: " + direccion )
      var nombre = $("#nombre").val("");
      var correo = $("#correo").val("");
      var direccion = $("#direccion").val("");
      //remueve los datos de la compra una vez haya finalizado la misma
      $(".carritoProducto").remove();
      $(".carrito-vacio").fadeIn(1000);
      $(".botones-Comprar-Vaciar").css({"display" :"none"});
      $(".mensajeFinalizarCompra").css({"display" :"none"});
      $(".formularioCompra").css({"display" :"none"});
           
      cantidadProductosCarrito()
      totalProductosCarrito()
    }
  });	
      
    
}

export default eventos;