const httpRequest = require("./httpRequest");

async function saveHtml(url) {
    const html = await httpRequest.getRequest(url);
    await httpRequest.saveHtml(html);
}

saveHtml("https://www.amazon.com/dp/B07GGTF6XZ");