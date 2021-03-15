function draw_number(max_num) {
    return Math.floor(Math.random() * max_num)
}

function draw_between(min_num, max_num) {
    return Math.floor((max_num - min_num) * Math.random() + min_num)
}

function draw_number_2digits_sum_biased(max_num) {
    if (max_num === 100) { // first number
        return Math.floor((80 - 22) * Math.random() + 22)
    } else { // second number
        return Math.floor((100 - max_num - 22) * Math.random() + 22)
    }
}

function draw_number_2digits_diff_biased(max_num) {
    if (max_num === 100) { // first number
        return Math.floor((100 - 34) * Math.random() + 34)
    } else { // second number
        return Math.floor((max_num - 24) * Math.random() + 12)
    }
}