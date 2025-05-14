document.querySelector('.dropdown-btn').addEventListener('click', function() {
    const menu = document.querySelector('.dropdown-content');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
