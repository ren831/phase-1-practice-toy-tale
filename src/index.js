let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  toggleForm();
  getToys();
  newToyForm();
});

const newToyForm = () => {
  const toyForm = document.querySelector(".add-toy-form");

  toyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newToyName = e.target.name.value;
    const newToyImage = e.target.image.value;

    const newToyObj = {
      name: newToyName,
      image: newToyImage,
      likes: 0,
    };
    renderAToy(newToyObj);
  });
};

const getToys = () => {
  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((toys) => toys.forEach((toy) => renderAToy(toy)));
};

const renderAToy = (toy) => {
  //create a div with a class "card"
  const toyCard = document.createElement("div");
  toyCard.className = "card";

  const ToyName = document.createElement("H2");
  ToyName.innerText = toy.name;

  const ToyImage = document.createElement("img");
  ToyImage.src = toy.image;
  ToyImage.className = "toy-avatar";

  const toyLikes = document.createElement("p");
  toyLikes.innerText = `${toy.likes} Likes`;

  const likeBtn = document.createElement("button");
  likeBtn.innerText = `Like <3`;
  likeBtn.className = "like-btn";
  likeBtn.id = toy.id;

  likeBtn.addEventListener("click", (event) => {
    const currentLikesText = event.target.previousSibling.innerText;

    const actualLikes = currentLikesText.split(" ")[0];

    event.target.previousSibling.innerText = `${
      parseInt(actualLikes) + 1
    } Likes`;
  });

  toyCard.append(ToyName, ToyImage, toyLikes, likeBtn);

  //append that div to collection
  //get the collection
  const toyCollecton = document.querySelector("#toy-collection");
  //append it
  toyCollecton.append(toyCard);
};

const toggleForm = () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
};
