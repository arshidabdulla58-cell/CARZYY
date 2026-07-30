/*====================================
        CARZYYY DASHBOARD.JS
====================================*/

/*====================================
        LOAD DATA
====================================*/

function getCars() {

    return CARZYYY.loadData("cars");

}

function getUsers() {

    return CARZYYY.loadData("users");

}

function getBookings() {

    return CARZYYY.loadData("bookings");

}

/*====================================
        DASHBOARD STATISTICS
====================================*/

function loadStatistics() {

    const cars = getCars();

    const users = getUsers();

    const bookings = getBookings();

    const revenue = bookings.reduce(

        (total, booking) => total + booking.totalPrice,

        0

    );

    document.getElementById("totalCars").textContent = cars.length;

    document.getElementById("totalUsers").textContent = users.length;

    document.getElementById("totalBookings").textContent = bookings.length;

    document.getElementById("totalRevenue").textContent = "₹" + revenue.toLocaleString("en-IN");

}

/*====================================
        SHOW ADMIN NAME
====================================*/

function loadAdmin() {

    const user = JSON.parse(

        localStorage.getItem("currentUser")

    );

    if(!user) return;

    const adminName = document.getElementById("adminName");

    if(adminName){

        adminName.textContent = user.fullName;

    }

}

/*====================================
        INITIALIZE
====================================*/

document.addEventListener("DOMContentLoaded",()=>{

    loadStatistics();

    loadAdmin();

});
/*====================================
        LOAD CAR TABLE
====================================*/

function loadCarTable() {

    const cars = getCars();

    const tableBody = document.querySelector("#carTable tbody");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (cars.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="9" style="text-align:center;">

                    No cars available.

                </td>

            </tr>

        `;

        return;

    }

    cars.forEach(car => {

        tableBody.innerHTML += `

            <tr>

                <td>${car.id}</td>

                <td>

                    <img

                        src="${car.image}"

                        alt="${car.name}"

                        class="table-img"

                    >

                </td>

                <td>${car.name}</td>

                <td>${car.brand}</td>

                <td>${car.fuel}</td>

                <td>${car.transmission}</td>

                <td>₹${car.price}</td>

                <td>

                    <span class="status ${car.status === "Available" ? "available" : "rented"}">

                        ${car.status}

                    </span>

                </td>

                <td>

                    <button

                        class="edit-btn"

                        onclick="editCar('${car.id}')">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button

                        class="delete-btn"

                        onclick="deleteCar('${car.id}')">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>

        `;

    });

}

/*====================================
        SEARCH CAR
====================================*/

function searchCar() {

    const keyword = document

        .getElementById("searchCar")

        .value

        .toLowerCase();

    const rows = document.querySelectorAll(

        "#carTable tbody tr"

    );

    rows.forEach(row => {

        const text = row.textContent.toLowerCase();

        row.style.display =

            text.includes(keyword)

            ? ""

            : "none";

    });

}

/*====================================
        REFRESH DASHBOARD
====================================*/

function refreshDashboard() {

    loadStatistics();

    loadCarTable();

}

/*====================================
        INITIALIZE
====================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        loadCarTable();

        const search = document.getElementById("searchCar");

        if (search) {

            search.addEventListener(

                "keyup",

                searchCar

            );

        }

    }

);
/*====================================
        LOAD BOOKINGS TABLE
====================================*/

function loadBookingTable() {

    const bookings = getBookings();

    const tableBody = document.querySelector("#bookingTable tbody");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (bookings.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="7" style="text-align:center;">

                    No bookings available.

                </td>

            </tr>

        `;

        return;

    }

    bookings.forEach(booking => {

        tableBody.innerHTML += `

            <tr>

                <td>${booking.id}</td>

                <td>${booking.customerName}</td>

                <td>${booking.car.name}</td>

                <td>${booking.pickupDate}</td>

                <td>${booking.returnDate}</td>

                <td>₹${booking.totalPrice}</td>

                <td>

                    <span class="status available">

                        ${booking.status}

                    </span>

                </td>

            </tr>

        `;

    });

}

/*====================================
        LOAD USERS TABLE
====================================*/

function loadUserTable() {

    const users = getUsers();

    const tableBody = document.querySelector("#userTable tbody");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (users.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="6" style="text-align:center;">

                    No registered users.

                </td>

            </tr>

        `;

        return;

    }

    users.forEach(user => {

        tableBody.innerHTML += `

            <tr>

                <td>${user.id}</td>

                <td>${user.fullName}</td>

                <td>${user.email}</td>

                <td>${user.phone}</td>

                <td>${user.username}</td>

                <td>

                    <span class="status available">

                        Active

                    </span>

                </td>

            </tr>

        `;

    });

}

/*====================================
        RECENT ACTIVITY
====================================*/

function loadRecentActivity() {

    const activityList = document.querySelector(".activity-list");

    if (!activityList) return;

    activityList.innerHTML = "";

    const bookings = getBookings().slice(-3).reverse();

    if (bookings.length === 0) {

        activityList.innerHTML = `

            <p>No recent activity.</p>

        `;

        return;

    }

    bookings.forEach(booking => {

        activityList.innerHTML += `

            <div class="activity-item">

                <i class="fa-solid fa-car"></i>

                <div>

                    <h4>

                        New Booking

                    </h4>

                    <p>

                        ${booking.customerName}

                        booked

                        ${booking.car.name}

                    </p>

                </div>

            </div>

        `;

    });

}

/*====================================
        REFRESH EVERYTHING
====================================*/

function refreshDashboard() {

    loadStatistics();

    loadCarTable();

    loadBookingTable();

    loadUserTable();

    loadRecentActivity();

}

/*====================================
        INITIALIZE
====================================*/

document.addEventListener("DOMContentLoaded", () => {

    refreshDashboard();

});