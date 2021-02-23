"use strict";
window.onload = () => {
    const selectedSeats = JSON.parse(localStorage.getItem("SEATS"));
    const bordingPoint = JSON.parse(localStorage.getItem("PICKUP"));
    const droppingPoint = JSON.parse(localStorage.getItem("DROP"));
    // if all the criteria matched
    if (selectedSeats && bordingPoint && droppingPoint) {
    }
};
