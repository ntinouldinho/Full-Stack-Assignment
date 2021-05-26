var templates = {};

templates.bookResult = Handlebars.compile(`
{{#each work}}
    <h1> {{titleAuth}} </h1>
    <button type="button" onClick="addFavourite(this,{{workid}})" class="favourites-book addBook">Favourite</button>

{{/each}}
`)


const input = document.querySelector('#book-search');
const button = document.querySelector('#search-button');
const results = document.querySelector('#search-results');

const api_url = "https://reststop.randomhouse.com/resources/works";

button.addEventListener('click', updateValue);

function updateValue() {
    let value = input.value;

    let get_works_api = api_url + "?search=" + value;

    let header = new Headers();
    header.append('Accept', 'application/json');

    let init = {
        method: 'GET',
        headers: header
    }

    fetch(get_works_api, init)
        .then(response => response.json())
        .then(obj => {
            console.log(obj)
            results.innerHTML = templates.bookResult(obj)
        })
        .catch(err => {
            console.log(err)
        })
}

function addFavourite(el, id) {
    if (el.classList.contains("addBook")) {
        let get_works_api = api_url + "/" + id;
        let header = new Headers();
        header.append('Accept', 'application/json');

        let init = {
            method: 'GET',
            headers: header
        }

        fetch(get_works_api, init)
            .then(response => response.json())
            .then(obj => {
                let favouriteBook = {
                    id: obj.workid,
                    title: obj.titleAuth,
                    author: obj.authorweb
                }

                let postHeader = new Headers();
                postHeader.append('Content-Type', 'application/json');

                let init = {
                    method: 'POST',
                    headers: postHeader,
                    body: JSON.stringify(favouriteBook)
                }

                fetch("/favourites/create", init)
                    .then(response => response.text())
                    .then(response => {
                        switch (response) {
                            case '0':
                                alert("an error occurred")
                                break;
                            case '1':
                                alert("book successfuly added to favourites")
                                el.classList.toggle("addBook");
                                el.innerHTML = "Remove"
                                break;
                            case '2':
                                alert("book is already in favourites")
                                el.classList.toggle("addBook");
                                el.innerHTML = "Remove"
                                break;
                            default:
                                alert("an error occurred")
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    } else {
        let deleteHeader = new Headers();
        deleteHeader.append('Content-Type', 'application/json');

        let init = {
            method: 'DELETE',
            headers: deleteHeader,
            body: JSON.stringify({ id: id })
        }

        fetch("/favourites/", init)
            .then(response => response.text())
            .then(response => {
                switch (response) {
                    case 'ok':
                        alert("deleted")
                        el.classList.toggle("addBook");
                        el.innerHTML = "Favourite"
                        break;
                    default:
                        alert("an error occurred")
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

}