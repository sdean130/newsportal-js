const cards = document.querySelector(".cards");
const url = 'https://newsapi.org/v2/everything?q=tesla&from=2023-10-05&sortBy=publishedAt&apiKey=4b238002069946ec807f30672e0599d0';

async function dataRequest(url){
    try{
        const response = await fetch(url);
        const json = response.json();

        return json;
    } catch(error) {
        console.log(error);
    }
}

dataRequest(url)
    .then(data => {
        data.articles.forEach(item => {
            cards.innerHTML += `<div class="card">
            <div class="image">
                    <img src="${item.urlToImage}" alt="Default News Image"> 
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