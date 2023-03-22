let movieNameReference = document.getElementById("movie-name");
let searchButton = document.getElementById("search");
let result = document.getElementById("result");

//getting the data from api:

let getMovie = () =>{
    let movieName = movieNameReference.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=7f9a3b82`;

    if(movieName.length <=0){
        result.hidden==true;
    } else {
        fetch(url).then((resp) => resp.json()).then((data) =>{
            if(data.Response == "True"){
                result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star.svg">
                                <h4>${data.imdbRating} rated by ${data.imdbVotes} people</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>What the film is about:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                    <h3>Box Office:</h3>
                    <p>${data.BoxOffice}</p>
                    <h3>Awards:</h3>
                    <p>${data.Awards}</p>
                `;
            } else {
                result.innerHTML = `<h3 class="msg">Uh oh! ${data.Error}</h3>`;
            }
        })
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
            });
        }
    };

searchButton.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);

