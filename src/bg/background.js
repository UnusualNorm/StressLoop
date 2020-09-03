var refDelayValue = 10000;
var startDelayValue = 1000;
var clickDelayValue = 1000;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.subject == "settings") {
        sendResponse({
            refDelay: refDelayValue,
            startDelay: startDelayValue,
            clickDelay: clickDelayValue
        });
        }
        if (request.subject == "updateSettings") {
            refDelayValue = request.refDelay;
            startDelayValue = request.startDelay;
            clickDelayValue = request.clickDelay;
        }
        if (request.subject == "recentAttack") {
            sendResponse({
                ip: "0.0.0.0",
                port: "",
                time: "0.0.0.0",
                method: "0.0.0.0"
            });
        }
        
    }
);