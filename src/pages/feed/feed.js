import {
  newPost,
  allPosts,
} from '../../configs/firestore.js';
import { auth } from '../../configs/authentication.js';
import {
  header,
  logoutUser,
} from '../components/header.js';
import { createCardPost } from '../components/post.js';

export default function feed() {
  const container = document.createElement('div');
  container.classList.add('content-feed');

  const templateFeed = `
    <main class="main">
      <form class="write-post main-form" id="write-post">
        <h1 class="welcome-title">Bem-vindo(a), poeta!</h1>
        <textarea class="textarea" id="textarea" placeholder="Escreva seu poema aqui"></textarea>
        <p id="alert-notification" class="message"></p>
        <button class="btn-publish" id="btn-publish" type="submit"> Publicar </button>
      </form>

      <ul>
      <li class="new-post" id="new-post"></li>
      <li class="publications" id="publications"></li>
    </ul>
    </main> 
  `;

  container.appendChild(header());
  container.innerHTML += templateFeed;

  const logoutButton = container.querySelector('#btn-exit');
  logoutButton.addEventListener('click', logoutUser);

  const btnMobile = container.querySelector('#btn-mobile');

  function toggleMenu(event) {
    if (event.type === 'touchstart') {
      event.preventDefault();
    }
    const nav = container.querySelector('#nav');
    nav.classList.toggle('active');
    const navActive = nav.classList.contains('active');
    event.currentTarget.setAttribute('aria-expanded', navActive);
    if (navActive) {
      event.currentTarget.setAttribute('aria-label', 'Close Menu');
    } else {
      event.currentTarget.setAttribute('aria-label', 'Open Menu');
    }
  }

  btnMobile.addEventListener('click', toggleMenu);
  btnMobile.addEventListener('touchstart', toggleMenu);

  const showNewPost = container.querySelector('#new-post');
  const addNewPost = container.querySelector('#textarea');
  const showPosts = container.querySelector('#publications');
  const buttonPublic = container.querySelector('#btn-publish');
  const msgAlert = container.querySelector('#alert-notification');

  buttonPublic.addEventListener('click', (e) => {
    e.preventDefault();
    if (addNewPost.value === '') {
      msgAlert.innerHTML = 'Escreva uma poesia';
    } else {
      newPost(addNewPost.value)
        .then(() => {
          const newDate = new Date().toLocaleString('pt-br');
          const post = {
            message: addNewPost.value,
            displayName: auth.currentUser.displayName,
            likes: [],
            date: newDate,
          };
          showNewPost.prepend(createCardPost(post));
          addNewPost.value = '';
        });
    }
  });

  const showAllPosts = async () => {
    const timeline = await allPosts();
    timeline.forEach((post) => {
      const postElement = createCardPost(post);
      showPosts.prepend(postElement);
    });
  };

  showAllPosts();

  return container;
}
