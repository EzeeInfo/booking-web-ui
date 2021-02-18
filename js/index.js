"use strict";
window.onload = function () {
    document
        .getElementById("fromStation")
        .addEventListener("change", selectStation, false);
    var today = new Date().toISOString().split('T')[0];
    var dateFields = document.querySelectorAll("input[type='date']");
    dateFields.forEach(function (userItem) {
        userItem.min = today;
    });
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
    Array.from(document
        .getElementById("fromStation").options).forEach(function (option_element) {
        var option_text = option_element.text;
        var option_value = option_element.value;
        var is_option_selected = option_element.selected;
        if (options.includes(option_value)) {
            toStation.append(createOption(option_value, option_text, false));
        }
    });
}
