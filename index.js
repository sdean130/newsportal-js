const cards = document.querySelector(".cards");
const category = document.querySelector(".category");
const categorySpan = document.querySelectorAll(".category span");

const baseUrl = 'https://newsapi.org/v2';
const apiKey = 'apiKey=4b238002069946ec807f30672e0599d0';

const defaultImage = 'https://images.unsplash.com/photo-1682685797507-d44d838b0ac7?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

// const newsAll = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=4b238002069946ec807f30672e0599d0';
// const newsBusiness = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=4b238002069946ec807f30672e0599d0';
// const urlTechcrunch = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=4b238002069946ec807f30672e0599d0';
// const wallStreetUrl = 'https://newsapi.org/v2/everything?domains=wsj.com&apiKey=4b238002069946ec807f30672e0599d0';

async function dataRequest(url){
    try{
        const response = await fetch(baseUrl + url + apiKey);
        const json = response.json();

        return json;
    } catch(error) {
        console.log(error);
    }
}

function urlRequest(url){
    dataRequest(url)
        .then(data => {
            data.articles.forEach(item => {
                cards.innerHTML += `<div class="card">
                    <div class="image">
                            <img src="${item.urlToImage ? item.urlToImage : defaultImage}" alt="Default News Image"> 
                        </div>
                        <div class="information">
                            <div>
                                <p class="title">${item.title}</p>
                                <p class="description">${item.description}</p>
                                <p class="time">
                                    <span>${item.publishedAt.replace("Z", "").split("T")[1]}</span>
                                    <span>${item.publishedAt.replace("Z", "").split("T")[0]}</span>
                                </p>
                            </div>
                            <div class="other">
                                <span class="source">${item.source.name}</span>
                                <a class="url" href="${item.url}" target="_blank">Read Article <i class="bi bi-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>`
            });
        });
}


category.addEventListener("click", (event) =>{
    if(event.target.tagName === "SPAN"){
        cards.innerHTML = "";
        // console.log(event.target.dataset.id);
        urlRequest(event.target.dataset.id);
        categorySpan.forEach(item => item.classList.remove("active"));
        event.target.classList.add("active");

    }
});

urlRequest('/top-headlines?country=us&');