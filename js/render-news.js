import { loadJson } from "./render-loader.js";

function createParagraph(text, className = "") {
    const paragraph = document.createElement("p");
    if (className) {
        paragraph.className = className;
    }
    paragraph.textContent = text;
    return paragraph;
}

function renderNewsArticle(item) {
    const article = document.createElement("article");
    article.id = item.id;
    article.className = "news-article";
    article.setAttribute("aria-labelledby", `news-page-title-${item.id}`);

    const title = document.createElement("h2");
    title.id = `news-page-title-${item.id}`;
    title.textContent = item.title;

    const meta = createParagraph(`${item.category} | ${item.date}`, "meta");
    const summary = createParagraph(item.summary, "news-summary");

    article.append(title, meta, summary);

    if (Array.isArray(item.content) && item.content.length > 0) {
        article.append(...item.content.map((paragraph) => createParagraph(paragraph)));
    }

    return article;
}

async function initNewsPage() {
    const newsArchive = document.getElementById("news-archive");

    if (!newsArchive) {
        throw new Error('No existe el contenedor "#news-archive" en novedades.html');
    }

    const news = await loadJson("./data/noticias.json");
    const sortedNews = [...news].sort((a, b) => new Date(b.date) - new Date(a.date));
    newsArchive.replaceChildren(...sortedNews.map(renderNewsArticle));
}

initNewsPage().catch((error) => {
    console.error(error);
});
