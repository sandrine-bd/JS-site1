const feedContainer = document.getElementByClass('feed');
const refreshBtn = document.getElementByClass('refresh');

// Fonction pour charger les articles
async function showUser() {
    const response = await fetch("https://randomuser.me/api/0.8/?results=10");
    const users = await response.json();
    console.log(users);
  }
  
showUser()

// Fonction pour créer un bloc d'article
function createPostElement(post) {
    const article = document.createElement('article');
    article.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
    `;
    return article;
  }


  // Charger au démarrage
window.addEventListener('DOMContentLoaded', loadFeed);

// Recharger au clic
refreshBtn.addEventListener('click', loadFeed);

createPostElement(post)