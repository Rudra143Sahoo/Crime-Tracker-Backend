

let movies = [
  {
    name: "Bank Robbery - Downtown Financial District",
    des: "On March 12th, 2023, a well-coordinated armed robbery occurred at the Central Bank branch located in the Downtown Financial District at approximately 9:45 AM",
    image: "./images/Slider1.png",
  },
  {
    name: "Murder Case - Midnight Apartment Homicide",
    des: "In a chilling turn of events on November 8th, 2023, a 34-year-old businessman was found murdered in his apartment in Eastlake Towers.",
    image: "./images/Slider2.png",
  },
  {
    name: "Rape Case - Suburban Park Incident",
    des: "On September 14th, 2022, a tragic sexual assault occurred near Greenwood Park during late evening hours",
    image: "./images/Slider3.png",
  },
  {
    name: "Cybercrime Case - Financial Fraud Ring Busted",
    des: "A major cybercrime ring was uncovered in May 2023, responsible for phishing attacks and identity theft that affected over 10,000 victims nationwide",
    image: "./images/Slider4.png",
  },
  {
    name: "Kidnapping Case – Schoolgirl Abduction in Broad Daylight",
    des: "On March 3rd, 2024, a 12-year-old schoolgirl was abducted outside her tuition center in Lucknow.",
    image: "./images/Slider5.png",
  },
];

const carousel = document.querySelector(".carousel");
let sliders = [];
let slideIndex = 0;

const createSlide = () => {
  if (slideIndex >= movies.length) {
    slideIndex = 0;
  }

  // create DOM Elements
  let slide = document.createElement("div");
  let imgElement = document.createElement("img");
  let content = document.createElement("div");
  let h1 = document.createElement("h1");
  let p = document.createElement("p");

  // attaching all element
  imgElement.appendChild(document.createTextNode(""));
  h1.appendChild(document.createTextNode(movies[slideIndex].name));
  p.appendChild(document.createTextNode(movies[slideIndex].des));
  content.appendChild(h1);
  content.appendChild(p);
  slide.appendChild(content);
  slide.appendChild(imgElement);
  carousel.appendChild(slide);

  // setting up images
  imgElement.src = movies[slideIndex].image;
  slideIndex++;

  // setting elements classnames
  slide.className = "slider";
  content.className = "slide-content";
  h1.className = "movie-title";
  p.className = "movie-des";

  sliders.push(slide);

  if (sliders.length) {
    sliders[0].style.marginLeft = `calc(-${100 * (sliders.length - 2)}% - ${
      30 * (sliders.length - 2)
    }px)`;
  }
};

for (let i = 0; i < 3; i++) {
  createSlide();
}

setInterval(() => {
  createSlide();
}, 3000);

// video cards

const videoCards = document.querySelectorAll(".video-card");

videoCards.forEach((item) => {
  item.addEventListener("mouseover", () => {
    let video = item.children[1];
    video.play();
  });
  item.addEventListener("mouseleave", () => {
    let video = item.children[1];
    video.pause();
  });
});

// cards sliders

let cardContainers = document.querySelectorAll(".card-container");
let preBtns = document.querySelectorAll(".pre-btn");
let nxtBtns = document.querySelectorAll(".nxt-btn");

// Function to scroll the card container to the left
function scrollLeft(container) {
  container.scrollLeft -= container.clientWidth;
}

// Function to scroll the card container to the right
function scrollRight(container) {
  container.scrollLeft += container.clientWidth;
}

// Attach click event listeners to previous and next buttons
preBtns.forEach((preBtn, index) => {
  preBtn.addEventListener("click", () => {
    scrollLeft(cardContainers[index]);
  });
});

nxtBtns.forEach((nxtBtn, index) => {
  nxtBtn.addEventListener("click", () => {
    scrollRight(cardContainers[index]);
  });
});