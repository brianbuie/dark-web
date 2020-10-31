const script = document.createElement("script");
script.type = "text/javascript";
script.async = true;
script.src = _BUNDLE_SRC_;
document.querySelector("head").appendChild(script);
chrome.runtime.onMessage.addListener((message) => {
  if (message !== "ICON_CLICK") return;
  document.dispatchEvent(new CustomEvent("ICON_CLICK"));
});
