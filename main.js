// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Wait for the DOM to be fully loaded before running the code
document.addEventListener("DOMContentLoaded", function () {
  // Select the error modal
  const errorModal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");

  // Hide the error modal initially
  errorModal.classList.add("hidden");

  // Select all the heart icons
  const hearts = document.querySelectorAll(".like-glyph");

  // Function to toggle the heart state
  function toggleHeart(heart) {
    if (heart.textContent === EMPTY_HEART) {
      heart.textContent = FULL_HEART;
      heart.classList.add("activated-heart");
    } else {
      heart.textContent = EMPTY_HEART;
      heart.classList.remove("activated-heart");
    }
  }

  // Event listener for clicking on a heart icon
  hearts.forEach(heart => {
    heart.addEventListener("click", function () {
      // Simulate making a server request
      mimicServerCall()
        .then(() => {
          // Change the heart icon and make it red
          toggleHeart(heart);
        })
        .catch((error) => {
          // Display the error modal with the server error message
          modalMessage.textContent = error;
          errorModal.classList.remove("hidden");

          // Hide the error modal after 3 seconds
          setTimeout(() => {
            errorModal.classList.add("hidden");
          }, 3000);
        });
    });
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
