// Registration
document.addEventListener("DOMContentLoaded", function () {
  console.log("Script loaded");

  const registerForm = document.getElementById("register-form");
  if (registerForm) {
      console.log("Register Found");

      registerForm.addEventListener("submit", function (e) {
          e.preventDefault();
          console.log("Submitted.");

          const username = document.getElementById("username").value;
          const email = document.getElementById("email").value;
          const password = document.getElementById("password").value;

          if (!username || !email || !password) {
              alert("All fields are required.");
              return;
          }

          console.log("User Data:", { username, email, password });

          
          localStorage.setItem(email, JSON.stringify({ username, email, password }));

          alert("Registration successfully completed! Login now!");
          window.location.href = "index.html"; 
      });
  } else {
      console.log("Register form not found!");
  }
});

// Login

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
          e.preventDefault();
          const email = document.getElementById("login-email").value;
          const password = document.getElementById("login-password").value;

          console.log("Attempt login:", email);
          console.log("Entered password:", password);

          const userData = localStorage.getItem(email);
          if (userData) {
              const user = JSON.parse(userData);
              console.log("Stored password:", user.password);

              if (user.password === password) {
                  console.log("Login Successful");

                 
                  sessionStorage.setItem("loggedinUser", email);

                  window.location.href = "profile.html"; 
              } else {
                  console.log("Password does not match");
                  alert("Invalid Password. Try again!");
              }
          } else {
              console.log("User not found in localStorage");
              alert("User not found.");
          }
      });
  }
});


// Profile Logout 
document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logout-button");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            console.log("Logging out...");
            sessionStorage.removeItem("loggedinUser"); 
            console.log("session storage removed");
            window.location.href = "index.html"; 
            console.log("redirected to index.html");
        });
    } else {
        console.log("logout button not found");
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const profileIcon = document.querySelector('.profile-icon');
    const logoutButton = document.querySelector('.logout-btn');

    profileIcon.addEventListener('click', function() {
        if (logoutButton.style.display === 'block') {
            logoutButton.style.display = 'none';
        } else {
            logoutButton.style.display = 'block';
        }
    });

});



// Quiz Data
const quizData = [
  {
      question: "What is HTML?",
      options: ["Hypertext Markup Language", "Hypertext Markup Links", "Home Management Links"],
      answer: 0
  },
  {
      question: "What is the capital city of Palawan?",
      options: ["Narra", "Puerto Princesa", "Aurora (Province)", "Aborlan"],
      answer: 1
  },
  {
      question: "Where is the Mona Lisa?",
      options: ["The Louvre Museum", "The Metropolitan Museum of Art", "Ayala Museum", "Taylor Swift"],
      answer: 0
  },
  {
      question: "Who is the greatest boxer in the Philippines?",
      options: ["Manny Pacquiao", "McDonald", "Saitama", "Goku"],
      answer: 0
  },
  {
      question: "Who is called the GOAT in the NBA?",
      options: ["Under Taker", "Michael Jordan", "Steph Curry", "Kyrie"],
      answer: 1
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

function startQuiz() {
  loadQuestion();
}

function loadQuestion() {
  if (currentQuestionIndex >= quizData.length) {
      document.getElementById("quiz-box").innerHTML = `<h3>Quiz Completed</h3><p>Final Score = ${score} / ${quizData.length}</p>`;
      document.getElementById("next-btn").style.display = "none";
      document.getElementById("score").parentElement.style.display = "none";
      return;
  }

  let questionObj = quizData[currentQuestionIndex];
  document.getElementById("question").innerText = questionObj.question;

  let optionContainer = document.getElementById("options");
  optionContainer.innerHTML = "";
  questionObj.options.forEach((option, index) => {
      let button = document.createElement("button");
      button.innerText = option;
      button.classList.add("btn", "btn-outline-primary", "w-100", "my-1", "option");
      button.onclick = () => checkAnswer(button, index);
      optionContainer.appendChild(button);
  });

  resetTimer();
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 15;
  document.getElementById("time").innerText = timeLeft;

  timer = setInterval(() => {
      if (timeLeft > 0) {
          timeLeft--;
          document.getElementById("time").innerText = timeLeft;
      } else {
          clearInterval(timer);
          autoSelectWrongAnswer();
      }
  }, 1000);
}

// Stops timer when an answer is selected
function checkAnswer(button, selected) {
  clearInterval(timer); 

  let correct = quizData[currentQuestionIndex].answer;
  let buttons = document.querySelectorAll(".option");

  buttons.forEach(btn => btn.disabled = true);

  if (selected === correct) {
      score++;
      button.classList.add("btn-success");
  } else {
      button.classList.add("btn-danger");
  }

  document.getElementById("score").innerText = score;
  document.getElementById("next-btn").classList.remove("hide");
}

// Auto selects wrong answer when time runs out
function autoSelectWrongAnswer() {
  let buttons = document.querySelectorAll(".option");
  buttons.forEach(button => {
      button.disabled = true;
  });
  document.getElementById("next-btn").classList.remove("hide");
}

// Load next question
function nextQuestion() {
  currentQuestionIndex++;
  document.getElementById("next-btn").classList.add("hide");
  loadQuestion();
}

// Initialize quiz
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("next-btn").addEventListener("click", nextQuestion);
    startQuiz();
});
 

// Blog Page Redirection Fix
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      window.location.href = "blog.html"; 
  });
}


