async function afficherUser() {
    const reponse = await fetch("https://randomuser.me/api/0.8/?results=10");
    const users = await reponse.json();
    console.log(users);
  }
  
afficherUser()
