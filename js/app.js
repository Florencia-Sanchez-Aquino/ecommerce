//se importan los eventos que estan dentro de una funcion llamada "eventos"
import eventos from "./eventos.js"

//Se improrta el array de productos
import arrayProductos from "./productos.js"


//FUNCIONES
// funcion para crear los elementos en el DOM a partir del array de productos 
function renderizarProductos() {
    for (const info of arrayProductos) {
        //Se hace un append para plasmar en pantalla cada producto que sacamos del array
        //Por cada producto se agrega un botón de "agregar al carrito" 
        $("#app").append(`<div class="cart col-sm-4">
                            <div class="cart-body">
                                <h5 class="cart-titulo">  ${info.nombre}</h5>
                                <img class="img-fluid" src="${info.imagen}">
                                <b class="cart-precio"> $  ${info.precio}</b>
                                <button class="btn btn-primary boton-agregarProductos" id="boton-agregarProductos${info.id}">Agregar al carrito</button>
                                <div class="borde-producto"><hr></div>
                            </div>
                        </div>`);
        //Se le pasa una funcion a cada boton de "agregar al carrito"
        $(`#boton-agregarProductos${info.id}`).click(agregarProductosCarrito)
    }
}

//Funcion para que a boton de agregar productos se le asignan los datos especificos de ese producto agregado
function agregarProductosCarrito(even) {
    const button = even.target;
    const item = button.closest('.cart'); 
    const itemProducto = item.querySelector('.cart-titulo').textContent;
    const itemPrecio = item.querySelector('.cart-precio').textContent;
    const itemImagen = item.querySelector('.img-fluid').src;
    

    itemsCart(itemProducto,itemPrecio,itemImagen)
}



//Funcion para agregar productos al carrito a partir de los datos de cada boton de "agregar al carrito"
function itemsCart(itemProducto,itemPrecio,itemImagen){
  
  //Si esta funcion se ejecuta, aparecen los botones "Comprar" y "Vaciar carrito"
  $(".botones-Comprar-Vaciar").show();
   
  
  //For para buscar si el elemento agregado ya esta en el carrito o no
  //y si no esta sumarle la cantidad en vez de generar mas items en el carrito
  const elementstitulo = $("#carrito .carritoProductoTitulo");
  for (let i = 0; i < elementstitulo.length; i++) {
    if (elementstitulo[i].textContent === itemProducto) { 
      let elementQuantity = elementstitulo[i].parentElement.parentElement.parentElement.querySelector('.carritoProductoCantidad');
      elementQuantity.value++;

     //alerta "se agrego correctamente el producto" 
      $('.alert-productoAgregado').fadeIn();     
        setTimeout(function() {
           $(".alert-productoAgregado").fadeOut();
      },2000);

      cantidadProductosCarrito()
      totalProductosCarrito();
      return; 
     }
  } 

  //Si esta funcion se ejecuta, el mensaje de carrito vacio se oculta
  $(".carrito-vacio").css({"display" :"none"});

 
  //alerta "se agrego correctamente el producto" 
  $('.alert-productoAgregado').fadeIn();     
  setTimeout(function() {
       $(".alert-productoAgregado").fadeOut();           
  },2000);

  //se agregan los productos al carrito y se apilan en forma de lista
  $('#carrito').append(`
    <div class="row carritoProducto">
      <div class="col-6">
        <div class="d-flex align-items-center h-100 border-bottom pb-2 pt-3">
          <img src=${itemImagen} class="carritoProductoImagen">
          <h6 class=" carritoProductoTitulo text-truncate ml-3 mb-0">${itemProducto}</h6>
        </div>
      </div>
      <div class="col-3">
        <div class="d-flex align-items-center h-100 border-bottom pb-2 pt-3">
          <p class="item-price mb-0 carritoProductoPrecio">${itemPrecio}</p>
        </div>
      </div>
      <div class="col-3">
        <div class=" d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
          <input class="carritoProductoCantidad" type="number" value="1">
          <button class="btn btn-danger buttonDelete" type="button">X</button>
        </div>
      </div>
    </div>`)

 
  //se le agrega el evento al boton X que elimina productos del carrito
  $(".buttonDelete").click((e)=>{
    const buttonClicked = e.target;
    buttonClicked.closest('.carritoProducto').remove();
    
    //aca se pregunta si el carrito esta vacio para ocultar los botones de Comprar/Vaciar carrito
    //y mostrar el mensaje de "No hay productos en el carrito"
    if($(".carritoProducto").length == 0){
      $(".carrito-vacio").fadeIn(1000);
      $(".botones-Comprar-Vaciar").css({"display" :"none"});
      $(".mensajeFinalizarCompra").css({"display" :"none"});
      $(".formularioCompra").css({"display" :"none"});
    }

   //aca actualiza los precios del total y el numero del icono del carro
   //dependiendo de los productos borrados del carrito
    cantidadProductosCarrito()
    totalProductosCarrito();
  })

  //
  $(".carritoProductoCantidad").click((e)=>{
   //aca actualiza los precios del total y la cantidad de elementos del icono del carro
   //dependiendo de los productos agregados al carrito
    cantidadProductosCarrito()
    totalProductosCarrito();
    })

  //aca actualiza los precios del total y la cantidad de elementos del icono del carro
  //dependiendo de los productos agregados/borrados del carrito
  cantidadProductosCarrito()
  totalProductosCarrito();
}


//funcion para definir el costo total del carrito
function totalProductosCarrito(){
    let total = 0;
    const cartTotal = document.querySelector('#carrito-total');  
    const cartItems = document.querySelectorAll('.carritoProducto');

    cartTotal.innerHTML = `Costo total $ ${total}`;
  //se buscan todos los elementos que hay en el carrito
    cartItems.forEach((cartItem) => {
      //se toman todos los precios de los productos que hay en el carrito
      const cartItemPrecioElemento = cartItem.querySelector('.carritoProductoPrecio');
      const cartItemPrecio = Number(cartItemPrecioElemento.textContent.replace('$', ''));
       
      //se toman la cantidad de productos que hay en el carrito
      const cartItemNumElementos = cartItem.querySelector ('.carritoProductoCantidad');
      const cartItemNum = Number(cartItemNumElementos.value);

      //se multiplica el precio por la cantidad de productos para sacar el total
      total = total + cartItemPrecio * cartItemNum;

      //se imprime el total en pantalla
      cartTotal.innerHTML = `Costo total $ ${total}`;
    });

}


//funcion para definir la cantidad de productos del carrito
//y agregarlo al icono del carro
function cantidadProductosCarrito(){

  let totalProductos = 0;
  const cantidadProductos = document.querySelector('#carro-NumProductos');  
  const contarProductos = document.querySelectorAll('.carritoProducto');

  cantidadProductos.innerHTML = `${totalProductos}`;
  
  //se buscan todos los elementos que hay en el carrito
  contarProductos.forEach((productos) => {
    //se toman la cantidad de productos que hay en el carrito
    const cartnumProductos = productos.querySelector ('.carritoProductoCantidad');
    const cartCantidad = Number(cartnumProductos.value);

    //se suma la cantidad a un total que arranca siempre en 0
    totalProductos = totalProductos + cartCantidad ;
    //se imprime la cantidad en pantalla
    cantidadProductos.innerHTML = `  ${totalProductos}`;
  });
}

//se llama a la funcion que contiene todos los eventos
eventos();

//se llama a la funcion para plasmar los productos en pantalla
renderizarProductos();

//se exportan estas funciones a eventos.js
export{  cantidadProductosCarrito, totalProductosCarrito }