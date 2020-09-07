var settings = [{
    id: 0,
    name: "defaultCheckDelay",
    data: 10000
}, {
    id: 1,
    name: "defaultMethod",
    data: "udpmix"
}, {
    id: 2,
    name: "defaultPort",
    data: 80
}, {
    id: 3,
    name: "defaultTime",
    data: 300
}, {
    id: 4,
    name: "lastHost",
    data: "0.0.0.0"
}, {
    id: 5,
    name: "lastPort",
    data: 0
}, {
    id: 6,
    name: "lastTime",
    data: 0
}, {
    id: 7,
    name: "lastMethod",
    data: 0
}];

/*chrome.storage.local.get(['settings'], function(result) {
    if (result.length == 0) {
        return;
    } else {
        settings = result;
    }      
});*/

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request[0] == "settings") {
        sendResponse({
            settings: settings
        });
    } else if (request[0] == "updateSettings") {
        for (let i = 1; i < request.length; i++) {
            if (settings[request[i].id].name == request[i].name) {
                settings[request[i].id].data = request[i].data
            }
            
            /*if(i = request.length){
                chrome.storage.local.set({settings: settings})
            }*/
        }
    }
});