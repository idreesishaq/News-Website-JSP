/*------------------GNEWS.IO API-------------*/
let loader = document.getElementById("loader");
let content = document.getElementById("content");


let getNews = (search, page) => {
    const APIS = [
        '0c14c094d78346e0b6c1c09d5533c48f', '9d522ebada14419c88430c556f9cee97', '7e8b9e3834a1423684a4bf8da6bc50a5',
        '122804f683854c24970093e8b685f9ec', '8d3c1a7ca156484c99a49134ef210b57', '5373566da26e4d5fb546e595be7ec4ca'
    ];
    let randomNumber = Math.floor(Math.random() * APIS.length);
    fetch(`https://api.worldnewsapi.com//search-news?api-key=${APIS[randomNumber]}&text=${search}&offset=${page ? page : 0}&number=12`)

        .then(res => res.json())
        .then(res => {
            loader.style.display = "none";
            content.style.display = "flex";
            // console.log(res);
            let news = document.getElementById("news");
            const articles = res.news;
            for (var i = 0; i < articles.length; i++) {
                // console.log(articles[i]);
                const { image, title, text, publish_date } = articles[i];
                news.innerHTML += `
            <div class="mt-2 card" style="width: 18rem;">
            <img src="${image}" class="news-image card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${title.slice(0, 40)}...</h5>
                <p class="card-text">${text.slice(0, 90)}...</p>
                <span class="badge text-bg-primary">${moment(publish_date).fromNow()}</span>
                </div>
            </div>`;

            }
        })
        .catch(err => console.log(err))
}

getNews()

let page = 1;

let newsSearch = () => {
    let search = document.getElementById("search");
    let news = document.getElementById("news");
    loader.style.display = "flex";
    content.style.display = "none";
    news.innerHTML = "";
    console.log(search.value);
    getNews(search.value)
}

let loadMore = () => {
    let search = document.getElementById("search");
    page++;
    getNews(search.value, page)
}

window.onscroll = function (ev) {
    if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) {
        loadMore();
    }
}
