const button = document.querySelector("button");

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

button.addEventListener("click", () => {
  console.warn("clicked");
  getCurrentTab().then((data) => {
    console.warn({ data });
    chrome.scripting.executeScript({
      target: { tabId: data.id, allFrames: true },
      function: function () {
        console.warn("clicked");
        document.shouldHoverStuff = true;
      },
    });
  });
});
