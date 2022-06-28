let timer;
let deleteFirstPhotoDelay;

//fetch is a fn that web browser provides to programmer
//this function fetches the data from dog API about all possible breeds
async function start() {
  try {
    // Making an API call (request)
    // and getting the response back
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    console.log(response);

    // Parsing it to JSON format
    const data = await response.json();
    console.log(data);

    // Retrieving data from JSON
    createBreedList(data.message);
  } catch (e) {
    console.log("There was a problem fetching the breed list.");
  }
}

function createBreedList(breedList) {
  //below is an object
  console.log(breedList);

  //below is an array of breeds
  console.log(Object.keys(breedList));

  //Note all arrays have access to a method called map
  //Thus we use it below...this output will also be an array
  console.log(
    Object.keys(breedList).map(function (nameOfBreed) {
      return `<option>${nameOfBreed}</option>`;
    })
  );

  //.join('') converts an array into a single line of text
  console.log(
    Object.keys(breedList)
      .map(function (nameOfBreed) {
        return `<option>${nameOfBreed}</option>`;
      })
      .join("")
  );

  //Thus the dropdown for dog breeds will be:
  document.getElementById("breed").innerHTML = `
  <select onchange="loadByBreed(this.value)">
    <option>Choose a Dog Breed</option>
    ${Object.keys(breedList)
      .map(function (nameOfBreed) {
        return `<option>${nameOfBreed}</option>`;
      })
      .join("")}
  </select>`;
}

//fetch fns returns promise AND if we want to use await syntax
//for our promises, we have to create async fns
async function loadByBreed(chosenBreed) {
  if (chosenBreed != "Choose a Dog Breed") {
    console.log("use has chosen: " + chosenBreed);
    const response = await fetch(
      `https://dog.ceo/api/breed/${chosenBreed}/images`
    );
    console.log(response);

    const data = await response.json();
    console.log(data);

    //data.message is an array containing img link to different dog images
    //of the user's chosen breed
    slideshowBreedImages(data.message);
  }
}

function slideshowBreedImages(breedImgs) {
  //getElementsByClassName method returns an HTMLCollection so use [0] to access inside
  //console.log(document.getElementsByClassName("slideshow"));
  //console.log(document.getElementsByClassName("slideshow")[0]) == console.log(document.getElementById("slideshow")

  let currentPosition = 0;
  clearInterval(timer);
  clearTimeout(deleteFirstPhotoDelay);

  if (breedImgs.length > 1) {
    document.getElementById("slideshow").innerHTML = `
      <div class="slide" style="background-image: url('${breedImgs[0]}');"></div>
      <div class="slide" style="background-image: url('${breedImgs[1]}');"></div>
    `;

    currentPosition += 2;
    if (breedImgs.length == 2) currentPosition = 0;
    //2nd parameter indicates how long pic should be displayed in ms
    timer = setInterval(nextSlide, 3000);
  } else {
    document.getElementById("slideshow").innerHTML = `
      <div class="slide" style="background-image: url('${breedImgs[0]}');"></div>
      <div class="slide"></div>
    `;
  }

  function nextSlide() {
    document
      .getElementById("slideshow")
      .insertAdjacentHTML(
        "beforeend",
        `<div class="slide" style="background-image: url('${breedImgs[currentPosition]}');"></div>`
      );
    deleteFirstPhotoDelay = setTimeout(function () {
      document.querySelector(".slide").remove();
    }, 1000);
    if (currentPosition + 1 >= breedImgs.length) currentPosition = 0;
    else currentPosition++;
  }

  // for (let i = 0; i < breedImgs.length; i++) {
  //   setTimeout(function () {
  //     document.getElementById("slideshow").innerHTML = `
  //       <div class="slide"
  //       style="background-image: url('${breedImgs[i]}');">
  //       </div>`;
  //   }, 5000 * i);
  // }
}

start();
