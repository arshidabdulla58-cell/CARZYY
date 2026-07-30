/*====================================
        CARZYYY AUTH.JS
====================================*/

/*====================================
        REGISTER USER
====================================*/

function registerUser(event) {

    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();

    const email = document.getElementById("email").value.trim().toLowerCase();

    const phone = document.getElementById("phone").value.trim();

    const username = document.getElementById("username").value.trim();

    const password = document.getElementById("password").value;

    const confirmPassword = document.getElementById("confirmPassword").value;

    if (

        fullName === "" ||

        email === "" ||

        phone === "" ||

        username === "" ||

        password === "" ||

        confirmPassword === ""

    ){

        CARZYYY.showToast(

            "Please fill all fields.",

            "error"

        );

        return;

    }

    if(password !== confirmPassword){

        CARZYYY.showToast(

            "Passwords do not match.",

            "error"

        );

        return;

    }

    let users = CARZYYY.loadData("users");

    const emailExists = users.some(

        user => user.email === email

    );

    if(emailExists){

        CARZYYY.showToast(

            "Email already registered.",

            "error"

        );

        return;

    }

    const usernameExists = users.some(

        user => user.username === username

    );

    if(usernameExists){

        CARZYYY.showToast(

            "Username already exists.",

            "error"

        );

        return;

    }

    const user = {

        id: CARZYYY.generateID("USER"),

        fullName,

        email,

        phone,

        username,

        password,

        role:"user",

        joined:CARZYYY.formatDate(new Date())

    };

    users.push(user);

    CARZYYY.saveData(

        "users",

        users

    );

    CARZYYY.showToast(

        "Registration Successful!"

    );

    document.getElementById(

        "registerForm"

    ).reset();

    setTimeout(()=>{

        window.location.href="login.html";

    },1200);

}

/*====================================
        REGISTER INITIALIZE
====================================*/

document.addEventListener("DOMContentLoaded",()=>{

    const registerForm=document.getElementById("registerForm");

    if(registerForm){

        registerForm.addEventListener(

            "submit",

            registerUser

        );

    }

});
/*====================================
        LOGIN USER
====================================*/

function loginUser(event){

    event.preventDefault();

    const username = document
        .getElementById("loginUsername")
        .value
        .trim();

    const password = document
        .getElementById("loginPassword")
        .value;

    /*============ ADMIN LOGIN ============*/

    if(username === "admin" && password === "arshid786"){

        const admin = {

            id:"ADMIN001",

            fullName:"Administrator",

            username:"admin",

            role:"admin"

        };

        localStorage.setItem(

            "currentUser",

            JSON.stringify(admin)

        );

        CARZYYY.showToast(

            "Welcome Admin!"

        );

        setTimeout(()=>{

            window.location.href="dashboard.html";

        },1000);

        return;

    }

    /*============ USER LOGIN ============*/

    const users = CARZYYY.loadData("users");

    const user = users.find(

        u =>

        u.username === username &&

        u.password === password

    );

    if(!user){

        CARZYYY.showToast(

            "Invalid username or password.",

            "error"

        );

        return;

    }

    localStorage.setItem(

        "currentUser",

        JSON.stringify(user)

    );

    CARZYYY.showToast(

        "Login Successful!"

    );

    setTimeout(()=>{

        window.location.href="index.html";

    },1000);

}

/*====================================
        LOGOUT
====================================*/

function logout(){

    localStorage.removeItem(

        "currentUser"

    );

    CARZYYY.showToast(

        "Logged out successfully."

    );

    setTimeout(()=>{

        window.location.href="login.html";

    },1000);

}

/*====================================
        CHECK LOGIN
====================================*/

function checkLogin(){

    return localStorage.getItem(

        "currentUser"

    ) !== null;

}

/*====================================
        GET CURRENT USER
====================================*/

function getCurrentUser(){

    const user = localStorage.getItem(

        "currentUser"

    );

    return user ? JSON.parse(user) : null;

}

/*====================================
        PROTECT DASHBOARD
====================================*/

function protectDashboard(){

    if(

        !window.location.pathname.includes(

            "dashboard.html"

        )

    ){

        return;

    }

    const user = getCurrentUser();

    if(

        !user ||

        user.role !== "admin"

    ){

        alert(

            "Admin access only!"

        );

        window.location.href="login.html";

    }

}

/*====================================
        LOGIN INITIALIZE
====================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        const loginForm = document.getElementById(

            "loginForm"

        );

        if(loginForm){

            loginForm.addEventListener(

                "submit",

                loginUser

            );

        }

        protectDashboard();

    }

);

