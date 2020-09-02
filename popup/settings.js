chrome.runtime.sendMessage({subject: "settings"}, function(response) {
    refSecondDelay = response.refDelay / 1000;
    document.getElementById("refDelay").placeholder = refSecondDelay + "s";
    refMiliDelay = document.getElementById("clickDelay").value * 1000;


    startSecondDelay = response.startDelay / 1000;
    document.getElementById("startDelay").placeholder = startSecondDelay + "s";
    startMiliDelay = document.getElementById("clickDelay").value * 1000;


    clickSecondDelay = response.clickDelay / 1000;
    document.getElementById("clickDelay").placeholder = clickSecondDelay + "s";
    clickMiliDelay = document.getElementById("clickDelay").value * 1000;



    document.getElementById("save").onclick = function(){
        chrome.runtime.sendMessage({
            subject: "updateSettings",
            refDelay: refMiliDelay,
            startDelay: startMiliDelay,
            clickDelay: clickMiliDelay
        });
    };
});
