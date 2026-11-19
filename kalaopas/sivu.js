// Kuvien suurennus
(function () {
  var lb = document.querySelector(".lightbox");
  if (!lb) return;
  var img = lb.querySelector("img");
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a.zoom");
    if (!a) return;
    e.preventDefault();
    img.src = a.getAttribute("href");
    var i = a.querySelector("img"); img.alt = i ? i.alt : "";
    lb.hidden = false;
  });
  function close() { lb.hidden = true; img.removeAttribute("src"); }
  lb.addEventListener("click", close);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) close(); });
})();

// Lajihaku ja suodattimet
(function () {
  var cards = document.querySelectorAll(".scard");
  if (!cards.length) return;
  var input = document.querySelector(".finder input");
  var count = document.querySelector(".finder .count");
  var state = { g: "", t: "", q: "" };
  function apply() {
    var n = 0;
    cards.forEach(function (c) {
      var ok = (!state.g || c.dataset.g === state.g) &&
               (!state.t || (" " + c.dataset.t + " ").indexOf(" " + state.t + " ") >= 0) &&
               (!state.q || c.dataset.n.indexOf(state.q) >= 0);
      c.hidden = !ok; if (ok) n++;
    });
    count.textContent = n + " / " + cards.length + " lajia";
  }
  document.querySelectorAll(".finder .filters").forEach(function (grp) {
    var btns = grp.querySelectorAll("button");
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        var key = b.hasAttribute("data-g") ? "g" : "t";
        state[key] = b.getAttribute("data-" + key);
        btns.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        apply();
      });
    });
  });
  input.addEventListener("input", function () { state.q = input.value.trim().toLowerCase(); apply(); });
  apply();
})();

// Työkaluvihjeet
(function () {
  var tip = document.querySelector(".ctip");
  if (!tip) return;
  document.addEventListener("mouseover", function (e) {
    var t = e.target.closest && e.target.closest("[data-tip]");
    if (!t) { tip.hidden = true; return; }
    var r = t.getBoundingClientRect();
    tip.textContent = t.getAttribute("data-tip");
    tip.style.left = Math.min(Math.max(r.left + r.width / 2, 160), window.innerWidth - 160) + "px";
    tip.style.top = r.top + "px";
    tip.hidden = false;
  });
  document.addEventListener("scroll", function () { tip.hidden = true; }, { passive: true });
})();
