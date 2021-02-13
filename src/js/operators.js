window.onload = (event) => {

    fetchOperators();
};

function createColumn(text) {
    const td = document.createElement('td');
    td.innerHTML = text;
    return td;
}

function fetchOperators() {

    fetch("/api/operators", {

    }).then(res => res.json()).then(operators => {
        const tBody = document.querySelector('table>tbody');
        operators.map(operator => {
            const tr = document.createElement('tr');
            tr.appendChild(createColumn(operator.code));
            tr.appendChild(createColumn(operator.name));
            tr.appendChild(createColumn('<span class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="far fa-edit"></i></span>'))
            tBody.appendChild(tr);
        });
    })
}