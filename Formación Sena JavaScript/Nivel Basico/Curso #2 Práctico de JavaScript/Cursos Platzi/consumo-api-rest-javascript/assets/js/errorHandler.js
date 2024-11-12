// errorHandler.js

export const handleError = (message, error) => {
    console.error(`${message}: ${error}`);

    const spanError = document.getElementById("errorRes");
    spanError.textContent = `Oops! Something went wrong: ${error.message || error}. Please try again later.`;

    const errorImage = document.getElementById("errorImage");
    errorImage.src = "./assets/img/gatoAguacate.jpg";

    const errorContainer = document.getElementById("errorContainer");
    errorContainer.style.display = "block";
};
