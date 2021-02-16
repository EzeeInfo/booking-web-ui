"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
window.onload = function () {
    fetchOperators();
    document.querySelector('button.btn:nth-child(2)').addEventListener('click', saveOperator);
};
var isUpdate = false;
function createColumn(text) {
    var td = document.createElement('td');
    td.innerHTML = text;
    return td;
}
function fetchOperators() {
    fetch("/api/operators", {}).then(function (res) { return res.json(); }).then(function (operators) {
        var tBody = document.querySelector('table>tbody');
        tBody.innerHTML = '';
        operators.map(function (operator) {
            var tr = document.createElement('tr');
            tr.appendChild(createColumn(operator.code));
            tr.appendChild(createColumn(operator.name));
            tr.appendChild(createColumn("<span class=\"btn btn-outline-primary\" onclick=\"currentPlace('" + operator.code + "','" + operator.name + "')\" id=\"editModal\" data-bs-toggle=\"modal\" data-bs-target=\"#exampleModal\">\n            <i class=\"far fa-edit\"></i>\n            </span> \n            <span  >\n            <a class=\"btn btn-outline-primary\" href=\"http://localhost:8080/" + operator.code + "\" target=\"_BLANK\">\n                <i class=\"fa fa-eye\" aria-hidden=\"true\"></i>\n                </a>\n            </span> \n            "));
            tBody.appendChild(tr);
        });
    });
}
function currentPlace(code, name) {
    isUpdate = true;
    document.getElementById("operatorCode").value = code;
    document.getElementById("operatorName").value = name;
}
function saveOperator() {
    return __awaiter(this, void 0, void 0, function () {
        var code, name, operator;
        return __generator(this, function (_a) {
            code = document.getElementById("operatorCode").value;
            name = document.getElementById("operatorName").value;
            operator = { code: code, name: name };
            if (isUpdate) {
                update(operator);
            }
            else {
                create(operator);
            }
            fetchOperators();
            document.getElementById("operatorCode").value = "";
            document.getElementById("operatorName").value = "";
            return [2 /*return*/];
        });
    });
}
function create(operator) {
    return __awaiter(this, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/api/operators", {
                        method: "POST",
                        body: JSON.stringify(operator),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })];
                case 1:
                    res = _a.sent();
                    data = res.json();
                    isUpdate = false;
                    return [2 /*return*/];
            }
        });
    });
}
function update(operator) {
    return __awaiter(this, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/api/operators/" + operator.code, {
                        method: "PUT",
                        body: JSON.stringify(operator),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })];
                case 1:
                    res = _a.sent();
                    data = res.json();
                    isUpdate = false;
                    return [2 /*return*/];
            }
        });
    });
}