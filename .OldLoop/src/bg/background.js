var refDelayValue = 10000;
var startDelayValue = 1000;
var clickDelayValue = 1000;
var lastIpValue;
var lastPortValue;
var lastTimeValue;
var lastMethodValue;



chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.subject == "settings") {
        sendResponse({
            refDelay: refDelayValue,
            startDelay: startDelayValue,
            clickDelay: clickDelayValue,
            lastIp: lastIpValue,
            lastPort: lastPortValue,
            lastTime: lastTimeValue,
            lastMethod: lastMethodValue
        });
        }
        if (request.subject == "updateSettings") {
            
            if (request.refDelay != undefined) {refDelayValue = request.refDelay;}
            if (request.startDelay != undefined) {startDelayValue = request.startDelay;}
            if (request.clickDelay != undefined) {clickDelayValue = request.clickDelay;}
            if (request.lastIp != undefined) {lastIpValue = request.lastIp;}
            if (request.lastPort != undefined) {lastPortValue = request.lastPort;}
            if (request.lastTime != undefined) {lastTimeValue = request.lastTime;}
            if (request.lastMethod != undefined) {lastMethodValue = request.lastMethod;}
        }
        
    }
);