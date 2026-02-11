    function createStar(num){
        for (let i = 0; i < num; i++) {
            let star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + 'vw';
            star.style.top = Math.random() * 100 + 'vh';
            star.style.animationDuration = (Math.random() * 3 + 2) + 's'; 
            star.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(star);
        }
    }
    createStar(100);
    
    const form = document.getElementById('loginForm');
    const error = document.getElementById('error');
    


    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
        if(username === "admin" && password === "admin") {
            localStorage.setItem("auth", true);
            window.location.href = "dashboard.html";
        } else {
            error.textContent = "Username o password errati!";
        }
    });

    
    const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;

function koch(x1, y1, x2, y2, n) {
    if (n === 0) {
        ctx.lineTo(x2, y2);
        return;
    }

    const dx = (x2 - x1) / 3;
    const dy = (y2 - y1) / 3;
    
    const p1x = x1 + dx;
    const p1y = y1 + dy;
    
    const p3x = x1 + 2 * dx;
    const p3y = y1 + 2 * dy;

    const ang = -Math.PI / 3;
    const p2x = p1x + dx * Math.cos(ang) - dy * Math.sin(ang);
    const p2y = p1y + dx * Math.sin(ang) + dy * Math.cos(ang);

    koch(x1, y1, p1x, p1y, n - 1);
    koch(p1x, p1y, p2x, p2y, n - 1);
    koch(p2x, p2y, p3x, p3y, n - 1);
    koch(p3x, p3y, x2, y2, n - 1);
}

function disegna(profondita) {
    const lato = 500;
    const h = lato * Math.sin(Math.PI / 3);
    
    const ax = 150, ay = 250;
    const bx = 650, by = 250;
    const cx = 400, cy = 250 + h;

    ctx.clearRect(0, 0, 800, 800);
    ctx.beginPath();
    ctx.moveTo(ax, ay);

    koch(ax, ay, bx, by, profondita);
    koch(bx, by, cx, cy, profondita);
    koch(cx, cy, ax, ay, profondita);

    ctx.fillStyle = "black";
    ctx.fill();
}

disegna(4);

/* ================= REGISTRAZIONE ================= */

const registerForm = document.getElementById("registerForm");
const registerError = document.getElementById("registerError");

registerForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    // Prendi utenti salvati o crea array vuoto
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Controlla se username già esiste
    if(users.some(u => u.username === username)) {
        registerError.textContent = "Username già registrato!";
        return;
    }

    // Aggiungi utente
    users.push({username, password});
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registrazione completata!");
    registerForm.reset();
});

/* ================= LOGIN ================= */

const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.username === username && u.password === password);

    if(user) {
        // salva sessione
        localStorage.setItem("loggedInUser", username);
        window.location.href = "dashboard.html";
    } else {
        loginError.textContent = "Username o password errati!";
    }
});

/* ================= LOGOUT ================= */

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}

/* ================= CONTROLLO SESSIONE ================= */

document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop();

    if(currentPage === "dashboard.html") {
        const user = localStorage.getItem("loggedInUser");
        if(!user) {
            window.location.href = "index.html";
        }
    }
});
