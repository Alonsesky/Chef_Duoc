$(document).ready(function() {
  var v_codigo = document.getElementById("codigo");
  v_codigo.style.display = "none";
  
  //FUNCIÓN PARA OCULTAR CÓDIGO
  $("#categoria").click(function(){
    var v_categoria =$("#categoria").val()
    console.log(v_categoria);
    var v_codigo = document.getElementById("codigo");
    
    if (v_categoria === "cliente") {
      v_codigo.style.display = "none";
    }else{
      v_codigo.style.display = "block";
    }
  });  
  
  $("#guardar").click(function(){
    var v_nombre =$("#nombre").val()
    var v_email =$("#email").val()
    var v_password =$("#password").val()
    var v_compro_email =$("#compro_email").val()
    var v_compro_password =$("#compro_password").val()
    var v_Apellido_Paterno =$("#Apellido_Paterno").val()
    var v_categoria =$("#categoria").val()
    var v_codigo =$("#codigo").val()
    comprobar_datos (v_nombre,v_email,v_password,v_compro_email,v_compro_password,v_Apellido_Paterno,v_categoria,v_codigo);

    //FUNCIÓN COMPROBAR NOMBRE
    function Comprobar_nombre_apellido (variable){
      //COMPROBAR CARACTER VACÍO
      if (variable=="") {
        alert('Esta vacío');
        return true;
      }
      //COMPROBAR ESPACIOS
      if (/\s/g.test(variable)==true) {
        alert('No se permiten espacios');
        return true;
      }
      //COMPROBAR CARACTERES NÚMERICOS
      if (/\d/.test(variable)==true) {
        alert('No se permiten números');
        return true;
      }
      //COMPROBAR CARACTER ESPECIAL
      if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(variable)) {
        alert('No se permiten caracteres especiales');
        return true;
      }  

      return false;
    
    };

    //FUNCIÓN COMPROBAR CORREO ELECTRONICO
    function Comprobar_correo(variable_correo){
      //COMPROBAR CARACTER VACÍO
      if (variable_correo=="") {
        alert('Esta vacío');
        return true;
      }
      //COMPROBAR ESPACIOS
      if (/\s/g.test(variable_correo)==true) {
        alert('No se permiten espacios');
        return true;
      }
      //COMPROBAR CARACTER ESPECIAL
      if (/[ `!#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/.test(variable_correo)) {
        alert('No se permiten caracteres especiales');
        return true;
      }  
      //COMPROBAR SI ES "@gmail.com"
      if (false==(variable_correo.indexOf("@gmail.com") !== -1)) {
        alert('Tiene que ser un correo "@gmail.com"');
        return true;
      };
      
      return false;
    };
    
    //FUNCIÓN COMPROBAR CONTRASEÑA
    function comprobar_password (password){
      //COMPROBAR CARACTER VACÍO
      if (password=="") {
        alert('Esta vacío');
        return true;
      }
      //COMPROBAR CARACTERES NÚMERICOS
      if (/\d/.test(password)==false) {
        alert('La contraseña debe tener al menos 1 número');
        return true;
      }
      //COMPROBAR CARACTERES ESPECIALES
      if (false==/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) {
        alert('La contraseña debe tener al menos 1 caracter especial');
        return true;
      }
      //COMPROBAR EL LARGO DE CARACTERES
      if (password.length < 5) {
        alert('La contraseña debe tener un minímo de 6 caracteres');
        return true;
      }

      return false;
    
    };

    //FUNCIÓN COMPROBAR ROL
    function comprobar_codigo (categoria, codigo){
      if (categoria==="comensal") {
        return false;
      };
      if (categoria==="chef") {
        if (codigo === "3bbPFnkC" || codigo === "saKY9oKi" || codigo === "MouEfEcr"){
          return false;
        }else{
          alert("Código de chef incorrecto");
          return true;
        }
      };
      if (categoria==="mesero") {
        if (codigo === "5sscHWnn" || codigo === "yyseGSKW" || codigo === "aANyLtQw"){
          return false;
        }else{
          alert("Código de Comensal incorrecto");
          return true;
        }
      };

      /*  codigos de Chef  "3bbPFnkC" "saKY9oKi" "MouEfEcr"
          codigos de comensal  "5sscHWnn" "yyseGSKW" "aANyLtQw"
      */

    };

    //FUNCION PARA COMPROBAR TODOS LOS DATOS
    function comprobar_datos(nombre,email,password,c_correo,c_password,apellido,categoria,codigo){
      
      if (Comprobar_nombre_apellido(nombre)==true) {
        return false;
      };
      
      if (Comprobar_correo(email)==true) {
          return false;
      };
      
      if (comprobar_password(password)==true) {
          return false;
      };
      
      if (Comprobar_nombre_apellido(apellido)==true) {
        return false;
      };

      if (comprobar_codigo(categoria,codigo)==true) {
        return false;
      };
      
      if (email != c_correo) {
        alert('Correo electronico no coincide');
        return false;
      };
      
      if (password != c_password) {
        alert('Contraseña no copincide');
        return false;
      };
      
      $.getJSON('Content-jsonServer/db.json', function(data) {
    
        var nuevoUser = {
            name: v_nombre,
            email: v_email,
            password: v_password,
            rol: v_categoria,
            categoryId: 5
        };
      
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/users",
            data: JSON.stringify(nuevoUser),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("El nuevo producto se ha agregado con éxito.");
            },
            error: function (xhr, status, error) {
                console.error("Ha ocurrido un error al intentar agregar el nuevo producto: " + error);
            }
        });
      
        window.location.href = "index.html";
    
      });
    };
  });
});
  

  
  
  
  