var settings;

chrome.storage.local.get('settings', function (result) {
    if (!result.settings) {
        settings = [
            {
                name: "defaultCheckDelay",
                data: 10000
            }, {
                name: "defaultMethod",
                data: "udpmix"
            }, {
                name: "defaultPort",
                data: 80
            }, {
                name: "defaultTime",
                data: 300
            }
        ];

    } else {
        settings = result.settings;
    }
});







chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request[0] == "settings") {
        sendResponse({
            settings: settings
        });
    } else if (request[0] == "updateSettings") {
        for (let l = 1; l < request.length; l++) {
            for (let i = 0; i < settings.length; i++) {
                if (settings[i].name === request[l].name) {
                    settings[i].data === request[l].data;
                    return;
                } else if (i === settings.length) {
                    settings[i + 1] = {
                        name: request.name,
                        data: request.data
                    }
                }
            }
        }
    }
});