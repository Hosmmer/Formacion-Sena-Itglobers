const API_KEY = "live_CstxJOGFFgI3OM9sszMAqm3GxKye3UgQMNBAstyJPbmDCpeZiRwvs3YOj30diY8f";
const API_BASE_URL = "https://api.thecatapi.com/v1";
const API_LIMIT = 3;
const spanError = document.getElementById("errorRes");

// API Endpoints    
const ENDPOINTS = {
    RANDOM: `${API_BASE_URL}/images/search?limit=${API_LIMIT}`,
    FAVOURITE: `${API_BASE_URL}/favourites`,
    UPLOAD: `${API_BASE_URL}/images/upload`,
};

// Error Handling
const handleError = (message, error) => {
    console.error(`${message}: ${error}`);

    spanError.textContent = `Oops! Esta teniendo Problemas API CATS: ${error.message || error}. Por Favor Espere Un Momento.`;
    const errorImage = document.getElementById("errorImage");
    errorImage.src = "./assets/img/gatoAguacate.jpg";

    const errorContainer = document.getElementById("errorContainer");
    errorContainer.style.display = "block";
};

// Function to update images in the DOM
const updateImages = (data) => {
    const images = document.querySelectorAll(".cat-img");
    images.forEach((img, index) => {
        img.src = data[index]?.url || "./assets/img/loading.jpg";
    });
};

// Function to remove all event listeners (to prevent duplication of events)
const clearFavoriteEventListeners = () => {
    const favoriteButtons = document.querySelectorAll(".button-fav");
    favoriteButtons.forEach((button) => {
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
    });
};

// Function to assign favorite buttons
const assignFavoriteButtons = () => {
    clearFavoriteEventListeners();

    const favoriteButtons = document.querySelectorAll(".button-fav");
    favoriteButtons.forEach((button, index) => {
        const imageId = document.querySelectorAll(".cat-img")[index].getAttribute("src").split('/').pop().split('.')[0];
        button.setAttribute("data-id", imageId);

        button.addEventListener("click", () => {
            const imageId = button.getAttribute("data-id");
            saveFavoritesCat(imageId);
        });
    });
};

// Function to load random cats
const loadRandomCats = async () => {
    document.getElementById("errorContainer").style.display = "none";

    try {
        const response = await fetch(ENDPOINTS.RANDOM);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        } else {
            const data = await response.json();
            updateImages(data);
            assignFavoriteButtons();
        }
    } catch (error) {
        handleError("Error loading random images", error);
    }
};

// Array to store favorite IDs
const savedFavorites = [];

// Function to load favorites
const loadFavoritesCats = async () => {
    try {
        const res = await fetch(ENDPOINTS.FAVOURITE, {
            method: "GET",
            headers: {
                'X-API-KEY': API_KEY,
            },
        });

        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        savedFavorites.length = 0;
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
            validFavorites.forEach(michi => {
                savedFavorites.push(michi.image.id);
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

// Function to save favorite cat
const saveFavoritesCat = async (imageId) => {
    if (savedFavorites.includes(imageId)) {
        console.log("Esta imagen ya está en favoritos.");
        return;
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
        savedFavorites.push(imageId);
        await loadFavoritesCats(); // Reload favorites to display the new favorite
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

const uploadMichiPhoto = async (event) => {
    event.preventDefault();

    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    try {
        const uploadResponse = await fetch(ENDPOINTS.UPLOAD, {
            method: 'POST',
            headers: {
                'X-API-KEY': API_KEY,
            },
            body: formData,
        });

        if (!uploadResponse.ok) {
            throw new Error(`Error ${uploadResponse.status}: ${uploadResponse.statusText}`);
        }

        const uploadData = await uploadResponse.json();
        console.log("Foto subida con éxito:", uploadData);

        const imageId = uploadData.id;
        const favoriteResponse = await fetch(ENDPOINTS.FAVOURITE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            },
            body: JSON.stringify({ image_id: imageId }),
        });

        if (!favoriteResponse.ok) {
            const errorData = await favoriteResponse.json();
            throw new Error(errorData.message || 'Error al agregar a favoritos');
        }

        alert("La foto del michi se ha subido y agregado a favoritos con éxito!");
        await loadFavoritesCats();
    } catch (error) {
        handleError("Error al subir la foto del michi o agregar a favoritos", error);
    }
};

function previewThumbnail(event) {
    const file = event.target.files[0];
    const container = document.getElementById('thumbnailContainer');

    // Clear any existing previews
    container.innerHTML = '';

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail-item');

            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'Vista previa del michi';

            thumbnail.appendChild(img);
            container.appendChild(thumbnail);
        };

        reader.readAsDataURL(file);
    }
}
function closeErrorPopup() {
    document.getElementById("errorContainer").style.display = "none";
}


// Initialize loading functions
loadFavoritesCats();
loadRandomCats();
