let config = {
    'views': false,
    'explore': true, 
    'bookmarks': true, 
    'lists': true,
    'messages': true, 
    'happening': true,
    'whotofollow': true
}

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

chrome.storage.local.get(['views', 'explore', 'bookmarks', 'lists', 'messages', 'happening', 'whotofollow'], function(result) {
    config.views = result.views;
    config.explore = result.explore;
    config.bookmarks = result.bookmarks;
    config.lists = result.lists;
    config.messages = result.messages;
    config.happening = result.happening;
    config.whotofollow = result.whotofollow;
});


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.hideViews) {
            config.views = !config.views;
            chrome.storage.local.set({'views': config.views}, function() {});
            sendResponse({status: true});
        }

        if (request.hideExplore) {
            config.explore = !config.explore;
            chrome.storage.local.set({'explore': config.explore}, function() {});
            sendResponse({status: true});
        }

        if (request.hideBookmarks) {
            config.bookmarks = !config.bookmarks;
            chrome.storage.local.set({'bookmarks': config.bookmarks}, function() {});
            sendResponse({status: true});
        }
        
        if (request.hideLists) {
            config.lists = !config.lists;
            chrome.storage.local.set({'lists': config.lists}, function() {});
            sendResponse({status: true});
        }

        if (request.hideMessages) {
            config.messages = !config.messages;
            chrome.storage.local.set({'messages': config.messages}, function() {});
            sendResponse({status: true});
        }
        
        if (request.hideHappening) {
            config.happening = !config.happening;
            chrome.storage.local.set({'happening': config.happening}, function() {});
            sendResponse({status: true});
        }

        if (request.hideWhoToFollow) {
            config.whotofollow = !config.whotofollow;
            chrome.storage.local.set({'whotofollow': config.whotofollow}, function() {});
            sendResponse({status: true});
        }

        return true;
    }
);
