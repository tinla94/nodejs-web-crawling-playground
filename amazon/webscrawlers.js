const httpRequest = require("./httpRequest");
const parser = require("./parser");

const visitedLinks = [];
let linksToVisit = [
    "/Glorious-Aura-Keycaps-Mechanical-Keyboards/dp/B07D6WMVMW/ref=pd_rhf_dp_p_img_9?_encoding=UTF8&psc=1&refRID=WXBNFAHDSEDD455X21PC",
];

async function main() {
    while (linksToVisit.length > 0) {
        try {
            const currentUrl = linksToVisit.pop();
            if (visitedLinks.includes(currentUrl)) continue;
            console.log("now crawling " + currentUrl);

            const html = await httpRequest.getRequest(
                "https://www.amazon.com" + currentUrl
            );

            const parsedResult = parser(html);

            const cleanLinks = parsedResult.productLinks.map((link) =>
                link.slice(0, 14)
            );

            linksToVisit = [...linksToVisit, ...cleanLinks];
            console.log(parsedResult);
            visitedLinks.push(currentUrl);
            await sleep(5000);
        } catch (err) {
            console.error(err);
        }
    }
}

async function sleep(miliseconds) {
    return new Promise((resolve) => setTimeout(resolve, miliseconds));
}

main();