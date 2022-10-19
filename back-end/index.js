let rebrandlyClient = require("./rebrandly.js")
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const port = 8000;

app.get('/:url', (req, res) => {
    const url = req.params.url;
    let slashtag = `test-${Math.floor(Math.random() * 999999)}`

    let linkDef = {
        "title": "My first link",
        "slashtag": slashtag,  
        "destination": `https://www.${url}`,
    };

    let onError = (err) => {
        console.log(JSON.stringify(err))
    }


    let onLinkCreated = (link) => {
        res.status(200).json({ shortUrl: link.shortUrl });
    }

    rebrandlyClient.createNewLink(linkDef, onLinkCreated, onError);
})

app.listen(port, () => {
    console.log(`It's listining on ${port}`);
})