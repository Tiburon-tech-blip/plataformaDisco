const btnsFavorite = document.querySelectorAll('.favorite');
const products = document.querySelectorAll('.container');
const counterFavorites = document.querySelector('.counter-favorite');

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