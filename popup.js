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

    // actions for settings buttons
    var saveButton = document.getElementById("saveButton");
    saveButton.addEventListener('click', function(){
        const selectedHex = document.getElementById("hexInput").value;
        if(!isValidHex("#"+selectedHex)){
            document.getElementById("hexInput").value = "";    
        } else {
            document.getElementById("colorPreview").style.backgroundColor = "#"+selectedHex;
            document.getElementById("hexInput").placeholder = selectedHex
            const rgbVal = hexToRGB(selectedHex);
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {primaryColorChange: true, colorValue: rgbVal}, function(response) {});
            });
        }
    })
    var toggleComments = document.getElementById("toggleComments");
    toggleComments.addEventListener('click', function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {toggleComments: true}, function(response) {});
        });
    })
    var toggleLiveComments = document.getElementById("toggleLiveComments");
    toggleLiveComments.addEventListener('click', function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {toggleLiveComments: true}, function(response) {});
        });
    })
    var slider = document.getElementById("densitySlider");
    var output = document.getElementById("valueDisplay");
    slider.oninput = function() {
        output.innerHTML = this.value.toString() + ((this.value == 1) ? " second" : " seconds");
        const val = this.value.toString()
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {densityChange: true, densityValue: val}, function(response) {});
        });
    }
});
