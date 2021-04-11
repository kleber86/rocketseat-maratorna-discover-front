let Modal = {
    open() {
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')
    },
    close() {
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    }
}

let transactions = [
    {
        description: 'Luz',
        amount: -50000,
        date: '09/04/2021'
    },
    {
        description: 'Criação Website',
        amount: 200000,
        date: '09/04/2021'
    },
    {
        description: 'Internet',
        amount: -10000,
        date: '09/04/2021'
    },
    {
        description: 'Gastos Gerais',
        amount: -100000,
        date: '09/04/2021'
    }
]

let Transaction = {
    all: transactions,

    add(transaction) {
        Transaction.all.push(transaction)

        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes() {
        let incomes = 0
        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0) {
                incomes = incomes + transaction.amount
            }
        })
        return incomes
    },

    expenses() {
        let expense = 0
        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expense = expense + transaction.amount
            }
        })

        return expense
    },

    total() {
        return Transaction.incomes() + Transaction.expenses()
    }
}

let DOM = {
    transactionContainer: document.querySelector("#data-table tbody"),
    addTransaction(transaction, index) {

        let tr = document.createElement('tr')
        tr.innerHTML = DOM.innertHTMLTransaction(transaction, index)
        tr.dataset.index = index
        
        this.transactionContainer.appendChild(tr)
    },

    innertHTMLTransaction(transaction, index) {
        let CSSClass = transaction.amount > 0 ? "income" : "expense"

        let amount = Utils.formatCurrency(transaction.amount)

        let html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSClass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação"></td>
        `

        return html
    },

    updateBalance() {
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransaction() {
        DOM.transactionContainer.innerHTML = ''
    }
}

let Utils = {
    formatAmount(value) {
        value = Number(value) * 100

        return value
    },

    formatDate(date) {
        let splittedDate = date.split('-')
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatCurrency(value) {
        let signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString('pt-BR', {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}

let Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateFields() {
        let { description, amount, date } = Form.getValues()

        if (description.trim() === '' || amount.trim() === '' || date.trim() === '') {
            throw new Error('Preencha os campos')
        }
    },

    formatValues(value) {
        let { description, amount, date } = Form.getValues()

        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)

        return {
            description,
            amount,
            date
        }
    },

    saveTransaction(transaction) {
        Transaction.add(transaction)
    },

    clearFields() {
        Form.description.value = ''
        Form.amount.value = ''
        Form.date.value = ''
    },

    submit(event) {
        event.preventDefault()

        try {
            Form.validateFields()
            let transaction = Form.formatValues()
            Transaction.add(transaction)
            Form.clearFields()
            Modal.close()
        } catch (error) {
            alert(error.message)
        }
    }

}

let App = {
    init() {
        Transaction.all.forEach((transaction, index) => DOM.addTransaction(transaction, index))

        DOM.updateBalance()
    },

    reload() {
        DOM.clearTransaction()
        App.init()
    }
}

App.init()