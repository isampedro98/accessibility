import { loadJson } from "./render-loader.js";

const CAREER_IMAGE_BY_ID = {
    "carrera-isi": "images/ingenieria-informatica.jpg",
    "carrera-ldg": "images/licenciatura diseno.jpg",
    "carrera-cta": "images/tecnicatura admin.jpg",
    "carrera-cs": "images/comunicacion social.jpg",
    "carrera-le": "images/lengua y literatura.webp",
    "carrera-bio": "images/biotecnologia.webp",
    "carrera-tur": "images/turismo sostenible.jpg",
    "carrera-datos": "images/ciencia de datos.jpg"
};

function createParagraph(text, className = "") {
    const paragraph = document.createElement("p");
    if (className) {
        paragraph.className = className;
    }
    paragraph.textContent = text;
    return paragraph;
}

function renderCareerItem(item) {
    const article = document.createElement("article");
    article.id = item.id;
    article.className = "career-card";
    article.setAttribute("aria-labelledby", `career-title-${item.id}`);

    const imageSrc = CAREER_IMAGE_BY_ID[item.id];

    if (imageSrc) {
        const imageWrapper = document.createElement("figure");
        imageWrapper.className = "career-card__image";

        const image = document.createElement("img");
        image.src = imageSrc;
        image.alt = `Imagen representativa de ${item.name}`;
        image.loading = "lazy";
        image.decoding = "async";

        imageWrapper.append(image);
        article.append(imageWrapper);
    }

    const title = document.createElement("h3");
    title.id = `career-title-${item.id}`;
    title.textContent = item.name;

    const meta = createParagraph(`${item.degree} | ${item.duration} | ${item.modality}`, "career-meta");
    const summary = createParagraph(item.summary);
    const shifts = createParagraph(`Turnos: ${item.shift.join(", ")}`);
    const requirements = createParagraph(`Ingreso: ${item.requirements}`);
    const details = createParagraph(item.details);

    const link = document.createElement("a");
    link.href = item.url;
    link.textContent = `Enlace directo a ${item.name}`;

    article.append(title, meta, summary, shifts, requirements, details, link);
    return article;
}

function getSelectedShifts(form) {
    return Array.from(form.querySelectorAll('input[name="shift"]:checked')).map((input) => input.value);
}

function filterCareers(careers, selectedShifts) {
    if (selectedShifts.length === 0) {
        return careers;
    }

    return careers.filter((career) => selectedShifts.some((shift) => career.shift.includes(shift)));
}

async function initCareers() {
    const careersList = document.getElementById("careers-list");
    const careerFilters = document.getElementById("career-filters");
    const careersCount = document.getElementById("careers-count");

    if (!careersList || !careerFilters || !careersCount) {
        throw new Error("Faltan contenedores requeridos para renderizar la pagina de carreras.");
    }

    const careers = await loadJson("./data/carreras.json");

    function updateCareers() {
        careersList.setAttribute("aria-busy", "true");

        const selectedShifts = getSelectedShifts(careerFilters);
        const filteredCareers = filterCareers(careers, selectedShifts);

        careersCount.textContent = `${filteredCareers.length} carrera(s) encontradas.`;

        if (filteredCareers.length === 0) {
            const emptyState = createParagraph("No hay carreras que coincidan con los filtros seleccionados.", "empty-state");
            emptyState.setAttribute("role", "status");
            careersList.replaceChildren(emptyState);
            careersList.setAttribute("aria-busy", "false");
            return;
        }

        careersList.replaceChildren(...filteredCareers.map(renderCareerItem));
        careersList.setAttribute("aria-busy", "false");
    }

    careerFilters.addEventListener("change", updateCareers);
    updateCareers();
}

initCareers().catch((error) => {
    console.error(error);
});
