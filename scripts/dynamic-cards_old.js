window.onload = function() {
  // Get the container where the cards will be added
  const cardContainer = document.querySelector('.main-card .cards');

  // Function to create and add a card with detailed attributes
  function addCard(name, job, imageUrl, instagramLink, githubLink, twitterLink) {
    // Create the outer card div
    const card = document.createElement('div');
    card.classList.add('card'); // Add the 'card' class to the div

    // Create the content div inside the card
    const content = document.createElement('div');
    content.classList.add('content');

    // Create and append the image section
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('img');
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl; // Set the image URL dynamically
    imgElement.alt = "Profile Image"; // Alt text for the image
    imgDiv.appendChild(imgElement);

    // Create and append the details section
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('details');

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('name');
    nameDiv.textContent = name;

    const jobDiv = document.createElement('div');
    jobDiv.classList.add('job');
    jobDiv.textContent = job;

    detailsDiv.appendChild(nameDiv);
    detailsDiv.appendChild(jobDiv);

    // Create and append the social media icons
    const mediaIconsDiv = document.createElement('div');
    mediaIconsDiv.classList.add('media-icons');

    const instagramLinkElement = document.createElement('a');
    instagramLinkElement.href = instagramLink;
    const instagramIcon = document.createElement('img');
    instagramIcon.src = "assests/instagram-brands-solid.svg";
    instagramIcon.alt = "Instagram";
    instagramLinkElement.appendChild(instagramIcon);

    const githubLinkElement = document.createElement('a');
    githubLinkElement.href = githubLink;
    const githubIcon = document.createElement('img');
    githubIcon.src = "assests/github-brands-solid.svg";
    githubIcon.alt = "GitHub";
    githubLinkElement.appendChild(githubIcon);

    const twitterLinkElement = document.createElement('a');
    twitterLinkElement.href = twitterLink;
    const twitterIcon = document.createElement('img');
    twitterIcon.src = "assests/x-twitter-brands-solid.svg";
    twitterIcon.alt = "Twitter";
    twitterLinkElement.appendChild(twitterIcon);

    mediaIconsDiv.appendChild(instagramLinkElement);
    mediaIconsDiv.appendChild(githubLinkElement);
    mediaIconsDiv.appendChild(twitterLinkElement);

    // Append everything to the card
    content.appendChild(imgDiv);
    content.appendChild(detailsDiv);
    content.appendChild(mediaIconsDiv);
    card.appendChild(content);

    // Append the card to the container
    cardContainer.appendChild(card);
  }


// Path to the .txt file (relative or absolute URL)
const filePath = "./controls/dynamicCards.txt"; // Replace with the actual path to your .txt file

// Fetch the .txt file and display its content
fetch(filePath) // Fetch the file from the given path
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error fetching file: ${response.statusText}`);
    }
    return response.text(); // Convert response to text
  })
  .then((text) => {
    // Check if the file is empty and won't update if file is empty
    if (!text.trim()) {
      console.log("The control.txt file is empty. No cards will be created.");
      return; // Exit if the file is empty
    }
    const newline_array = text.split("\n").map((item) => item.trim()); // Split the text by new line and remove extra spaces
    const result = [];

    newline_array.forEach((item) => {
      const parts = item.split(",").map((part) => part.trim()); // Split the string by commas and remove extra spaces
      const obj = {
        name: parts[0],
        job: parts[1],
        imageUrl: parts[2],
        instagramLink: parts[3],
        githubLink: parts[4],
        twitterLink: parts[5],
      };
      result.push(obj);
    });
    console.log(result);
    // addCard(result[0].name, result[0].job, result[0].imageUrl, result[0].instagramLink, result[0].githubLink, result[0].twitterLink)
    for (let i = 0; i < result.length; i++) {
      addCard(result[i].name, result[i].job, result[i].imageUrl, result[i].instagramLink, result[i].githubLink, result[i].twitterLink);
    }
  })


  // Example usage: Add a card with title, job, and social media links
  // addCard(
  //   'Sandeep Kumar Kuanar',
  //   'UI/UX Developer',
  //   '/assets/image.png', // Replace with actual path to the image
  //   '#', // Instagram link
  //   '#', // GitHub link
  //   '#'  // Twitter link
  // );
  // You can add more cards by calling the addCard function multiple times with different parameters
};


function createSocialMediaLink(href, svg) {
  const linkElement = document.createElement('a');
  linkElement.href = href;
  linkElement.target = "_blank"; // Open link in a new tab

  

  linkElement.appendChild(svgElement);
  return linkElement;
}