/* Probashi Housing Society LTD - basic JavaScript */

const COMPANY_EMAIL = "probashipropertieshousingsocietyltd@gmail.com";

/* ---------- Bangladesh clock ---------- */
function updateBDClock() {
  const now = new Date();
  document.getElementById("bdClock").textContent = new Intl.DateTimeFormat("en-BD", {
    timeZone: "Asia/Dhaka",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  }).format(now);
  document.getElementById("bdDate").textContent = new Intl.DateTimeFormat("en-BD", {
    timeZone: "Asia/Dhaka",
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(now) + " · Bangladesh";
}
updateBDClock();
setInterval(updateBDClock, 1000);

document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Navbar shadow + back to top ---------- */
const navbar = document.getElementById("mainNav");
const toTop = document.getElementById("toTop");

window.addEventListener("scroll", function () {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
  toTop.classList.toggle("show", window.scrollY > 400);
});
toTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* close mobile menu after clicking a link */
document.querySelectorAll("#nav .nav-link, #nav .btn").forEach(function (link) {
  link.addEventListener("click", function () {
    const menu = document.getElementById("nav");
    if (menu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

/* ---------- Reveal on scroll ---------- */
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(function (el) { io.observe(el); });
} else {
  revealEls.forEach(function (el) { el.classList.add("visible"); });
}

/* ---------- Property filter ---------- */
const fType = document.getElementById("fType");
const fLocation = document.getElementById("fLocation");
const fBudget = document.getElementById("fBudget");
const props = document.querySelectorAll("#propertyGrid .prop");
const noResult = document.getElementById("noResult");

function applyFilters() {
  const type = fType.value;
  const loc = fLocation.value;
  const minBudget = parseFloat(fBudget.value);
  let shown = 0;

  props.forEach(function (card) {
    const price = parseFloat(card.dataset.price); // in Crore, 0 = price on request
    const okType = type === "all" || card.dataset.type === type;
    const okLoc = loc === "all" || card.dataset.location === loc;
    const okBudget = minBudget === 0 || price >= minBudget;
    const visible = okType && okLoc && okBudget;
    card.classList.toggle("d-none", !visible);
    if (visible) shown++;
  });

  noResult.style.display = shown === 0 ? "block" : "none";
}

[fType, fLocation, fBudget].forEach(function (el) {
  el.addEventListener("change", applyFilters);
});

document.getElementById("fReset").addEventListener("click", function () {
  fType.value = "all";
  fLocation.value = "all";
  fBudget.value = "0";
  applyFilters();
});

/* hero search -> copies values to filter and scrolls to properties */
document.getElementById("heroSearch").addEventListener("click", function () {
  fType.value = document.getElementById("heroType").value;
  fLocation.value = document.getElementById("heroLocation").value;
  fBudget.value = document.getElementById("heroBudget").value;
  applyFilters();
  document.getElementById("properties").scrollIntoView({ behavior: "smooth" });
});

/* ---------- "Request details" buttons fill the contact form ---------- */
const interestSelect = document.getElementById("cInterest");
const messageBox = document.getElementById("cMessage");

document.querySelectorAll("[data-interest]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const value = btn.dataset.interest;
    const options = Array.from(interestSelect.options).map(function (o) { return o.value || o.text; });

    if (options.indexOf(value) !== -1) {
      interestSelect.value = value;
    } else {
      // a property / project name
      interestSelect.value = "Project Information";
      messageBox.value = "I would like to know more about " + value + ".";
    }
  });
});

/* ---------- Contact form (opens the visitor's email app) ---------- */
const form = document.getElementById("contactForm");
const formAlert = document.getElementById("formAlert");

function showAlert(type, text) {
  formAlert.className = "alert alert-" + type + " mb-0";
  formAlert.textContent = text;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("cName").value.trim();
  const phone = document.getElementById("cPhone").value.trim();
  const email = document.getElementById("cEmail").value.trim();
  const interest = interestSelect.value;
  const message = messageBox.value.trim();

  if (!name || !phone || !message) {
    showAlert("danger", "Please fill in your name, phone number and message.");
    return;
  }
  if (!/^[+0-9\-\s()]{7,20}$/.test(phone)) {
    showAlert("danger", "Please enter a valid phone number.");
    return;
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showAlert("danger", "Please enter a valid email address.");
    return;
  }

  const subject = "Website Inquiry" + (interest ? " - " + interest : "") + " (" + name + ")";
  const body =
    "Name: " + name + "\n" +
    "Phone: " + phone + "\n" +
    (email ? "Email: " + email + "\n" : "") +
    (interest ? "Interested in: " + interest + "\n" : "") +
    "\nMessage:\n" + message;

  window.location.href =
    "mailto:" + COMPANY_EMAIL +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);

  showAlert("success", "Thank you, " + name + "! Your email app should open now. Please press Send there to complete your inquiry.");
  form.reset();
});
