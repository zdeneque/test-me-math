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