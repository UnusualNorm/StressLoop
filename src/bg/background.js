chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.subject == "settings")
        sendResponse({refDelay: 10000});
    }
);