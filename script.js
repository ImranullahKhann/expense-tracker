// Initialize expenses and total costs if not already stored in the local storage
if (localStorage.getItem("data") === null) {
    let data = {
        id: 0,
        expenses: [],
        totalCosts: 0
    }
    localStorage.setItem("data", JSON.stringify(data))
}

let addButton = document.querySelector(".add-expense>button")
// On clicking the add button, add expense to the expenses, update the total costs, commit to local storage
addButton.addEventListener("click", (e) => {
    e.preventDefault();
    let data = JSON.parse(localStorage.getItem("data"));

    let desc = document.getElementById("expense-desc").value
    let cost = +document.getElementById("expense-cost").value
    let cat = document.getElementById("categories").value

    let exp = {
        id : data.id,
        desc : desc,
        cost : cost,
        category : cat
    }

    data.id++
    data.expenses.push(exp);
    data.totalCosts = data.totalCosts + cost

    localStorage.setItem("data", JSON.stringify(data));

    window.location.reload(); 
})

let content = document.querySelector(".content")
let data = JSON.parse(localStorage.getItem("data"))
let myExpenses = data.expenses
// display all the expenses  
for (expense of myExpenses) {
    const id = expense.id
    const costValue = expense.cost
    
    let exp  = document.createElement("div")
    exp.className = "expense"
    
    let desc = document.createElement("p")
    desc.className = "desc"
    desc.innerText = expense.desc

    let cost = document.createElement("p")
    cost.innerText = costValue

    let cat = document.createElement("p")
    cat.className = "category"
    cat.innerHTML = expense.category
    
    let del = document.createElement("button")
    del.innerText = "Remove"
    del.className = "remove-expense"
    del.addEventListener("click", (e) => {
        e.preventDefault();

        let data = JSON.parse(localStorage.getItem("data"));

        data.expenses = data.expenses.filter(item => item.id !== id);

        data.totalCosts = data.totalCosts - costValue

        localStorage.setItem("data", JSON.stringify(data));

        window.location.reload(); 
    })

    exp.appendChild(desc)
    exp.appendChild(cost)
    exp.appendChild(cat)
    exp.appendChild(del)

    content.appendChild(exp)
}
