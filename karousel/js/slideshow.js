//Creer un tableau  des post : title, thumbnail full, cat

//console.log(all_posts_json);

createCarousel(all_posts_json);




function createCarousel(postsData) {

  /**Afficher le 1er POST */

  let currentSlide = 0;

  const banner = document.getElementById('banner');
  const arrowLeft = document.querySelector('.arrow_left');
  const arrowRight = document.querySelector('.arrow_right');
  const pDots = document.querySelector('.dots');

  //Build the category url
  const siteUrlWithHttps = window.location.origin;
  const siteUrl = window.location.href;
  const catLink = siteUrl + 'category/';
  //console.log(catLink);

  const title = document.querySelector('.title');
  title.innerHTML = '<a href="' + postsData[0].url_post + '">' + postsData[0].title + '</a>';

  const categoriesElt = document.querySelector('.categories-wrapper');
  let categoryTab = postsData[0].category;
  //categoriesElt.textContent = categoryTab.join(', ');
  categoryTab.map(category => {//prend chaque catégorie et les place dans un <div class="category"
    let categoryDiv = document.createElement('div');
    let ahrefDiv = document.createElement("a");
    /* ahrefDiv.setAttribute("href", catLink + postsData[0].category); */
    categoryDiv.classList.add('category');
    
    categoryDiv.innerHTML = '<a href="' + catLink + category.replace(/\s+/g, '-') + '">' + category + '</a>';//remplacer les espaces par des tirets

    categoriesElt.appendChild(categoryDiv);
    
  });

  //Tester si un thumbnail existe sinon prendre l'image par defaut
  postsData[0].thumbnail === false ? thumbnail = window.location.href + '/wp-content/uploads/2024/01/thumbnail-default.png' : thumbnail = postsData[0].thumbnail;

  //Href des images karousel
  const ahrefImgElt = document.createElement("a");
  ahrefImgElt.setAttribute("href", postsData[0].url_post);

  //Images karousel
  const imgElt = document.createElement("img");
  imgElt.classList.add('banner-img');
  imgElt.src = thumbnail;

  ahrefImgElt.appendChild(imgElt);
  banner.appendChild(ahrefImgElt);

  /**Afficher les DOTS*/

  // Créer un point pour chaque slide
  postsData.forEach((slide, index) => {
    

    const dot = document.createElement('span');
    dot.setAttribute('data-index', index);      
    dot.classList.add('dot');
    if (index === 0) {
      dot.classList.add('dot_selected');
    }
    dot.addEventListener('click', (event) => {
    const clickedDotIndex = event.target.getAttribute('data-index');// récupère le n° index 
    currentSlide = clickedDotIndex;
    
    modifySlide();
  
  
    }); 
  
    // Ajoute dynamiquement chaque point
    pDots.appendChild(dot);
  
  });//endforeach


  function modifySlide() {

    /*Title */
    title.innerHTML = '<a href="'+ postsData[currentSlide].url_post +'">' + postsData[currentSlide].title + '</a>';

    /**Categorie */
    let categoryTab = postsData[currentSlide].category
    categoriesElt.textContent = '';
    categoryTab.map(category => {//prend chaque catégorie et les place dans un <div class="category"
      let categoryDiv = document.createElement('div');
      categoryDiv.classList.add('category');
      categoryDiv.innerHTML = '<a href="'+ catLink + category.replace(/\s+/g, '-') +'">' + category + '</a>';
      categoriesElt.appendChild(categoryDiv);
    });








    /**Image */
      //Tester si un thumbnail existe sinon prendre l'image par defaut
    postsData[currentSlide].thumbnail === false ? thumbnail = window.location.href + '/wp-content/uploads/2024/01/thumbnail-default.png' : thumbnail = postsData[currentSlide].thumbnail;
    //let thumbnail = postsData[currentSlide].thumbnail;

    imgElt.classList.remove('animate_slider');
    void imgElt.offsetWidth;
    imgElt.classList.add('animate_slider');

    imgElt.src = thumbnail;   

    /**Ajouter le dot_selected sur le dot actif et supprimer tous les autres */

    const allDots = document.querySelectorAll('.dots span');
    allDots.forEach(dots => dots.classList.remove('dot_selected'));

    const dotSelected = document.querySelector('.dots span[data-index = "' + currentSlide + '"]');
    dotSelected.classList.add('dot_selected');

  }

  //console.log('currentSlide : ', currentSlide);

  arrowRight.addEventListener(
    'click', () => {

      currentSlide++;

      if (currentSlide >= postsData.length) {//si on arrive au dernier slide
          currentSlide = 0;
      }
      modifySlide();

    }
  );

  arrowLeft.addEventListener(
    'click', () => {
      
      currentSlide--;

      if (currentSlide <  0) {//si on arrive au dernier slide
          currentSlide = postsData.length-1;
      }
      modifySlide();

    }
  );

}//fin de fonction createCarousel
