$(document).ready(function() {
  $.getJSON('http://localhost:3000/users', function(data) {
    var v_nombreUsuario = document.getElementById('nombre');
    var v_correoUsuario = document.getElementById('correo');
    var v_rolUsuario = document.getElementById('rol');
    var correo = localStorage.getItem('correo');
    var nombreUsuario = null;
    var correoUsuario = null;
    var rolUsuario = null;
    for (var i = 0; i < data.length; i++) {
      verificacionCorreo = data[i].email;
      if (verificacionCorreo === correo) {
        nombreUsuario = data[i].name;
        correoUsuario = data[i].email;
        rolUsuario = data[i].rol;
        console.log('nombreUsuario:', nombreUsuario);
        v_nombreUsuario.textContent = nombreUsuario;
        v_correoUsuario.textContent = correoUsuario;
        v_rolUsuario.textContent = rolUsuario;
        break;
      }
    }
  });
});
