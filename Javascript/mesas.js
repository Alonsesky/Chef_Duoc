$(document).ready(function () {
  cargarStorages();
  cargarTabla("pedido_mesa1","#tabla_mesa1","#btnMesa1");
  cargarTabla("pedido_mesa2","#tabla_mesa2","#btnMesa2");
  cargarTabla("pedido_mesa3","#tabla_mesa3","#btnMesa3");
  cargarTabla("pedido_mesa4","#tabla_mesa4","#btnMesa4");
});

function cargarTabla(key,tabla,idBoton){
  let pedido = JSON.parse(localStorage.getItem(key));
  let estado = pedido[0].estado;
  let productos = pedido[1].productos;
  let lista = $(tabla);
  let total = 0;
  $(productos).each(function (index, producto) {
    // element == this
    let fila = $('<tr>');
    let columna1 = $('<td>').text(producto.name);
    let columna2 = $('<td>').text("$"+(producto.price).toLocaleString('es-CL'));
    fila.append(columna1, columna2);
    lista.append(fila);
    total = total + producto.price
  });
  let fila = $('<tr>');
  let columna1 = $('<th>').text("Total:");
  columna1.attr("scope","row");
  let columna2 = $('<td>').text("$"+(total).toLocaleString('es-CL'));
  fila.append(columna1, columna2);
  lista.append(fila);
  cambiarBoton(idBoton,estado);
}

$('.btnPago').click(function (e) { 
  botonDeMesa(this.id.slice(-1),this.id);
});

function botonDeMesa(numeroMesa,idBoton){
  let key = "pedido_mesa"+numeroMesa;
  let pedido = JSON.parse(localStorage.getItem(key));
  let estado = pedido[0].estado;
  if (estado === "solicitado"){
    estado = "realizado";
    pedido[0].estado = estado;
    localStorage.setItem(key,JSON.stringify(pedido));
  }else if (estado === "realizado"){
    estado = "completado";
    pedido[0].estado = estado;
    localStorage.setItem(key,JSON.stringify(pedido));
  }
  idBoton = '#'+idBoton;
  cambiarBoton(idBoton,estado)
}

function cambiarBoton(idBoton,estado){
  let boton = $(idBoton);
  if (estado === "pedido"){
    boton.addClass('disabled btn-danger').removeAttr('href');
    boton.text('En Curso...');
  }else if(estado === "solicitado"){
    boton.removeClass('disabled btn-danger').attr('href','#');
    boton.text('¡Pago Solicitado!');
  }else if(estado === "realizado"){
    boton.removeClass('disabled btn-danger').attr('href','#');
    boton.text('¡Pago Realizado!');
  }else if(estado === "completado"){
    let key = "pedido_mesa"+idBoton.slice(-1);
    let pedido = JSON.parse(localStorage.getItem(key));
    pedido[0].estado = "pedido";
    pedido[1].productos = [];
    localStorage.setItem(key,JSON.stringify(pedido));
    let tabla = $('#tabla_mesa'+idBoton.slice(-1));
    tabla.empty();
    cargarTabla('pedido_mesa'+idBoton.slice(-1),'#tabla_mesa'+idBoton.slice(-1),'#btnMesa'+idBoton.slice(-1));
    boton.addClass('disabled btn-danger').removeAttr('href');
    boton.text('En Curso...');
  }
};

function cargarStorages(){
  let pedidos = ["pedido_mesa1","pedido_mesa2","pedido_mesa3","pedido_mesa4"];
  pedidos.forEach(element => {
    let pedido = JSON.parse(localStorage.getItem(element));
    if (pedido==null) {
      pedido = [{estado:"pedido"},{productos:[]}];
      localStorage.setItem(element,JSON.stringify(pedido));
    }
  });
}