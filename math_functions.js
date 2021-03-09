function draw_number(max_num) {
    return Math.floor(Math.random() * max_num)
}

function draw_number_2digits_sum(max_num) {
    if (max_num === 100) { // first number
        rnd = Math.random()
        f = 0.79 * rnd + 0.1
        return Math.floor(100 * f)
    } else { // second number
        second_max = 100 - max_num
        rnd = Math.random()
        f = (second_max - 10) * rnd / 100 + 0.1
        return Math.floor(100 * f)
    }
}

function draw_number_2digits_sum_biased(max_num) {
    if (max_num === 100) { // first number
        rnd1 = Math.floor(7 * Math.random()) + 2
        rnd2 = Math.floor(7 * Math.random()) + 2

        return 10 * rnd1 + rnd2
    } else { // second number
        second_max = 100 - max_num
        rnd = Math.random()
        d1 = 10 * Math.floor((second_max - 10) * rnd / 10 + 1)
        d2 = Math.floor((second_max - d1 - 1) * rnd + 1)

        return d1 + d2
    }
}