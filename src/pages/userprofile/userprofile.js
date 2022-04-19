import {
  newPost,
  getUserPosts,
  //sortPosts
} from "../../configs/firestore.js";
import {
  auth
} from "../../configs/authentication.js";

import header from "../components/header.js";

export default () => {



  function UserProfile(displayName, displayEmail) {
    const containerUserProfile = document.createElement("div")
    const templateUserProfile = `
      <main>
        <div class="card-user">
          <img class="icone-user" src="./img/icone-perfil.jpg" alt="Meu Perfil">
          <p class="item-user">${displayName}</p>
          <p class="item-user">${displayEmail}</p>
        </div>
        <section class="my-post" id="my-post">
        </section>
        <h1 class="my-poems">Meus Poemas:</h1>
        </section>
      </main>
    `
    containerUserProfile.appendChild(header())
    containerUserProfile.innerHTML = templateUserProfile;
    return containerUserProfile;
  }

  //template do card do post
  function cardMyPost (text, displayName, date) {
    const containerMyPost = document.createElement("div");
    const templateCardMyPost = `
      <div class="card">
        <p class="date-card">Postado em:${date}</p}
        <section class="post-infos">
          <p class="write-message">${text[0].toUpperCase() + text.substr(1)}</p>    
          <p class="author">${displayName}</p>
          <button class="button-heart">
          <img class="heart-img" src="img/icone-coração.png">
          <span class="button-heart-text">Gostei</span>
          </button>  
        </section>
      </div>    
      `;
    containerPost.innerHTML = templateCardMyPost;
    return containerMyPost;
  }


  const logoutButton = container.querySelector('#btn-exit');
  const showPosts = containerUserProfile.querySelector('#my-post');




  //função para sair do seu login
  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    logout()
    .then(function () {
      window.location.hash='#login';
    })
  })

  function formatDateStyle (date) {
    return `${date.toLocaleDateString()} às 
      ${date.getHours()}:${date.getMinutes()}`
  }

    //aparecer todos os posts
    const showUserPosts = async () => {
      const timeline = await getUserPosts();
      timeline.forEach((doc) => {
        const post = doc.data()
        const postElement = cardMyPost(post.message, post.displayName, formatDateStyle(post.date.toDate()));
        showPosts.appendChild(postElement)
  
        //a função do like precisará ser chamda aqui
        const likeButton = container.querySelector('.button-heart')
        likeButton.setAttribute('id', post.id)
    
        likeButton.addEventListener('click', (e) => {
          e.preventDefault();
          console.log(likeButton.getAttribute('id'))
        })
      });
    }
  
    showUserPosts

      //função botão menu hamburguer
  const btnMobile = container.querySelector("#btn-mobile");

  function toggleMenu(event) {
    if (event.type === "touchstart") {
      event.preventDefault();
    }     
    const nav = container.querySelector("#nav");
    nav.classList.toggle("active");
    const navActive = nav.classList.contains("active");
    event.currentTarget.setAttribute("aria-expanded", navActive);
  if (navActive) {
    event.currentTarget.setAttribute("aria-laberl", "Close Menu");
  } else {
    event.currentTarget.setAttribute("aria-laberl", "Open Menu");
  }
  }

  btnMobile.addEventListener("click", toggleMenu);
  btnMobile.addEventListener("touchstart", toggleMenu);





    return container
}