class CalculatorController {
    constructor() {
        this._displayCalc
        this.initialize()
    }

    initialize() {
        const displayCalcEl = document.querySelector('#display')

        displayCalcEl.innerHTML = '456'
    }

    get displayCalc() {
        return this._displayCalc
    }

    set displayCalc(value) {
        this._displayCalc = value
    }
}