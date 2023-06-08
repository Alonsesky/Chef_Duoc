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
                  <a href="#" id="btn-agregar" class="btn btn-success btn-agregar">Solicitar plato</a>
                  <div class="id-product" style="display:none;">${id}</div>
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
}

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
                  <a href="#" id="btn-agregar" class="btn btn-success btn-agregar">Solicitar Bebestible</a>
                  <div class="id-product" style="display:none;">${id}</div>
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
}

loadMenu();
loadBebestible();