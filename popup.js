document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log({ tabs });
        if(!(
          /^https:\/\/www\.twitter\.com\//.test(tabs[0].url) || /^https:\/\/twitter\.com\//.test(tabs[0].url)
        )){
            document.getElementById("settings").style.display = "none";
            document.getElementById("otherURL").style.display = "block";
            document.body.style.height = "55px";
        } else {
            document.getElementById("settings").style.display = "block";
            document.getElementById("otherURL").style.display = "none";
            document.body.style.height = "55px";
        }
    });

    // removing tweet views by default
    
    const hideViews = document.getElementById("hide-views");
    hideViews.addEventListener('click', function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {hideViews: true}, function(response) {});
        })
    })

    const hideExplore = document.getElementById("hide-explore");
    hideExplore.addEventListener('click', function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {hideExplore: true}, function(response) {});
        })
    })

    const hideBookmarks = document.getElementById("hide-bookmarks");
    hideBookmarks.addEventListener('click', function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {hideBookmarks: true}, function(response) {});
        })
    })
    
    const hideLists = document.getElementById("hide-lists");
    hideLists.addEventListener('click', function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {hideLists: true}, function(response) {});
        })
    })

    const hideMessages = document.getElementById("hide-messages");
    hideMessages.addEventListener('click', function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {hideMessages: true}, function(response) {});
        })
    })

    const hideHappening = document.getElementById("hide-whats-happening");
    hideHappening.addEventListener('click', function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {hideHappening: true}, function(response) {});
        })
    })

    const hideWhoToFollow = document.getElementById("hide-who-to-follow");
    hideWhoToFollow.addEventListener('click', function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {hideWhoToFollow: true}, function(response) {});
        })
    })    
});


window.onload = function() {
    chrome.storage.local.get(['views', 'explore', 'bookmarks', 'lists', 'messages', 'happening', 'whotofollow'], function(result) {
        document.getElementById("hide-views").checked = !result.views
        document.getElementById("hide-explore").checked = !result.explore
        document.getElementById("hide-bookmarks").checked = !result.bookmarks
        document.getElementById("hide-lists").checked = !result.lists
        document.getElementById("hide-messages").checked = !result.messages
        document.getElementById("hide-whats-happening").checked = !result.happening
        document.getElementById("hide-who-to-follow").checked = !result.whotofollow
    });
}
