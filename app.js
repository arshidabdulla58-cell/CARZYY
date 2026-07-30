/*====================================
        CARZYYY APP.JS
====================================*/

// Wait until the page is fully loaded

document.addEventListener("DOMContentLoaded", () => {

    initializeNavigation();

    initializeScrollEffects();

    initializeBackToTop();

});

/*====================================
        ACTIVE NAVIGATION
====================================*/

function initializeNavigation() {

    const currentPage = window.location.pathname.split("/").pop();

    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage) {

            link.classList.add("active");

        } else {

            link.classList.remove("active");

        }

    });

}

/*====================================
        STICKY NAVBAR
====================================*/

function initializeScrollEffects() {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            navbar.classList.add("sticky");

        } else {

            navbar.classList.remove("sticky");

        }

    });

}

/*====================================
        SMOOTH SCROLL
====================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});

/*====================================
        BACK TO TOP BUTTON
====================================*/

function initializeBackToTop() {

    let button = document.getElementById("backToTop");

    if (!button) {

        button = document.createElement("button");

        button.id = "backToTop";

        button.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';

        document.body.appendChild(button);

    }

    button.style.display = "none";

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            button.style.display = "flex";

        } else {

            button.style.display = "none";

        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}
/*====================================
        SCROLL REVEAL ANIMATION
====================================*/

function revealElements() {

    const elements = document.querySelectorAll(

        ".hero-content, .car-card, .feature-card, .about-content, .service-card, .why-card"

    );

    const windowHeight = window.innerHeight;

    elements.forEach((element) => {

        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {

            element.classList.add("show");

        }

    });

}

window.addEventListener("scroll", revealElements);

window.addEventListener("load", revealElements);

/*====================================
        COUNTER ANIMATION
====================================*/

function animateCounters() {

    const counters = document.querySelectorAll("[data-count]");

    counters.forEach(counter => {

        const target = Number(counter.dataset.count);

        let current = 0;

        const increment = Math.ceil(target / 100);

        const updateCounter = () => {

            current += increment;

            if (current >= target) {

                counter.textContent = target;

            } else {

                counter.textContent = current;

                requestAnimationFrame(updateCounter);

            }

        };

        updateCounter();

    });

}

window.addEventListener("load", animateCounters);

/*====================================
        MOBILE MENU
====================================*/

const menuButton = document.querySelector(".menu-toggle");

const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("show");

        menuButton.classList.toggle("active");

    });

}

/*====================================
        CLOSE MENU AFTER CLICK
====================================*/

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        if (navLinks) {

            navLinks.classList.remove("show");

        }

        if (menuButton) {

            menuButton.classList.remove("active");

        }

    });

});

/*====================================
        IMAGE FADE-IN
====================================*/

const images = document.querySelectorAll("img");

const imageObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("image-visible");

        }

    });

});

images.forEach(image => {

    imageObserver.observe(image);

});
/*====================================
        PAGE LOADER
====================================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.classList.add("loader-hide");

        setTimeout(() => {

            loader.remove();

        }, 500);

    }

});

/*====================================
        TOAST NOTIFICATION
====================================*/

function showToast(message, type = "success") {

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;

    toast.innerHTML = `

        <i class="fa-solid ${type === "success"
            ? "fa-circle-check"
            : "fa-circle-xmark"}"></i>

        <span>${message}</span>

    `;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show-toast");

    }, 100);

    setTimeout(() => {

        toast.classList.remove("show-toast");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 3000);

}

/*====================================
        LOCAL STORAGE HELPERS
====================================*/

function saveData(key, data) {

    localStorage.setItem(

        key,

        JSON.stringify(data)

    );

}

function loadData(key) {

    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : [];

}

/*====================================
        FORMAT DATE
====================================*/

function formatDate(date) {

    return new Date(date).toLocaleDateString(

        "en-IN",

        {

            day: "2-digit",

            month: "short",

            year: "numeric"

        }

    );

}

/*====================================
        GENERATE UNIQUE ID
====================================*/

function generateID(prefix = "ID") {

    return prefix +

        "_" +

        Date.now() +

        "_" +

        Math.floor(Math.random() * 1000);

}

/*====================================
        CONFIRM DELETE
====================================*/

function confirmDelete(message = "Are you sure?") {

    return confirm(message);

}

/*====================================
        GLOBAL APP OBJECT
====================================*/

const CARZYYY = {

    saveData,

    loadData,

    formatDate,

    generateID,

    showToast,

    confirmDelete

};

window.CARZYYY = CARZYYY;