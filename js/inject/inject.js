const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("autoboot") && urlParams.has("host")) {
    $("body").append(`<img id='stressLoopOverlay' src='${chrome.extension.getURL("images/loopAnim.gif")}'></img>`);
}


chrome.extension.sendMessage({subject: "settings"}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            function getParam(paramDefaultId, paramName) {
                if (urlParams.has(paramName)) {
                    return urlParams.get(paramName);
                } else {
                    return response.settings[paramDefaultId].data;
                }
            }
            if (urlParams.has("autoboot") && urlParams.has("host")) {
                $("body").append(`<div id="stressLoopOverlayOverlay"></div>`);
                $("#stressLoopOverlayOverlay").append(`<h1>Attacking: ${urlParams.get("host")}!</h1>`);
                $("#stressLoopOverlayOverlay").append(`<h2>Checking Every: ${response.settings[0].data / 1000} Seconds!</h2>`);
                $("#stressLoopOverlayOverlay").append(`<h2>Every: ${getParam(3, "time")} Seconds!</h2>`);
                $("#stressLoopOverlayOverlay").append(`<h3>On Port: ${getParam(2, "port")}!</h3>`);
                $("#stressLoopOverlayOverlay").append(`<h3>Using: ${getParam(1, "method")}!</h3>`);
            }
        }
	}, 10);
});