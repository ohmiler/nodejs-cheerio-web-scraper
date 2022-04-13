const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = "https://www.amazon.com/Apple-MacBook-16-inch-10%E2%80%91core-16%E2%80%91core/dp/B09JQKBQSB/ref=sr_1_2?crid=20ONJ6UHRFS1D&keywords=macbook&qid=1649835398&sprefix=macbo%2Caps%2C574&sr=8-2"

const product = {
    name: "",
    image: "",
    price: "",
    link: ""
}

async function scrape() {
    try {

        // Fetch HTML
        const { data } = await axios.get(url);
        // Load HTML
        const $ = cheerio.load(data);

        // Select div items
        const item = $("div#dp-container");

        product.name = $(item).find('h1 span#productTitle').text();
        product.image = $(item).find('img#landingImage').attr('src');
        product.price = $(item).find('div span.a-offscreen').text();
        product.link = url;

        // Create product.json file
        fs.writeFile("product.json", JSON.stringify(product, null, 2), (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log("completed!")
        })

    } catch(err) {
        console.log(err);
    }
}
scrape();