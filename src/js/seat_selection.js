let seatLayoutList = JSON.parse(busMap).data;

if(!Array.isArray(seatLayoutList)) {
    seatLayoutList = [seatLayoutList];
}


console.log(seatLayoutList);

window.onload = () => {
    let seatlayout = document.getElementById("seatlayout");
    const grouphByLayer = groupBy(seatLayoutList, (se) => se.layer)
    const oLayers = Array.from(grouphByLayer.keys()).sort()
    oLayers.map(ol => {
        const layer = createLayer(grouphByLayer.get(ol));
        seatlayout.appendChild(layer);
    })
}


function createLayer(layer) {
    const div = document.createElement("div");
    div.className = "plane"
    const ol = document.createElement("ol");
    ol.className = "row cabin fuselage"
        // creating row on seet
    const rows = groupBy(layer, (se) => se.rowPos)

    const oRows = Array.from(rows.keys()).sort()
    oRows.map(r => {
        const row = createRow(rows.get(r));
        ol.appendChild(row);
    })
    div.appendChild(ol);
    return div
}

function createRow(row) {
    const li = document.createElement("li");
    li.className = "row"
    const ol = document.createElement("ol");
    ol.className = "seats"
        // creating columns in a seat
    const cols = groupBy(row, (se) => se.colPos)

    const oCols = Array.from(cols.keys()).sort((a, b) => a - b)
    console.log(oCols)
    oCols.map(c => {
        const col = createCol(cols.get(c));
        ol.appendChild(col);
    })
    li.appendChild(ol);
    return li
}

function createCol(col) {
    const seat = col[0]
    const li = document.createElement("li");
    li.className = seat.busSeatType.code.includes("SL") ? "seat sleeper" : "seat"
    const input = document.createElement("input")
    input.id = seat.seatName
    input.setAttribute("type", "checkbox");
    input.onclick = (e) => console.log(seat);
    const label = document.createElement('label');
    label.setAttribute('for', seat.seatName)
    label.innerText = seat.seatName

    li.appendChild(input);
    li.appendChild(label);
    return li
}

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}