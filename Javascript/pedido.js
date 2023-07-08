$(document).ready(function () {
  cargarPedido(1)
});
/* <button id="btnPagar" class="btn btn-success w-100">Pagar</button> */
$("#btnPagar").on("click", function () {
  const selectElement = document.getElementById("selectorMesa");
  const valorSeleccionado = selectElement.value;
  if (valorSeleccionado==1){
    let key = "pedido_mesa1";
    procesoPago(key);
  }else if (valorSeleccionado==2){
    let key = "pedido_mesa2";
    procesoPago(key);
  }else if (valorSeleccionado==3){
    let key = "pedido_mesa3";
    procesoPago(key);
  }else if (valorSeleccionado==4){
    let key = "pedido_mesa4";
    procesoPago(key);
  }
});

function procesoPago(key){
  let pedido = JSON.parse(localStorage.getItem(key));
  let estado = pedido[0].estado;
  
  if (estado === "pedido"){
    pedido[0].estado = "solicitado";
    botonPagoSolicitado()
    localStorage.setItem(key,JSON.stringify(pedido));
  }
}

function comprobarEstadoPedido(key){
  let pedido = JSON.parse(localStorage.getItem(key));
  let estado = pedido[0].estado;
  if (estado === "solicitado"){
    botonPagoSolicitado()
  }else if (estado === "pedido"){
    botonPagoPedido()
  }
}

function botonPagoSolicitado(){
  let boton_pagar = $("#btnPagar");
  boton_pagar.text('Pago Solicitado...');
  boton_pagar.prop('disabled',true);
}

function botonPagoPedido(){
  let boton_pagar = $("#btnPagar");
  boton_pagar.text('Pagar');
  boton_pagar.prop('disabled',false);
}

const selectElement = document.getElementById("selectorMesa");
selectElement.addEventListener('change',function(){
  const valorSeleccionado = selectElement.value;
  cargarPedido(valorSeleccionado);
});

function cargarTabla(productos){
  let table = $("#tableBody");
  let monto = 0;
  let total = $("#montoTotal");
  let contador = 1;
    productos.forEach(prod =>{
      let tr = $('<tr></tr>');
      let th = $('<th></th>');
      let td1 = $('<td></td>');
      let td2 = $('<td></td>');
      tr.append(th);
      tr.append(td1);
      tr.append(td2);
      th.attr("scope", "row");
      th.text(contador);
      td1.text(prod.name);
      td2.text('$'+(prod.price).toLocaleString('es-CL'));
      table.append(tr);
      contador = contador+1;
      monto = monto + prod.price;
      total.text("Total: $"+(monto).toLocaleString('es-CL'));
    });
}

function cargarPedido(mesa){
  $("#tableBody").empty();
  if (mesa==1){
    let pedido = JSON.parse(localStorage.getItem("pedido_mesa1"));
    comprobarEstadoPedido('pedido_mesa1');
    let productos = pedido[1].productos;
    cargarTabla(productos);
  }else if (mesa==2){
    let pedido = JSON.parse(localStorage.getItem("pedido_mesa2"));
    comprobarEstadoPedido('pedido_mesa2');
    let productos = pedido[1].productos;
    cargarTabla(productos);
  }else if (mesa==3){
    let pedido = JSON.parse(localStorage.getItem("pedido_mesa3"));
    comprobarEstadoPedido('pedido_mesa3');
    let productos = pedido[1].productos;
    cargarTabla(productos);
  }else if (mesa==4){
    let pedido = JSON.parse(localStorage.getItem("pedido_mesa4"));
    comprobarEstadoPedido('pedido_mesa4');
    let productos = pedido[1].productos;
    cargarTabla(productos);
  }
}