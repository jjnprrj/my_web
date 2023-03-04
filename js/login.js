$(function () {
	$('.button-checkbox').each(function () {
		var $widget = $(this),
			$button = $widget.find('button'),
			$checkbox = $widget.find('input:checkbox'),
			color = $button.data('color'),
			settings = {
				on: {
					icon: 'glyphicon glyphicon-check'
				},
				off: {
					icon: 'glyphicon glyphicon-unchecked'
				}
			};

		$button.on('click', function () {
			$checkbox.prop('checked', !$checkbox.is(':checked'));
			$checkbox.triggerHandler('change');
			updateDisplay();
		});

		$checkbox.on('change', function () {
			updateDisplay();
		});

		function updateDisplay() {
			var isChecked = $checkbox.is(':checked');
			// Set the button's state
			$button.data('state', (isChecked) ? "on" : "off");

			// Set the button's icon
			$button.find('.state-icon')
				.removeClass()
				.addClass('state-icon ' + settings[$button.data('state')].icon);

			// Update the button's color
			if (isChecked) {
				$button
					.removeClass('btn-default')
					.addClass('btn-' + color + ' active');
			}
			else {
				$button
					.removeClass('btn-' + color + ' active')
					.addClass('btn-default');
			}
		}
		function init() {
			updateDisplay();
			// Inject the icon if applicable
			if ($button.find('.state-icon').length == 0) {
				$button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i> ');
			}
		}
		init();
	});
});

function ingresarSistema(usuario, clave, sesionIniciada) {
	let usuariosRegistrados = localStorage.getItem('usuariosRegistrados');
	usuariosRegistrados = JSON.parse(usuariosRegistrados);

	for (let i = 0; i < usuariosRegistrados.length; i++) {
		if (usuario == usuariosRegistrados[i].usuario && clave == usuariosRegistrados[i].clave) {
			localStorage.setItem('usuarioLogueado', JSON.stringify(usuariosRegistrados[i]));
			window.location = "/index.html";
			return;
		}
	}
	alert('Usuario y/o contraseña incorrectos')
}

var usuarios = [];

function verificarInicioSesion() {
	let usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
	if (usuarioLogueado != null && usuarioLogueado.sesionIniciada == true) {
		alert("Sesión Activa, redireccionando...");
		setTimeout(redireccionar, 1000);
	}
}

function redireccionar() {
	windown.location = "../index.html";
}

function obtenerUsuarios() {
	usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados"));
	if (usuarios = null) {
		usuarios = [{
			usuario: 'admin',
			clave: '123',
			nombre: 'John',
			Apellido: 'Doe',
			sesionIniciada: false,

		},];
	}
}

function crearUsuariosTemporal() {
	let objetoUsuario = { usuario: 'admin', clave: '123' };
	usuarios.push(objetoUsuario);
	objetoUsuario = { usuario: 'cmtl', clave: '1234' };
	usuarios.push(objetoUsuario);
	console.log(usuarios);
	localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));
}

crearUsuariosTemporal();
obtenerUsuarios();
verificarInicioSesion();