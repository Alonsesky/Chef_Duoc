const loadMenu = async() => {
  //VERIFICACION
  try{
    const respuesta = await fetch('http://localhost:3000/categories/1/products');
    //FILTRANDO TIPO DE STATUS
    if(respuesta.status===200){
      const datos = await respuesta.json();
      //FOREACH PARA RECORRER EL ARRAY DEL API
      let cartas = '';
      datos.forEach((producto, i) => {  
        const image = producto.image;
        image.src = producto.image;
        const title = producto.name;
        const description = producto.description;
        const id = producto.id;
        const precio = (producto.price).toLocaleString('es-CL');
        cartas +=  `
        <div class="col-12 col-md-3 col-sm-6 col-lg-3 mb-4">
          <div class="card">
            <img src="${image}" id="card-img" alt="...">
              <div class="card-body">
                  <h4 class="card-title">${title}</h4><br>
                  <p class="card-text">${description}</p>
                  <h5 class="card-title">$${precio}</h5>
              </div>
              <div class="card-footer">
                  <aid="btn-agregar-${id}" class="btn btn-success btn-agregar" onclick="agregarAPedido(${id})">Solicitar plato</a>
              </div>  
          </div>
        </div>`
        ;
      });

      $('#info-cards-all').html(cartas);
      //AGREGAR ACCION BTN A TODOS LOS PRODUCTOS GENERADOS
      const btnAgregar = document.querySelectorAll('#info-cards-all #btn-agregar');
      btnAgregar.forEach(product => {
        product.removeEventListener('click', clickAgregar);
        product.addEventListener('click', clickAgregar);
      });
      
    }else if (respuesta.status===401) {
      console.log('La url API Invalida!');
    }else if (respuesta.status===404){
      console.log('Error, dato no existe');
    }else{
      console.log('se ha generado un error!');
    }
  }catch(error){
    console.log(error);
  }
};

const loadBebestible = async() => {
  //VERIFICACION
  try{
    const respuesta = await fetch('http://localhost:3000/categories/2/products');
    //FILTRANDO TIPO DE STATUS
    if(respuesta.status===200){
      const datos = await respuesta.json();
      //FOREACH PARA RECORRER EL ARRAY DEL API
      let cartas = '';
      datos.forEach((producto, i) => {  
        const image = producto.image;
        image.src = producto.image;
        const title = producto.name;
        const description = producto.description;
        const id = producto.id;
        const precio = (producto.price).toLocaleString('es-CL');
        cartas +=  `
        <div class="col-12 col-md-3 col-sm-6 col-lg-3 mb-4">
          <div class="card">
            <img src="${image}" id="card-img" alt="...">
              <div class="card-body">
                  <h4 class="card-title">${title}</h4><br>
                  <p class="card-text">${description}</p>
                  <h5 class="card-title">$${precio}</h5>
              </div>
              <div class="card-footer">
                  <a id="btn-agregar-${id}" class="btn btn-success btn-agregar" onclick="agregarAPedido(${id})">Solicitar Bebestible</a>
              </div>  
          </div>
        </div>`
        ;
      });

      $('#info-cards-bebestible').html(cartas);
      //AGREGAR ACCION BTN A TODOS LOS PRODUCTOS GENERADOS
      const btnAgregar = document.querySelectorAll('#info-cards-all #btn-agregar');
      btnAgregar.forEach(product => {
        product.removeEventListener('click', clickAgregar);
        product.addEventListener('click', clickAgregar);
      });

      
      
    }else if (respuesta.status===401) {
      console.log('La url API Invalida!');
    }else if (respuesta.status===404){
      console.log('Error, dato no existe');
    }else{
      console.log('se ha generado un error!');
    }
  }catch(error){
    console.log(error);
  }
};

