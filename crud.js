/*====================================
        CARZYYY CRUD.JS
====================================*/

let editCarId = null;

/*====================================
        MODAL ELEMENTS
====================================*/

const modal = document.getElementById("carModal");

const addCarBtn = document.getElementById("addCarBtn");

const closeModal = document.querySelector(".close-modal");

const cancelBtn = document.querySelector(".cancel-btn");

const carForm = document.getElementById("carForm");

/*====================================
        OPEN MODAL
====================================*/

function openModal() {

    editCarId = null;

    document.getElementById("modalTitle").textContent =

        "Add New Car";

    carForm.reset();

    modal.style.display = "flex";

}

/*====================================
        CLOSE MODAL
====================================*/

function closeCarModal() {

    modal.style.display = "none";

}

/*====================================
        EVENTS
====================================*/

if(addCarBtn){

    addCarBtn.addEventListener(

        "click",

        openModal

    );

}

if(closeModal){

    closeModal.addEventListener(

        "click",

        closeCarModal

    );

}

if(cancelBtn){

    cancelBtn.addEventListener(

        "click",

        closeCarModal

    );

}

window.onclick=function(event){

    if(event.target===modal){

        closeCarModal();

    }

};
/*====================================
        SAVE CAR (CREATE)
====================================*/

function saveCar(event) {

    event.preventDefault();

    const name = document.getElementById("carName").value.trim();
    const brand = document.getElementById("carBrand").value.trim();
    const fuel = document.getElementById("fuelType").value;
    const transmission = document.getElementById("transmission").value;
    const seats = parseInt(document.getElementById("seats").value);
    const price = parseInt(document.getElementById("price").value);
    const image = document.getElementById("image").value.trim();
    const status = document.getElementById("status").value;

    if (
        name === "" ||
        brand === "" ||
        image === "" ||
        isNaN(seats) ||
        isNaN(price)
    ) {

        CARZYYY.showToast(
            "Please fill all fields.",
            "error"
        );

        return;
    }

    let cars = CARZYYY.loadData("cars");

    const newCar = {

        id: CARZYYY.generateID("CAR"),

        name,

        brand,

        fuel,

        transmission,

        seats,

        price,

        image,

        status

    };

    if (editCarId) {

    updateCar();

    return;

}

cars.push(newCar);

CARZYYY.saveData("cars", cars);

    CARZYYY.showToast(

        "Car Added Successfully!"

    );

    closeCarModal();

    if (typeof refreshDashboard === "function") {

        refreshDashboard();

    }

}

/*====================================
        FORM EVENT
====================================*/

if (carForm) {

    carForm.addEventListener(

        "submit",

        saveCar

    );

}
/*====================================
        EDIT CAR
====================================*/

function editCar(carId) {

    let cars = CARZYYY.loadData("cars");

    const car = cars.find(c => c.id === carId);

    if (!car) {

        CARZYYY.showToast(

            "Car not found.",

            "error"

        );

        return;

    }

    editCarId = carId;

    document.getElementById("modalTitle").textContent =

        "Edit Car";

    document.getElementById("carName").value = car.name;

    document.getElementById("carBrand").value = car.brand;

    document.getElementById("fuelType").value = car.fuel;

    document.getElementById("transmission").value = car.transmission;

    document.getElementById("seats").value = car.seats;

    document.getElementById("price").value = car.price;

    document.getElementById("image").value = car.image;

    document.getElementById("status").value = car.status;

    modal.style.display = "flex";

}

/*====================================
        UPDATE CAR
====================================*/

function updateCar() {

    let cars = CARZYYY.loadData("cars");

    const index = cars.findIndex(

        car => car.id === editCarId

    );

    if (index === -1) return;

    cars[index].name = document.getElementById("carName").value.trim();

    cars[index].brand = document.getElementById("carBrand").value.trim();

    cars[index].fuel = document.getElementById("fuelType").value;

    cars[index].transmission = document.getElementById("transmission").value;

    cars[index].seats = parseInt(document.getElementById("seats").value);

    cars[index].price = parseInt(document.getElementById("price").value);

    cars[index].image = document.getElementById("image").value.trim();

    cars[index].status = document.getElementById("status").value;

    CARZYYY.saveData(

        "cars",

        cars

    );

    CARZYYY.showToast(

        "Car Updated Successfully!"

    );

    closeCarModal();

    if (typeof refreshDashboard === "function") {

        refreshDashboard();

    }

}
/*====================================
        DELETE CAR
====================================*/

function deleteCar(carId) {

    const confirmDelete = confirm(

        "Are you sure you want to delete this car?"

    );

    if (!confirmDelete) return;

    let cars = CARZYYY.loadData("cars");

    cars = cars.filter(

        car => car.id !== carId

    );

    CARZYYY.saveData(

        "cars",

        cars

    );

    CARZYYY.showToast(

        "Car Deleted Successfully!"

    );

    if (typeof refreshDashboard === "function") {

        refreshDashboard();

    }

}

/*====================================
        RESET FORM AFTER CLOSE
====================================*/

function resetCarForm() {

    if (!carForm) return;

    carForm.reset();

    editCarId = null;

    document.getElementById("modalTitle").textContent =

        "Add New Car";

}

if (modal) {

    modal.addEventListener("click", function (e) {

        if (e.target === modal) {

            closeCarModal();

            resetCarForm();

        }

    });

}

/*====================================
        CLOSE BUTTON RESET
====================================*/

if (closeModal) {

    closeModal.addEventListener("click", resetCarForm);

}

if (cancelBtn) {

    cancelBtn.addEventListener("click", resetCarForm);

}

/*====================================
        AUTO REFRESH
====================================*/

window.addEventListener("storage", () => {

    if (typeof refreshDashboard === "function") {

        refreshDashboard();

    }

});