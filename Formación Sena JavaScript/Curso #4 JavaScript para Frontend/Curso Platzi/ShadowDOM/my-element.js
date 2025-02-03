class myElement extends HTMLElement {
    constructor() {
        super();
        //Abrir directamente el shadow DOM para ver mi elemento por dentro lo que tiene el contenido
        this.attachShadow({ mode: "open" });
    }
    getTemplate() {
        const template = document.createElement("template");
        template.innerHTML = `
        <section>
            <h2>Hola mundo desde Shadow DOM!</h2>
            <div>
            <p class="parrafo">Soy texto ejempleo Shadow DOM</p>
            </div>
        </section>
        ${this.getStyles()}
        `;
        return template;
    }

    getStyles() {
        return `
        <style>
        h2 {
         color:red;
         font-size: 3rem;
        }
        .parrafo{
         font-size:2rem;
        }
        </style>
        
        `;
    }
    render() {
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }

    connectedCallback() {
        this.render();
    }
}

customElements.define('my-element', myElement);

