if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // dark mode, don't change
} else{
    document.documentElement.classList.toggle('ColorThemeLight');
    document.documentElement.classList.toggle('ColorThemeDark');
    document.body.classList.toggle('ColorThemeLight');
    document.body.classList.toggle('ColorThemeDark');
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    const newColorScheme = event.matches ? "dark" : "light";

    if (newColorScheme == "dark"){
        document.documentElement.classList.remove("ColorThemeLight");
        document.documentElement.classList.add("ColorThemeDark");
        document.body.classList.remove("ColorThemeLight");
        document.body.classList.add("ColorThemeDark");
    } else{
        document.documentElement.classList.remove("ColorThemeDark");
        document.documentElement.classList.add("ColorThemeLight");
        document.body.classList.remove("ColorThemeDark");
        document.body.classList.add("ColorThemeLight");
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // Get all tilt-container elements
    const tiltContainers = document.querySelectorAll('.tilt-container');

    let isMouseDown = false;
    tiltContainers.forEach((container) => {
        container.style.transition = "all 250ms ease"

        window.addEventListener('mousedown', () => {
            isMouseDown = true;
        });

        window.addEventListener('mouseup', () => {
            isMouseDown = false;
            container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });

        let lastTiltX=0;
        let lastTiltY=0;
        document.addEventListener('mousemove', (e) => {
            if (!isMouseDown) {
                if (e.target.id=="theButton"){
                    const rect = container.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = container.clientWidth / 2;
                    const centerY = container.clientHeight / 2;
                    const tiltX = (centerX - x) / centerX * 15; // Adjust the multiplier for tilt effect
                    const tiltY = (centerY - y) / centerY * 15; // Adjust the multiplier for tilt effect

                    container.style.transform = `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
                }
                return;
            } else{
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = container.clientWidth / 2;
                const centerY = container.clientHeight / 2;
                const tiltX = (x<-100||x>300)?lastTiltX:(centerX - x) / centerX * 5; // Adjust the multiplier for tilt effect
                const tiltY = (y<-100||y>130)?lastTiltY:(centerY - y) / centerY * 5; // Adjust the multiplier for tilt effect

                container.style.transform = `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;

                lastTiltX=tiltX;
                lastTiltY=tiltY;
            }
        });

        // Optionally, you can reset the tilt effect if the mouse leaves the container
        container.addEventListener('mouseleave', () => {
            if (!isMouseDown) {
                container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            }
        });
    });
});
function openPreview(){
    history.pushState({}, "", location.href);
    location.replace('https://hoursync.net/')
}