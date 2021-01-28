const cheerio = require("cheerio");

function parseAll(html) {
    const $ = cheerio.load(html);

    const title = $("#productTitle").text().trim();

    let price = $("#priceblock_saleprice").text().trim();

    if (price === "") {
        price = $("#priceblock_ourprice").text().trim();
    }

    const productLinks = $("a")
        .map((index, element) => $(element).attr("href"))
        .get()
        .filter((link) => link.startsWith("/dp/"));

    return { title, price, productLinks };
}

module.exports = parseAll;