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
        var op1 = draw_number_2digits_sum_biased(100) //draw_number(Math.pow(10, this.config.CIPHER))
        var op2 = draw_number_2digits_sum_biased(op1) //draw_number(op1)
        
        console.log('Drawing: ' + op1.toString() + ', ' + op2.toString())

        this.operands = [op1.toString(), op2.toString()]
        this.result = (op1 + op2).toString()
    }
}