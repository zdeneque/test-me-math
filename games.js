//import draw_number from "./math_functions.js"

class Game {
    constructor(config) {
        this.attempt = 0
        this.result = ''
        this.operations = []
        this.operands = []
        this.display = 'inline'
        this.config = config
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
        var res = draw_between(25, 100)
        var op1 = draw_between(11, res - 11)
        var op2 = res - op1
        this.result = res.toString()
        this.operands = [op1.toString(), op2.toString()]
        this.result = (op1 + op2).toString()
    }
}

class GameInlinePairSubtraction extends (Game) {
    constructor(config) {
        super(config)
        this.operations = ["-", "="]
    }

    draw_game() {
        var op1 = draw_between(25, 100)
        var op2 = draw_between(11, op1 - 11)
        this.result = (op1 - op2).toString()
        this.operands = [op1.toString(), op2.toString()]
        this.result = (op1 - op2).toString()
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
            op1 = draw_between(25, 100)
            op2 = draw_between(11, op1 - 11)
            this.result = (op1 - op2).toString()
        } else {
            this.operations = ["+", "="]
            var res = draw_between(25, 100)
            op1 = draw_between(11, res - 11)
            op2 = res - op1
            this.result = res.toString()
        }

        this.operands = [op1.toString(), op2.toString()]
    }
}