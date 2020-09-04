chrome.extension.sendMessage({
    subject: "settings"
}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            const urlParams = new URLSearchParams(window.location.search);
            if (window.location.href.indexOf("stressthem.to") >= 0 && urlParams.has("autoboot") && urlParams.has("host")) {
                function submitData(input, inlineresponse = null) {
                    var ajaxData = (typeof (input) === 'object') ? input : {},
                        getQueries = {},
                        handler = new XMLHttpRequest();

                    location.search.substr(1).split('&').forEach(function (item) {
                        getQueries[item.split('=')[0]] = item.split('=')[1];
                    });

                    for (var prop in getQueries)
                        ajaxData[prop] = getQueries[prop];

                    for (var prop in ajaxData) {
                        switch (true) {
                            case ajaxData[prop] == '':
                                ajaxData[prop] = null;
                                break;

                            case typeof (ajaxData[prop]) == 'string' && !isNaN(ajaxData[prop]):
                                ajaxData[prop] = Number(ajaxData[prop]);
                                break;
                        }
                    }

                    handler.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200 && this.responseText)
                            responseHandler(this.responseText, inlineresponse);
                    };

                    handler.open('POST', '?handle', true);
                    handler.send(JSON.stringify(ajaxData));
                    spamLock = false;
                }
                function notice(noticeData) {
                    var noticeBox = document.getElementById('notice');
                    var noticeHeadline = noticeBox.getElementsByClassName('headline')[0],
                        noticeMessage = noticeBox.getElementsByClassName('message')[0],
                        noticeButtons = noticeBox.getElementsByClassName('buttonswrap')[0],
                        noticeClose = noticeBox.getElementsByClassName('close');

                    noticeBox.classList.remove('success', 'error', 'target', 'confirm');
                    noticeHeadline.innerHTML = 'We have an information for you';

                    if (noticeData.status == 1) {
                        noticeBox.classList.add('success');
                        noticeHeadline.innerHTML = 'Your action was successful';
                    }

                    if (noticeData.status == 2) {
                        noticeBox.classList.add('error');
                        noticeHeadline.innerHTML = 'An error occured. Your action failed';
                    }

                    if (noticeData.headline) noticeHeadline.innerHTML = noticeData.headline;
                    noticeMessage.innerHTML = noticeData.message;

                    if (noticeData.targetLink) {
                        let noticeTargetBtn = noticeButtons.getElementsByClassName('target')[0];
                        noticeTargetBtn.href = noticeData.targetLink;
                        if (noticeData.targetName) noticeTargetBtn.innerHTML = noticeData.targetName;
                        noticeBox.classList.add('target');
                    }

                    if (noticeData.submitData) {
                        let noticeConfirmBtn = noticeButtons.getElementsByClassName('confirm')[0];
                        noticeConfirmBtn.addEventListener('click', function () {
                            submitData(noticeData.submitData);
                        });
                        noticeBox.classList.add('confirm');
                    }

                    for (i = 0; i < noticeClose.length; i++)
                        noticeClose[i].addEventListener('click', function () {
                            noticeBox.setAttribute('hidden', '');
                        });

                    noticeBox.removeAttribute('hidden');

                    if (noticeData.autoHide) {
                        setTimeout(function () {
                            noticeBox.setAttribute('hidden', '');
                        }, noticeData.autoHide * 1000);
                    }
                }
                var elementName;
                function responseHandler(response, inlineresponse = null) {
                    var responseData = (typeof (response) === 'object') ? response : JSON.parse(response),
                        inlineMessage = inlineresponse;

                    if (inlineMessage) {
                        inlineMessage.innerHTML = null;
                        inlineMessage.classList.remove('success', 'error');
                    }

                    if (elementName) elementName.classList.remove('invalid');

                    if ((!responseData.type || responseData.type == 0) && inlineMessage) {

                        if (responseData.elementName) {
                            elementName = document.querySelector('[name="' + responseData.elementName + '"]');
                            if ((!responseData.status || responseData.status == 0)) elementName.removeAttribute('hidden');
                            elementName.focus();
                        }

                        if (responseData.status == 1)
                            inlineMessage.classList.add('success');

                        if (responseData.status == 2) {
                            inlineMessage.classList.add('error');

                            if (responseData.elementName)
                                elementName.classList.add('invalid');
                        }

                        inlineMessage.innerHTML = responseData.message;
                    }

                    if (responseData.type == 1 || !inlineMessage) notice(responseData);

                    if (responseData.targetLink && responseData.autoRedirect) {
                        setTimeout(function () {
                            window.location.replace(responseData.targetLink);
                        }, responseData.autoRedirect * 1000);
                    }
                }
                if ($("td.green").length) {
                    setTimeout(() => {
                        location.reload();
                    }, response.settings[0].data);
                } else {
                    chrome.extension.sendMessage({
                        subject: "updateSettings",
                        id: 4,
                        name: "lastHost",
                        data: urlParams.get("host")
                    });
                    chrome.extension.sendMessage({
                        subject: "updateSettings",
                        id: 5,
                        name: "lastPort",
                        data: urlParams.get("port")
                    });
                    chrome.extension.sendMessage({
                        subject: "updateSettings",
                        id: 6,
                        name: "lastTime",
                        data: urlParams.get("time")
                    });
                    chrome.extension.sendMessage({
                        subject: "updateSettings",
                        id: 7,
                        name: "lastMethod",
                        data: urlParams.get("method")
                    });
                    submitData(JSON.parse(`{\"method_l4\":\"${response.settings[1].data}\",\"options\":null,\"host\":\"\",\"port\":\"${response.settings[2].data}\",\"time\":\"${response.settings[3].data}\"}`));
                    location.reload();
                }
            }
        }
    }, 10);
});