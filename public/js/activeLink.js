let currentUrl = location.pathname;
let home = document.querySelector('.home'); 
let connexion = document.querySelector('.conexion'); 
let publication = document.querySelector('.publication'); 
let account = document.querySelector('.account'); 
let courses = document.querySelector('.courses'); 
let contactezMoi= document.querySelector('.contactez-moi'); 
let deconnexion = document.querySelector('.deconnexion'); 
switch (currentUrl) {
    case '/' : home.vsetAttribute('id', 'current');break;
    case "/auth/login" : connexion.setAttribute('id', 'current');break;
    case "/posts/new" : publication.setAttribute('id', 'current');break;
    case "/users/user:id" : account.setAttribute('id', 'current');break;
    case "/users/2md/courses" : courses.setAttribute('id', 'current');break;
    case "/users/2md": contactezMoi.setAttribute('id', 'current');break;
    case "/users/logout" : deconnexion.setAttribute('id', 'current');break;
    default: home.setAttribute('id', 'current');break;
}