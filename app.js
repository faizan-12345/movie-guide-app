let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
let key = '286996'
// http://www.omdbapi.com/?t=Wednesday&apikey=7f9a3b82
//function to fetch data from api
const getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`
    if(movieName.length <= 0){
        result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`
    } else{
        fetch(url).then((res) => res.json()).then((data) => {
            //if movie exsists in database
            if(data.Response === "True"){
             result.innerHTML = `
             <div class="info">
             <img src=${data.Poster} class="poster">
             <div>
             <h2>${data.Title}</h2>
             <div class="rating">
             <img src="./star-icon.png">
             <h4>${data.imdbRating}</h4>
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
             <h3>Plot:</h3>
             <p>${data.Plot}</p>
             <h3>Cast:</h3>
             <p>${data.Actors}</p>
             `;
            }
            //if movie doesn't exist in database
            else{
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`
            }
        })
        //if error occurs
        .catch(() => {
            alert(url);
            result.innerHTML = `<h3 class="msg">Error Occured</h3>`
        })
    }    
}

searchBtn.addEventListener("click",getMovie);
window.addEventListener("load",getMovie)
