window.onload = () => {
    fetchOperators();
    document.querySelector('button.btn:nth-child(2)').addEventListener('click', saveOperator)

};

var isUpdate = false;

function createColumn(text) {
    const td = document.createElement('td');
    td.innerHTML = text;
    return td;
}

function fetchOperators() {

    fetch("/api/operators", {

    }).then(res => res.json()).then(operators => {
        const tBody = document.querySelector('table>tbody');
        tBody.innerHTML = '';
        operators.map(operator => {
            const tr = document.createElement('tr');
            tr.appendChild(createColumn(operator.code));
            tr.appendChild(createColumn(operator.name));
            tr.appendChild(createColumn(`<span class="btn btn-outline-primary" onclick="currentPlace('${operator.code}','${operator.name}')" id="editModal" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="far fa-edit"></i></span>`))
            tBody.appendChild(tr);
        });
    })
}

function currentPlace(code, name) {
    isUpdate = true;
    document.getElementById("operatorCode").value = code;
    document.getElementById("operatorName").value = name;
}

async function saveOperator() {
    const code = document.getElementById("operatorCode").value;
    const name = document.getElementById("operatorName").value
    const operator = { code, name };
    if (isUpdate) {
        update(operator);
    } else {
        create(operator);
    }
}

async function create(operator) {
    const res = await fetch("/api/operators", {
        method: "POST",
        body: JSON.stringify(operator),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    const data = res.json();
    fetchOperators();
    isUpdate = false;
}

async function update(operator) {
    const res = await fetch("/api/operators/" + operator.code, {
        method: "PUT",
        body: JSON.stringify(operator),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    const data = res.json();
    fetchOperators();
    isUpdate = false;
}