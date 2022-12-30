const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const img4 = document.getElementById("img4");
const body = document.getElementById("body");
const chosen = document.getElementById("theChosenOne");
const mainText = document.getElementById("mainText");
const score = document.getElementById("score");
const life = document.getElementById("lives");



img1.addEventListener("click", imageClicked);
img2.addEventListener("click", imageClicked);
img3.addEventListener("click", imageClicked);
img4.addEventListener("click", imageClicked);

let chosenOne = Math.round(Math.random()*3) + 1;
let correct = false;
let chosenCountries = [];
let lives = 3;

//all states, many countries. Some of them return errors so not all countries are here
const possibilities = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming","Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina","Burundi","Cambodia","Cameroon","Canada","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","East Timor","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Ivory Coast","Jamaica","Japan","Kazakhstan","Kenya","Kiribati","Korea North","Korea South","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russian Federation","Rwanda","St_Lucia","Samoa","San Marino","Sao Tome & Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Somalia","South Africa","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"];

let correctAnswer = chosenCountries[chosenOne-1];
randomize();



//check if the correct image was clicked
function imageClicked(currImage){
    if (lives <= 1 ){
        life.textContent--;
        mainText.textContent = "YOU LOSE... Refresh to replay.";
        body.style.backgroundColor = "Darkred";
        return;
    }
    if ((currImage.srcElement.id[3]==1) && (chosenOne == 1)){
        console.log("You are correct!");
        correct = true;
    }
    else if ((currImage.srcElement.id[3]==2) && (chosenOne == 2)){
        console.log("You are correct!");
        correct = true;
    }
    else if ((currImage.srcElement.id[3]==3) && (chosenOne == 3)){
        console.log("You are correct!");
        correct = true;
    }
    else if ((currImage.srcElement.id[3]==4) && (chosenOne == 4)){
        console.log("You are correct!");
        correct = true;
    }
    else { //if wrong guess
        lives--;
        correct = false;
        life.textContent--;
        if (lives > 0){
            body.style.backgroundColor = "Red";
            setTimeout(() => {
                body.style.backgroundColor = "aquamarine";
            },333);
        }
        randomize();
        console.log(lives);
        return;
    }
    if(correct){
        score.textContent++;
        randomize();
        body.style.backgroundColor = "Green";
            setTimeout(() => {
                body.style.backgroundColor = "aquamarine";
            },333);
        return;
    }
}

function randomize(){ //set values to choose random image
    chosenOne = Math.round(Math.random()*3) + 1;
    chooseCountries(); //find random countries
    correctAnswer = chosenCountries[chosenOne-1];
    chosen.textContent = correctAnswer;
    console.log(chosenCountries);
    loadImages(); //load these images
}


async function loadImages(){
    img1.src = "fetching.png";
    img2.src = "fetching.png";
    img3.src = "fetching.png";
    img4.src = "fetching.png";

    
    let img1Image = await getPhotoFromRef(chosenCountries[0]); //find reference from input, find image from this reference
    let img2Image = await getPhotoFromRef(chosenCountries[1]);
    let img3Image = await getPhotoFromRef(chosenCountries[2]);
    let img4Image = await getPhotoFromRef(chosenCountries[3]);
    
    img1.src = img1Image;
    img2.src = img2Image;
    img3.src = img3Image;
    img4.src = img4Image;
    if (img1Image.includes("Couldnt")){ //if error was given (api didnt have that image)
        img1.textContent = img1Image;
    }
    if (img2Image.includes("Couldnt")){
        img2.textContent = img2Image;
    }
    if (img3Image.includes("Couldnt")){
        img3.textContent = img3Image;
    }
    if (img4Image.includes("Couldnt")){
        img4.textContent = img4Image;
    }
}


//find which countries to use
function chooseCountries(){
    chosenCountries = [];
    chosenCountries.push(possibilities[Math.round(Math.random()*possibilities.length-1)]);
    chosenCountries.push(possibilities[Math.round(Math.random()*possibilities.length-1)]);
    chosenCountries.push(possibilities[Math.round(Math.random()*possibilities.length-1)]);    //insure there are no duplicates
    chosenCountries.push(possibilities[Math.round(Math.random()*possibilities.length-1)]);
    if (chosenCountries.length !== new Set(chosenCountries).size){
        //if there is a duplicate
        chooseCountries();
    }
    if (chosenCountries.includes(undefined))
        chooseCountries();
}



async function getPhotoFromRef(input) { //call backend api which will call other apis (google api)
    const getPic = `image/${input}`;
    const res = await fetch(getPic);
    const json =  res.json();
    console.log(json)
    return json;
}
