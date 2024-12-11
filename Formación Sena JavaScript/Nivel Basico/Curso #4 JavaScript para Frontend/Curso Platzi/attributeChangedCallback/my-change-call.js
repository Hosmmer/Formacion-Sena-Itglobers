class myAtributoChangedCall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Inicializa las propiedades internas
        this._title = "";
        this._parrafo = "";
        this._img = "";
    }

    static get observedAttributes() {
        return ["title", "parrafo", "img"];
    }

    attributeChangedCallback(attrib, oldValue, newValue) {
        // Actualiza las propiedades internas
        if (attrib === "title") {
            this._title = newValue;
        } else if (attrib === "parrafo") {
            this._parrafo = newValue;
        } else if (attrib === "img") {
            this._img = newValue;
        }
        this.render(); // Re-renderiza solo después de actualizar
    }

    getTemplate() {
        const template = document.createElement("template");
        template.innerHTML = `
        <section>
            <h2>${this._title || "Default Title"}</h2>
            <div>
                <p>${this._parrafo || "Default Paragraph"}</p>
                <img src="${this._img || "https://via.placeholder.com/150"}" />
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
            color: red;
            font-size: 2rem;
        }
        p {
            color: brown;
            font-size: 3rem;
        }
        img {
            width: 25%;
            height: 40%;
            background-position: center;
        }
      </style>
        `;
    }

    render() {
        this.shadowRoot.innerHTML = ""; // Limpia el contenido previo
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }

    connectedCallback() {
        // Usa los valores iniciales si están presentes
        this._title = this.getAttribute("title") || "Default Title";
        this._parrafo = this.getAttribute("parrafo") || "Default Paragraph";
        this._img = this.getAttribute("img") || "https://via.placeholder.com/150";
        this.render();
    }
}

customElements.define('my-change-call', myAtributoChangedCall);
