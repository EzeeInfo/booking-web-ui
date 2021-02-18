window.onload = () => {
  document
    .getElementById("fromStation")
    .addEventListener("change", selectStation, false);
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
  options.map((option) => {
    return toStation.append(createOption(option, option));
  });
}
