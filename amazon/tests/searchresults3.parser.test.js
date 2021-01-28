const fs = require("fs");
const parser = require("../parser");

const productPage1Html = fs.readFileSync('amazon/tests/html/productpage3.html');

let parserResult;

beforeAll(() => {
    parserResult = parser(productPage1Html);
});

describe("parsing html product page correctly", () => {
    test("title", () => {
        expect(parserResult.title).toBe(
            "YMDK Double Shot 104 Dyed PBT Shine Through Keyset OEM Profile Keycap Set for Cherry MX Switches Mechanical Keyboard 104 87 61,Sunset Gradient"
        );
    });
    test("price", () => {
        expect(parserResult.price).toBe("$23.50");
    });

    test("product links", () => {
        expect(parserResult.productLinks.length).toBe(12);
    });
});