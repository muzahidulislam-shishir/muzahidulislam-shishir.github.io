document.addEventListener('DOMContentLoaded', function () {
  setCurrentYear();
  closeMenuOnLinkClick();
  toggleNavShadow();
  setupContactForm();
});

function setCurrentYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}

function closeMenuOnLinkClick() {
  var menu = document.getElementById('navLinks');
  var links = menu.querySelectorAll('a');
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      if (menu.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
}

function toggleNavShadow() {
  var nav = document.getElementById('mainNav');
  function update() {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', update);
  update();
}

function setupContactForm() {
  var form = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    success.hidden = true;
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    form.reset();
    form.classList.remove('was-validated');
    success.hidden = false;
  });
}
