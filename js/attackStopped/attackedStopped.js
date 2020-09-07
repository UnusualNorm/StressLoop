setTimeout(() => {
    document.getElementById("attackStopped").append("5...");
    setTimeout(() => {
        document.getElementById("attackStopped").append("4...");
        setTimeout(() => {
            document.getElementById("attackStopped").append("3...");
            setTimeout(() => {
                document.getElementById("attackStopped").append("2...");
                setTimeout(() => {
                    document.getElementById("attackStopped").append("1...");
                }, 1000);
                setTimeout(() => {
                    close()
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}, 500);

chrome.extension.sendMessage(["settings"], function(response) {
    document.getElementById("continueAttack").addEventListener("click", function() {
        window.open(`https://www.stressthem.to/booter?autoboot&host=${response.settings[4].data}&port=${response.settings[5].data}&time=${response.settings[6].data}&method=${response.settings[7].data}`, "_blank");
        close();
    });
});