chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.local.set(
        {
            'views': false,
            'explore': true, 
            'bookmarks': true, 
            'lists': true,
            'messages': true, 
            'happening': true,
            'whotofollow': true
        }, function() {
		console.log("Default values set!");
	});
});
