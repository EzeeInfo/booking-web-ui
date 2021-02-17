var exampleModal;
window.onload = () => {
    fetchOperators();
    document.querySelector('button.btn:nth-child(2)').addEventListener('click', saveOperator)

    exampleModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
        keyboard: false
    })
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

        if (operators.length > 0) tBody.innerHTML = '';
        operators.map(operator => {
            const tr = document.createElement('tr');
            tr.appendChild(createColumn(operator.code));
            tr.appendChild(createColumn(operator.name));
            tr.appendChild(createColumn(`<span 
            class="btn btn-outline-primary" 
            onclick="currentPlace('${operator.code}','${operator.name}')"
            id="editModal" data-bs-toggle="modal" 
            data-bs-target="#exampleModal">
            <i class="far fa-edit"></i>
            </span> 
            <span>
            <a class="btn btn-outline-primary" href="/${operator.code}" target="_BLANK">
                <i class="fa fa-eye" aria-hidden="true"></i>
                </a>
            </span> 
            <span 
            class="btn btn-outline-primary" 
            data-bs-toggle="modal" 
            data-bs-target="#deleteModal" >
            
                <i class="fa fa-trash" aria-hidden="true"></i>
                
            </span> 
            `))
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
    const name = document.getElementById("operatorName").value;
    const operator = { code, name };
    if (isUpdate) {
        await update(operator);
    } else {
        await create(operator);
    }
    await fetchOperators();
    document.getElementById("operatorCode").value = ""
    document.getElementById("operatorName").value = ""

    exampleModal.hide();
}

async function create(operator) {
    const res = await fetch("/api/operators", {
        method: "POST",
        body: JSON.stringify(operator),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    const data = await res.json();
    isUpdate = false;
}

async function remove(code) {
    const res = await fetch("/api/operators/" + code, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    })
    await res.json();
    await fetchOperators();

}

async function update(operator) {
    const res = await fetch("/api/operators/" + operator.code, {
        method: "PUT",
        body: JSON.stringify(operator),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    const data = await res.json();
    isUpdate = false;
}