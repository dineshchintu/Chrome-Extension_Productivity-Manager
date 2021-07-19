chrome.browserAction.onClicked.addListener(function(){
  chrome.tabs.create({
    url: chrome.extension.getURL('popup.html')});
});

function init() {
    chrome.storage.local.get('urls', function(result) {
        urls = result.urls;
    });
}

var callback = function(info) {
    var denyRequest = false;
    if (!urls) {
        return;
    }
    for (var i = 0; i < urls.length; i++) {
        var regex = new RegExp(urls[i]);
        var res = info.url.match(regex);
        if (res != null && res[0] != null) {
            denyRequest = true;
            //console.log("URL: " + info.url + " blocked by: " + urls[i]);
            break;
        }
    }
    return {
        cancel: denyRequest
    };
};
var filter = {
    urls: ["<all_urls>"],
};
var addInfo = ["blocking"];
var urls;
init();
chrome.webRequest.onBeforeRequest.addListener(callback, filter, addInfo);
chrome.storage.onChanged.addListener(function(changes, areaName) {
    urls = changes.urls.newValue;
});
chrome.browserAction.onClicked.addListener(function(tab) {
    openOrFocusOptionsPage()
});
