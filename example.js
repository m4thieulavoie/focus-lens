document.addEventListener("click", function (e) {
  if (document.querySelector("#my-super-overlay")) {
    document.querySelector("#my-super-overlay").remove();
  }

  document.querySelectorAll("[am-selected]").forEach((e) => {
    e.removeAttribute("am-selected");
    e.style.zIndex = "";
    e.style.position = "";
  });

  e.target.setAttribute("am-selected", "true");

  if (document.shouldHoverStuff) {
    document.focusOnElement(e.target);
  }
});

document.querySelector("body").addEventListener("mouseover", (e) => {
  if (document.shouldHoverStuff && !document.isFocused) {
    const el = e.target;
    document
      .querySelectorAll("[focus-lens-hover]")
      .forEach((e) => e.removeAttribute("focus-lens-hover"));
    el.setAttribute("focus-lens-hover", "true");
  }
});

const style = document.createElement("style");
style.innerHTML = "[focus-lens-hover] { border: 1px solid red; }";
document.querySelector("body").appendChild(style);

document.focusOnElement = (element) => {
  if (document.lastSelectedItem) {
    document.lastSelectedItem.style.backgroundColor = "";
  }

  if (element) {
    element.style.zIndex = "2147483647";
    element.removeAttribute("focus-lens-hover");
    const styles = window.getComputedStyle(element);
    console.warn(styles.position);
    if (!styles.position) {
    }
    element.style.position = "relative";

    element.style.backgroundColor = "initial!important";
  }

  document.isFocused = true;
  document.lastSelectedItem = element;

  const overlay =
    document.querySelector("my-super-overlay") || document.createElement("div");
  overlay.id = "my-super-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.zIndex = "2147483646";
  overlay.style.backgroundColor = "rgba(255, 255, 255, 0.7)";

  if (element.parentElement) {
    element.parentElement.appendChild(overlay);
  }

  overlay.addEventListener("click", () => {
    document.isFocused = false;
    overlay.remove();
  });
};
