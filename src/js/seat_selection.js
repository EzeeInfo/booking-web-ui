let busDetails = JSON.parse(busMap).data;

window.onload = () => {
    // var busDetails = JSON.parse(data.busMap).data;
    let seatlayout = document.getElementById("seatlayout");
    let seatLayoutList = busDetails.bus.seatLayoutList
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

    const orderedRows = Array.from(rows.keys()).sort((a, b) => a - b);
    const rowCount = orderedRows[orderedRows.length - 1];
    for (let i = 1; i <= rowCount; i++) {
        const row = createRow(rows.get(i));
        ol.appendChild(row);
    }

    div.appendChild(ol);
    return div
}

function createRow(row) {
    const li = document.createElement("li");
    const ol = document.createElement("ol");

    if (row) {
        li.className = "row"
        ol.className = "seats"
        const cols = groupBy(row, (se) => se.colPos)
        const orderedColumns = Array.from(cols.keys()).sort((a, b) => a - b)
        const columnCount = orderedColumns[orderedColumns.length - 1];
        for (let i = 1; i <= columnCount; i++) {
            const col = createCol(cols.get(i));
            ol.appendChild(col);
        }
    } else {
        li.className = "row no-row"
        ol.className = "seats no-seats"
    }
    // creating columns in a seat

    li.appendChild(ol);
    return li
}

function createCol(col) {
    const li = document.createElement("li");
    if (col) {
        const seat = col[0]
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
    } else {
        li.className = "seat no-seat"
    }
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