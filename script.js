const username = "ialjomaili-ui";
const repository = "iraq26";
const branch = "main";

const gallery = document.getElementById("gallery");
const count = document.getElementById("count");

const lightbox = document.getElementById("lightbox");
const bigImage = document.getElementById("big");
const caption = document.getElementById("caption");

const closeButton = document.getElementById("close");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let photos = [];
let current = 0;


// Get every file in the repository
async function getRepositoryFiles() {

    const response = await fetch(
        `https://api.github.com/repos/${username}/${repository}/git/trees/${branch}?recursive=1`
    );

    if (!response.ok) {
        throw new Error("Could not load repository files.");
    }

    const data = await response.json();

    return data.tree || [];
}


// Find all images automatically
async function loadPhotos() {

    try {

        const files = await getRepositoryFiles();

        photos = files
            .filter(file => {

                if (file.type !== "blob") return false;

                const name = file.path.toLowerCase();

                return (
                    name.endsWith(".jpg") ||
                    name.endsWith(".jpeg") ||
                    name.endsWith(".png") ||
                    name.endsWith(".webp")
                );

            })
            .map(file => ({
                name: file.path,
                url:
                    `https://raw.githubusercontent.com/${username}/${repository}/${branch}/${encodeURIComponent(file.path)}`
            }));


        // Remove anything inside a folder if you only want
        // images in the main repository
        photos = photos.filter(photo => !photo.name.includes("/"));


        count.textContent =
            `${photos.length} memories`;


        gallery.innerHTML = "";


        photos.forEach((photo, index) => {

            const card = document.createElement("div");

            card.className = "photo";


            const image = document.createElement("img");

            image.src = photo.url;

            image.alt = `Family memory ${index + 1}`;

            image.loading = "lazy";


            card.appendChild(image);

            gallery.appendChild(card);


            card.addEventListener("click", () => {

                current = index;

                updateLightbox();

                lightbox.classList.add("open");

            });

        });


    } catch (error) {

        console.error(error);

        count.textContent = "Unable to load memories.";

    }

}


// Update fullscreen photo
function updateLightbox() {

    if (photos.length === 0) return;


    bigImage.src = photos[current].url;


    caption.textContent =
        `Memory ${current + 1} of ${photos.length}`;

}


// Previous photo
function previousPhoto() {

    if (photos.length === 0) return;


    current--;

    if (current < 0) {
        current = photos.length - 1;
    }


    updateLightbox();

}


// Next photo
function nextPhoto() {

    if (photos.length === 0) return;


    current++;

    if (current >= photos.length) {
        current = 0;
    }


    updateLightbox();

}


// Close lightbox
function closeLightbox() {

    lightbox.classList.remove("open");

    bigImage.src = "";

}


// Buttons
closeButton.addEventListener("click", closeLightbox);

prevButton.addEventListener("click", previousPhoto);

nextButton.addEventListener("click", nextPhoto);


// Clicking outside the image
lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


// Keyboard controls
document.addEventListener("keydown", event => {

    if (!lightbox.classList.contains("open")) return;


    if (event.key === "Escape") {
        closeLightbox();
    }


    if (event.key === "ArrowLeft") {
        previousPhoto();
    }


    if (event.key === "ArrowRight") {
        nextPhoto();
    }

});


// Start
loadPhotos();
