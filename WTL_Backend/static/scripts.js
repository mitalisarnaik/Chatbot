function validateForm() {
    var phoneNumber = document.getElementById('phoneNumber').value;
    var age = document.getElementById('age').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

   
    if (phoneNumber === "" || !/^\d{10}$/.test(phoneNumber)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }
    if (password.length < 8) {
		document.getElementById("errorMsg").innerHTML = "Your password must include atleast 8 characters"
		return false;
	}
    
    if (username === "" || !/^[a-zA-Z][a-zA-Z0-9]*$/.test(username)) {
        alert("Please enter a valid username. It should start with an alphabet, contain only alphabets and digits, and have no spaces.");
        return false;
    }
    if (age === ""  || parseInt(age) < 0) {
        alert("Please enter a valid age greater than 0.");
        return false;
    }


    return true;
}