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
var exampleModal;
var code;
var confermationModal;
window.onload = function () {
    fetchOperators();
    document.querySelector('button.btn:nth-child(2)').addEventListener('click', saveOperator);
    exampleModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
        keyboard: false
    });
    confermationModal = new bootstrap.Modal(document.getElementById('deleteModal'), {
        keyboard: false
    });
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
        if (operators.length == 0) {
            tBody.innerHTML = "<tr class=\"text-center\">\n                            <td colspan=\"3\"> <span class=\"text-muted font-italic\"> No Records\n                            Found ... Add your data to <a href=\"\" data-bs-toggle=\"modal\"\n                                data-bs-target=\"#exampleModal\">click here...</a></span></td>\n                        </tr>";
        }
        operators.map(function (operator) {
            var tr = document.createElement('tr');
            tr.appendChild(createColumn(operator.code));
            tr.appendChild(createColumn(operator.name));
            tr.appendChild(createColumn("<span \n            class=\"btn btn-outline-primary\" \n            onclick=\"currentPlace('" + operator.code + "','" + operator.name + "')\"\n            id=\"editModal\" data-bs-toggle=\"modal\" \n            data-bs-target=\"#exampleModal\">\n            <i class=\"far fa-edit\"></i>\n            </span> \n            <span>\n            <a class=\"btn btn-outline-primary\" href=\"/" + operator.code + "\" target=\"_BLANK\">\n                <i class=\"fa fa-eye\" aria-hidden=\"true\"></i>\n                </a>\n            </span> \n            <span \n            class=\"btn btn-outline-primary\" \n            data-bs-toggle=\"modal\" \n            onclick=\"deleteOperator('" + operator.code + "')\"\n            data-bs-target=\"#deleteModal\" >\n            \n                <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n                \n            </span> \n            "));
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
            switch (_a.label) {
                case 0:
                    code = document.getElementById("operatorCode").value;
                    name = document.getElementById("operatorName").value;
                    operator = { code: code, name: name };
                    if (!isUpdate) return [3 /*break*/, 2];
                    return [4 /*yield*/, update(operator)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, create(operator)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, fetchOperators()];
                case 5:
                    _a.sent();
                    document.getElementById("operatorCode").value = "";
                    document.getElementById("operatorName").value = "";
                    exampleModal.hide();
                    return [2 /*return*/];
            }
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
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    isUpdate = false;
                    return [2 /*return*/];
            }
        });
    });
}
function deleteOperator(operatorCode) {
    code = operatorCode;
}
function remove() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/api/operators/" + code, {
                        method: "DELETE",
                        headers: {
                            "Content-type": "application/json"
                        }
                    })];
                case 1:
                    res = _a.sent();
                    res.json().then(function (d) {
                        fetchOperators();
                    });
                    code = null;
                    confermationModal.hide();
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
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    isUpdate = false;
                    return [2 /*return*/];
            }
        });
    });
}
