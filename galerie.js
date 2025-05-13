let gallery; // portée globale

document.querySelector('.dropdown-btn').addEventListener('click', function() {
    const menu = document.querySelector('.dropdown-content');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });

function showGridView() {
    const images = document.querySelectorAll('.galerie-img');
    images.forEach(img => {
        img.style.width = '24vw';
        img.style.height = '24vw';
    });
}

function showColumnView() {
    const images = document.querySelectorAll('.galerie-img');
    images.forEach(img => {
        img.style.width = '80vw';
        img.style.height = '50vw';
    });
}

function addPicture() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.style.display = 'none'; // input caché, déclenché uniquement par JS

  input.addEventListener('change', (event) => { // quand on sélectionne un fichier, on exécute la fonction
    const file = event.target.files[0]; // choisit le premier fichier sélectionné par l'utilisateur
    if (file) { // vérifie qu'un fichier a bien été sélectionné
      const reader = new FileReader(); // objet spécial de JS qui lit le contenu du fichier et le transforme en format affichable
      reader.onload = function(e) { // une fois que la lecture du fichier est terminée
        const container = document.createElement('div'); // on crée une div pour contenir la nouvelle photo et le bouton Supprimer 
        container.classList.add('image-container');
        
        const img = document.createElement('img');
        img.src = e.target.result; // image transformée en URL base64 (permet de l'afficher immédiatement sans l'envoyer sur un serveur)
        img.alt = 'Photo ajoutée';
        img.classList.add('galerie-img');

        const button = document.createElement('button');
        button.textContent = 'Supprimer la photo';
        button.addEventListener('click', () => { // supprime l'ensemble photo + bouton au clic 
          container.remove();
        });

        container.appendChild(img);
        container.appendChild(button);
        gallery.appendChild(container);
      };
      reader.readAsDataURL(file); // convertit l'image en base64
    }
  });

  document.body.appendChild(input); // ajoute l'input temporairement au DOM pour le déclencher
  input.click(); // ouvre le sélecteur de fichier
  document.body.removeChild(input); // input caché après utilisation
}

async function createGallery() {
    gallery = document.createElement('div');
    gallery.classList.add('galerie'); 
  
    const gridBtn = document.createElement('button');
    gridBtn.classList.add('grid-btn');
    gridBtn.innerHTML = '<i class="fa-solid fa-grip"></i>'; // icône de grille trouvé sur Font Awesome
    gridBtn.addEventListener('click', showGridView);

    const columnBtn = document.createElement('button');
    columnBtn.classList.add('column-btn');
    columnBtn.innerHTML = '<i class="fa-solid fa-grip-lines"></i>'; // icône de colonne trouvé sur Font Awesome
    columnBtn.addEventListener('click', showColumnView);

    const addBtn = document.createElement('button');
    addBtn.classList.add('add-btn');
    addBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
    addBtn.addEventListener('click', addPicture);

    const toolbar = document.createElement('div');
    toolbar.classList.add('toolbar');
    const viewBtns = document.createElement('div');
    viewBtns.classList.add('view-btns');
    
    viewBtns.appendChild(gridBtn);
    viewBtns.appendChild(columnBtn);
    toolbar.appendChild(viewBtns);
    toolbar.appendChild(addBtn);

    document.body.appendChild(toolbar);
  
    try {
      const response = await fetch("https://randomuser.me/api/0.8/?results=10");
      const data = await response.json();
      const users = data.results.slice(0,9);
  
      users.forEach(user => {
        const img = document.createElement('img');
        img.src = user.user.picture.large;
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