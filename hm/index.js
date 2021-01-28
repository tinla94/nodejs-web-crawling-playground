require('dotenv').config({ path: '../.env' })
const needle = require('needle');
const mongodb = require('../mongodb/mongodb.connect');

const options = {
    headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
    }
}
const main = async () => {
    // connect db
    const mongoClient = await mongodb();
    // create db 
    const hmDb = mongoClient.db('hm')
    const menProducts = hmDb.collection("men-products");

    const pageSize = 96;
    let totalProducts = 1000;

    // get all products
    for (let offset = 0; offset < totalProducts; offset = offset + pageSize) {
        const result = await needle(
            "get",
            `https://www2.hm.com/en_us/men/new-arrivals/view-all/_jcr_content/main/productlisting.display.json?sort=stock&image-size=small&image=model&offset=${offset}&page-size=${pageSize}`,
            options
        );
        totalProducts = result.body.total;
        // saving data to mongo db
        await menProducts.insertMany(result.body.products);
        await loading(5000);
        console.log(offset);
        console.log(totalProducts);
    }
}

const loading = async (miliseconds) => {
    return new Promise(resolve => setTimeout(resolve, miliseconds))
}

main();