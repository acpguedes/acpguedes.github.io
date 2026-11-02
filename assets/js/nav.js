(function () {
  var toggle = document.querySelector("[data-articles-toggle]");

  if (toggle) {
    var item = toggle.parentNode;
    var menu = document.getElementById(toggle.getAttribute("aria-controls"));

    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      menu.hidden = !open;
    };

    document.querySelector("[data-articles-link]").hidden = true;
    toggle.hidden = false;

    toggle.addEventListener("click", function () {
      setOpen(menu.hidden);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !menu.hidden) {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (!item.contains(event.target)) {
        setOpen(false);
      }
    });

    item.addEventListener("focusout", function (event) {
      if (event.relatedTarget && !item.contains(event.relatedTarget)) {
        setOpen(false);
      }
    });
  }

  // Let keyboard users scroll long code blocks.
  document.querySelectorAll("pre").forEach(function (pre) {
    if (pre.scrollWidth > pre.clientWidth) {
      pre.tabIndex = 0;
    }
  });
})();
