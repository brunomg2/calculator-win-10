class CalculatorController {
    constructor() {
        this._audio = new Audio('click.mp3')
        this._audioOnOf = false
        this._lastOperator = ''
        this._lastNumber = ''
        this._operation = []
        this._locale = 'pt-BR'
        this._dateEl = document.querySelector('#date')
        this._timeEl = document.querySelector('#time')
        this._displayCalcEl = document.querySelector('#display')
        this.initialize()
    }

    copyToClipboard() {
        let input = document.createElement('input')
        input.value = this.displayCalc

        document.body.appendChild(input)
        input.select()

        document.execCommand('Copy')
        input.remove()
    }

    pasteFromClipboard() {
        document.addEventListener('paste', event => {
            let text = event.clipboardData.getData('text')
            this.setPushOperation(text);
            this.displayCalc = parseFloat(text)
        })
    }

    initialize() {
        this.setDisplayDateTime()
        this.initButtonsEvents()

        setInterval(() => {
            this.setDisplayDateTime()
        }, 1000)

        this.setLastNumberToDisplay()
        this.initKeyboard()
        this.pasteFromClipboard()

        const audio = document.querySelector('.btn-audio')
        audio.onclick = (() => {
            this.toggleAudio()
        })
    }

    toggleAudio() {
        this._audioOnOf = !this._audioOnOf
    }

    playAudio() {
        if (this._audioOnOf) {
            this._audio.currentTime = 0
            this._audio.play()
        }
    }
    clearAll() {
        this._operation = []
        this._lastNumber = ''
        this._lastOperator = ''
        this.setLastNumberToDisplay()
    }

    clearEntry() {
        this._operation.pop()
        this.setLastNumberToDisplay()
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
        if (this._operation.length > 3) {

            this.calc()
        }
    }

    initKeyboard() {

        document.addEventListener('keyup', event => {
            this.playAudio()

            switch (event.key) {
                case 'Escape':
                    this.clearAll()
                    break
                case 'Backspace':
                    this.clearEntry()
                    break
                case 'x':
                case '*':
                    this.addOperation('*')
                    break
                case '÷':
                case '/':
                    this.addOperation('/')
                    break
                case '+':
                    this.addOperation('+')
                    break
                case '-':
                    this.addOperation('-')
                    break
                case '%':
                    this.addOperation('%')
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
                    this.addOperation(parseInt(event.key))
                    break
                case ',':
                case '.':
                    this.addDot()
                    break
                case 'Enter':
                case '=':
                    this.calc()
                    break
                case 'c':
                    if (event.ctrlKey) this.copyToClipboard()
                    break
                default:
                    break
            }
        })
    }

    getResult() {
        try {
            return eval(this._operation.join(""))
        } catch (error) {
            setTimeout(() => {
                this.setError()
            }, 1)
        }
    }

    calc() {
        let last = ''
        this._lastOperator = this.getLastItem()

        if (this._operation.length < 3) {
            let firstItem = this._operation[0]
            this._operation = [firstItem, this._lastOperator, this._lastNumber]
        }

        if (this._operation.length > 3) {
            let last = this._operation.pop()
            this._lastNumber = this.getResult()

        } else if (this._operation.length == 3) {
            this._lastNumber = this.getLastItem(false)
        }

        let result = this.getResult()

        if (last == '%') {
            result /= 100
            this._operation = [result]
        } else {
            this._operation = [result]
            if (last) this._operation.push(last)
        }

        this.setLastNumberToDisplay()
    }

    getLastItem(isOperator = true) {
        let lastItem

        for (let i = this._operation.length - 1; i >= 0; i--) {

            if (this.isOperator(this._operation[i]) === isOperator) {
                lastItem = this._operation[i]
                break
            }
        }

        if (!lastItem && lastItem !== 0) {

            lastItem = (!isOperator) ? this._lastNumber : this._lastOperator
        }

        return lastItem
    }

    setLastNumberToDisplay() {
        let lastNumber = this.getLastItem(false)

        if (!lastNumber) {
            lastNumber = 0
        }

        this.displayCalc = lastNumber
    }

    addOperation(value) {

        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {
                this.setLastOperation(value)

            } else {
                this.setPushOperation(value)
                this.setLastNumberToDisplay()
            }
        } else {

            if (this.isOperator(value)) {
                this.setPushOperation(value)
            } else {
                let newValue = this.getLastOperation().toString() + value.toString()
                this.setLastOperation(newValue)
                this.setLastNumberToDisplay()

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

    addDot() {
        const lastOperation = this.getLastOperation()
        if (lastOperation.toString().split('').indexOf('.') > -1) return

        if (this.isOperator(lastOperation) || lastOperation == undefined) {
            this.setPushOperation('0.')
        } else {
            this.setLastOperation(lastOperation.toString() + '.')
        }

        this.setLastNumberToDisplay()
    }

    executeButton(value) {
        this.playAudio()

        switch (value) {
            case 'C':
                this.clearAll()
                break
            case 'CE':
                this.clearEntry()
                break
            case 'x':
                this.addOperation('*')
                break
            case '÷':
                this.addOperation('/')
                break
            case '+':
            case '-':
            case '%':
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
            case ',':
                this.addDot()
                break
            case '=':
                this.calc()
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

        if (value.toString().length > 10) {
            this.setError()
            return false
        }
        this._displayCalcEl.innerHTML = value
    }

    get currentDate() {
        return new Date()
    }

    set currentDate(value) {
        this._dateEl = value
    }

}