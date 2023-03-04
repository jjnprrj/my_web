function cargarDatosUsuario() {
    let usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
    document.getElementById('nombreUsuario').innerHTML = usuario.usuario + " " + usuario.clave;
}

cargarDatosUsuario();
