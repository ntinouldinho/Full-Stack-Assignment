var templates = {};

templates.bookResult = Handlebars.compile(`
<ul>
{{#each work}}
    <li style="align-content:center">
        <img src="https://reststop.randomhouse.com/resources/titles/{{isbn}}" height="165" width="120">
        <div>
            <h3 isbn="{{isbn}}"> {{titleAuth}} </h3>
            <img onClick="addFavourite(this,{{workid}})" class="favourites-book" height="50px" width="50px">
        </div>
        
    </li> 
{{/each}}
<ul>
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
            
            //get the first available isbn 
            obj.work.forEach(element => {
                if (element.titles.isbn.$) {
                    element.isbn = element.titles.isbn.$
                } else {
                    element.isbn =element.titles.isbn[0].$
                }
            });

            results.innerHTML = templates.bookResult(obj)
        })
        .catch(err => {
            console.log(err)
        })
}

function addFavourite(el, id) {
    if (!el.classList.contains("deleteBook")) {
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

                if (obj.titles.isbn.$) {
                    obj.isbn = obj.titles.isbn.$
                } else {
                    obj.isbn =obj.titles.isbn[0].$
                }

                let favouriteBook = {
                    id: obj.workid,
                    title: obj.titleAuth,
                    author: obj.authorweb,
                    isbn:obj.isbn
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
                                el.classList.toggle("deleteBook");
                                el.innerHTML = "Remove"
                                break;
                            case '2':
                                alert("book is already in favourites")
                                el.classList.toggle("deleteBook");
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
                        el.classList.toggle("deleteBook");
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