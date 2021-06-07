//import draw_number from "./math_functions.js"

class Game {
    constructor(config) {
        this.attempt = 0
        this.result = ''
        this.operations = []
        this.operands = []
        this.display = 'inline'
        this.config = config

        this.max = Math.pow(10, config.CIPHER)
        this.min = 11
    }

    is_correct() {
        el = document.getElementById("answer")
        return (el.value === this.result)
    }

    next() {
        if (this.attempt < this.config.COUNT_EXAMPLES) {
            this.attempt += 1
            this.draw_game()

            return {
                'operands': this.operands,
                'operations': this.operations,
                'result': this.result,
                'display': this.display
            }
        } else {
            return null
        }
    }
}

class GameInlinePairAddition extends (Game) {
    constructor(config) {
        super(config)
        this.operations = ["+", "="]
    }

    draw_game() {
        var res = draw_between(2 * this.min + 1, this.max) //25, 100
        var op1 = draw_between(this.min, res - this.min) //11, res - 11
        var op2 = res - op1
        this.result = res.toString()
        this.operands = [op1.toString(), op2.toString()]
        this.result = (op1 + op2).toString()
    }

    build_task(app) {
        build_task_inline(app)
    }
}

class GameInlinePairSubtraction extends (Game) {
    constructor(config) {
        super(config)
        this.operations = ["-", "="]
    }

    draw_game() {
        var op1 = draw_between(2 * this.min + 1, this.max) //25, 100
        var op2 = draw_between(this.min, op1 - this.min) // 11, op1 - 11
        this.result = (op1 - op2).toString()
        this.operands = [op1.toString(), op2.toString()]
        this.result = (op1 - op2).toString()
    }

    build_task(app) {
        build_task_inline(app)
    }
}

class GameInlineAdditionSubtraction extends (Game) {
    constructor(config) {
        super(config)
        this.operations = ["-", "="]
    }

    draw_game() {
        var type = Math.floor(100 * Math.random())
        var op1 = 0
        var op2 = 0

        if (type < 50) {
            this.operations = ["-", "="]
            op1 = draw_between(2 * this.min + 1, this.max)
            op2 = draw_between(this.min, op1 - this.min)
            this.result = (op1 - op2).toString()
        } else {
            this.operations = ["+", "="]
            var res = draw_between(2 * this.min + 1, this.max)
            op1 = draw_between(this.min, res - this.min)
            op2 = res - op1
            this.result = res.toString()
        }

        this.operands = [op1.toString(), op2.toString()]
    }

    build_task(app) {
        build_task_inline(app)
    }
}

class GameInlineMultiplicationDivision extends (Game) {
    constructor(config) {
        super(config)
        this.operations = ["x", "="]
    }

    draw_game() {
        var type = Math.floor(100 * Math.random())
        var op1 = 0
        var op2 = 0
        op1 = draw_between(2, 10)
        op2 = draw_between(2, 10)

        if (type < 50) {
            this.operations = ["x", "="]
            this.result = (op1 * op2).toString()
        } else {
            this.operations = [":", "="]
            this.result = op1.toString()
            op1 = op1 * op2
        }

        this.operands = [op1.toString(), op2.toString()]
    }

    build_task(app) {
        build_task_inline(app)
        //build_task_stacked(app)
    }
}

class GameStackedAdditionSubtraction extends (Game) {
    constructor(config) {
        super(config)
        this.operations = ["-", "="]
    }

    draw_game() {
        var type = Math.floor(100 * Math.random())
        var op1 = 0
        var op2 = 0

        if (type < 50) {
            this.operations = ["-", "="]
            op1 = draw_between(2 * this.min + 1, this.max)
            op2 = draw_between(this.min, op1 - this.min)
            this.result = (op1 - op2).toString()
        } else {
            this.operations = ["+", "="]
            var res = draw_between(2 * this.min + 1, this.max)
            op1 = draw_between(this.min, res - this.min)
            op2 = res - op1
            this.result = res.toString()
        }

        this.operands = [op1.toString(), op2.toString()]
    }

    build_task(app) {
        build_task_stacked(app)
    }

}

class GameQuizAdditionSubtraction extends (Game) {
    constructor(config) {
        super(config)
        this.operations = ["-", "="]
    }

    is_correct() {
        el = document.getElementById("input-op1")
        var op1 = el.value.trim()
        el = document.getElementById("input-op2")
        var op2 = el.value.substring(1).trim()
        el = document.getElementById("answer")
        var res = el.value.trim()

        console.log("Typed: " + op1.toString() + ' ' + op2.toString() + '->' + res.toString())
        console.log("ToBe: " + this.operands[0] + ' ' + this.operands[1] + '->' + this.result)

        return (op1 === this.operands[0] && op2 === this.operands[1] && res === this.result)
    }

    draw_game() {
        var type = Math.floor(100 * Math.random())
        var op1 = 0
        var op2 = 0

        if (type < 50) {
            this.operations = ["-", "="]
            op1 = draw_between(2 * this.min + 1, this.max)
            op2 = draw_between(this.min, op1 - this.min)
            this.result = (op1 - op2).toString()
        } else {
            this.operations = ["+", "="]
            var res = draw_between(2 * this.min + 1, this.max)
            op1 = draw_between(this.min, res - this.min)
            op2 = res - op1
            this.result = res.toString()
        }

        this.operands = [op1.toString(), op2.toString()]
    }

    build_task(app) {
        build_task_quiz(app)
    }

}

class GameStackedMultiplication extends (Game) {
    constructor(config) {
        super(config)
        this.operations = ["x", "="]
    }

    draw_game() {
        var op1 = 0
        var op2 = 0
        op1 = draw_between(11, 100)
        op2 = draw_between(2, 10)

        this.operations = ["x", "="]
        this.result = (op1 * op2).toString()

        this.operands = [op1.toString(), op2.toString()]
    }

    build_task(app) {
        build_task_stacked(app)
    }

}