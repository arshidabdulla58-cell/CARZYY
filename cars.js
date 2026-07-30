/*====================================
        CARZYYY CARS.JS
====================================*/

// Default cars (used only the first time)

const defaultCars = [

    {
        id: "CAR001",
        name: "Toyota Fortuner",
        brand: "Toyota",
        fuel: "Diesel",
        transmission: "Automatic",
        seats: 7,
        price: 4800,
        status: "Available",
        image: "images/fortuner.jpg"
    },

    {
        id: "CAR002",
        name: "BMW X5",
        brand: "BMW",
        fuel: "Petrol",
        transmission: "Automatic",
        seats: 5,
        price: 8500,
        status: "Available",
        image: "images/bmw.jpg"
    },

    {
        id: "CAR003",
        name: "Hyundai Creta",
        brand: "Hyundai",
        fuel: "Petrol",
        transmission: "Manual",
        seats: 5,
        price: 2800,
        status: "Available",
        image: "images/creta.jpg"
    },

    {
        id: "CAR004",
        name: "Mahindra Thar",
        brand: "Mahindra",
        fuel: "Diesel",
        transmission: "Manual",
        seats: 4,
        price: 3500,
        status: "Available",
        image: "images/thar.jpg"
    }

];

/*====================================
        LOAD CARS
====================================*/

function loadCars() {

    let cars = CARZYYY.loadData("cars");

    if (cars.length === 0) {

        cars = defaultCars;

        CARZYYY.saveData("cars", cars);

    }

    return cars;

}

/*====================================
        DISPLAY CARS
====================================*/

function displayCars(carList) {

    const container = document.getElementById("carContainer");

    if (!container) return;

    container.innerHTML = "";

    carList.forEach(car => {

        container.innerHTML += `

        <div class="car-card">

            <img src="${car.image}" alt="${car.name}">

            <div class="car-info">

                <h3>${car.name}</h3>

                <p><i class="fa-solid fa-car"></i> ${car.brand}</p>

                <p><i class="fa-solid fa-gas-pump"></i> ${car.fuel}</p>

                <p><i class="fa-solid fa-gears"></i> ${car.transmission}</p>

                <p><i class="fa-solid fa-user-group"></i> ${car.seats} Seats</p>

                <h2>₹${car.price}<span>/Day</span></h2>

                <button
              class="book-btn ${car.status !== "Available" ? "disabled-btn" : ""}"
              onclick="bookCar('${car.id}')"
              ${car.status !== "Available" ? "disabled" : ""}>

              ${car.status === "Available" ? "Book Now" : "Unavailable"}
 
               </button>

            </div>

        </div>

        `;

    });

}

/*====================================
        INITIALIZE
====================================*/

document.addEventListener("DOMContentLoaded", () => {

    const cars = loadCars();

    displayCars(cars);

});
/*====================================
        SEARCH & FILTER
====================================*/

function filterCars() {

    const searchInput = document.getElementById("searchInput");
    const brandFilter = document.getElementById("brandFilter");
    const fuelFilter = document.getElementById("fuelFilter");
    const transmissionFilter = document.getElementById("transmissionFilter");

    const search = searchInput ? searchInput.value.toLowerCase() : "";
    const brand = brandFilter ? brandFilter.value : "All";
    const fuel = fuelFilter ? fuelFilter.value : "All";
    const transmission = transmissionFilter ? transmissionFilter.value : "All";

    let cars = loadCars();

    cars = cars.filter(car => {

        const matchSearch =
            car.name.toLowerCase().includes(search) ||
            car.brand.toLowerCase().includes(search);

        const matchBrand =
            brand === "All" || car.brand === brand;

        const matchFuel =
            fuel === "All" || car.fuel === fuel;

        const matchTransmission =
            transmission === "All" ||
            car.transmission === transmission;

        return (
            matchSearch &&
            matchBrand &&
            matchFuel &&
            matchTransmission
        );

    });

    displayCars(cars);

}

/*====================================
        EVENT LISTENERS
====================================*/

document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("searchInput");
    const brandFilter = document.getElementById("brandFilter");
    const fuelFilter = document.getElementById("fuelFilter");
    const transmissionFilter = document.getElementById("transmissionFilter");

    if (searchInput)
        searchInput.addEventListener("keyup", filterCars);

    if (brandFilter)
        brandFilter.addEventListener("change", filterCars);

    if (fuelFilter)
        fuelFilter.addEventListener("change", filterCars);

    if (transmissionFilter)
        transmissionFilter.addEventListener("change", filterCars);

});
/*====================================
        BOOK CAR
====================================*/

function bookCar(carId) {

    const cars = loadCars();

    const selectedCar = cars.find(car => car.id === carId);

    if (!selectedCar) {

        CARZYYY.showToast("Car not found!", "error");

        return;

    }

    if (selectedCar.status !== "Available") {

        CARZYYY.showToast("This car is currently unavailable!", "error");

        return;

    }

    // Save selected car for booking page
    localStorage.setItem(
        "selectedCar",
        JSON.stringify(selectedCar)
    );

    CARZYYY.showToast("Car selected successfully!");

    // Open booking page after a short delay
    setTimeout(() => {

        window.location.href = "booking.html";

    }, 800);

}

/*====================================
        UPDATE FILTER OPTIONS
====================================*/

function populateFilters() {

    const cars = loadCars();

    const brandFilter = document.getElementById("brandFilter");

    if (!brandFilter) return;

    // Keep the first option ("All Brands")
    brandFilter.innerHTML = '<option value="All">All Brands</option>';

    const brands = [...new Set(cars.map(car => car.brand))];

    brands.forEach(brand => {

        brandFilter.innerHTML += `

            <option value="${brand}">

                ${brand}

            </option>

        `;

    });

}

/*====================================
        PAGE INITIALIZATION
====================================*/

document.addEventListener("DOMContentLoaded", () => {

    populateFilters();

    displayCars(loadCars());

});