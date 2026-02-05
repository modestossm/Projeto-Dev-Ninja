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

class bookOthersSetas {
    constructor(selector) {
        this.bookSetas = document.querySelector(selector);
        this.wrapper = this.bookSetas.querySelector("[data-wrapper]");
        this.prev = this.bookSetas.querySelector("[data-prev]");
        this.next = this.bookSetas.querySelector("[data-next]");
        this.items = this.wrapper.querySelectorAll("[data-items]")
        this.indicators = document.getElementById(this.bookSetas.getAttribute("books-others-indicators"));
        this.currentIndex = 0;
    }

    init() {
        console.log(this);
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
    }

    addListeners() {
        this.prev.addEventListener("click", () => {
            this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
            this.updateBooks();
        })

        this.next.addEventListener("click", () => {
            this.currentIndex = (this.currentIndex + 1) % this.currentIndex.length;
            this.updateBooks();
        })

        this.indicators.querySelectorAll(".indicator").forEach(indicator => {
            indicator.addEventListener("click", e => {
                this.goToSlide(parseInt(e.target.getAttribute("data-index")))
            })
        })
    }

    updateBooks() {
        this.wrapper.style.setProperty("--currentIndex", this.currentIndex);

        this.indicators.querySelectorAll("[data-index]").forEach(item => item.classList.remove());
        this.indicators.querySelector(`[data-index='${this.currentIndex}']`).classList.add("active");
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateBooks();
    }
}

new bookOthersSetas(".books-others-carroussel").init();