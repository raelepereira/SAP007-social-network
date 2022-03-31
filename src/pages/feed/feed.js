export default () => {
    const container = document.createElement("div");
    container.classList.add("content-feed")
      
    const templateFeed = `
    <header>
  <img class="logo-eu-poesia" src="./img/logo-eu-poesia-r.png" alt="logo-eu-poesia">
  <ul class="menu">
    <li><a class="about-us" id="about-us" href="#">Sobre Nós</a></li>
    <li><a class="my-profile" id="my-profile" href="#">Meu Perfil</a></li>
    <li><a class="out" id="out" href="">Sair</a></li>
  </ul>
</header>
<main>
  <div class="publi-location">
    <p>crie uma nova poesia aqui:</p>
    <textarea type="text" name="publi-location" id="publi-location" cols="30" rows="5" autocapitalize="sentences"></textarea>
    <button type="button" id="publi-button" class="publi-button"></button>
  </div>
  <div class="feed-location"></div>
</main>
    `;
  container.innerHTML = templateFeed;
}