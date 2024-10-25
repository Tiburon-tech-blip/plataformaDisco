// //***************************Mis Favoritos******************************** */

// const btnsFavorite = document.querySelectorAll('.favorite');
// const products = document.querySelectorAll('.container');
// const counterFavorites = document.querySelector('.counter-favorite');

// const containerListFavorites = document.querySelector(
// 	'.container-list-favorites'
// );
// const listFavorites = document.querySelector('.list-favorites');


// let favorites = [];

// //definimos una funcion para almacenar el arreglo en local storage
// const updateFavoritesInLocalStorage = () => {
// 	localStorage.setItem('favorites', JSON.stringify(favorites));
// };

// //cargamos por medio de la funcion
// const loadFavoritesFromLocalStorage = () => {
// 	const storedFavorites = localStorage.getItem('favorites');

// 	//comprovamos si exiten datos o no exiten en el localstorage
// 	if (storedFavorites) {
// 		favorites = JSON.parse(storedFavorites);
// 		showHTML();
// 	}
// };


// //2
// const toggleFavorite = album => {
// 	const index = favorites.findIndex(
// 		element => element.id === album.id
// 	);

// 	if (index > -1) {
// 		favorites.splice(index, 1);
// 		updateFavoritesInLocalStorage();
// 	} else {
// 		favorites.push(album);
// 		updateFavoritesInLocalStorage();
// 	}

// 	console.log(index)
// };

// //4
// const updateFavoriteMenu = () => {
// 	listFavorites.innerHTML = '';

// 	favorites.forEach(fav => {
// 		// Crear un nuevo elemento 'div' para el producto favorito
// 		const favoriteCard = document.createElement('div');
// 		favoriteCard.classList.add('card-favorite');

// 		// Crear y añadir el título del producto
// 		const titleElement = document.createElement('p');
// 		titleElement.classList.add('title');
// 		titleElement.textContent = fav.title;
// 		favoriteCard.appendChild(titleElement);

// 		// Crear y añadir el precio del producto
// 		const priceElement = document.createElement('p');
// 		priceElement.textContent = fav.ano;
// 		favoriteCard.appendChild(priceElement);

// 		// Añadir el producto favorito a la lista
// 		listFavorites.appendChild(favoriteCard);
// 	});
// };



// //3
// const showHTML = () => {
// 	products.forEach(album => {
// 		const contentProduct = album.querySelector(
// 			'.back'
// 		);
// 		const productId = contentProduct.dataset.productId;
// 		const isFavorite = favorites.some(
// 			favorite => favorite.id === productId
// 		);

// 		const favoriteButton = album.querySelector('.favorite');
// 		const favoriteActiveButton =
// 			album.querySelector('#added-favorite');
// 		const favoriteRegularIcon = album.querySelector(
// 			'#favorite-regular'
// 		);
// 		favoriteButton.classList.toggle('favorite-active', isFavorite);
// 		favoriteRegularIcon.classList.toggle('active', isFavorite);
// 		favoriteActiveButton.classList.toggle('active', isFavorite);
// 	});

// 	counterFavorites.textContent = favorites.length;
// 	updateFavoriteMenu();
// };



// //1
// btnsFavorite.forEach(button => {
// 	button.addEventListener('click', e => {
// 		const card = e.target.closest('.back');

// 		const album = {
// 			id: card.dataset.productId,
// 			title: card.querySelector('p').textContent,
// 			ano: card.querySelector('.ano').textContent,
// 		};

// 		toggleFavorite(album);

// 		showHTML();
// 	});
// });

// //5
// const btnClose = document.querySelector('#btn-close');
// const buttonHeaderFavorite = document.querySelector(
// 	'#button-header-favorite'
// );

// buttonHeaderFavorite.addEventListener('click', () => {
// 	containerListFavorites.classList.toggle('show');
// });

// btnClose.addEventListener('click', () => {
// 	containerListFavorites.classList.remove('show');
// });


// loadFavoritesFromLocalStorage();
// updateFavoriteMenu();

//****************************************************************************** */

//************************Mostrar Albumes*************************************** */

// Se define una variable MiInicio como una cadena vacía (``). Esta variable se usará para almacenar el contenido HTML que se generará dinámicamente.
let miInicio = ``
a=0


//const getAlbums = async () => {

async function getAlbums (){
	try {
		const response = await axios.get('http://localhost:5000/band')
		//console.log(response)
		response.data.map((album) => {
			renderAlbums(album)
		})
	}
	catch (error) {
		console.log(error)
	}
}



const renderAlbums = (album) => {
	a=a+1
	num = a.toString()
	
	miInicio = miInicio + `
    
    <!-- Pego lo que tengo dentro de la tarjeta 1 del index.html -->
    
	<div class="col" ontouchstart="this.classList.toggle('hover');">
		<div class="container">

			<div class="front" id="bonJovi1984"
				style="background-image: url(${album.portadaUrl})">
				<div class="container-buttons-card">

				</div>
			</div>

			<div class="back" data-product-id= ${num}>
				<a href="./pages/album1984.html">
					<div class="inner fire2">
						<p>${album.titulo}</p>
						<span>Publicación:</span><span class="ano">${album.anoDeLanazamiento}</span>
					</div>
				</a>

				<div class="container-buttons-card">
					<button class="favorite">
						<i class="fa-regular fa-heart" id="favorite-regular"></i>
						<i class="fa-solid fa-heart" id="added-favorite"></i>
					</button>
				</div>


				<div class="editarBorrar">
					<div class="editar">
						<a href="./pages/editAlbum.html">Editar</a>
					</div>


					<div class="borrar">
						<a href="#"><i class="fa-solid fa-trash-can"></i></a>
					</div>
				</div>

			</div>

		</div>

	</div>
    
    `

//Selecciono el main y con innerHTML agrego lo que definí en la variable miInicio
document.querySelector(".miInicio").innerHTML=miInicio
	
}


getAlbums()

//*************************************************************************** */

//***************************Mis Favoritos******************************** */

const btnsFavorite = document.querySelectorAll('.favorite');
const products = document.querySelectorAll('.container');
const counterFavorites = document.querySelector('.counter-favorite');

console.log(btnsFavorite)

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















// const div = document.getElementsByClassName('grid grid-cols-3 gap-4 mt-12 py-30')[0]
	// const newDiv = document.createElement('div')
	// newDiv.classList.add('mb-20')
	// const img = document.createElement('img')
	// img.classList.add('rounded','cursor-pointer')
	// img.src= album.img ? album.img : 'https://imgur.com/0uSALUr.png'

	// div.appendChild(newDiv)
	// newDiv.appendChild(img)
	// const p = document.createElement('p')
	// p.classList.add('text-white','text-center', 'text-xl', 'font-bold')
	// p.textContent = album.yearOfRelease
	// newDiv.appendChild(p)
























