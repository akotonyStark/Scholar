$("#login").click(function() {
    var username = document.getElementById("username").value;
    localStorage.setItem("username", username);
})