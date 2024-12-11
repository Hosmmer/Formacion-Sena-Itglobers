class myElement extends HTMLElement {
    constructor() {
        super();

        //para ver mis elementos desde el inspector devTools
        // const template = document.getElementById('my-template');
        // const content = template.content.cloneNode(true);
        // this.attachShadow({ mode: 'open' }).appendChild(content);
    }
    getTemplate() {
        const template = document.createElement("template");
        template.innerHTML = `
        <section>
            <h2>Hola mundo!</h2>
            <div>
            <p>Soy texto ejempleo</p>
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
        </style>
        
        `;
    }
    render() {
        this.appendChild(this.getTemplate().content.cloneNode(true));
    }

    connectedCallback() {
        this.render();
    }
}

customElements.define('my-element', myElement);

