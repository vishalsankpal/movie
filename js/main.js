$(document).ready(()=>{
    $('#searchForm').on('submit',(e)=>{
        let movieName = $('#searchText').val();
        getMovies(movieName);
        e.preventDefault();
    })
    
})

function getMovies(movieName){
    //http://www.omdbapi.com/?i=tt3896198&apikey=137a474d 
    //axios.get(`http://www.omdbapi.com/?s=${movieName}`)
    axios.get(`https://www.omdbapi.com/?i=tt3896198&apikey=137a474d&s=${movieName}`)
    .then((response)=>{
        var movieList  = response.data.Search;
        console.log(movieList);
        let output = '';
        $.each(movieList, (index, movie) => {
            output += `
            <div class="col-md-3 height">
                <div class="well text-center">
                    <img src="${movie.Poster}" class="w-100 img-thumbnail">
                    <h5 class="text-white">${movie.Title}</h5>
                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                </div>
            </div>
            `;
        });
        $('#movies').html(output);
    })
    .catch((err)=>{
        console.log(err);
    })
}

function movieSelected(id){
    sessionStorage.setItem('movieId',id);
        window.location = 'detail.html';
        return false;;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');

    axios.get(`https://www.omdbapi.com/?apikey=137a474d&i=${movieId}`)
    .then((response)=>{
        console.log(response);
        var movieWholeDetails = response.data;
        console.log(response);
        let output = `
        <div class="row">
            <div class="col-md-4">
                <img src="${movieWholeDetails.Poster}" class="w-100 img-thumbnail">
            </div>
            <div class="col-md-8">
                <h2 class="text-white">${movieWholeDetails.Title}</h2>
                <p class="text-white">Released Year: ${movieWholeDetails.Year}</p>
                <P class="text-white">Released Date : ${movieWholeDetails.Released}</P> 
                
                <h5 class="text-white">Actores: ${movieWholeDetails.Actors}</h5>
                <p class="text-white">${movieWholeDetails.BoxOffice}</p>
                <p class="text-light">${movieWholeDetails.Plot}</p>
                <p class="text-light">Duration : ${movieWholeDetails.Runtime}</p>
                <p class="text-white">${movieWholeDetails.Writer}</p>
            </div>
        </div>
        `;
        $('#movie').html(output);
    })
    .catch((err)=>{
        console.log(err);
    })
}
