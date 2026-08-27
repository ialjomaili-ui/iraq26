const photos = [];

for (let i = 1; i <= 500; i++) {
    photos.push(`photo${i}.jpg`);
}

const gallery = document.getElementById("gallery");
const count = document.getElementById("count");

const lightbox = document.getElementById("lightbox");
const bigImage = document.getElementById("big");
const caption = document.getElementById("caption");

const closeButton = document.getElementById("close");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let availablePhotos = [];
let current = 0;


// Check which photos actually exist
photos.forEach((filename) => {

    const testImage = new Image();

    testImage.onload = function () {

        availablePhotos.push(filename);

        const card = document.createElement("div");
        card.className = "photo";

        const image = document.createElement("img");
        image.src = filename;
        image.alt = "Family memory";
        image.loading = "lazy";

        card.appendChild(image);
        gallery.appendChild(card);

        card.addEventListener("click", function () {

            current = availablePhotos.indexOf(filename);

            updateLightbox();

            lightbox.classList.add("open");

        });

        count.textContent =
            `${availablePhotos.length} memories`;
    };

    testImage.src = filename;
});


// Open/update fullscreen photo
function updateLightbox() {

    if (availablePhotos.length === 0) return;

    const filename = availablePhotos[current];

    bigImage.src = filename;

    caption.textContent =
        `Memory ${current + 1} of ${availablePhotos.length}`;
}


// Previous / next
function movePhoto(direction) {

    if (availablePhotos.length === 0) return;

    current =
        (current + direction + availablePhotos.length)
        % availablePhotos.length;

    updateLightbox();
}


// Close
function closeLightbox() {

    lightbox.classList.remove("open");

    bigImage.src = "";
}


// Buttons
closeButton.addEventListener("click", closeLightbox);

prevButton.addEventListener("click", function () {
    movePhoto(-1);
});

nextButton.addEventListener("click", function () {
    movePhoto(1);
});


// Clicking outside the image closes it
lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


// Keyboard controls
document.addEventListener("keydown", function (event) {

    if (!lightbox.classList.contains("open")) return;

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowLeft") {
        movePhoto(-1);
    }

    if (event.key === "ArrowRight") {
        movePhoto(1);
    }

});
