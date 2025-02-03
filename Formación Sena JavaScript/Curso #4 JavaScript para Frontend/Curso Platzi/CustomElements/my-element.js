const template = document.createElement('div');
template.innerHTML = `
<style>
    p {
    font-size: 20px;
    color: blue;

    }
    .texto{
    font-size: 40px;
    color: red
    }
    .texto-color{
    color:#9c27b0;
    }

</style>


<p class="texto">Hola mundo 2!!</p>
<p class="texto-color">Texto Ejemplo</p>

`;


class myElement extends HTMLElement {
    constructor() {
        super();

        this.p = document.createElement('p');
    }

    connectedCallback() {
        this.p.textContent = "Hola mundo!!";
        this.appendChild(this.p);
        this.appendChild(template);
    }
}

customElements.define('my-element', myElement);

