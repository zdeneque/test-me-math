/*var start_time = new Date().getTime()

var x = setInterval(function() {
    var distance = new Date().getTime() - start_time
    var seconds = Math.floor((distance % (1000 * 60)) / 1000)

    postMessage(seconds.toString())
    //el = document.getElementById("timer")
    //el.value += 1
    
    if (seconds === test_me_config.TIMEOUT)
    {
        clearInterval(x)
    }
}, 1000)*/

function count_up(delay) {
    setTimeout(function() { 
        postMessage(delay.toString())
        console.log('Timer ' + delay)
        if (delay === 1000) {
            return;
        }
        count_up(delay + 1)
    }, 1000);
}

count_up(1)