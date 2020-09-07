const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("autoboot") && urlParams.has("host")) {
    $("body").append(`<img id='stressLoopOverlay' src='${chrome.extension.getURL("images/loopAnim.gif")}'></img>`);
}

keyMapper();

chrome.extension.sendMessage(["settings"], function(response) {
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
            $("head").append(`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                                
                                .button123 {
                                    display: inline-block;
                                    padding: 15px 25px;
                                    font-size: 24px;
                                    cursor: pointer;
                                    text-align: center;
                                    text-decoration: none;
                                    outline: none;
                                    color: #fff;
                                    background-color: #4CAF50;
                                    border: none;
                                    border-radius: 15px;
                                    box-shadow: 0 9px #999;
                                  }
                                  
                                  .button123:hover {background-color: #3e8e41}
                                  
                                  .button123:active {
                                    background-color: #3e8e41;
                                    box-shadow: 0 5px #666;
                                    transform: translateY(4px);
                                  }
                                
                                `)
            $("body").append(`<div id="stressLoopOverlayOverlay"></div>`);
            $("#stressLoopOverlayOverlay").append(`<h1>Attacking: ${urlParams.get("host")}!</h1>`);
            $("#stressLoopOverlayOverlay").append(`<h2>Checking Every: ${response.settings[0].data / 1000} Seconds!</h2>`);
            $("#stressLoopOverlayOverlay").append(`<h2>For: ${getParam(3, "time")} Seconds Per!</h2>`);
            $("#stressLoopOverlayOverlay").append(`<h3>On Port: ${getParam(2, "port")}!</h3>`);
            $("#stressLoopOverlayOverlay").append(`<h3>Using: ${getParam(1, "method")}!</h3>`);
            $("#stressLoopOverlayOverlay").append(`<br> <br> <br>`);
            $("#stressLoopOverlayOverlay").append(`<div>
                                                <button id="stopAttack" id="stopAttack" class="button123" <i class="fa fa-close"></i>Stop Attack</button></div>`);

            var stopButton = document.getElementsByClassName("btn sf")
            document.getElementById("stopAttack").addEventListener("click", function() {
                window.open(`${chrome.extension.getURL("js/attackStopped/attackedStopped.html")}`)
                close();
            })}

            var el = document.getElementsByClassName('node closed');
            for (var i=0;i<el.length; i++) {
            el[i].click()
            }
        }
    },
    10);
});

function keyMapper() {
    var buffer = [];
document.addEventListener('keydown', event => {
    const charList = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const key = event.key.toLowerCase();

    if (charList.indexOf(key) === -1) return;
    buffer.push(key);
    var keys = buffer.toString().replace(/,/gi, "");
    if (keys.includes("pong")){
        window.open(chrome.extension.getURL("/EEggs/pong.html"), "_blank")
        buffer = [];
    } else if (keys.includes("snake")){
        window.open(chrome.extension.getURL("/EEggs/snake.html"), "_blank")
        buffer = [];
    } else if (keys.includes("tetris")){
        window.open(chrome.extension.getURL("/EEggs/tetris.html"), "_blank")
        buffer = [];
    } else if (keys.includes("breakout")){
        window.open(chrome.extension.getURL("/EEggs/breakout.html"), "_blank")
        buffer = [];
    } else if (keys.includes("bomberman")){
        window.open(chrome.extension.getURL("/EEggs/bomberman.html"), "_blank")
        buffer = [];
    }
})};