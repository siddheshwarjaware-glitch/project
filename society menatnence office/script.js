let records =
    JSON.parse(localStorage.getItem("societyRecords")) || [];

let expenses =
    JSON.parse(localStorage.getItem("societyExpenses")) || [];

function saveRecords() {
    localStorage.setItem(
        "societyRecords",
        JSON.stringify(records)
    );
}

function saveExpenses() {
    localStorage.setItem(
        "societyExpenses",
        JSON.stringify(expenses)
    );
}

/* --------------------------
   ADD MAINTENANCE RECORD
---------------------------*/

function addRecord() {

    const flatNo =
        document.getElementById("flatNo").value;

    const ownerName =
        document.getElementById("ownerName").value;

    const maintenance =
        Number(document.getElementById("maintenance").value);

    const paidAmount =
        Number(document.getElementById("paidAmount").value);

    const paymentDate =
        document.getElementById("paymentDate").value;

    if (!flatNo ||
        !ownerName ||
        !maintenance
    ) {
        alert("Please fill all fields");
        return;
    }

    const pending =
        maintenance - paidAmount;

    records.push({
        flatNo,
        ownerName,
        maintenance,
        paidAmount,
        pending,
        paymentDate
    });

    saveRecords();

    renderTable();

    document.getElementById("flatNo").value = "";
    document.getElementById("ownerName").value = "";
    document.getElementById("maintenance").value = "";
    document.getElementById("paidAmount").value = "";
    document.getElementById("paymentDate").value = "";
}

/* --------------------------
   ADD EXPENSE
---------------------------*/

function addExpense() {

    const expenseName =
        document.getElementById("expenseName").value;

    const expenseAmount =
        Number(document.getElementById("expenseAmount").value);

    const expenseDate =
        document.getElementById("expenseDate").value;

    if (!expenseName ||
        !expenseAmount
    ) {
        alert("Please enter expense");
        return;
    }

    expenses.push({
        expenseName,
        expenseAmount,
        expenseDate
    });

    saveExpenses();

    renderExpenses();

    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
    document.getElementById("expenseDate").value = "";
}

/* --------------------------
   MAINTENANCE TABLE
---------------------------*/

function renderTable() {

    const table =
        document.getElementById("recordTable");

    table.innerHTML = "";

    let totalMaintenance = 0;
    let totalCollected = 0;
    let totalPending = 0;

    records.forEach((record, index) => {

        totalMaintenance += record.maintenance;
        totalCollected += record.paidAmount;
        totalPending += record.pending;

        table.innerHTML += `
        <tr>
            <td>${record.flatNo}</td>
            <td>${record.ownerName}</td>
            <td>₹${record.maintenance}</td>
            <td>₹${record.paidAmount}</td>
            <td>₹${record.pending}</td>
            <td>${record.paymentDate}</td>

            <td>
                <button
                class="delete-btn"
                onclick="deleteRecord(${index})">
                Delete
                </button>
            </td>
        </tr>
        `;
    });

    document.getElementById(
            "totalMaintenance"
        ).innerText =
        "₹" + totalMaintenance;

    document.getElementById(
            "totalCollected"
        ).innerText =
        "₹" + totalCollected;

    document.getElementById(
            "totalPending"
        ).innerText =
        "₹" + totalPending;

    updateBalance();
}

/* --------------------------
   EXPENSE TABLE
---------------------------*/

function renderExpenses() {

    const table =
        document.getElementById("expenseTable");

    table.innerHTML = "";

    let totalSpent = 0;

    expenses.forEach((expense, index) => {

        totalSpent += expense.expenseAmount;

        table.innerHTML += `
        <tr>
            <td>${expense.expenseName}</td>
            <td>₹${expense.expenseAmount}</td>
            <td>${expense.expenseDate}</td>

            <td>
                <button
                class="delete-btn"
                onclick="deleteExpense(${index})">
                Delete
                </button>
            </td>
        </tr>
        `;
    });

    document.getElementById(
            "totalSpent"
        ).innerText =
        "₹" + totalSpent;

    updateBalance();
}

/* --------------------------
   DELETE RECORD
---------------------------*/

function deleteRecord(index) {

    if (confirm("Delete Record?")) {

        records.splice(index, 1);

        saveRecords();

        renderTable();
    }
}

/* --------------------------
   DELETE EXPENSE
---------------------------*/

function deleteExpense(index) {

    if (confirm("Delete Expense?")) {

        expenses.splice(index, 1);

        saveExpenses();

        renderExpenses();
    }
}

/* --------------------------
   BALANCE CALCULATION
---------------------------*/

function updateBalance() {

    let totalCollected = 0;
    let totalSpent = 0;

    records.forEach(record => {
        totalCollected += record.paidAmount;
    });

    expenses.forEach(expense => {
        totalSpent += expense.expenseAmount;
    });

    document.getElementById(
            "currentBalance"
        ).innerText =
        "₹" + (totalCollected - totalSpent);
}

/* --------------------------
   LOAD DATA
---------------------------*/

renderTable();
renderExpenses();