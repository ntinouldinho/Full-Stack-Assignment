
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
    
}