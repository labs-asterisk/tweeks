let observer = new MutationObserver(callback);
    
function callback (mutations) {
    const viewElems = document.querySelectorAll("[aria-label*='Views']");
    for (const elem of viewElems) {
        elem.parentNode.remove();
    }
    const analyticsElems = document.querySelectorAll("[aria-label*='View Tweet analytics']");
    for (const elem of analyticsElems) {
        elem.parentNode.remove();
    }
    const spanElems = document.evaluate("//span[text()='Views']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0; i < spanElems.snapshotLength; i++) {
        spanElems.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.remove();
    }
}

observer.observe(document.getElementById("react-root"), {subtree: true, childList: true});