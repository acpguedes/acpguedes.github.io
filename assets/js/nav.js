(function () {
  var toggle = document.querySelector("[data-articles-toggle]");

  if (toggle) {
    var header = toggle.closest(".site-header");
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
      if (!menu.hidden && !toggle.contains(event.target) && !menu.contains(event.target)) {
        setOpen(false);
      }
    });

    header.addEventListener("focusout", function (event) {
      if (event.relatedTarget && !toggle.contains(event.relatedTarget) && !menu.contains(event.relatedTarget)) {
        setOpen(false);
      }
    });
  }

  // Code blocks: language label + copy button; keyboard-scrollable when they overflow.
  document.querySelectorAll(".post-content div.highlighter-rouge").forEach(function (block) {
    var pre = block.querySelector("pre");
    if (!pre) return;
    var lang = (block.className.match(/language-(\S+)/) || [])[1] || "code";
    var head = document.createElement("div");
    head.className = "code-head";
    head.innerHTML = '<span class="code-lang"></span><button type="button" class="code-copy">Copy</button>';
    head.firstChild.textContent = lang;
    var btn = head.lastChild;
    btn.addEventListener("click", function () {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(pre.innerText).then(function () {
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = "Copy"; }, 1600);
      });
    });
    block.insertBefore(head, block.firstChild);
  });

  document.querySelectorAll("pre").forEach(function (pre) {
    if (pre.scrollWidth > pre.clientWidth) pre.tabIndex = 0;
  });
})();
