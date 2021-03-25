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
    nodeId = 'status' + app.statistics.length.toString()
    var node = document.getElementById(nodeId)
    if (app.game.is_correct()) {
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

function get_mask(text, mask) {
    var arr = text.split('')
    for (var i = 0; i < text.length; i++) {
        if (mask[i] != '*' && Math.random() >= 0.5) {
            arr[i] = '*'
        }
    }
    return arr.join('')
}

function build_task_quiz(app) {
    mask1 = get_mask(app.task.operands[0], app.task.operands[0])
    mask2 = get_mask(app.task.operands[1], mask1)
    mask_res = app.task.result.split('')
    for (var i = 0; i < mask_res.length; i++) {
        if (mask1[i] != '*' && mask2[i] != '*') {
            mask_res[i] = '*'
        }
    }

    el = document.getElementById("task")
    el.style.flexDirection = "column"

    el = document.getElementById("progress")
    el.style.width = "0%"

    el = document.getElementById("question")
    while (el.firstChild) {
        el.removeChild(el.lastChild)
    }
    node = document.createElement("input")
    node.id = 'input-op1'
    node.classList.add('answer')
    node.style.textAlign = "right"
    node.addEventListener('keypress', handle_key, false)
    node.value = mask1
    el.appendChild(node)
    node = document.createElement("input")
    node.id = 'input-op2'
    node.classList.add('answer')
    node.style.textAlign = "right"
    node.addEventListener('keypress', handle_key, false)
    node.value = app.task.operations[0] + "  " + mask2
    el.appendChild(node)
    node = document.createElement("hr")
    node.style.width = "100%"
    el.appendChild(node)

    el = document.getElementById("answer")
    el.style.textAlign = "right"
    el.value = mask_res.join('')
}