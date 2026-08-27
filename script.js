const photos = [];

for (let i = 2; i <= 14; i++) {
    photos.push(`photo${i}.JPG`);
}

const gallery = document.getElementById("gallery");
const count = document.getElementById("count");

const lightbox = document.getElementById("lightbox");
const bigImage = document.getElementById("big");
const caption = document.getElementById("caption");

let current = 0;


// Create photo gallery
photos.forEach((filename, index) => {

    const card = document.createElement("div");
    card.className = "photo";

    const image = document.createElement("img");

    image.src = filename;
    image.alt = `Family memory ${index + 1}`;
    image.loading = "lazy";

    card.appendChild(image);
    gallery.appendChild(card);

    card.addEventListener("click", () => {

        current = index;

        bigImage.src = filename;
        caption.textContent =
            `Memory ${index + 1} of ${photos.length}`;

        lightbox.classList.add("open");

    });

});


// Show number of photos
count.textContent = `${photos.length} memories`;


// Close lightbox
document.getElementById("close").addEventListener("click", () => {
    lightbox.classList.remove("open");
});


// Previous photo
document.getElementById("prev").addEventListener("click", () => {

    current--;

    if (current < 0) {
        current = photos.length - 1;
    }

    bigImage.src = photos[current];

    caption.textContent =
        `Memory ${current + 1} of ${photos.length}`;

});


// Next photo
document.getElementById("next").addEventListener("click", () => {

    current++;

    if (current >= photos.length) {
        current = 0;
    }

    bigImage.src = photos[current];

    caption.textContent =
        `Memory ${current + 1} of ${photos.length}`;

});


// Close by clicking outside image
lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        lightbox.classList.remove("open");
    }

});
