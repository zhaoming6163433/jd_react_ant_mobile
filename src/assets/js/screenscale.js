window.onresize = function () {
    window.requestAnimationFrame(function () {
        var AvailableWidth = window.innerWidth;
        var AvailablerHeight = window.innerHeight;
        var fontSize = (AvailableWidth / 375) * 20;
        jsEnvironment = document.getElementById('physical');
        if (fontSize >= 40) {
            fontSize = 40;
        }
        if ((AvailableWidth / AvailablerHeight) < (430 / 712)) {
            if (fontSize < 15) fontSize = 15;
            jsEnvironment.style.fontSize = fontSize + 'px';
        }else{
            fontSize = (AvailablerHeight/667)* 20;
            if (fontSize < 15) fontSize = 15;
            jsEnvironment.style.fontSize = fontSize + 'px';
        }
    });
}
window.onload = function () {
    var AvailableWidth = window.innerWidth;
    var AvailablerHeight = window.innerHeight;
    var fontSize = (AvailableWidth / 375) * 20;
    jsEnvironment = document.getElementById('physical');
    if (fontSize >= 40) {
        fontSize = 40;
    }
    if ((AvailableWidth / AvailablerHeight) < (430 / 712)) {
        if (fontSize < 15) fontSize = 15;
        jsEnvironment.style.fontSize = fontSize + 'px';
    }else{
        fontSize = (AvailablerHeight/667)* 20;
        if (fontSize < 15) fontSize = 15;
        jsEnvironment.style.fontSize = fontSize + 'px';
    }
}