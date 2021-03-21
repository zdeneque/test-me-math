function draw_number(max_num) {
    return Math.floor(Math.random() * max_num)
}

function draw_between(min_num, max_num) {
    return Math.floor((max_num - min_num) * Math.random() + min_num)
}