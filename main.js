document.body.classList.replace("no-js", "js");

function setupTestemunho(config) {
    const wrapper = document.querySelector(config.wrapper);

    if(!wrapper) {
        return;
    }

    const items = wrapper.querySelectorAll(config.items);

    if(items.lenght === 0) {
        return;
    }

    if(!window.matchMedia("(width > 90em)")) {
        return;
    }

    wrapper.classList.add("js-enabled");

    items.forEach(item => {
        const clone = item.cloneNode(true);

        wrapper.appendChild(clone); 
    })
}

setupTestemunho({wrapper: ".testimonials-carroussel", items: "img"});

class Setas {
    constructor(selector) {
        this.setas = document.querySelector(selector);
        this.wrapper = this.setas.querySelector("[data-wrapper]");
        this.prev = this.setas.querySelector("[data-prev]");
        this.next = this.setas.querySelector("[data-next]");
        this.indicators = document.getElementById(this.setas.getAttribute("data-indicators"));
        this.items = this.wrapper.querySelectorAll("[data-items]");
        this.currentIndex = 0;
    }

    init() {
        this.createIndicators();
        this.addListeners();
        this.updateBooks();
    }

    createIndicators() {
        this.items.forEach( (item, index) => {
            const indicator = document.createElement("div");
            indicator.classList.add("indicator");

            indicator.setAttribute("data-index", index);
            this.indicators.appendChild(indicator);
        });

        this.indicatorsz = this.indicators.querySelectorAll(".indicator")
    }

    addListeners() {
        this.prev.addEventListener("click", () => {
            this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
            this.updateBooks();
        })

        this.next.addEventListener("click", () => {
            this.currentIndex = (this.currentIndex + 1) % this.items.length;
            this.updateBooks();
        })

        this.indicatorsz.forEach(indicator => {
            indicator.addEventListener("click", e => {
                this.goToSlide(parseInt(e.target.getAttribute("data-index")));
            })
        })
    }

    updateBooks() {
        this.wrapper.style.setProperty("--currentIndex", this.currentIndex);

        this.indicators.querySelector(".active")?.classList.remove("active");
        this.indicators.querySelector(`[data-index='${this.currentIndex}']`).classList.add("active");
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateBooks();
    }
}

new Setas(".books-others-carroussel").init();