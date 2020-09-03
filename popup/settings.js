chrome.runtime.sendMessage({subject: "settings"}, function(response) {
    refSecondDelay = response.refDelay / 1000;
    document.getElementById("refDelay").placeholder = refSecondDelay + "s";

    startSecondDelay = response.startDelay / 1000;
    document.getElementById("startDelay").placeholder = startSecondDelay + "s";

    clickSecondDelay = response.clickDelay / 1000;
    document.getElementById("clickDelay").placeholder = clickSecondDelay + "s";


    document.getElementById("save").onclick = function(){
        chrome.runtime.sendMessage({
            subject: "updateSettings",
            refDelay: document.getElementById("refDelay").value * 1000,
            startDelay: document.getElementById("startDelay").value * 1000,
            clickDelay: document.getElementById("clickDelay").value * 1000
        });
        alert("Saved Settings!")
    };
});
