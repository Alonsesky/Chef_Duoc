$(document).ready(function () {
  cargarPedido()
});

$("#btnPagar").on("click", function () {
  let pedido = JSON.parse(localStorage.getItem("pedido"));
  pedido = [];
  localStorage.setItem("pedido",JSON.stringify(pedido));
  cargarPedido();
});

function cargarPedido(){
  $("#tableBody").empty();
  comprobarStorage("pedido");
  let table = $("#tableBody");
  let monto = 0;
  let total = $("#montoTotal")
  let pedido = JSON.parse(localStorage.getItem("pedido"));
  pedido.forEach(prod => {
    let tr = $('<tr></tr>');
    let th = $('<th></th>');
    let td1 = $('<td></td>');
    let td2 = $('<td></td>');
    tr.append(th);
    tr.append(td1);
    tr.append(td2);
    th.attr("scope", "row");
    th.text(pedido.indexOf(prod)+1);
    td1.text(prod.name);
    td2.text('$'+(prod.price).toLocaleString('es-CL'));
    table.append(tr);

    monto = monto + prod.price;
  });
  total.text("Total: $"+(monto).toLocaleString('es-CL'));
}