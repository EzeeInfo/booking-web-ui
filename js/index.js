"use strict";
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict';
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation');
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (form.checkValidity()) {
                var e = document.getElementById("fromStation");
                var from = e.options[e.selectedIndex].value;
                e = document.getElementById("toStation");
                var to = e.options[e.selectedIndex].value;
                var journeyDate = new Date(document.getElementById("jDate").value);
                var mm = journeyDate.getMonth() + 1; // getMonth() is zero-based
                var dd = journeyDate.getDate();
                var url = "/" +
                    (form.dataset["context"] ? form.dataset["context"] : "") +
                    "/bus-tickets/from/" + from +
                    "/to/" + to +
                    "?date=" + [(dd > 9 ? '' : '0') + dd,
                    (mm > 9 ? '' : '0') + mm,
                    journeyDate.getFullYear()
                ].join('-');
                location.href = url;
            }
            form.classList.add('was-validated');
        }, false);
    });
})();
window.onload = () => {
    document
        .getElementById("fromStation")
        .addEventListener("change", selectStation, false);
    var today = new Date().toISOString().split('T')[0];
    var dateFields = document.querySelectorAll("input[type='date']");
    dateFields.forEach(function (userItem) {
        userItem.min = today;
    });
};
function createOption(value = "", text = "--", isSelected = false) {
    const option = document.createElement("option");
    option.selected = isSelected;
    option.value = value;
    option.innerHTML = text;
    return option;
}
function selectStation(e) {
    let selectedOption = e.target.selectedOptions[0];
    let options = selectedOption.getAttribute("data-to").split(",");
    const toStation = document.getElementById("toStation");
    toStation.innerHTML = "";
    toStation.append(createOption("", "--", true));
    Array.from(document
        .getElementById("fromStation").options).forEach(function (option_element) {
        let option_text = option_element.text;
        let option_value = option_element.value;
        let is_option_selected = option_element.selected;
        if (options.includes(option_value)) {
            toStation.append(createOption(option_value, option_text, false));
        }
    });
}
