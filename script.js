chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: "Focus on item",
    contexts: ["all"],
    id: "select-element",
  });
  chrome.contextMenus.create({
    title: "Focus on parent",
    contexts: ["all"],
    id: "select-parent-element",
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "select-parent-element") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: function () {
        if (document.lastSelectedItem) {
          document.lastSelectedItem.style.backgroundColor = "";
        }
        console.warn("search for parent");
        const selectedItem = document.querySelector("[am-selected]");
        const selected = selectedItem.parentElement;
        selected.setAttribute("am-selected", "true");
        console.warn({ selected });

        if (selected) {
          selected.style.zIndex = "2147483647";
          const styles = window.getComputedStyle(selected);
          console.warn(styles.position);
          selected.style.position = "relative";

          selected.style.backgroundColor = "initial!important";
        }

        document.lastSelectedItem = selected;

        const overlay =
          document.querySelector("my-super-overlay") ||
          document.createElement("div");
        overlay.id = "my-super-overlay";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.zIndex = "2147483646";
        overlay.style.backgroundColor = "rgba(255, 255, 255, 0.7)";

        selected.parentElement.appendChild(overlay);

        overlay.addEventListener("click", () => overlay.remove());
      },
    });
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: function () {
        if (document.lastSelectedItem) {
          document.lastSelectedItem.style.backgroundColor = "";
        }
        const selected = document.querySelector("[am-selected]");
        console.warn({ selected });

        if (selected) {
          selected.style.zIndex = "2147483647";
          const styles = window.getComputedStyle(selected);
          console.warn(styles.position);
          if (!styles.position) {
          }
          selected.style.position = "relative";

          selected.style.backgroundColor = "initial!important";
        }

        document.lastSelectedItem = selected;

        const overlay =
          document.querySelector("my-super-overlay") ||
          document.createElement("div");
        overlay.id = "my-super-overlay";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.zIndex = "2147483646";
        overlay.style.backgroundColor = "rgba(255, 255, 255, 0.7)";

        selected.parentElement.appendChild(overlay);

        overlay.addEventListener("click", () => overlay.remove());
      },
    });
  }
});
