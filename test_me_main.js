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
    el = document.getElementById("answer")
    el.style.visibility = "hidden";
    el.style.opacity = "0";
}

function format_task(task) {
    var i;
    var task_text = ''
    for (i = 0; i < task.operations.length; i++) {
        task_text += task.operands[i] + " " + task.operations[i] + " "
    }

    return task_text
}

function show_task(task) {
    console.log("Task timeout " + app.configuration.TIMEOUT)
    el = document.getElementById("progress")
    el.style.width = "0%"

    el = document.getElementById("question")
    el.textContent = format_task(app.task)

    el = document.getElementById("answer")
    el.value = ""

    if (app.timer != null)
        app.timer.terminate()

    app.timer = new Worker("./timer.js")
    app.timer.onmessage = function(event) {
        timer_count = parseInt(event.data)
        document.getElementById("progress").style.width = Math.floor(100 * timer_count / app.configuration.TIMEOUT).toString() + '%';

        console.log(timer_count + " - " + app.configuration.TIMEOUT)
        if (timer_count == app.configuration.TIMEOUT) {
            app.timer.terminate()
            app.timer = null
            setTimeout(function() { next() }, 1000);
        }
    };
}

function load_game(game_name) {
    app.configuration = test_me_config
    console.log("Current timeout: " + app.configuration.TIMEOUT) 
    if (game_name ===  'GameInlinePairAddition')
        app.game = new GameInlinePairAddition(app.configuration)
    else if (game_name ===  'GameInlinePairSubtraction')
        app.game = new GameInlinePairSubtraction(app.configuration)
    else if (game_name ===  'GameInlineAdditionSubtraction')
        app.game = new GameInlineAdditionSubtraction(app.configuration)
    else if (game_name === 'GameInlineMultiplicationDivision')
        app.game = new GameInlineMultiplicationDivision(app.configuration)
        
    app.statistics = []

    reset_view(app)

    app.task = app.game.next()
    show_task(app.task)
}

function next() {
    if (app.timer !== null) {
        app.timer.terminate()
        app.timer = null
    }

    update_scores(app)

    app.task = app.game.next()
    
    if (app.task === null)
    {
        show_summary(app)
    } else {
        show_task()
    }
}

function get_cheers(sum, total) {
    var cheers = {image: '', text: '' };
    err_rate  = 1 - sum / total
    idx = Math.floor(5 * Math.random())
    status_idx = '1'

    if (err_rate > CHEERS['1'].threshold)
    {
        status_idx = '2'
        if (err_rate > CHEERS['2'].threshold) {
            status_idx = '3'
        } if (err_rate > CHEERS['3'].threshold) {
            status_idx = '4'
        }
    }

    cheers.image = CHEERS[status_idx].image
    cheers.text = CHEERS[status_idx].texts[idx]

    return cheers

}

function handle_key(e) {
    if (e.keyCode == 13)
    {
        next()       
    }
}

function close_status_summary() {
    var modal = document.getElementById("status-modal");
    modal.style.display = "none";
}