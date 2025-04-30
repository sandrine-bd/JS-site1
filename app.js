// Fonction pour charger les articles
async function showUser() {
  try { 
    const response = await fetch("https://randomuser.me/api/0.8/?results=10");
    const data = await response.json();
    const users = data.results;
    console.log(users);

  // Affiche les utilisateurs dans le DOM
  const container = document.getElementsByClassName('feed')[0] // ajoute le contenu de container au DOM
  container.innerHTML = ''; // nettoyage du contenu précédent

  users.forEach(user => {
  const div = document.createElement('div') // crée un nouvel élément div
  div.textContent = `${user.user.name.first} ${user.user.name.last}` // lui donne du contenu
  container.appendChild(div) // ajoute un nœud (enfant div) à la fin de la liste des enfants d'un nœud parent spécifié (container)
  })
} catch (error) {
    console.error("Erreur lors du chargement des utilisateurs :", error);
  }
}

// Appel lors du chargement de la page
document.addEventListener('DOMContentLoaded', showUser)

// Appel lors du clic sur le bouton d'actualisation
document.getElementById('refresh-btn').addEventListener('click', showUser)