class MyCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    getTemplate() {
        const template = document.createElement('template');
        template.innerHTML = `
        <article class="card">
            <div class="card-header">
                <slot name="image"></slot>
            </div>
            <div class="card-body">
                <h3 class="card-title">
                    <slot name="title"></slot>
                </h3>
                <p class="card-description">
                    <slot name="description"></slot>
                </p>
            </div>
            <div class="card-footer">
                <slot name="footer"></slot>
            </div>
        </article>
        ${this.getStyles()}
        `;
        return template;
    }

    getStyles() {
        return `
        <style>
            :host {
                display: block;
                margin: 1rem;
                font-family: Arial, sans-serif;
            }

            /* Tarjeta base */
            .card {
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s, box-shadow 0.3s;
            }

            .card:hover {
                transform: translateY(-5px);
                box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
            }

            /* Cabecera */
            .card-header {
                height: 200px;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                background: #eee;
            }

            ::slotted(img) {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            /* Cuerpo */
            .card-body {
                padding: 1rem;
                background: var(--card-bg, white);
            }

            .card-title {
                font-size: 1.5rem;
                margin: 0;
                color: var(--title-color, #333);
            }

            .card-description {
                font-size: 1rem;
                margin: 0.5rem 0 0;
                color: var(--description-color, #666);
            }

            /* Pie */
            .card-footer {
                padding: 1rem;
                text-align: center;
                background: var(--footer-bg, #f8f8f8);
            }

            ::slotted(button) {
                padding: 0.5rem 1rem;
                border: none;
                border-radius: 5px;
                background-color: var(--button-bg, #007bff);
                color: white;
                font-size: 1rem;
                cursor: pointer;
                transition: background-color 0.3s;
            }

            ::slotted(button:hover) {
                background-color: var(--button-hover-bg, #0056b3);
            }

            /* Colores temáticos */
            :host(.yellow) {
                --card-bg: #fef7dc;
                --title-color: #cc8e35;
                --description-color: #8a5d25;
                --footer-bg: #fae3b4;
            }

            :host(.blue) {
                --card-bg: #e8f7fe;
                --title-color: #105e81;
                --description-color: #2b4d5b;
                --footer-bg: #cfe9f7;
            }

            :host(.pink) {
                --card-bg: #fbe5e7;
                --title-color: #a14063;
                --description-color: #6a2a3d;
                --footer-bg: #f8c8d1;
            }

            /* Diseño responsivo */
            @media (max-width: 768px) {
                .card {
                    margin: 0.5rem;
                }

                .card-header {
                    height: 150px;
                }
            }

            @media (max-width: 480px) {
                .card {
                    margin: 0.25rem;
                }

                .card-header {
                    height: 120px;
                }

                .card-body {
                    padding: 0.5rem;
                }

                .card-title {
                    font-size: 1.2rem;
                }

                .card-description {
                    font-size: 0.9rem;
                }
            }
        </style>
        `;
    }

    render() {
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }

    connectedCallback() {
        this.render();
    }
}

customElements.define('my-host', MyCard);
