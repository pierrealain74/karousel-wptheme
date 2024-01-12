

//Au demarrage de la page : appel des fonctions : post(), loadmore(), filters(cat)

document.addEventListener("DOMContentLoaded", function () {


    //Doit récupérer tous les post et prendre les 4 1ers par defaut
    //si appel de loadmore() cela appel createpost() pour recréer un array avec les  4+ 4 + 4... posts
    // si appel de filters() appel createpost() pour recréer un array de post à partir de la catégorie choisie

    console.log('all_posts_json : ', all_posts_json);

    const loadmore = '';
    const cat = '';

    const categorySelect = document.getElementById("cat-select");

   
    const posts4FirstItems = all_posts_json.slice(0, 4);//json all posts comes from functions.php
    //console.log('page filters.js - 4 1er posts : ', posts4FirstItems);

    const posts = posts4FirstItems;



    displayPost(posts);
    //console.log(posts4FirstItems);


  
     //Select category recupere la catégorie et crée un nouveau JSON all_posts, lance displayPost()
    categorySelect.addEventListener("change", function() {

        //console.log('categorySelect : ', categorySelect);

        const categoryIdSelected = parseInt(categorySelect.value, 10);
        /* console.log('categoryIdSelected : ', categoryIdSelected); */

        const posts = all_posts_json.filter(item => item.category_id.includes(categoryIdSelected));
        /* console.log('posts apres filter : ', posts); */

        displayPost(posts);



    })





});




function displayPost(arrayPosts) {


    var bloggerElt = document.getElementById("blogger");
    bloggerElt.textContent = '';




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





function fetchMedia(thumbnailId){

    const urLocation = window.location.origin;

    return fetch(`${urLocation}/wp-json/wp/v2/media/${thumbnailId}`)

    .then(response => response.json())

    .then(thumbnail => thumbnail.source_url)

    .catch(error => console.error('Error fetching media data:', error));

    return null;

}


function loadMore() {


    const bloggerfilterElt = document.querySelector(".bloggerfilter");
    const loadMoreBt = document.createElement("div");
    loadMoreBt.classList.add("loadmore", "btn", "btn-primary");
    loadMoreBt.innerHTML = "Load More";
    bloggerfilterElt.appendChild(loadMoreBt);

    loadMoreBt.addEventListener('click', () => {
        
        console.log('click on loadmore bt');

    })
    

}
