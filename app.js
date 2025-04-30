
// Déroulement du menu
document.querySelector('.dropdown-btn').addEventListener('click', function() {
  const menu = document.querySelector('.dropdown-content');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
  
  /* if (menu.style.display === 'block') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'block';
 } */

// Fonction pour passer la 1ère lettre du prénom en majuscule
function capitalize(word) {
  if (typeof word !== 'string') return '';
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

// Fonction pour charger les articles
async function showUser() {
  try { 
    const response = await fetch("https://randomuser.me/api/0.8/?results=10");
    const data = await response.json();
    const users = data.results;
    console.log(users);

  // Affiche les utilisateurs dans le DOM
    const container = document.querySelector('.feed'); // ajoute le contenu de container au DOM
    container.innerHTML = ''; // définit la syntaxe HTML des descendants de l'élément container, donc nettoie le contenu précédent

    users.forEach(user => {
      const userData = user.user;

      const div = document.createElement('div'); // crée un nouvel élément div
      div.classList.add('user-card');

      const img = document.createElement('img');
      img.classList.add('user-img');
      img.src = userData.picture.large;
      img.alt = "Photo de profil";

      const info = document.createElement('div');
      info.classList.add('user-info');

      const firstName = capitalize(userData.name.first);
      const name = document.createElement('div');
      name.innerHTML = `<strong> ${firstName} ${userData.name.last.toUpperCase()} </strong>`; // innerHTML et pas textContent car il y a du strong

      const email= document.createElement('div');
      email.textContent = `📧 ${userData.email}`;

      const phone = document.createElement('div');
      phone.textContent = `📞 ${userData.phone}`;

      info.appendChild(name);
      info.appendChild(email);
      info.appendChild(phone);

      div.appendChild(img); // ajoute l'image au bloc user-card
      div.appendChild(info); // ajouter les infos à user-card
      container.appendChild(div); // ajoute le user-card au container
    });
  } catch (error) {
    console.error("Erreur lors du chargement des utilisateurs :", error);
  }
}

// Appel lors du chargement de la page
document.addEventListener('DOMContentLoaded', showUser);

// Appel lors du clic sur le bouton d'actualisation
document.querySelector('.refresh-btn').addEventListener('click', showUser);



