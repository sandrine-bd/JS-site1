document.querySelector('.dropdown-btn').addEventListener('click', function() {
    const menu = document.querySelector('.dropdown-content');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });

function showGridView() {
    const images = document.querySelectorAll('.galerie-img');
    images.forEach(img => {
        img.style.width = '30%';
    });
}

function showColumnView() {
    const images = document.querySelectorAll('.galerie-img');
    images.forEach(img => {
        img.style.width = '100%';
    });
}

async function createGallery() {
    const gallery = document.createElement('div');
    gallery.classList.add('galerie'); 
  
    const gridBtn = document.createElement('button');
    gridBtn.classList.add('grid-btn');
    gridBtn.innerHTML = '<i class="fa-solid fa-grip"></i>'; // icône de grille trouvé sur Font Awesome
    gridBtn.addEventListener('click', showGridView);

    const columnBtn = document.createElement('button');
    columnBtn.classList.add('column-btn');
    columnBtn.innerHTML = '<i class="fa-solid fa-grip-lines"></i>'; // icône de colonne trouvé sur Font Awesome
    columnBtn.addEventListener('click', showColumnView);

    document.body.appendChild(gridBtn);
    document.body.appendChild(columnBtn);
  
    try {
      const response = await fetch("https://randomuser.me/api/0.8/?results=10");
      const data = await response.json();
      const users = data.results.slice(0,9);
  
      users.forEach(user => {
        const img = document.createElement('img');
        img.src = user.user.picture.large;
        img.style.width = '30%';
        img.style.margin = '10px';
        img.alt = `Photo de ${user.user.name.first} ${user.user.name.last}`;
        img.classList.add('galerie-img');
        gallery.appendChild(img);
      });
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs :', error);
    }
  
    document.body.appendChild(gallery);
  }
  
  document.addEventListener('DOMContentLoaded', createGallery);