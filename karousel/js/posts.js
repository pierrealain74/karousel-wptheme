

//Au demarrage de la page : appel des fonctions : post(), loadmore(), filters(cat)

document.addEventListener("DOMContentLoaded", function () {


    /*Doit récupérer tous les post et prendre les 4 1ers par defaut sur catselect ou loadmore */

    //Catégorie par defaut
    const cat = '';

    // Nombre d'articles à afficher à chaque chargement
    const articlesParChargement = 4;

    // Indice de départ pour l'affichage des articles
    let indiceAffichage = 0;


    //Afficha par defaut les 4 1ers posts
    const posts4FirstItems = all_posts_json.slice(0, articlesParChargement);//json all posts comes from functions.php
    displayPosts(posts4FirstItems);
    indiceAffichage += articlesParChargement;


    

    document.getElementById('loadMoreBtn').addEventListener('click', loadMore);
    document.getElementById('catSelect').addEventListener('click', catSelect);









function displayPosts(arrayPosts) {


    var bloggerElt = document.getElementById("blogger");
    //bloggerElt.textContent = '';




    arrayPosts.forEach(async (post) =>
    {
                    


        post.thumbnail === false ? thumbnailUrl = window.location.href + '/wp-content/uploads/2024/01/thumbnail-default.png' : thumbnailUrl = post.thumbnail;


        /* Templating */

        const divElt = document.createElement('div');
        divElt.classList.add('divImg');

        const imgElt = document.createElement('img');
        imgElt.src = thumbnailUrl;

        const linkImgElt = document.createElement("a");
        linkImgElt.setAttribute("href", post.url_post);

        const titleH3 = document.createElement("h3");
        titleH3.classList.add("title-post", "text-center");
        titleH3.innerHTML = '<a href="' + post.url_post + '">' + post.title + '</a>';



        const exerptH2 = document.createElement("h2");
        //const excerptSliced = excerpt.slice(0,50)
        exerptH2.innerHTML = post.excerpt.split(' ').slice(0, 9).join(' ');


        const linkBt = document.createElement("a");
        linkBt.setAttribute("type", "submit");
        linkBt.setAttribute("role", "button");
        linkBt.setAttribute("href", post.url_post);
        linkBt.classList.add("btn", "btn-primary", "d-flex", "justify-content-center");
        linkBt.innerHTML = '<i class="bi bi-eye"></i>';

        linkImgElt.appendChild(imgElt);                    
        divElt.appendChild(linkImgElt);
        divElt.appendChild(titleH3);
        divElt.appendChild(exerptH2);
        divElt.appendChild(linkBt);
        
        bloggerElt.appendChild(divElt);






    })

            
 }    


function loadMore() {

    //Créer bt loadmore // Deja créé dans le DOM dans home.php
/*     const bloggerfilterElt = document.querySelector(".bloggerfilter");
    const loadMoreBt = document.createElement("div");
    loadMoreBt.classList.add("loadmore", "btn", "btn-primary");
    loadMoreBt.innerHTML = "Load More";
    bloggerfilterElt.appendChild(loadMoreBt); */
    
    const nextPosts = all_posts_json.slice(indiceAffichage, indiceAffichage + articlesParChargement);

    if (nextPosts.length > 0) {

        displayPosts(nextPosts);

        indiceAffichage += articlesParChargement;

    } else {

        // Aucun article supplémentaire à charger, désactivez le bouton ou masquez-le
        document.querySelector(".loadmore").style.display = 'none';
    }

}

function catSelect() {

    const categoryIdSelected = parseInt(categorySelect.value, 10);// parseInt pour s'assurer que l'i est un number
    /* console.log('categoryIdSelected : ', categoryIdSelected); */

    const postsCategories = all_posts_json.filter(item => item.category_id.includes(categoryIdSelected));
    /* console.log('posts apres filter : ', posts); */

    const posts = postsCategories.slice(0, 4);
    console.log(posts);

    displayPost(posts);
} 




/* function fetchMedia(thumbnailId){// utilisé pour trouver l'url d'un thumbnail à partir de son ID -> uniquement pour le REST API

    const urLocation = window.location.origin;

    return fetch(`${urLocation}/wp-json/wp/v2/media/${thumbnailId}`)

    .then(response => response.json())

    .then(thumbnail => thumbnail.source_url)

    .catch(error => console.error('Error fetching media data:', error));

    return null;

}
 */
    
    
    
    
    
});