/*====================================
        CARZYYY BOOKING.JS
====================================*/

let selectedCar = null;

/*====================================
        LOAD SELECTED CAR
====================================*/

function loadSelectedCar() {

    const carData = localStorage.getItem("selectedCar");

    if (!carData) {

        alert("No car selected!");

        window.location.href = "cars.html";

        return;

    }

    selectedCar = JSON.parse(carData);

    displaySelectedCar();

}

/*====================================
        DISPLAY SELECTED CAR
====================================*/

function displaySelectedCar() {

    const container = document.getElementById("selectedCar");

    if (!container || !selectedCar) return;

    container.innerHTML = `

        <div class="booking-car-card">

            <div class="booking-car-image">

                <img src="${selectedCar.image}" alt="${selectedCar.name}">

            </div>

            <div class="booking-car-details">

                <h2>${selectedCar.name}</h2>

                <div class="price">

                    ₹${selectedCar.price} / Day

                </div>

                <div class="car-specs">

                    <div class="spec">
                        <i class="fa-solid fa-building"></i>
                        <span>${selectedCar.brand}</span>
                    </div>

                    <div class="spec">
                        <i class="fa-solid fa-gas-pump"></i>
                        <span>${selectedCar.fuel}</span>
                    </div>

                    <div class="spec">
                        <i class="fa-solid fa-gears"></i>
                        <span>${selectedCar.transmission}</span>
                    </div>

                    <div class="spec">
                        <i class="fa-solid fa-users"></i>
                        <span>${selectedCar.seats} Seats</span>
                    </div>

                </div>

            </div>

        </div>

    `;

    document.getElementById("summaryCar").textContent = selectedCar.name;

    document.getElementById("pricePerDay").textContent =
        "₹" + selectedCar.price;

}

/*====================================
        INITIALIZE
====================================*/

document.addEventListener("DOMContentLoaded", () => {

    loadSelectedCar();

});
/*====================================
        DATE CALCULATION
====================================*/

const pickupInput = document.getElementById("pickupDate");

const returnInput = document.getElementById("returnDate");

function calculateBooking() {

    if (!selectedCar) return;

    const pickup = new Date(pickupInput.value);

    const returnDate = new Date(returnInput.value);

    if (!pickupInput.value || !returnInput.value) {

        document.getElementById("totalDays").textContent = "0";

        document.getElementById("totalPrice").textContent = "₹0";

        return;

    }

    if (returnDate <= pickup) {

        alert("Return date must be after pickup date.");

        returnInput.value = "";

        document.getElementById("totalDays").textContent = "0";

        document.getElementById("totalPrice").textContent = "₹0";

        return;

    }

    const oneDay = 1000 * 60 * 60 * 24;

    const totalDays = Math.ceil(

        (returnDate - pickup) / oneDay

    );

    const totalPrice = totalDays * selectedCar.price;

    document.getElementById("totalDays").textContent = totalDays;

    document.getElementById("totalPrice").textContent =

        "₹" + totalPrice.toLocaleString("en-IN");

}

/*====================================
        MINIMUM DATE
====================================*/

function setMinimumDate() {

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const minDate = today.toISOString().split("T")[0];

    pickupInput.min = minDate;

    returnInput.min = minDate;

}

/*====================================
        UPDATE RETURN DATE
====================================*/

pickupInput.addEventListener("change", () => {

    returnInput.min = pickupInput.value;

    calculateBooking();

});

returnInput.addEventListener(

    "change",

    calculateBooking

);

/*====================================
        INITIALIZE
====================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        setMinimumDate();

    }

);
/*====================================
        SAVE BOOKING
====================================*/

function saveBooking(event) {

    event.preventDefault();

    if (!selectedCar) {

        alert("No car selected!");

        return;

    }

    const customerName = document.getElementById("customerName").value.trim();

    const customerEmail = document.getElementById("customerEmail").value.trim();

    const customerPhone = document.getElementById("customerPhone").value.trim();

    const pickupDate = document.getElementById("pickupDate").value;

    const returnDate = document.getElementById("returnDate").value;

    const totalDays = parseInt(
        document.getElementById("totalDays").textContent
    );

    const totalPrice = parseInt(
        document
            .getElementById("totalPrice")
            .textContent
            .replace("₹", "")
            .replace(/,/g, "")
    );

    if (

        customerName === "" ||

        customerEmail === "" ||

        customerPhone === "" ||

        pickupDate === "" ||

        returnDate === "" ||

        totalDays <= 0

    ) {

        alert("Please complete all booking details.");

        return;

    }

    const booking = {

        id: "BOOK" + Date.now(),

        customerName,

        customerEmail,

        customerPhone,

        pickupDate,

        returnDate,

        totalDays,

        totalPrice,

        bookingDate: new Date().toLocaleDateString(),

        status: "Confirmed",

        car: selectedCar

    };

    let bookings = JSON.parse(

        localStorage.getItem("bookings")

    ) || [];

    bookings.push(booking);

    localStorage.setItem(

        "bookings",

        JSON.stringify(bookings)

    );

    /*====================================
            UPDATE CAR STATUS
    ====================================*/

    let cars = JSON.parse(

        localStorage.getItem("cars")

    ) || [];

    const index = cars.findIndex(

        car => car.id === selectedCar.id

    );

    if (index !== -1) {

        cars[index].status = "Rented";

    }

    localStorage.setItem(

        "cars",

        JSON.stringify(cars)

    );

    localStorage.removeItem("selectedCar");

    alert("Booking Confirmed Successfully!");

    document.getElementById("bookingForm").reset();

    setTimeout(() => {

        window.location.href = "cars.html";

    }, 1000);

}

/*====================================
        INITIALIZE
====================================*/

document.addEventListener("DOMContentLoaded", () => {

    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {

        bookingForm.addEventListener(

            "submit",

            saveBooking

        );

    }

});