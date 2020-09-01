chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);
			
			const urlParams = new URLSearchParams(window.location.search);
			
			if (urlParams.has("autoboot") == true) {
				if (urlParams.has("ip")) {
					if ($("td.green").length) {
						setTimeout(() => {
							location.reload();
						}, 10000);
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
							}, 1000);
						}, 1000);
					}
					
				} else {
					alert("REQUIRES IP!");
				}
				
			}
		}
	}, 10);
});
