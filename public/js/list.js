
function handleSubmit(event,id) {
    event.preventDefault();

    const form = document.querySelector('#editBook');
    let formData = new FormData(form);
    formData.append("id", id);

    let postHeader = new Headers();
    postHeader.append('Content-Type', 'application/x-www-form-urlencoded');

    let formStr = new URLSearchParams(formData).toString()

    let init = {
        method: 'POST',
        headers: postHeader,
        body: formStr
    }

    fetch("/edit/", init)
        .then(response => response.text())
        .then(response => {
            alert(response)
        })
        .catch(error => {
            console.log(error)
        })
}


function filterResults(event){
    const search = event.target.value.toUpperCase();

    let tr = document.querySelectorAll('#results-table > tbody > tr');
    let length = tr.length;
    
    for (let i = 0; i < length; i++) {
        title = tr[i].getElementsByTagName("td")[0];
        author = tr[i].getElementsByTagName("td")[1];
        
        if (title || author) {
          title = title.textContent || title.innerText;
          author = author.textContent || author.innerText;
          if ((title.toUpperCase().indexOf(search) > -1) || (author.toUpperCase().indexOf(search) > -1)) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }

}

function deleteBook(id){
    let deleteHeader = new Headers();
        deleteHeader.append('Content-Type', 'application/json');

        let init = {
            method: 'DELETE',
            headers: deleteHeader,
            body: JSON.stringify({ id: id })
        }

        fetch("/favourites/", init)
            .then(response => response.status)
            .then(status => {
                switch (status) {
                    case 200:
                        alert("deleted")
                        window.location.reload();
                        break;
                    default:
                        alert("an error occurred")
                }
            })
            .catch(error => {
                console.log(error)
            })
}