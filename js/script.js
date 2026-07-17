document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("mainNav");

  if (!header || !toggle || !nav) return;

  function setMenu(open) {
    header.classList.toggle("open", open);
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  toggle.addEventListener("click", function () {
    setMenu(!header.classList.contains("open"));
  });

  nav.addEventListener("click", function (event) {
    if (event.target && event.target.tagName === "A") setMenu(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setMenu(false);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 920) setMenu(false);
  });
});
