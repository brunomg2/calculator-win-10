class CalculatorController {
    constructor() {
        this._locale = 'pt-BR'
        this._dateEl = document.querySelector('#date')
        this._timeEl = document.querySelector('#time')
        this._displayCalcEl = document.querySelector('#display')
        this.initialize()
    }

    initialize() {
        this.setDisplayDateTime()
        this.initButtonsEvents()
        setInterval(() => {
            this.setDisplayDateTime()
        }, 1000)
    }

    addEventListenerAll(element, events, callback) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, callback, false)
        })
    }

    initButtonsEvents() {
        const buttons = document.querySelectorAll('button')
        buttons.forEach(button => {
            this.addEventListenerAll(button, 'click drag', () => {
                console.log(button.innerHTML)
            })
        })
    }

    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale)
    }

    get displayTime() {
        return this._timeEl.innerHTML
    }

    set displayTime(value) {
        this._timeEl.innerHTML = value
    }

    get displayDate() {
        return this._dateEl.innerHTML
    }

    set displayDate(value) {
        this._dateEl.innerHTML = value
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value
    }

    get currentDate() {
        return new Date()
    }

    set currentDate(value) {
        this._dateEl = value
    }

}