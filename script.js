// Initialize expenses and total costs if not already stored in the local storage
if (localStorage.getItem("data") === null) {
    let data = {
        id: 0,
        expenses: [],
        categoryExpenses: {
            housing: 0,
            food: 0,
            transportation: 0,
            entertainment: 0,
            clothing: 0,
            healthcare: 0,
            education: 0,
            miscellaneous: 0
        },
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
    data.expenses.push(exp)

    data.categoryExpenses[cat.toLowerCase()] += cost 
    data.totalCosts += cost

    localStorage.setItem("data", JSON.stringify(data));

    window.location.reload(); 
})

let content = document.querySelector(".content")
let data = JSON.parse(localStorage.getItem("data"))
let myExpenses = data.expenses
// display all the expenses  
myExpenses.forEach(expense => {
    const id = expense.id
    const costValue = expense.cost
    const categ = expense.category
    
    let exp  = document.createElement("div")
    exp.className = "expense"
    
    let desc = document.createElement("p")
    desc.className = "desc"
    desc.innerText = expense.desc

    let cost = document.createElement("p")
    cost.innerText = costValue

    let cat = document.createElement("p")
    cat.className = "category"
    cat.innerHTML = categ
    
    let del = document.createElement("button")
    del.innerText = "Remove"
    del.className = "remove-expense"
    del.addEventListener("click", (e) => {
        e.preventDefault();

        let data = JSON.parse(localStorage.getItem("data"))

        data.expenses = data.expenses.filter(item => item.id !== id)

        data.categoryExpenses[categ.toLowerCase()] -= costValue
        data.totalCosts -= costValue

        localStorage.setItem("data", JSON.stringify(data));

        window.location.reload(); 
    })

    exp.appendChild(desc)
    exp.appendChild(cost)
    exp.appendChild(cat)
    exp.appendChild(del)

    content.appendChild(exp)
});

// Visualize the chart
let categoryData = data.categoryExpenses

// Extract labels and values from the JSON object
const labels = Object.keys(categoryData);
const values = Object.values(categoryData);

// Define colors for the pie chart
const backgroundColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(201, 203, 207, 0.2)',
    'rgba(140, 140, 140, 0.2)'
];

const borderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(201, 203, 207, 1)',
    'rgba(140, 140, 140, 1)'
];

// Create the pie chart using Chart.js
const chart = document.getElementById('myChart').getContext('2d');

new Chart(chart, {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            data: values,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1
        }]
    },
    options: {
        responsive: false,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Total Expenses: ' + data.totalCosts
            }
        }
    }
})