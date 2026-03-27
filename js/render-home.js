import { loadJson } from "./render-loader.js";

function renderNewsItem(item) {
    const article = document.createElement("article");
    article.className = "card";
    article.setAttribute("aria-labelledby", `news-title-${item.id}`);

    const title = document.createElement("h3");
    title.id = `news-title-${item.id}`;

    const link = document.createElement("a");
    link.href = item.url || `novedades.html#${item.id}`;
    link.textContent = item.title;
    title.append(link);

    const meta = document.createElement("p");
    meta.className = "meta";
    meta.textContent = `${item.category} | ${item.date}`;

    const summary = document.createElement("p");
    summary.textContent = item.summary;

    article.append(title, meta, summary);
    return article;
}

function renderInfoBlock(item) {
    const section = document.createElement("section");
    section.className = "info-block";
    section.setAttribute("aria-labelledby", `info-title-${item.id}`);

    const title = document.createElement("h3");
    title.id = `info-title-${item.id}`;
    title.textContent = item.title;

    const text = document.createElement("p");
    text.textContent = item.text;

    section.append(title, text);

    if (Array.isArray(item.highlights) && item.highlights.length > 0) {
        const list = document.createElement("ul");

        item.highlights.forEach((highlight) => {
            const listItem = document.createElement("li");
            listItem.textContent = highlight;
            list.append(listItem);
        });

        section.append(list);
    }

    const link = document.createElement("a");
    link.href = item.url;
    link.textContent = item.linkLabel;

    section.append(link);
    return section;
}

async function initHome() {
    const newsList = document.getElementById("news-list");
    const secondaryInfo = document.getElementById("secondary-info");

    if (!newsList) {
        throw new Error('No existe el contenedor "#news-list" en index.html');
    }

    if (!secondaryInfo) {
        throw new Error('No existe el contenedor "#secondary-info" en index.html');
    }

    const [news, infoBlocks] = await Promise.all([
        loadJson("./data/noticias.json"),
        loadJson("./data/info-blocks.json")
    ]);

    const latestNews = [...news]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

    newsList.replaceChildren(...latestNews.map(renderNewsItem));
    secondaryInfo.replaceChildren(...infoBlocks.map(renderInfoBlock));
}

initHome().catch((error) => {
    console.error(error);
});
