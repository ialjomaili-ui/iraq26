const photos = [];

for (let i = 1; i <= 1000; i++) {
  photos.push({
    file: `photo${i}.jpg`,
    caption: ""
  });
}

const gallery = document.getElementById("gallery");
const count = document.getElementById("photoCount");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");

let current = 0;
let availablePhotos = [];

photos.forEach((photo) => {
  const img = new Image();

  img.onload = () => {
    availablePhotos.push(photo);

    const card = document.createElement("article");
    card.className = "photo";

    const display = document.createElement("img");
    display.src = photo.file;
    display.alt = "Family memory";
    display.loading = "lazy";

    card.appendChild(display);
    card.addEventListener("click", () => openLightbox(availablePhotos.indexOf(photo)));

    gallery.appendChild(card);
    count.textContent = `${availablePhotos.length} memories`;
  };
  
  img.src = photo.file;
});

function openLightbox(index) {
  current = index;
  updateLightbox();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function updateLightbox() {
  const photo = availablePhotos[current];
  lightboxImage.src = photo.file;
  lightboxImage.alt = "Family memory";
  lightboxCaption.textContent = photo.caption;
}

function move(direction) {
  if (!availablePhotos.length) return;
  current = (current + direction + availablePhotos.length) % availablePhotos.length;
  updateLightbox();
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}

document.getElementById("closeLightbox").onclick = closeLightbox;
document.getElementById("prevPhoto").onclick = () => move(-1);
document.getElementById("nextPhoto").onclick = () => move(1);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") move(-1);
  if (event.key === "ArrowRight") move(1);
});
