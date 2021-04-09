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
    incomes() {
        // Soma das entradas
    },
    expenses() {
        // Soma das saídas
    },
    total() {
        // Calculo das entradas - saídas
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

        let html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSClass}">${transaction.amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img src="./assets/minus.svg" alt="Remover transação"></td>
        `

        return html
    }
}

transactions.forEach(function (transaction) {
    DOM.addTransaction(transaction)
})