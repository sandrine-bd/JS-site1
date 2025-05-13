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

// Appel de fonctions lors du chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  showUser(); // chargement des utilisateurs existants
  createUserForm(); // création du formulaire
});

// Appel lors du clic sur le bouton d'actualisation
document.querySelector('.refresh-btn').addEventListener('click', showUser);

// Fonction pour passer la 1ère lettre du prénom en majuscule
function capitalize(word) {
  if (typeof word !== 'string') return '';
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

// Fonction pour charger les utilisateurs
async function showUser() {
  try { 
    const response = await fetch("https://randomuser.me/api/0.8/?results=10");
    const data = await response.json();
    const users = data.results.slice(0,6);
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

// Création du formulaire
function createUserForm() {
  const form = document.createElement('form'); // on encapsule tous les champs dans un vrai formulaire

  // Prénom 
  const inputFirstName = document.createElement('input'); /* input est un type d'élément reconnu */
  inputFirstName.type = 'text'; /* text est un type d'élément reconnu */
  inputFirstName.name = 'firstName'; /* je lui donne le nom que je veux */
  inputFirstName.placeholder = 'Prénom'; /* ce qui s'affiche en grisé dans la case */
  inputFirstName.required = true;

  const labelFirstName = document.createElement('label'); /* création du label devant l'input */
  labelFirstName.textContent = 'Prénom';
  labelFirstName.appendChild(inputFirstName);

  // Nom 
  const inputLastName = document.createElement('input');
  inputLastName.type = 'text';
  inputLastName.name = 'lastName';
  inputLastName.placeholder = 'NOM';
  inputLastName.required = true;

  const labelLastName = document.createElement('label');
  labelLastName.textContent = 'Nom';
  labelLastName.appendChild(inputLastName);

  // Email
  const inputEmail = document.createElement('input');
  inputEmail.type = 'email';
  inputEmail.name = 'email';
  inputEmail.placeholder = 'adresse@email.com';
  inputEmail.required = true;

  const labelEmail = document.createElement('label');
  labelEmail.textContent = 'E-mail';
  labelEmail.appendChild(inputEmail);

  // Téléphone
  const inputTel = document.createElement('input');
  inputTel.type = 'tel';
  inputTel.name = 'tel';
  inputTel.placeholder = "000-000-0000";
  inputTel.required = true;

  const labelTel = document.createElement('label');
  labelTel.textContent = 'Téléphone';
  labelTel.appendChild(inputTel);

  // Photo
  const inputPicture = document.createElement('input');
  inputPicture.type = 'file';
  inputPicture.name = 'picture';
  inputPicture.placeholder = 'Télécharger votre photo';
  inputPicture.required = true;
  inputPicture.accept = 'image/*'; // accepte uniquement les fichiers image

  const labelPicture = document.createElement('label');
  labelPicture.textContent = 'Photo';
  labelPicture.appendChild(inputPicture);

  // Bouton 
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Ajouter utilisateur';

  // Ajout des champs au DOM
  [labelFirstName, labelLastName, labelEmail, labelTel, labelPicture].forEach(label => {
    form.appendChild(label);
    form.appendChild(document.createElement('br'));
  });
  form.appendChild(submitBtn);

  // Clic sur le bouton = ajout d'un utilisateur dans le feed
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // empêche le comportement par défaut 

    const firstName = inputFirstName.value;
    const lastName = inputLastName.value.toUpperCase();
    const email = inputEmail.value;
    const tel = inputTel.value;
    const pictureFile = inputPicture.files[0];
    const picture = URL.createObjectURL(pictureFile); // crée une URL locale temporaire vers l'image

    const card = document.createElement('div');
    card.classList.add('user-card');

    const img = document.createElement('img');
    img.classList.add('user-img');
    img.src = picture;
    img.alt = "Photo de profil";

    const info = document.createElement('div');
    info.classList.add('user-info');

    const nameDiv = document.createElement('div');
    nameDiv.innerHTML = `<strong>${firstName} ${lastName}</strong>`;

    const emailDiv = document.createElement('div');
    emailDiv.textContent = `📧 ${email}`;

    const telDiv = document.createElement('div');
    telDiv.textContent = `📞 ${tel}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Supprimer l'utilisateur";
    deleteBtn.classList.add('delete-btn');

    info.appendChild(nameDiv);
    info.appendChild(emailDiv);
    info.appendChild(telDiv);
    info.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', deleteUser)

    card.appendChild(img);
    card.appendChild(info);

    document.querySelector('.feed').appendChild(card);
    form.reset(); // réinitialise tous les champs
  });

  // Insertion du formulaire dans la page
  const formContainer = document.querySelector('.form-container');
  formContainer.appendChild(form);
};

function deleteUser(event) {
  const button = event.target; // le bouton sur lequel on a cliqué
  const card = button.closest('.user-card'); // cherche le bouton le plus proche avec la classe user-card
  card.remove(); // on la supprime du DOM
}
