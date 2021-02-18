window.onload = () => {
  document
    .getElementById("fromStation")
    .addEventListener("change", selectStation, false);


    var today = new Date().toISOString().split('T')[0];
    var dateFields = document.querySelectorAll("input[type='date']");

    dateFields.forEach(function(userItem) {
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
    .getElementById("fromStation").options).forEach(function(option_element) {
    let option_text = option_element.text;
    let option_value = option_element.value;
    let is_option_selected = option_element.selected;

    if(options.includes(option_value)) {
      toStation.append(createOption(option_value, option_text, false));
    }
});




}
