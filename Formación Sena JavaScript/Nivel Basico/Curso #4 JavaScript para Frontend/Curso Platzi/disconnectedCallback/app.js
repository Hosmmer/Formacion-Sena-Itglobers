class MyCustomElement extends HTMLElement {

    constructor() {
        super();
        console.log("Hola desde el constructor");
    }
    connectedCallback() {
        console.log("Hola desde el DOM");
    }

    disconnectedCallback() {
        console.log("Adios del DOM");
    }
}

customElements.define("my-custome-elment", MyCustomElement);

document.querySelector("my-custome-elment").remove();