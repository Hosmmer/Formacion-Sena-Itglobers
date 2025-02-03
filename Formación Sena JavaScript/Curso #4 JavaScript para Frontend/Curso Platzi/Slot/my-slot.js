class mySlot extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    getTemplate() {
        const template = document.createElement("template");
        template.innerHTML = `
        <section>
            <h2>
                <slot></slot>
            </h2>
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

customElements.define('my-slot', mySlot);
