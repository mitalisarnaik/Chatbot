function validateLogin() {
    var username = document.getElementById("loginUsername").value;
    var password = document.getElementById("loginPassword").value;

    
    if (username === "user" && password === "password") {
        document.getElementById("loginError").innerHTML = "Login successful!";
    } else {
        document.getElementById("loginError").innerHTML = "Invalid username or password.";
    }
}

function redirectToPage() {
    window.location.href = 'chatwindow.html';
  }