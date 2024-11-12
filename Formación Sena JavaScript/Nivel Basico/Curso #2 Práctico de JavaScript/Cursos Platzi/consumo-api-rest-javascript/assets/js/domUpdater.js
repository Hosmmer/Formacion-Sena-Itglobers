// domUpdater.js

export const updateImages = (data) => {
    const images = document.querySelectorAll(".cat-img");
    images.forEach((img, index) => {
        img.src = data[index]?.url || "./assets/img/loading.jpg";
    });
};

export const displayFavorites = (favorites) => {
    const section = document.getElementById('favoriteMichis');
    if (!section) {
        console.error('El contenedor "favoriteMichis" no existe');
        return;
    }

    section.innerHTML = '';

    if (favorites.length === 0) {
        const spanError = document.getElementById("errorRes");
        spanError.textContent = "No tienes gatos favoritos con imágenes válidas.";
        document.getElementById("errorContainer").style.display = "block";
        return;
    }

    favorites.forEach(michi => {
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
};
