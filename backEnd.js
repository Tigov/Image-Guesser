const { response } = require("express");
const express = require("express");
const { request } = require("http");
const app = express();
require('dotenv').config();
app.listen(3000, () => console.log("Starting server http://localhost:3000"));
app.use(express.static("public"));

//to start server cd into folder and do: node backEnd.js

//hide api key from browser and return picture
app.get('/image/:input', async (request,response) => {
    const apiKey = process.env.API_KEY; //hide key
    const input = request.params.input;
    //get the photo reference depending on the input
    let getRef = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${input}&key=${apiKey}&inputtype=textquery&fields=name,photos`;
    const ref = await fetch(getRef).then(res => res.json());
    if (ref.candidates[0].photos == undefined){
        console.log(`Couldnt find ${input}`);
        response.json(`Couldnt find ${input}`);
        console.log(input);
        return;
    }
    let photoRef = ref.candidates[0].photos[0].photo_reference;
    //get the image depending on the photo ref
    let getPic = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRef}&key=${apiKey}&maxwidth=400&maxheight=400`
    response.json(getPic);
});



