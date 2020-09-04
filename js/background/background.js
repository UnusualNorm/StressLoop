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
    data: 0
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


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.subject == "settings") {
        sendResponse({
            settings: settings
        });
    } else if (request.subject == "updateSettings") {
        if (settings[request.id].name == request.name) {
            settings[request.id].data = request.data;
        }
    }
});