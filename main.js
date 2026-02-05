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