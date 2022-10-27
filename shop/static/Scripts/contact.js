function showAlert(type, title, content) {
    document.getElementById("alert-box").innerHTML = `
        <div class="flex py-2 px-4 mb-4 text-sm text-${type}-700 bg-${type}-100 rounded-lg" role="alert">
            <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <span class="sr-only"> Info </span>
            <div> <span class="font-medium"> ${title} </span> ${content} </div>
            <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-${type}-100 text-${type}-500 rounded-lg focus:ring-2 focus:ring-${type}-400 p-1.5 hover:bg-${type}-200 inline-flex h-8 w-8" aria-label="Close" onclick="this.parentElement.parentElement.innerHTML = ''">
                <span class="sr-only"> Close </span>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
        </div>
    `
}  

$("#contact-form").submit(event => {
    event.preventDefault();
    
    const formData = {
        "name" : $("input[name=name]").val(),
        "email" : $("input[name=email]").val(),
        "message" : $("textarea[name=message]").val(),
        "csrfmiddlewaretoken" : $("input[name=csrfmiddlewaretoken]").val()
    }
    const method = {
        type : "POST",
        url : "/contact/",
        data : formData
    }

    $("input[name=name]").val("");
    $("input[name=email]").val("");
    $("textarea[name=message]").val("");

    if (
        /([a-zA-Z0-9]){4,20}/.test(formData["name"]) &&
        /([a-zA-Z0-9]){6,18}@([a-zA-Z0-9]){5,8}.com/.test(formData["email"]) &&
        formData["name"].length <= 20 &&
        formData['email'].length <= 40 &&
        formData["message"].length <= 2000
    ) {
        $.ajax(method).done(response => {
            const data = JSON.parse(response);
            showAlert("green", "Success !", `${data.name} your message is send to admin`)
        })
    } else {
        showAlert("red", "Error !", "There is a issue in sending your message.")
    }
})