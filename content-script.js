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
    console.log(config);
    if (!config.views) {
        const viewElems = document.querySelectorAll("[aria-label*='Views']");
        for (const elem of viewElems) {
            elem.parentNode.style.display = "none";
        }
        const analyticsElems = document.querySelectorAll("[aria-label*='View Tweet analytics']");
        for (const elem of analyticsElems) {
            elem.parentNode.style.display = "none";
        }
        const spanElems = document.evaluate("//span[text()='Views']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (let i = 0; i < spanElems.snapshotLength; i++) {
            spanElems.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.style.display = "none";
        }
    } else {
        const viewElems = document.querySelectorAll("[aria-label*='Views']");
        for (const elem of viewElems) {
            elem.parentNode.style.display = "block";
        }
        const analyticsElems = document.querySelectorAll("[aria-label*='View Tweet analytics']");
        for (const elem of analyticsElems) {
            elem.parentNode.style.display = "block";
        }
        const spanElems = document.evaluate("//span[text()='Views']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (let i = 0; i < spanElems.snapshotLength; i++) {
            spanElems.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.style.display = "block";
        }
    }

    const exploreElem = document.querySelector("[aria-label='Search and explore']");
    if (exploreElem != null) {
        if (!config.explore) {
            exploreElem.style.display = "none";
        } else {
            exploreElem.style.display = "";
        }
    }
    
    const bookmarkElem = document.querySelector("[aria-label='Bookmarks']");
    if (bookmarkElem != null) {
        if (!config.bookmarks) {
            bookmarkElem.style.display = "none";
        } else {
            bookmarkElem.style.display = "";
        }
    }

    const listsElem = document.querySelector("[aria-label='Lists']");
    if (listsElem != null) {
        if (!config.lists) {
            listsElem.style.display = "none";
        } else {
            listsElem.style.display = "";
        }
    }

    const messagesElem = document.querySelector("[aria-label='Direct Messages']");
    if (messagesElem != null) {
        if (!config.messages) {
            messagesElem.style.display = "none";
        } else {
            messagesElem.style.display = "";
        }
    }

    const happeningElem = document.querySelector("[aria-label='Timeline: Trending now']");
    if (happeningElem != null) {
        if (!config.happening) {
            happeningElem.parentNode.parentNode.parentNode.style.display = "none";
        } else {
            happeningElem.parentNode.parentNode.parentNode.style.display = "";
        }

    }

    const whotofollowElem = document.querySelector("[aria-label='Who to follow']");
    if (whotofollowElem != null) {
        if (!config.whotofollow) {
            whotofollowElem.parentNode.parentNode.style.display = "none";
        } else {
            whotofollowElem.parentNode.parentNode.style.display = "";
        }

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
        console.log(request);
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
