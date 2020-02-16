async function forgotPassword() {
    var email = document.getElementById("email");
  if ((await sendPasswordEmail(email)) == "Success") {
    alert("Success");
  }
}
