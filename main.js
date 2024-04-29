let timer
let removeFisrtPhotoDelay // added these two statements after noticing bugs when switching between breeds

async function dog() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    console.log(data);
    listOfDogBreeds(data.message);
}

dog();

function listOfDogBreeds(breedList) {
    document.getElementById("breed").innerHTML = `
    <select onchange="picByBreed(this.value)">
    <option> Pick your favorite dog breed</option>
    ${Object.keys(breedList)
        .map(function (breed) {
            return `<option>${breed}</option>`;
        })
        .join("")}
    
      </select>
`;
}

async function picByBreed(breed) {
    if (breed !== "Pick your favorite dog breed") {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
        const data = await response.json();
        theSlideShow(data.message);
    }
}



function theSlideShow(images){
    let position = 0
    clearInterval(timer)
    clearTimeout(removeFisrtPhotoDelay)

   if (images.length > 1){
    document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide" style="background-image: url('${images[1]}')"></div>
    `
    position +=2
    if(images.length == 2) position = 0  // for breeds that only return 2 images (dalmation)
    timer = setInterval(nextSlide, 3000)
   } else {
    document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide"></div>
    `  // for breeds that only return one image (finnish)
   }

function nextSlide() {
    document.getElementById("slideshow").insertAdjacentHTML("beforeend",`<div class="slide" style="background-image: url('${images[position]}')"></div>`)
    removeFisrtPhotoDelay = setTimeout( function () {
        document.querySelector (".slide").remove()
    } , 1000)
    if (position + 1 >= images.length) {
        position = 0
    } else {
        position++
    }
  } 
}
