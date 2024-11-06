

//************************Mostrar Albumes*************************************** */

// Se define una variable MiInicio como una cadena vacía (``). Esta variable se usará para almacenar el contenido HTML que se generará dinámicamente.
let miInicio = ``
a = 0


//const getAlbums = async () => {

async function getAlbums() {
	try {
		const response = await axios.get('https://plataformadisco-przk.onrender.com/band')
		//console.log(response)
		response.data.map((album) => {
			renderAlbums(album)
		})
		favoriteButton()
		albumIndibidual()
		sidebar()
	}
	catch (error) {
		console.log(error)
	}
}



const renderAlbums = (album) => {
	a = a + 1
	num = a.toString()

	miInicio = miInicio + `
    
    <!-- Pego lo que tengo dentro de la tarjeta 1 del index.html -->
    
	<div class="col" ontouchstart="this.classList.toggle('hover');">
		<div class="container">

			<div class="front"
				style="background-image: url(${album.portadaUrl})">
				<div class="container-buttons-card">

				</div>
			</div>

			<div class="back" data-product-id= ${num}>
				<div class="redireccion" data-album-id= ${album._id}>
					<div class="inner fire2">
						<p>${album.titulo}</p>
						<span>Publicación:</span><span class="ano">${album.anoDeLanazamiento}</span>
					</div>
				</div>

				<div class="container-buttons-card">
					<button class="favorite">
						<i class="fa-regular fa-heart" id="favorite-regular"></i>
						<i class="fa-solid fa-heart" id="added-favorite"></i>
					</button>
				</div>


				<div class="editarBorrar">
					<div class="editar">
						<a class="redireccionEditar" data-editar-id= ${album._id}>Editar</a>
					</div>


					<div class="borrar">
						<a class="borrarAlbum" data-borrar-id= ${album._id}><i class="fa-solid fa-trash-can"></i></a>
					</div>
				</div>

			</div>

			</div>

	</div>
    
    `

	//Selecciono el main y con innerHTML agrego lo que definí en la variable miInicio
	document.querySelector(".miInicio").innerHTML = miInicio

}


getAlbums()

//*************************************************************************** */

//***************************Mis Favoritos******************************** */

const favoriteButton = () => {

	const btnsFavorite = document.querySelectorAll('.favorite');
	const products = document.querySelectorAll('.container');
	const counterFavorites = document.querySelector('.counter-favorite');
	const titulo = document.querySelector(".ano")

	console.log(titulo)

	const containerListFavorites = document.querySelector(
		'.container-list-favorites'
	);
	const listFavorites = document.querySelector('.list-favorites');


	let favorites = [];

	//definimos una funcion para almacenar el arreglo en local storage
	const updateFavoritesInLocalStorage = () => {
		localStorage.setItem('favorites', JSON.stringify(favorites));
	};

	//cargamos por medio de la funcion
	const loadFavoritesFromLocalStorage = () => {
		const storedFavorites = localStorage.getItem('favorites');

		//comprovamos si exiten datos o no exiten en el localstorage
		if (storedFavorites) {
			favorites = JSON.parse(storedFavorites);
			showHTML();
		}
	};


	//2
	const toggleFavorite = album => {
		const index = favorites.findIndex(
			element => element.id === album.id
		);

		if (index > -1) {
			favorites.splice(index, 1);
			updateFavoritesInLocalStorage();
		} else {
			favorites.push(album);
			updateFavoritesInLocalStorage();
		}

		console.log(index)
	};

	//4
	const updateFavoriteMenu = () => {
		listFavorites.innerHTML = '';

		favorites.forEach(fav => {
			// Crear un nuevo elemento 'div' para el producto favorito
			const favoriteCard = document.createElement('div');
			favoriteCard.classList.add('card-favorite');

			// Crear y añadir el título del producto
			const titleElement = document.createElement('p');
			titleElement.classList.add('title');
			titleElement.textContent = fav.title;
			favoriteCard.appendChild(titleElement);

			// Crear y añadir el precio del producto
			const priceElement = document.createElement('p');
			priceElement.textContent = fav.ano;
			favoriteCard.appendChild(priceElement);

			// Añadir el producto favorito a la lista
			listFavorites.appendChild(favoriteCard);
		});
	};



	//3
	const showHTML = () => {
		products.forEach(album => {
			const contentProduct = album.querySelector(
				'.back'
			);
			const productId = contentProduct.dataset.productId;
			const isFavorite = favorites.some(
				favorite => favorite.id === productId
			);

			const favoriteButton = album.querySelector('.favorite');
			const favoriteActiveButton =
				album.querySelector('#added-favorite');
			const favoriteRegularIcon = album.querySelector(
				'#favorite-regular'
			);
			favoriteButton.classList.toggle('favorite-active', isFavorite);
			favoriteRegularIcon.classList.toggle('active', isFavorite);
			favoriteActiveButton.classList.toggle('active', isFavorite);
		});

		counterFavorites.textContent = favorites.length;
		updateFavoriteMenu();
	};



	//1
	btnsFavorite.forEach(button => {
		button.addEventListener('click', e => {
			const card = e.target.closest('.back');

			const album = {
				id: card.dataset.productId,
				title: card.querySelector('p').textContent,
				ano: card.querySelector('.ano').textContent,
			};

			toggleFavorite(album);

			showHTML();
		});
	});

	//5
	const btnClose = document.querySelector('#btn-close');
	const buttonHeaderFavorite = document.querySelector(
		'#button-header-favorite'
	);

	buttonHeaderFavorite.addEventListener('click', () => {
		containerListFavorites.classList.toggle('show');
	});

	btnClose.addEventListener('click', () => {
		containerListFavorites.classList.remove('show');
	});


	loadFavoritesFromLocalStorage();
	updateFavoriteMenu();

}

