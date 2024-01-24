function validateForm() {
    var phoneNumber = document.getElementById('phoneNumber').value;
    var age = document.getElementById('age').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Simple validation example (you can enhance this as needed)
    if (phoneNumber === "" || !/^\d{10}$/.test(phoneNumber)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }

    

    if (username === "" || password === "") {
        alert("Both username and password are required!");
        return false;
    }

    // Additional validation logic can be added here

    return true;
}