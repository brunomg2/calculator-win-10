class CalculatorController {
    constructor() {
        this._operation = []
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

    clearAll() {
        this._operation = []
    }

    clearEntry() {
        this._operation.pop()
    }
    isOperator(value) {
        return (['+', '-', 'x', '÷', '/', '*', '%'].indexOf(value) > -1)
    }

    getLastOperation() {
        return this._operation[this._operation.length - 1]
    }

    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value
    }

    setPushOperation(value) {
        this._operation.push(value)
        if(this._operation.length > 3) {
            let last = this._operation.pop()
            console.log(this._operation)
        }
    }
    addOperation(value) {

        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {
                this.setLastOperation(value)

            } else if (isNaN(value)) {
                //Outra coisa
                console.log('outra coisa')

            } else {
                this.setPushOperation(value)
            }
        } else {

            if (this.isOperator(value)) {
                this.setPushOperation(value)
            } else {
                let newValue = this.getLastOperation().toString() + value.toString()
                this.setLastOperation(parseInt(newValue))
            }

        }
    }

    setError() {
        this.displayCalc = 'Error'
    }

    addEventListenerAll(element, events, callback) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, callback, false)
        })
    }

    executeButton(value) {
        switch (value) {
            case 'C':
                this.clearAll()
                break

            case 'CE':
                this.clearEntry()
                break
            case '+':
            case '-':
            case 'x':
            case '*':
            case '÷':
            case '%':
            case '/':
                this.addOperation(value)
                break
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value))
                break
            case '.':
            case ',':
                this.addOperation(value)
                break
            default:
                this.setError()
                break
        }
    }

    initButtonsEvents() {
        const buttons = document.querySelectorAll('button')
        buttons.forEach(button => {
            this.addEventListenerAll(button, 'click drag', () => {
                let textButton = button.innerHTML
                this.executeButton(textButton)
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