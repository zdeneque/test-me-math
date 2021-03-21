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