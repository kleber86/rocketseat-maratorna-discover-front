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
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '09/04/2021'
    },
    {
        id: 2,
        description: 'Criação Website',
        amount: 200000,
        date: '09/04/2021'
    },
    {
        id: 3,
        description: 'Internet',
        amount: -10000,
        date: '09/04/2021'
    },
    {
        id: 3,
        description: 'Internet',
        amount: -10000,
        date: '09/04/2021'
    }
]

let Transaction = {
    all: transactions,
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
transactions.forEach(function (transaction) {
    DOM.addTransaction(transaction)
})

DOM.updateBalance()