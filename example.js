document.stuff = document.stuff || {};

document.addEventListener("click", function (e) {
  document.stuff.lastSelected = e.target;

  if (document.querySelector("#my-super-overlay")) {
    document.querySelector("#my-super-overlay").remove();
  }

  document.querySelectorAll("[am-selected]").forEach((e) => {
    e.removeAttribute("am-selected");
    e.style.zIndex = "";
    e.style.position = "";
  });

  e.target.setAttribute("am-selected", "true");
});
