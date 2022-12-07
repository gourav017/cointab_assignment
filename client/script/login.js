document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    handleLogin();
  });
  
  async function handleLogin() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
  
    await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })

      .then((data) => {
    
        if (data.token) {
       
          alert("login successful!!");

          window.location.href = "./index.html";


        } else {

          alert("invalid credentials!!!!");
          window.location.href="./login.html"
        }
      });
  }