const photos = [];

for (let i = 1; i <= 500; i++) {
    photos.push({
        file: `photo${i}.jpg`,
        caption: ""
    });
}

const gallery = document.getElementById("gallery");
const count = document.getElementById("photoCount");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("caption");

let availablePhotos = [];
let current = 0;

photos.forEach((photo) => {
    const img = new Image();

    img.onload = () => {
        availablePhotos.push(photo);

        const card = document.createElement("article");
        card.className = "media";

        const display = document.createElement("img");
        display.src = photo.file;
        display.alt = "Family memory";
        display.loading = "lazy";

        card.appendChild(display);
        gallery.appendChild(card);

        card.addEventListener("click", () => {
            current = availablePhotos.indexOf(photo);
            updateLightbox();
            lightbox.classList.add("open");
            lightbox.setAttribute("aria-hidden", "false");
        });

        count.textContent = `${availablePhotos.length} memories`;
    };

    img.src = photo.file;
});

function updateLightbox() {
    const photo = availablePhotos[current];

    lightboxImage.src = photo.file;
    lightboxImage.alt = "Family memory";
    lightboxCaption.textContent = photo.caption;
}

function move(direction) {
    if (availablePhotos.length === 0) return;

    current =
        (current + direction + availablePhotos.length) %
        availablePhotos.length;

    updateLightbox();
}

function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
}

document.getElementById("close").onclick = closeLightbox;
document.getElementById("prev").onclick = () => move(-1);
document.getElementById("next").onclick = () => move(1);

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("open")) return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
});
