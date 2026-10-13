// ==========================================
// Muzahidul Islam - portfolio script
// ==========================================


// ---- footer year ----
document.getElementById("year").textContent = new Date().getFullYear();


// ---- navbar gets a darker background after scrolling a bit ----
const navbar = document.querySelector(".navbar");

function updateNavbar() {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
}

updateNavbar();
window.addEventListener("scroll", updateNavbar, { passive: true });


// ---- highlight the nav link of the section you're reading ----
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + entry.target.id
            );
        });
    });

}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach(section => sectionObserver.observe(section));


// ---- close the mobile menu after tapping a link ----
const navbarCollapse = document.querySelector(".navbar-collapse");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (navbarCollapse.classList.contains("show")) {
            bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
        }
    });
});


// ---- live clock inside the Digital Clock project card ----
const previewClock = document.getElementById("previewClock");

if (previewClock) {
    const tick = () => {
        previewClock.textContent = new Date().toLocaleTimeString("en-GB", {
            timeZone: "Asia/Dhaka"
        });
    };

    tick();
    setInterval(tick, 1000);
}


// ---- Subtle custom cursor (desktop / fine pointer only) ----
document.addEventListener("DOMContentLoaded", () => {
    if (window.matchMedia("(pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const cursor = document.createElement("span");
        const ring = document.createElement("span");
        cursor.className = "custom-cursor-dot";
        ring.className = "custom-cursor-ring";
        cursor.setAttribute("aria-hidden", "true");
        ring.setAttribute("aria-hidden", "true");
        document.body.append(cursor, ring);

        let x = window.innerWidth / 2, y = window.innerHeight / 2;
        let rx = x, ry = y;
        document.addEventListener("mousemove", (event) => {
            x = event.clientX; y = event.clientY;
            cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }, { passive: true });

        const animateRing = () => {
            rx += (x - rx) * 0.18;
            ry += (y - ry) * 0.18;
            ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
            requestAnimationFrame(animateRing);
        };
        animateRing();

        document.querySelectorAll("a, button, input, textarea, select, [role='button']").forEach(el => {
            el.addEventListener("mouseenter", () => ring.classList.add("is-hovering"));
            el.addEventListener("mouseleave", () => ring.classList.remove("is-hovering"));
        });
    }
});

// Respect reduced-motion preferences and smooth in-page navigation.
document.documentElement.style.scrollBehavior =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
