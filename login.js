
function attemptLogin() {
    // Get username and password from input fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Create an XMLHttpRequest or use Fetch API to send a request to your server
    const xhr = new XMLHttpRequest();
    const url = '/api/login'; // Replace with your actual API endpoint
    const params = `username=${username}&password=${password}`;
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // Define what happens on successful data submission
    xhr.onload = function () {
        if (xhr.status == 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
                alert('Login successful!');
                // Redirect or perform other actions upon successful login
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } else {
            alert('Error during login.');
        }
    };

    // Handle network errors
    xhr.onerror = function () {
        alert('Network error during login.');
    };

    // Send the request with the parameters
    xhr.send(params);
}