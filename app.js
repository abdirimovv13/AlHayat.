import * as THREE from "three";

/* ---------------- 3D ---------------- */

const container = document.getElementById("three-container");

if(container){

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    const renderer = new THREE.WebGLRenderer({
        antialias:true
    });

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    container.appendChild(renderer.domElement);

    const geometry =
        new THREE.TorusKnotGeometry(2,0.5,100,16);

    const material =
        new THREE.MeshStandardMaterial({
            color:0xFFD700
        });

    const knot =
        new THREE.Mesh(geometry,material);

    scene.add(knot);

    const light =
        new THREE.PointLight(0xffffff,100);

    light.position.set(5,5,5);

    scene.add(light);

    camera.position.z = 6;

    function animate(){

        requestAnimationFrame(animate);

        knot.rotation.x += 0.01;
        knot.rotation.y += 0.01;

        renderer.render(scene,camera);
    }

    animate();

    window.addEventListener("resize",()=>{

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    });
}

/* ---------------- USERS ---------------- */

let users =
JSON.parse(localStorage.getItem("users")) || [];

let bookings =
JSON.parse(localStorage.getItem("bookings")) || [];

if(users.length === 0){

    users.push({
        username:"admin",
        password:"admin123",
        role:"admin"
    });

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
}

/* ---------------- MODALS ---------------- */

window.openLogin = ()=>{
    document.getElementById("loginModal").style.display="flex";
};

window.closeLogin = ()=>{
    document.getElementById("loginModal").style.display="none";
};

window.openRegister = ()=>{
    document.getElementById("registerModal").style.display="flex";
};

window.closeRegister = ()=>{
    document.getElementById("registerModal").style.display="none";
};

/* ---------------- REGISTER ---------------- */

window.register = ()=>{

    const username =
    document.getElementById("registerUsername").value;

    const password =
    document.getElementById("registerPassword").value;

    if(!username || !password){

        alert("Заполните поля");
        return;
    }

    users.push({
        username,
        password,
        role:"user"
    });

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert("Аккаунт создан");

    closeRegister();
};

/* ---------------- LOGIN ---------------- */

window.login = ()=>{

    const username =
    document.getElementById("loginUsername").value;

    const password =
    document.getElementById("loginPassword").value;

    const user =
    users.find(
        u =>
        u.username === username &&
        u.password === password
    );

    if(user){

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        alert("Успешный вход");

        closeLogin();

    }else{

        alert("Неверный логин или пароль");
    }
};

/* ---------------- BOOKING ---------------- */

const bookingForm =
document.getElementById("bookingForm");

if(bookingForm){

    bookingForm.addEventListener(
        "submit",
        e=>{

            e.preventDefault();

            const booking = {

                name:
                document.getElementById("guestName").value,

                checkin:
                document.getElementById("checkin").value,

                checkout:
                document.getElementById("checkout").value,

                room:
                document.getElementById("roomType").value
            };

            bookings.push(booking);

            localStorage.setItem(
                "bookings",
                JSON.stringify(bookings)
            );

            alert("Бронирование создано");

            bookingForm.reset();
        }
    );
}

/* ---------------- LANGUAGES ---------------- */

const translations = {

    ru:{
        home:"Главная",
        rooms:"Номера",
        booking:"Бронирование",
        contact:"Контакты",
        welcome:"Добро пожаловать в Al Hayat Hotel",
        subtitle:"Комфорт и роскошь мирового уровня",
        bookNow:"Забронировать",
        ourRooms:"Наши номера",
        bookingTitle:"Бронирование номера"
    },

    en:{
        home:"Home",
        rooms:"Rooms",
        booking:"Booking",
        contact:"Contacts",
        welcome:"Welcome to Al Hayat Hotel",
        subtitle:"World Class Luxury & Comfort",
        bookNow:"Book Now",
        ourRooms:"Our Rooms",
        bookingTitle:"Room Booking"
    },

    uz:{
        home:"Bosh sahifa",
        rooms:"Xonalar",
        booking:"Bron qilish",
        contact:"Aloqa",
        welcome:"Al Hayat Hotelga xush kelibsiz",
        subtitle:"Hashamat va qulaylik",
        bookNow:"Bron qilish",
        ourRooms:"Xonalarimiz",
        bookingTitle:"Xona bron qilish"
    }
};

document
.getElementById("language")
.addEventListener("change",e=>{

    const lang = e.target.value;

    document
    .querySelectorAll("[data-lang]")
    .forEach(el=>{

        const key =
        el.getAttribute("data-lang");

        el.innerText =
        translations[lang][key];
    });
});

/* ---------------- BOOK BUTTON ---------------- */

window.openBooking = ()=>{

    document
    .getElementById("booking")
    .scrollIntoView({
        behavior:"smooth"
    });
};