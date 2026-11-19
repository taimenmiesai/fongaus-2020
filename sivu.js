// Kuvien suurennus
(function () {
  var lb = document.querySelector(".lightbox");
  if (!lb) return;
  var img = lb.querySelector("img");
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a.zoom");
    if (!a) return;
    e.preventDefault();
    var i = a.querySelector("img");
    img.src = a.getAttribute("href");
    img.alt = i ? i.alt : "";
    lb.hidden = false;
  });
  function close() { lb.hidden = true; img.removeAttribute("src"); }
  lb.addEventListener("click", close);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) close(); });
})();

// Lajilistan suodatus kuukauden mukaan
(function () {
  var btns = document.querySelectorAll(".filters button");
  if (!btns.length) return;
  var rows = document.querySelectorAll("table.species tbody tr:not(.extra)");
  var extra = document.querySelector("table.species tr.extra");
  btns.forEach(function (b) {
    b.addEventListener("click", function () {
      var f = b.getAttribute("data-f");
      btns.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      rows.forEach(function (r) { r.hidden = !!f && r.getAttribute("data-m") !== f; });
      if (extra) extra.hidden = !!f;
    });
  });
})();