function agregarAPedido(id){
  $.getJSON('http://localhost:3000/products/'+id, function(data) {
    // console.log(data);
    const selectElement = document.getElementById('selectorMesa');
    const valorSeleccionado = selectElement.value;
    if (valorSeleccionado==1){
      comprobarStorage("pedido_mesa1");
      let pedido = JSON.parse(localStorage.getItem("pedido_mesa1"));
      if (pedido.length==0){
        let estado = {estado :"pedido"};
        let productos = [data];
        let inicializar_pedido = [{estado:estado.estado},{productos:productos}];
        pedido=inicializar_pedido;
        localStorage.setItem("pedido_mesa1",JSON.stringify(pedido));
      }else{
        pedido[1].productos.push(data);
        localStorage.setItem("pedido_mesa1",JSON.stringify(pedido));
      }
    } else if (valorSeleccionado==2){
      comprobarStorage("pedido_mesa2");
      let pedido = JSON.parse(localStorage.getItem("pedido_mesa2"));
      if (pedido.length==0){
        let estado = {estado :"pedido"};
        let productos = [data];
        let inicializar_pedido = [{estado:estado.estado},{productos:productos}];
        pedido=inicializar_pedido;
        localStorage.setItem("pedido_mesa2",JSON.stringify(pedido));
      }else{
        pedido[1].productos.push(data);
        localStorage.setItem("pedido_mesa2",JSON.stringify(pedido));
      }
    } else if (valorSeleccionado==3){
      comprobarStorage("pedido_mesa3");
      let pedido = JSON.parse(localStorage.getItem("pedido_mesa3"));
      if (pedido.length==0){
        let estado = {estado :"pedido"};
        let productos = [data];
        let inicializar_pedido = [{estado:estado.estado},{productos:productos}];
        pedido=inicializar_pedido;
        localStorage.setItem("pedido_mesa3",JSON.stringify(pedido));
      }else{
        pedido[1].productos.push(data);
        localStorage.setItem("pedido_mesa3",JSON.stringify(pedido));
      }
    }else if (valorSeleccionado==4){
      comprobarStorage("pedido_mesa4");
      let pedido = JSON.parse(localStorage.getItem("pedido_mesa4"));
      if (pedido.length==0){
        let estado = {estado :"pedido"};
        let productos = [data];
        let inicializar_pedido = [{estado:estado.estado},{productos:productos}];
        pedido=inicializar_pedido;
        localStorage.setItem("pedido_mesa4",JSON.stringify(pedido));
      }else{
        pedido[1].productos.push(data);
        localStorage.setItem("pedido_mesa4",JSON.stringify(pedido));
      }
    }
  });
};

function comprobarStorage(key){
  let storage = localStorage.getItem(key);
  if (storage==null) {
    storage = [];
    localStorage.setItem(key,JSON.stringify(storage));
  }
};

//OBTENER DIV DE LOS BOTONES
var botoncerrarSesion = document.getElementById('btn-cerrar-sesion');
var botoniniciarSesion = document.getElementById('btn-iniciar-sesion');
var botonregistrarse = document.getElementById('btn-registrarse');
var botonadministracion = document.getElementById('btn-administracion');
var botonperfil = document.getElementById('btn-perfil');
var botonpedidos = document.getElementById('btn-pedidos');
var labelCorreo = document.getElementById('labelCorreo');
var correo = localStorage.getItem('correo');
var rol = localStorage.getItem('rol');

//FUNCION PARA CAMBIAR LOS BOTONES POR USUARIO
function sesionUsuario(botoncerrarSesion, botoniniciarSesion, botonregistrarse, botonadministracion, botonpedidos, botonperfil, rol, correo, labelCorreo) {
  if (correo == null) {
    labelCorreo.textContent = correo;
    botoncerrarSesion.style.display = 'none';
    botoniniciarSesion.style.display = 'block';
    botonregistrarse.style.display = 'block';
    botonadministracion.style.display = 'none';
    botonperfil.style.display = 'none';
    botonpedidos.style.display = 'none';
  } else {
    labelCorreo.textContent = correo;
    botoncerrarSesion.style.display = 'block';
    botoniniciarSesion.style.display = 'none';
    botonregistrarse.style.display = 'none';
    botonperfil.style.display = 'block';
    if (rol == "chef") {
      botonadministracion.style.display = 'block';
      botonpedidos.style.display = 'none';
    }else if (rol == "suchef") {
      botonadministracion.style.display = 'block';
      botonpedidos.style.display = 'none';
    }else if (rol == "mesero") {
      botonadministracion.style.display = 'none';
      botonpedidos.style.display = 'block';
    }else if (rol == "repartidor") {
      botonadministracion.style.display = 'none';
      botonpedidos.style.display = 'block';
    }else if (rol == "jefelocal") {
      botonadministracion.style.display = 'block';
      botonpedidos.style.display = 'block';
    }else if (rol == "admin") {
      botonadministracion.style.display = 'block';
      botonpedidos.style.display = 'block';
    }else{
      botonadministracion.style.display = 'none';
      botonpedidos.style.display = 'none';
    }
  };
};

botoncerrarSesion.addEventListener('click', function() {
  localStorage.removeItem('correo');
});

loadMenu();
loadBebestible();
sesionUsuario(botoncerrarSesion, botoniniciarSesion, botonregistrarse, botonadministracion, botonpedidos, botonperfil, rol, correo, labelCorreo);
