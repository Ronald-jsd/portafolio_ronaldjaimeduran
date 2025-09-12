/* ----- TYPING EFFECT ----- */
var typingEffect = new Typed(".typedText", {
    strings: ["Student &#127891;", "Developer &#128187;", "Back-end &#128736;", "Ronald! &#128522;"],
    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 2000
})
function filterProjects(category) {
    // Obtener todos los proyectos
    const projects = document.querySelectorAll('.project-container-box');

    projects.forEach(project => {
        if (project.classList.contains(category)) {
            project.style.display = 'flex'; // Mostrar
        } else {
            project.style.display = 'none'; // Ocultar
        }
    });
}

/* Cursor */
document.addEventListener('mousemove', function (e) {
    let smoke = document.createElement('div');
    smoke.className = 'smoke';
    smoke.style.left = `${e.pageX}px`;
    smoke.style.top = `${e.pageY}px`;
    document.body.appendChild(smoke);

    setTimeout(() => {
        smoke.remove();
    }, 1000);
});

/*  NAVIGATION BAR FUNCTION  */
function myMenuFunction() {
    var menuBtn = document.getElementById("myNavMenu");

    if (menuBtn.className === "nav-menu") {
        menuBtn.className += " responsive";
    } else {
        menuBtn.className = "nav-menu";
    }
}

/* Download CV */
function downloadCV() {
    const format = document.getElementById("fileFormat").value;
    const fileUrl = format === "pdf" ? "./assets/files/CV_Ronald_Jaime_Duran.pdf" : "./assets/files/CV_Ronald_Jaime_Duran.docx";
    window.location.href = fileUrl;
}


/* Theme Toggle */

const toggleBtn = document.getElementById('toggleThemeBtn');
const themeIcon = document.getElementById('themeIcon');
// Mantener preferencia en localStorage
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
}
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeIcon.classList.toggle('fa-sun', !isLight);
    themeIcon.classList.toggle('fa-moon', isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});
