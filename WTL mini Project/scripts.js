function validateForm() {
    var phoneNumber = document.getElementById('phoneNumber').value;
    var age = document.getElementById('age').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

   
    if (phoneNumber === "" || !/^\d{10}$/.test(phoneNumber)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }

    

    if (username === "" || password === "") {
        alert("Both username and password are required!");
        return false;
    }


    return true;
}