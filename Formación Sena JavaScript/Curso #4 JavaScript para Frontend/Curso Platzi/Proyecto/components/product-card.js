class productCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    //Observar los valores que viene en nuestra data o API
    static get observedAttributes() {

        return ["img", "title", "price", "description", "collection"];
    }

    //con estos atributos y valores podemos hacer las variaciones en la data
    attributeChangedCallback(attr, oldVal, newVal) {
        if (oldVal === newVal) return; // Evita actualizaciones innecesarias

        try {
            switch (attr) {
                case "img":
                    if (typeof newVal === "string" && newVal.trim() !== "") {
                        this.img = newVal;
                    } else {
                        console.error(`Invalid value for 'img': ${newVal}`);
                    }
                    break;

                case "title":
                    if (typeof newVal === "string" && newVal.trim() !== "") {
                        this.title = newVal;
                    } else {
                        console.error(`Invalid value for 'title': ${newVal}`);
                    }
                    break;

                case "price":
                    const parsedPrice = parseFloat(newVal);
                    if (!isNaN(parsedPrice) && parsedPrice >= 0) {
                        this.price = `$${parsedPrice.toFixed(0)} USD`; // Formato siempre como "$300.00 USD"
                    } else {
                        console.error(`Invalid value for 'price': ${newVal}`);
                        this.price = "$0 USD"; // Valor predeterminado en caso de error
                    }
                    break;

                case "description":
                    if (typeof newVal === "string") {
                        this.description = newVal;
                    } else {
                        console.error(`Invalid value for 'description': ${newVal}`);
                    }
                    break;

                case "collection":
                    if (typeof newVal === "string") {
                        this.collection = newVal;
                    } else {
                        console.error(`Invalid value for 'collection': ${newVal}`);
                    }
                    break;

                default:
                    console.warn(`Unhandled attribute: ${attr}`);
            }
        } catch (error) {
            console.error(`Error processing attribute '${attr}':`, error);
        }
    }


    getTemplate() {
        const template = document.createElement("template");

        template.innerHTML = `
        <main class="container">
        <section class="imgBox">
            <img src="${this.img}" alt="Zapatos Deportivos" />
        </section>
        <section class="details">
            <div class="content">
              <h2>${this.title} <span>${this.collection}</span></h2>

              <p>${this.description}</p>

              <h3>${this.price}</h3>
              <button>Comprar</button>
            </div>
        </section>
        </main>
        ${this.getStyles()}
       `;
        return template;
    }
    getStyles() {
        return `
    <style>

     :host {
        --primary-background: #5a6cb2;
          width: 80%;
          max-width: 900px;
          min-width: 280px;
          margin: 0 auto;
      }
      .container {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          width: 900px;
          height: 600px;
          margin: 20px;
          background-color: #fff;
      }
      .container .imgBox {
          position: relative;
          display: flex;
          justify-content: center;
          width: 50%;
          height: 100%;
          background-color: var(--primary-background)
      }
      .container .imgBox:before {
          position: absolute;
          top: 20px;
          left: 20px;
          font-size: 8em;
          font-weight: 800;
          color: #000;
          content: 'Nike';
          opacity: 0.1;
      }
      .container .imgBox img {
          position: relative;
          top: 100px;
          left: -50px;
          width: 720px;
          height: 480px;
          transform: rotate(-30deg);
      }
      .container .details {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50%;
          height: 100%;
          box-sizing: border-box;
          padding: 40px;

      }
      .container .details h2 {
          margin-bottom: 25px;
          font-size: 2.5em;
          line-height: 0.8em;
          color: #444;
      }
      .container .details h2 span {
          font-size: 0.4em;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #999;
      }
      .container .details p {
          max-width: 85%;
          margin-left: 15%;
          margin-bottom: 35px;
          color: #333;
          font-size: 15px;
      }
      .container .details h3 {
          float: left;
          font-size: 2.5em;
          color: #a2a2a2;
      }
      .container .details button {
          margin-top: 35px;
          float: right;
          padding: 15px 20px;
          font-size: 16px;
          color: #fff;
          letter-spacing: 1px;
          font-weight: 600;
          text-transform: uppercase;
          border-radius: 40px;
          background-color: #5a6cb2;
          cursor: pointer;
      }
      @media (max-width: 1080px) {
          .container {
              height: auto;
              width: auto;
          }
          .container .imgBox {
              padding: 40px;
              width: 100%;
              box-sizing: border-box;
              height: auto;
              text-align: center;
          }
          .container .imgBox img {
              left: initial;
              width: 100%;
              height: auto;
              transform: rotate(0deg);
          }

          .container .details {
              width: 100%;
              height: auto;
              padding: 20px;
          }

          .container .details p {
              max-width: 100%;
              margin-left: 0;
          }
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

customElements.define("product-card", productCard);