//******************************************************************************************** */

//****funcion que al hacer clik sobre un album, me redirige al album indibidual****** */

function albumIndibidual() {

	// Función para redirigir a la vista del álbum
	function redirect(albumId) {
		// Construye la URL con el ID del álbum como query param
		window.location.href = `./pages/album.html?id=${albumId}`;
	}

	// Función para redirigir a la vista de edicion del album
	function redirect2(albumId2) {
		// Construye la URL con el ID del álbum como query param
		window.location.href = `./pages/editAlbum.html?id=${albumId2}`;
	}

	// Selecciona todas las imágenes de los álbumes y los botones editar dentro de las imagenes
	const albumImages = document.querySelectorAll('.redireccion');
	const albumEditar = document.querySelectorAll('.redireccionEditar');
	const albumBorrar = document.querySelectorAll('.borrarAlbum');

	// Agrega un evento de clic a cada imagen y estrae el id de cada una
	albumImages.forEach(image => {
		image.addEventListener('click', () => {
			const albumId = image.getAttribute('data-album-id');
			// Llama a la función redirect con el ID del álbum
			redirect(albumId);
		});
	});

	// Agrega un evento de clic a cada boton editar y estrae el id de cada una
	albumEditar.forEach(imageEditar => {
		imageEditar.addEventListener('click', () => {
			const albumId2 = imageEditar.getAttribute('data-editar-id');
			// Llama a la función redirect con el ID del álbum
			redirect2(albumId2);
		});
	});

	// Agrega un evento de clic a cada boton borrar y estrae el id de cada una
	albumBorrar.forEach(imageBorrar => {
		imageBorrar.addEventListener('click', () => {
			const albumId3 = imageBorrar.getAttribute('data-borrar-id');
			// Llama a la función redirect con el ID del álbum
			deleteAlbum(albumId3);
		});
	});
}
//****************************************************************************************** */

// Función para eliminar un álbum por ID
async function deleteAlbum(albumId3) {
	try {
		const response = await axios.delete(`https://plataformadisco-przk.onrender.com/band/${albumId3}`);
		console.log(response.data);

		swal({
			title: 'Borrado!',
			text: 'El album fue borrado correctamente!',
			icon: 'success',
			confirmButtonText: 'Ok'
		})

		// Recargar la página de forma sencilla
		location.reload();

	} catch (error) {
		console.log(error)
		//console.error('Error al eliminar el álbum:');
	}
}

//**************************************************************************************** */

function sidebar() {

	addAlbum = document.querySelector(".addAlbum")
	torDate = document.querySelector(".torDate")
	singUp = document.querySelector(".singUp")
	login = document.querySelector(".login")
	logOut = document.querySelector(".logOut")


	addAlbum.style.cursor = "pointer";
	torDate.style.cursor = "pointer";
	singUp.style.cursor = "pointer";
	login.style.cursor = "pointer";
	logOut.style.cursor = "pointer";

	addAlbum.addEventListener('click', () => window.location.href = "../pages/addAlbum.html");

	torDate.addEventListener('click', () => window.location.href = "../pages/tours.html");

	singUp.addEventListener('click', () => window.location.href = "../pages/signUp.html")

	login.addEventListener('click', () => window.location.href = "../pages/login.html")

	logOut.addEventListener('click', () => window.location.href = "../pages/login.html")



}

//********************************************************************************* */




























