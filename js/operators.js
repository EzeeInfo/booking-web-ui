"use strict";
window.onload = function (event) {
    fetchOperators();
};
function createColumn(text) {
    var td = document.createElement('td');
    td.innerHTML = text;
    return td;
}
function fetchOperators() {
    fetch("/api/operators", {}).then(function (res) { return res.json(); }).then(function (operators) {
        var tBody = document.querySelector('table>tbody');
        operators.map(function (operator) {
            var tr = document.createElement('tr');
            tr.appendChild(createColumn(operator.code));
            tr.appendChild(createColumn(operator.name));
            tr.appendChild(createColumn('<span class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="far fa-edit"></i></span>'));
            tBody.appendChild(tr);
        });
    });
}