document.addEventListener("DOMContentLoaded", function () {
    const profileImg = document.getElementById("profile-img");
    const fileInput = document.getElementById("file-input");

    // Load saved profile picture from localStorage
    const savedImage = localStorage.getItem("profilePic");
    if (savedImage) {
        profileImg.src = savedImage;
    }

    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImg.src = e.target.result;
                localStorage.setItem("profilePic", e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
});


// Change profile

document.getElementById("file-input").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("profile-pic").src = e.target.result;
            localStorage.setItem("profileImage", e.target.result); 
        };
        reader.readAsDataURL(file);
    }
});


// Load the saved profile picture if available
document.addEventListener("DOMContentLoaded", function() {
    const savedImage = localStorage.getItem("profilePic");
    if (savedImage) {
        document.getElementById("profilePic").src = savedImage;
    }
});

document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profilePic').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

function updateProfile() {
    const imgSrc = document.getElementById("profilePic").src;
    localStorage.setItem("profilePic", imgSrc);
    alert("Profile updated successfully!");
}



function updateProfile() {
    const imgSrc = document.getElementById("profilePic").src;

    document.querySelector("#about img").src = imgSrc;

    localStorage.setItem("profilePic", imgSrc);

    alert("Profile updated successfully!");
}


function updateText() {
    let currentText = document.getElementById('about-text').innerText;
    document.getElementById('new-about-text').value = currentText;
  
    new bootstrap.Modal(document.getElementById('editModal')).show();
}


function saveText() {
    let updatedText = document.getElementById('new-about-text').value;
    document.getElementById('about-text').innerText = updatedText;

    let modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    modal.hide();
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('editModal').addEventListener('shown.bs.modal', function () {
        console.log("Modal is open");
    });
});


/* Project */
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('saveProjectBtn').addEventListener('click', function() {
      const title = document.getElementById('projectTitle').value.trim();
      const description = document.getElementById('projectDesc').value.trim();
  
      if (!title || !description) {
        alert('Please enter both a project title and description.');
        return;
      }
  
      const projectList = document.getElementById('project-list');
      const newCol = document.createElement('div');
      newCol.classList.add('col-md-6');
      newCol.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description}</p>
          </div>
        </div>
      `;
  
      projectList.appendChild(newCol);
  
      document.getElementById('projectForm').reset();
  
      const projectModal = bootstrap.Modal.getInstance(document.getElementById('projectModal'));
      projectModal.hide();
    });
  });
  



/* Profile  Image update */

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('saveProjectBtn').addEventListener('click', function() {
      const title = document.getElementById('projectTitle').value.trim();
      const description = document.getElementById('projectDesc').value.trim();
  
      if (!title || !description) {
        alert('Please enter both a project title and description.');
        return;
      }
  
      const projectList = document.getElementById('project-list');
      const newCol = document.createElement('div');
      newCol.classList.add('col-md-6', 'mb-4');
      newCol.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description}</p>
          </div>
        </div>
      `;
  
      projectList.appendChild(newCol);
  
      document.getElementById('projectForm').reset();
  
      const projectModal = bootstrap.Modal.getInstance(document.getElementById('projectModal'));
      projectModal.hide();
    });
  });
  
  
document.addEventListener("DOMContentLoaded", function() {
    const savedImage = localStorage.getItem("profilePic");
    if (savedImage) {
        document.getElementById("profilePic").src = savedImage;
        document.querySelector("#about img").src = savedImage;
    }
});

document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profilePic').src = e.target.result;
            document.querySelector("#about img").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});


function updateText() {
    let currentText = document.getElementById('about-text').innerText;
    document.getElementById('new-about-text').value = currentText;
    new bootstrap.Modal(document.getElementById('editModal')).show(); 
}

function saveText() {
    let updatedText = document.getElementById('new-about-text').value;
    document.getElementById('about-text').innerText = updatedText;
    
    
    let modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    modal.hide();
}

function updateProfile() {
    const imgSrc = document.getElementById("profilePic").src;

    
    document.querySelector("#about img").src = imgSrc;

    localStorage.setItem("profilePic", imgSrc);

    alert("Profile updated successfully!");
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    document.getElementById('home').style.display = sectionId === 'home' ? 'flex' : 'none';
}



/* Register form */
document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    
    if (localStorage.getItem(email) !== null) {
        alert("User already exists! Please log in.");
        window.location.href = "index.html";  
        return;
    }

   
    let user = { username, email, password };
    localStorage.setItem(email, JSON.stringify(user));

    alert("Registration successful! Redirecting to success page...");
    
    
    window.location.href = "success.html";
});



/* About Me Update */

document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profilePic').src = e.target.result;
            document.querySelector("#about img").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});


function updateText() {
    let currentText = document.getElementById('about-text').innerText;
    document.getElementById('new-about-text').value = currentText;
    new bootstrap.Modal(document.getElementById('editModal')).show(); 
}

function saveText() {
    let updatedText = document.getElementById('new-about-text').value;
    document.getElementById('about-text').innerText = updatedText;
    
    
    let modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    modal.hide();
}



/* Project Updater functions*/
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('saveProjectBtn').addEventListener('click', function() {
      const title = document.getElementById('projectTitle').value.trim();
      const description = document.getElementById('projectDesc').value.trim();
  
      if (!title || !description) {
        alert('Please enter both a project title and description.');
        return;
      }
  
      const projectList = document.getElementById('project-list');
      const newCol = document.createElement('div');
      newCol.classList.add('col-md-6', 'mb-4');
      newCol.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description}</p>
          </div>
        </div>
      `;
  
      projectList.appendChild(newCol);
  
      document.getElementById('projectForm').reset();
  
      const projectModal = bootstrap.Modal.getInstance(document.getElementById('projectModal'));
      projectModal.hide();
    });
  });


