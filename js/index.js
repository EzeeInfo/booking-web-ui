"use strict";
window.onload = function () {
    document
        .getElementById("fromStation")
        .addEventListener("change", selectStation, false);
};
function createOption(value, text, isSelected) {
    if (value === void 0) { value = ""; }
    if (text === void 0) { text = "--"; }
    if (isSelected === void 0) { isSelected = false; }
    var option = document.createElement("option");
    option.selected = isSelected;
    option.value = value;
    option.innerHTML = text;
    return option;
}
function selectStation(e) {
    var selectedOption = e.target.selectedOptions[0];
    var options = selectedOption.getAttribute("data-to").split(",");
    var toStation = document.getElementById("toStation");
    toStation.innerHTML = "";
    toStation.append(createOption("", "--", true));
    options.map(function (option) {
        return toStation.append(createOption(option, option));
    });
}
