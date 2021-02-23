"use strict";
let busDetails = JSON.parse(busMap).data;
let selectedSeats = [];
let pickup, drop;
window.onload = () => {
    // var busDetails = JSON.parse(data.busMap).data;
    let seatlayout = document.getElementById("seatlayout");
    let seatLayoutList = busDetails.bus.seatLayoutList;
    const grouphByLayer = groupBy(seatLayoutList, (se) => se.layer);
    const oLayers = Array.from(grouphByLayer.keys()).sort();
    oLayers.map(ol => {
        const layer = createLayer(grouphByLayer.get(ol));
        seatlayout.appendChild(layer);
    });
    renderOptions(busDetails.toStation.stationPoint, "dropingPoint");
    renderOptions(busDetails.fromStation.stationPoint, "pickupPoint");
    document.getElementById("book").addEventListener("click", bookSeat);
};
function bookSeat(event) {
    event.preventDefault();
    //do booking logics & validations
    //selectedSeats
    console.log("event submited");
    localStorage.setItem("SEATS", JSON.stringify(selectedSeats));
    localStorage.setItem("PICKUP", JSON.stringify(pickup));
    localStorage.setItem("DROP", JSON.stringify(drop));
}
function fareDetails() {
    let _selectedSeats = [], selectedfare = 0, selecteddiscount = 0, selectedstax = 0, selectedtotal = 0;
    selectedSeats.map(seat => {
        _selectedSeats.push(seat.seatName);
        selectedfare += seat.seatFare;
        selectedstax += seat.serviceTax;
    });
    let seats = _selectedSeats.join(",");
    document.querySelector('#selectedSeats > span:nth-child(1)').innerHTML = seats;
    document.querySelector('#selectedfare > span:nth-child(1)').innerHTML = selectedfare;
    document.querySelector('#selectedstax > span:nth-child(1)').innerHTML = selectedstax;
    document.querySelector('#selectedtotal > span:nth-child(1)').innerHTML = selectedfare + selectedstax;
}
function createLayer(layer) {
    const div = document.createElement("div");
    div.className = "plane";
    const ol = document.createElement("ol");
    ol.className = "row cabin fuselage";
    // creating row on seet
    const rows = groupBy(layer, (se) => se.rowPos);
    const orderedRows = Array.from(rows.keys()).sort((a, b) => a - b);
    const rowCount = orderedRows[orderedRows.length - 1];
    for (let i = 1; i <= rowCount; i++) {
        const row = createRow(rows.get(i));
        ol.appendChild(row);
    }
    div.appendChild(ol);
    return div;
}
function createRow(row) {
    const li = document.createElement("li");
    const ol = document.createElement("ol");
    if (row) {
        li.className = "row";
        ol.className = "seats";
        const cols = groupBy(row, (se) => se.colPos);
        const orderedColumns = Array.from(cols.keys()).sort((a, b) => a - b);
        const columnCount = orderedColumns[orderedColumns.length - 1];
        for (let i = 1; i <= columnCount; i++) {
            const col = createCol(cols.get(i));
            ol.appendChild(col);
        }
    }
    else {
        li.className = "row no-row";
        ol.className = "seats no-seats";
    }
    li.appendChild(ol);
    return li;
}
function createCol(col) {
    const li = document.createElement("li");
    if (col) {
        const seat = col[0];
        li.className = seat.busSeatType.code.includes("SL") ? "seat sleeper" : "seat";
        const input = document.createElement("input");
        input.id = seat.seatName;
        input.setAttribute("type", "checkbox");
        input.onclick = (e) => selectSeat(e, seat);
        const label = document.createElement('label');
        label.setAttribute('for', seat.seatName);
        label.innerText = seat.seatName;
        li.appendChild(input);
        li.appendChild(label);
    }
    else {
        li.className = "seat no-seat";
    }
    return li;
}
function renderOptions(options, id) {
    const select = document.getElementById(id);
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.code;
        opt.innerHTML = option.name;
        opt.onclick = () => selectPoint(option, id);
        select.appendChild(opt);
    });
}
function selectSeat(e, seat) {
    e.stopPropagation();
    if (selectedSeats.find(s => s.seatName == seat.seatName)) {
        selectedSeats = selectedSeats.filter(s => s.seatName != seat.seatName);
    }
    else {
        selectedSeats.push(seat);
    }
    fareDetails();
}
function selectPoint(point, stage) {
    if (stage == "pickupPoint") {
        pickup = point;
        document.getElementById("boarding-address").innerHTML = point.address;
    }
    else {
        drop = point;
        document.getElementById("dropping-address").innerHTML = point.address;
    }
}
function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        }
        else {
            collection.push(item);
        }
    });
    return map;
}
function setCookie(name, value) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/demobo/bus-tickets/seats";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
