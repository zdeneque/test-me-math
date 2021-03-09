//import {test_me_config} from "./configuration.js"
//import {GameInlinePairAddition} from "./games.js"

var app = {
    configuration: test_me_config,
    game: null,
    task: null,
    statistics: [],
    timer: null
}

function initialize(config) {
    if (config !== null) {
        app.config = config
    }
}

function format_task(task) {
    var i;
    var task_text = ''
    for (i = 0; i < task.operations.length; i++) {
        task_text += task.operands[i] + " " + task.operations[i] + " "
    }

    return task_text
}

function count_down(delay) {
    setTimeout(function() { 
        el = document.getElementById("timer")
        el.value = app.configuration.TIMEOUT - delay
        console.log('Timer ' + el.value)
        if (app.answer !== null)
            return;
        if (delay === 0) {
            setTimeout(function() { next() }, 1000);
            return;
        }
        count_down(delay - 1)
    }, 1000);
}

function show_task(task) {
    el = document.getElementById("progress")
    el.style.width = "0%"
    //el.value = 0
    //el.max = app.configuration.TIMEOUT

    console.log('Timer max: ' + el.max)
    el = document.getElementById("question")
    el.textContent = format_task(app.task)

    el = document.getElementById("answer")
    el.value = ""

    if (app.timer != null)
        app.timer.terminate()

    app.timer = new Worker("./timer.js")
    app.timer.onmessage = function(event) {
        timer_count = parseInt(event.data)
        //document.getElementById("timer").value = timer_count;
        document.getElementById("progress").style.width = Math.floor(100 * timer_count / app.configuration.COUNT_EXAMPLES).toString() + '%';

        if (timer_count === app.configuration.TIMEOUT) {
            app.timer.terminate()
            app.timer = null
            setTimeout(function() { next() }, 1000);
        
        }
    };
    //app.timer.postMessage()

    //count_down(app.configuration.TIMEOUT - 1)
}

function load_game(game_name) {
    if (game_name ===  'GameInlinePairAddition')
        app.game = new GameInlinePairAddition(app.configuration)
    else if (game_name ===  'GameInlinePairSubtraction')
        app.game = new GameInlinePairSubtraction(app.configuration)

    app.statistics = []

    el = document.getElementById("status")
    while (el.firstChild) {
        el.removeChild(el.lastChild)
    }

    for (var i = 0; i < app.configuration.COUNT_EXAMPLES; i++) {
        var node = document.createElement("div");
        node.classList.add('empty')
        node.id = 'status' + i.toString()
        el.appendChild(node)
    }

    el = document.getElementById("summary")
    el.style.visibility = "hidden";
    el.style.opacity = "0";
    el = document.getElementById("workplace")
    el.style.visibility = "visible";
    el.style.opacity = "1";

    app.task = app.game.next()
    show_task(app.task)
}

function next() {
    if (app.timer !== null) {
        app.timer.terminate()
        app.timer = null
    }

    el = document.getElementById("answer")
    status_el = document.getElementById("status")
    //var node = document.createElement("div");
    nodeId = 'status' + app.statistics.length.toString()

    var node = document.getElementById(nodeId)
    if (el.value === app.task.result) {
        app.statistics.push(1)
        node.classList.add('good')
    } else {
        app.statistics.push(0)
        node.classList.add('bad')
    }
    //status_el.appendChild(node)

    app.task = app.game.next()
    
    if (app.task === null)
    {
        el = document.getElementById("workplace")
        el.style.visibility = "hidden";
        el.style.opacity = "0";
        el = document.getElementById("summary")
        el.style.visibility = "visible";
        el.style.opacity = "1";

        el = document.getElementById("score")
        var sum = app.statistics.reduce((total, currentValue) => total + currentValue, 0)
        el.textContent = "You earned " + sum.toString() + " out of " + app.statistics.length.toString()

        el = document.getElementById("cheers")
        el.textContent = "Bravo!"
    } else {
        show_task()
    }
}

function handle_key(e) {
    if (e.keyCode == 13)
    {
        next()       
    }
}