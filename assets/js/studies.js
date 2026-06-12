document.addEventListener("DOMContentLoaded", () => {

    const studies = [

        {
            title: "Oracle Next Education",
            date: "2024",
            image: "./assets/images/certified/image.png",
            description:
                "Programa intensivo de formación en desarrollo de software."
        },

        {
            title: "Universidad",
            date: "2022 - Actualidad",
            image: "./assets/images/certified/cibertec-studies.png",
            description:
                "Ingeniería de Sistemas."
        },

        {
            title: "AWS Academy",
            date: "2025",
            image: "./assets/images/certified/aws.png",
            description:
                "Servicios Cloud y Arquitectura."
        }

    ];

    const timeline =
        document.getElementById("timeline");

    function createItem(item, level = 0) {

        const div =
            document.createElement("div");

        div.className =
            `timeline-item level-${level}`;

        let html = `

            <div class="timeline-dot"></div>

            <div class="timeline-content">

                ${
                    item.image
                        ? `<img src="${item.image}" class="timeline-img" alt="${item.title}">`
                        : ''
                }

                <h3>${item.title}</h3>

                ${
                    item.date
                        ? `<span class="timeline-date">${item.date}</span>`
                        : ''
                }

                <p>${item.description}</p>
        `;

        if (item.children?.length) {

            item.children.forEach(child => {

                html += createItemHTML(
                    child,
                    level + 1
                );

            });
        }

        html += `
            </div>
        `;

        div.innerHTML = html;

        return div;
    }

    function createItemHTML(item, level) {

        let html = `

            <div class="timeline-item level-${level}">

                <div class="timeline-dot"></div>

                <div class="timeline-content">

                    <h4>${item.title}</h4>

                    <p>${item.description}</p>
        `;

        if (item.children?.length) {

            item.children.forEach(child => {

                html += createItemHTML(
                    child,
                    level + 1
                );

            });
        }

        html += `
                </div>
            </div>
        `;

        return html;
    }

    const MAX_VISIBLE = 2;

    studies
        .slice(0, MAX_VISIBLE)
        .forEach(study => {

            timeline.appendChild(
                createItem(study)
            );

        });

    if (studies.length > MAX_VISIBLE) {

        const hiddenStudies =
            studies.length - MAX_VISIBLE;

        const btn =
            document.createElement("button");

        btn.className =
            "view-all-btn";

        btn.textContent =
            `Ver ${hiddenStudies} estudios más →`;

        btn.addEventListener(
            "click",
            openStudiesModal
        );

        timeline.appendChild(btn);
    }

    function openStudiesModal() {

        const modal =
            document.getElementById(
                "studiesModal"
            );

        const container =
            document.getElementById(
                "allStudiesContainer"
            );

        container.innerHTML = "";

        studies.forEach(study => {

            container.appendChild(
                createItem(study)
            );

        });

        modal.style.display =
            "block";
    }

    document
        .querySelector(".close-studies-modal")
        .addEventListener(
            "click",
            () => {

                document.getElementById(
                    "studiesModal"
                ).style.display = "none";
            }
        );

    const imageModal =
        document.getElementById(
            "imageModal"
        );

    const modalImg =
        document.getElementById(
            "modalImg"
        );

    document.addEventListener(
        "click",
        e => {

            if (
                e.target.classList.contains(
                    "timeline-img"
                )
            ) {

                imageModal.style.display =
                    "flex";

                modalImg.src =
                    e.target.src;
            }
        }
    );

    document
        .querySelector(".close-modal")
        .addEventListener(
            "click",
            () => {

                imageModal.style.display =
                    "none";
            }
        );

    imageModal.addEventListener(
        "click",
        () => {

            imageModal.style.display =
                "none";
        }
    );

});