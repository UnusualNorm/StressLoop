chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has("autoboot") && urlParams.has("host")) {
                $("body").append(`<img id='stressLoopOverlay' src='${chrome.extension.getURL("images/loopAnim.gif")}'></img>`);
            }
        }
	}, 10);
});