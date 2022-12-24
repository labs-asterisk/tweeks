let observer = new MutationObserver(callback);
    
function callback (mutations) {
    const viewElems = document.querySelectorAll("[aria-label*='Views']");
    for (const elem of viewElems) {
        elem.remove();
    }
    const analyticsElems = document.querySelectorAll("[aria-label*='View Tweet analytics']");
    for (const elem of analyticsElems) {
        elem.remove();
    }
}

observer.observe(document.getElementById("react-root"), {subtree: true, childList: true});
