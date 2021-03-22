function reset_view(app) {
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

    el = document.getElementById("answer")
    el.style.visibility = "visible";
    el.style.opacity = "1";
}

function show_summary(app) {
    var sum = app.statistics.reduce((total, currentValue) => total + currentValue, 0)
    el = document.getElementById("summary-text")
    el.textContent = "Máš správně " + sum.toString() + " příkladů z " + app.statistics.length.toString()

    el = document.getElementById("cheers")
    cheers = get_cheers(sum, app.statistics.length.toString())
    el.textContent = cheers.text
    
    el = document.getElementById("cheers-image")
    el.src = cheers.image

    el = document.getElementById("status-modal")
    el.style.display = "block";
}

function update_scores(app) {
    el = document.getElementById("answer")
    status_el = document.getElementById("status")
    nodeId = 'status' + app.statistics.length.toString()

    var node = document.getElementById(nodeId)
    if (el.value === app.task.result) {
        app.statistics.push(1)
        node.classList.add('good')
    } else {
        app.statistics.push(0)
        node.classList.add('bad')
    }
}

function format_task_inline(task) {
    var i;
    var task_text = ''
    for (i = 0; i < task.operations.length; i++) {
        task_text += task.operands[i] + " " + task.operations[i] + " "
    }

    return task_text
}

function build_task_inline(app) {
    el = document.getElementById("task")
    el.style.flexDirection = "row"

    el = document.getElementById("progress")
    el.style.width = "0%"

    el = document.getElementById("question")
    while (el.firstChild) {
        el.removeChild(el.lastChild)
    }
    el.textContent = format_task_inline(app.task)

    el = document.getElementById("answer")
    el.value = ""
}

function build_task_stacked(app) {
    el = document.getElementById("task")
    el.style.flexDirection = "column"

    el = document.getElementById("progress")
    el.style.width = "0%"

    el = document.getElementById("question")
    while (el.firstChild) {
        el.removeChild(el.lastChild)
    }
    node = document.createElement("div")
    node.style.textAlign = "right"
    node.textContent = app.task.operands[0]
    el.appendChild(node)
    node = document.createElement("div")
    node.style.textAlign = "right"
    node.textContent = app.task.operations[0] + "  " + app.task.operands[1]
    el.appendChild(node)
    node = document.createElement("hr")
    node.style.width = "100%"
    el.appendChild(node)

    el = document.getElementById("answer")
    el.value = ""
}