async function showUser() {
    const response = await fetch("https://randomuser.me/api/0.8/?results=10");
    const users = await response.json();
    console.log(users);
  }
  
showUser()
