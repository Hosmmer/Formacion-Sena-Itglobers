// API Configuration
const API_KEY = "live_CstxJOGFFgI3OM9sszMAqm3GxKye3UgQMNBAstyJPbmDCpeZiRwvs3YOj30diY8f";
const API_BASE_URL = "https://api.thecatapi.com/V1";
const API_LIMIT = 3;
const spanError = document.getElementById("errorRes");

// API Endpoints
const ENDPOINTS = {
    RANDOM: `${API_BASE_URL}/images/search?limit=${API_LIMIT}&api_key=${API_KEY}`,
    FAVOURITE: `${API_BASE_URL}/favourites?limit=${API_LIMIT}&api_key=${API_KEY}`
};

// Error Handling
const handleError = (message, error) => {
    console.error(`${message}: ${error}`);

    // Configurar mensaje de error en el span
    spanError.textContent = `Oops! Something went wrong: ${error.message || error}. Please try again later.`;

    // Configurar imagen de error si está definida en assets
    const errorImage = document.getElementById("errorImage");
    errorImage.src = "./assets/img/error.png"; // Cambia la ruta si tienes una imagen de error específica

    // Mostrar el contenedor de error
    const errorContainer = document.getElementById("errorContainer");
    errorContainer.style.display = "block";
};

// Function to update images in the DOM
const updateImages = (data) => {
    const images = document.querySelectorAll(".cat-img");

    images.forEach((img, index) => {
        img.src = data[index]?.url || "./assets/img/loading.jpg"; // Default to loading image if no data
    });
};

const assignFavoriteButtons = () => {
    const favoriteButtons = document.querySelectorAll(".button-fav");

    Array.from(favoriteButtons).forEach((button, index) => {
        const imageId = document.querySelectorAll(".cat-img")[index].getAttribute("src").split('/').pop().split('.')[0];
        button.setAttribute("data-id", imageId);

        button.addEventListener("click", () => {
            const imageId = button.getAttribute("data-id");
            saveFavoritesCat(imageId);
        });
    });
};



const loadRandomCats = async () => {
    document.getElementById("errorContainer").style.display = "none";

    try {
        const response = await fetch(ENDPOINTS.RANDOM);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        } else {
            const data = await response.json();
            updateImages(data);
            console.log("Random images loaded successfully", data);

            assignFavoriteButtons();
        }
    } catch (error) {
        handleError("Error loading random images", error);
    }
};

// Load Favorite Cat Images
const loadFavoritesCats = async () => {
    try {
        const res = await fetch(ENDPOINTS.FAVOURITE);

        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        console.log('Favoritos:', data);

        const section = document.getElementById('favoriteMichis');

        if (!section) {
            console.error('El contenedor "favoriteMichis" no existe');
            return;
        }

        section.innerHTML = '';

        const validFavorites = data.filter(michi => michi.image && michi.image.url);

        if (validFavorites.length === 0) {
            spanError.textContent = "No tienes gatos favoritos con imágenes válidas.";
            document.getElementById("errorContainer").style.display = "block";
        } else {
            const firstThreeFavorites = validFavorites.slice(0, 3);

            firstThreeFavorites.forEach(michi => {
                const article = document.createElement('article');
                const img = document.createElement('img');
                const btn = document.createElement('button');
                const btnText = document.createTextNode('Eliminar😿');

                img.src = michi.image.url;
                img.width = 150;
                img.classList.add('cat-image');

                btn.appendChild(btnText);
                btn.classList.add('remove-fav-btn');

                article.classList.add('cat-item');

                article.appendChild(img);
                article.appendChild(btn);
                section.appendChild(article);

                btn.addEventListener('click', () => {
                    removeFavoriteCat(michi.id, article);
                });
            });
        }
    } catch (error) {
        handleError('Error al cargar los favoritos', error);
    }
};

const savedFavorites = []; // Almacena los IDs de los favoritos guardados

const saveFavoritesCat = async (imageId) => {
    // Verificar si la imagen ya está en favoritos
    if (savedFavorites.includes(imageId)) {
        console.log("Esta imagen ya está en favoritos.");
        return; // No agregar la imagen si ya está en favoritos
    }

    document.getElementById("errorContainer").style.display = "none";

    try {
        const res = await fetch(ENDPOINTS.FAVOURITE, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            },
            body: JSON.stringify({ image_id: imageId }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Error desconocido');
        }

        const data = await res.json();
        console.log('Favorito agregado exitosamente:', data);

        // Almacenar el ID de la imagen en el array de favoritos guardados
        savedFavorites.push(imageId);

        const imageResponse = await fetch(`${API_BASE_URL}/images/${imageId}?api_key=${API_KEY}`);
        const imageData = await imageResponse.json();

        if (!imageData || !imageData.url) {
            throw new Error("No se pudo obtener la URL de la imagen.");
        }

        const section = document.getElementById('favoriteMichis');
        if (!section) {
            console.error('Contenedor "favoriteMichis" no encontrado');
            return;
        }

        const article = document.createElement('article');
        const img = document.createElement('img');
        const btn = document.createElement('button');
        const btnText = document.createTextNode('Eliminar😿');

        img.src = imageData.url;
        img.width = 150;
        img.classList.add('cat-image');

        btn.appendChild(btnText);
        btn.classList.add('remove-fav-btn');

        article.classList.add('cat-item');

        article.appendChild(img);
        article.appendChild(btn);
        section.appendChild(article);

        btn.addEventListener('click', () => {
            removeFavoriteCat(data.id, article);
        });
    } catch (error) {
        handleError("Error al agregar a favoritos", error);
    }
};


const removeFavoriteCat = async (favoriteId, articleElement) => {
    try {
        const res = await fetch(`${API_BASE_URL}/favourites/${favoriteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            }
        });

        if (!res.ok) {
            throw new Error(`Error al eliminar favorito: ${res.status}`);
        }

        console.log('Gato eliminado de favoritos');
        articleElement.remove();
    } catch (error) {
        handleError('Error al eliminar el favorito', error);
    }
};

// Initial Load
loadRandomCats();
loadFavoritesCats();