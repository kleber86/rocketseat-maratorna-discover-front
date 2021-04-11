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

    add(transaction){
        Transaction.all.push(transaction)

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
            if(transaction.amount < 0){
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
        tr.innerHTML = DOM.innertHTMLTransaction(transaction)
        this.transactionContainer.appendChild(tr)
    },

    innertHTMLTransaction(transaction) {
        let CSSClass = transaction.amount > 0 ? "income" : "expense"

        let amount = Utils.formatCurrency(transaction.amount)

        let html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSClass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img src="./assets/minus.svg" alt="Remover transação"></td>
        `

        return html
    },

    updateBalance() {
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransaction(){
        DOM.transactionContainer.innerHTML = ''
    }
}

let Utils = {
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

let App = {
    init(){
        Transaction.all.forEach(transaction => DOM.addTransaction(transaction))
        
        DOM.updateBalance()
    },

    reload(){
        DOM.clearTransaction()
        App.init()
    }
}

App.init()

Transaction.add({
    description: 'Alo',
    amount: 20000,
    date: '11/04/2021'

})