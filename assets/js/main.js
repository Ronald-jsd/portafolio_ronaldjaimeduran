document.addEventListener('DOMContentLoaded', () => {
    const typedText = document.querySelector(".typedText");
    if (typedText) {
        var typingEffect = new Typed(".typedText", {
            strings: [ "Developer &#128187;", "Back-End &#128736;", "Ronald! &#128522;"],
            loop: true,
            typeSpeed: 100,
            backSpeed: 80,
            backDelay: 2000
        });
    }

    const filterButtons = document.querySelectorAll('.filter-buttons button');

    function filterProjects(category) {
        filterButtons.forEach(btn => btn.classList.remove('active'));

        const projects = document.querySelectorAll('.project-container-box');
        projects.forEach(project => {
            if (category === 'all' || project.classList.contains(category)) {
                project.style.display = 'flex';
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'translateY(0)';
                }, 100);
            } else {
                project.style.opacity = '0';
                project.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300);
            }
        });
    }

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-filter'); 
        filterProjects(category);

        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

    const menuBtn = document.querySelector(".nav-menu-btn i");
    const navMenu = document.getElementById("myNavMenu");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle("responsive");
        });
    }

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove("responsive");
        });
    });


    const downloadBtn = document.querySelector(".btn-download-cv button");
    if (downloadBtn) {
        downloadBtn.removeAttribute('onclick');
        downloadBtn.addEventListener('click', () => {
            const formatSelect = document.getElementById("fileFormat");
            const format = formatSelect ? formatSelect.value : "pdf";
            const fileUrl = format === "pdf" ? "./assets/files/CV_Ronald_Jaime_Duran.pdf" : "./assets/files/CV_Ronald_Jaime_Duran.docx";

            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = `CV_Ronald_Jaime_Duran.${format}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    const toggleBtn = document.getElementById('toggleThemeBtn');
    const themeIcon = document.getElementById('themeIcon');

    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    if (toggleBtn && themeIcon) {
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');

            if (isLight) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }

            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    document.addEventListener('mousemove', function (e) {
        if (Math.random() > 0.8) {
            let smoke = document.createElement('div');
            smoke.className = 'smoke';
            smoke.style.left = `${e.pageX}px`;
            smoke.style.top = `${e.pageY}px`;
            document.body.appendChild(smoke);

            setTimeout(() => {
                smoke.remove();
            }, 1000);
        }
    });

});

const form = document.getElementById('myForm');
const emailInput = document.getElementById('email');
const errorMsg = document.getElementById('error');
const successMsg = document.getElementById('success');

form.addEventListener('submit', async function (e) {
    e.preventDefault(); 

    errorMsg.textContent = '';
    successMsg.textContent = '';

    const email = emailInput.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;

    if (!emailRegex.test(email)) {
        errorMsg.textContent = "Correo inválido. Debe tener formato ejemplo@dominio.com";
        return;
    }

    const formData = new FormData(form);

    try {
        const response = await fetch('https://formspree.io/f/mnnqnzdj', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            successMsg.textContent = "¡Gracias! El formulario ha sido enviado con éxito.";
            form.reset(); 
        } else {
            const data = await response.json();
            if (data.errors) {
                errorMsg.textContent = data.errors.map(err => err.message).join(', ');
            } else {
                errorMsg.textContent = "Ocurrió un error al enviar el formulario.";
            }
        }
    } catch (err) {
        errorMsg.textContent = "Error de conexión. Intenta nuevamente.";
    }
});