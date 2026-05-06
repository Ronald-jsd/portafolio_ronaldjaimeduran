document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.tech-carousel-container');
    const track = document.querySelector('.tech-carousel-track');

    if (!container || !track) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let currentX = 0;
    let speed = -0.8;
    let animationId;

    const animate = () => {
        if (!isDown) {
            currentX += speed;

            const trackWidth = track.offsetWidth / 2;
            if (Math.abs(currentX) >= trackWidth) {
                currentX = 0;
            }
            track.style.transform = `translateX(${currentX}px)`;
        }
        animationId = requestAnimationFrame(animate);
    };

    animate();

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.classList.add('grabbing');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = currentX;
        cancelAnimationFrame(animationId);
    });

    container.addEventListener('mouseleave', () => {
        if (!isDown) return;
        isDown = false;
        container.classList.remove('grabbing');
        animate();
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('grabbing');
        animate();
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5;
        currentX = scrollLeft + walk;

        const trackWidth = track.offsetWidth / 2;
        if (currentX > 0) currentX = -trackWidth;
        if (currentX < -trackWidth) currentX = 0;

        track.style.transform = `translateX(${currentX}px)`;
    });

    container.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = currentX;
        cancelAnimationFrame(animationId);
    });

    container.addEventListener('touchend', () => {
        isDown = false;
        animate();
    });

    container.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5;
        currentX = scrollLeft + walk;

        const trackWidth = track.offsetWidth / 2;
        if (currentX > 0) currentX = -trackWidth;
        if (currentX < -trackWidth) currentX = 0;

        track.style.transform = `translateX(${currentX}px)`;
    });

    container.addEventListener('mouseenter', () => speed = 0);
    container.addEventListener('mouseleave', () => speed = -1);
});
