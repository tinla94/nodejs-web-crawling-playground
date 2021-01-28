const fs = require("fs");
const parser = require("../parser");

const productPage1Html = fs.readFileSync('amazon/tests/html/productpage2.html');

let parserResult;

beforeAll(() => {
    parserResult = parser(productPage1Html);
});

describe("parsing html product page correctly", () => {
    test("title", () => {
        expect(parserResult.title).toBe(
            "Glorious Aura Keycaps for Mechanical Keyboards - PBT, Pudding, Double Shot, Black, Standard Layout | 104 Key, TKL, Compact Compatible (Aura (Black))"
        );
    });
    test("price", () => {
        expect(parserResult.price).toBe("$24.99");
    });

    test("product links", () => {
        expect(parserResult.productLinks.length).toBe(6);
    });
});