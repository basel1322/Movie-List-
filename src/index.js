var sortfromSmalltoBig = true; oldmovie = null;
document.querySelector("#test").addEventListener('click', addRowToTable);
document.querySelector("#sort").addEventListener('click', () => {
    sortTableByRating(0);
});
var mainlist = document.querySelector("#main-list");
document.querySelector("#sort-by-numbers").addEventListener('click', () => {
    sortTableByRating(1);
});
var result = document.querySelector("#inputtext");
mainlist.addEventListener('click', (e) => {
    target = e.target;
    if (target.classList[0] === "delete-item" || target.classList[0] === "edit-item") {
        parent = target.parentElement;
        parent = findParent(parent);
        if (target.classList[0] === "delete-item")
            parent.remove();
        else if (target.classList[0] === "edit-item") {
            restoreOldValues();
            createNewElementsForEditing(parent);
        }
    }
    else if (target.classList[0] === "Save-item") {
        saveChangesAfterEditting();

    }
    else if (target.classList[0] === "cancel-item") {
        restoreOldValues();
    }


})
function addRowToTable() {
    const moviename = document.querySelector("#Item-for-list");
    const movierate = document.querySelector("#rate-for-movie");
    if (inputCheck(moviename, movierate)) {
        let parent = document.createElement("tr");
        parent.classList.add("item");
        parent.innerHTML += `<td>${moviename.value}</td><td>${movierate.value}</td><td><button class ="delete-item">Delete</button><button class="edit-item">Edit</button> </td>`;
        mainlist.append(parent);

    }


}
function switchPos(firstkid, secondkid) {
    mainlist.insertBefore(secondkid, firstkid);
}
function sortTableByRating(index) {
    restoreOldValues();
    var list = document.getElementsByClassName("item");
    issorted = true;
    while (issorted) {
        issorted = false;

        for (let i = 0; i < list.length - 1; i++) {

            if (sortfromSmalltoBig == true) {

                if ((list[i].children[index].textContent.toLowerCase()) > (list[i + 1].children[index].textContent.toLowerCase())) {
                    switchPos(list[i], list[i + 1]);
                    issorted = true;
                }
            }
            else
                if ((list[i].children[index].textContent.toLowerCase()) < (list[i + 1].children[index].textContent.toLowerCase())) {
                    switchPos(list[i], list[i + 1]);
                    issorted = true;
                }
        }
    }
    sortfromSmalltoBig = !sortfromSmalltoBig;

}

function inputCheck(moviename, movierate) {
    if (!!movierate.value && !!moviename.value) {
        if (isNaN(movierate.value) || movierate.value < 0 || movierate.value > 10) {
            result.style.color = "red";
            movierate.style.borderColor = "red";
            result.textContent = "Please Movie Rating must be 0-10";
            return false;
        } else {

            movierate.style.borderColor = "black";
            moviename.style.borderColor = "black";
            result.style.color = "black";
            result.textContent = "Your Movie have been added ";
            return true;
        }
    }
    else if (!!movierate.value || !!moviename.value) {
        if (!!movierate.value) {
            result.textContent = "Please Fill the movie title ."
            moviename.style.borderColor = "red";
            movierate.style.borderColor = "black";
            result.style.color = "red";
        }
        else {
            result.textContent = "Please Fill the movie rate ."
            movierate.style.borderColor = "red";
            moviename.style.borderColor = "black";
            result.style.color = "red";

        }
        return false;
    }
    else {
        movierate.style.borderColor = "red";
        moviename.style.borderColor = "red";
        result.style.color = "red";
        result.textContent = "Please you have to put Movie name and rating from 0-10";
    }
}

function findParent() {
    let isFound = true;
    while (isFound) {
        if (parent.classList[0] === "item")
            isFound = false;
        else
            parent = parent.parentElement;

    }
    return parent;
}
function createNewElementsForEditing(parent) {
    oldmovie = {};
    oldmovie.title = parent.children[0].textContent;
    oldmovie.rate = parent.children[1].textContent;
    oldmovie.parent = parent;
    addSaveCancelButtonsToRow(parent);
}
function restoreOldValues() {
    if (oldmovie != null) {
        restoreEditDeleteButtonsToRow();
        oldmovie.parent.children[1].textContent = oldmovie.rate;
        oldmovie.parent.children[0].textContent = oldmovie.title;
        oldmovie = null;
    }


}
function restoreEditDeleteButtonsToRow() {
    oldmovie.parent.innerHTML = `<td></td><td></td><td><button class ="delete-item">Delete</button><button class="edit-item">Edit</button> </td>`;
}
function saveChangesAfterEditting() {
    let newtitle = oldmovie.parent.children[0].firstChild.value;
    let newrate = +(oldmovie.parent.children[1].firstChild.value);
    restoreEditDeleteButtonsToRow();
    if (checkNewValues(newrate, newtitle)) {
        oldmovie.parent.children[1].textContent = newrate;
        oldmovie.parent.children[0].textContent = newtitle;
        oldmovie = null;
    }
    else {
        restoreOldValues();
        result.textContent = "Your Request Failed . Please Check that Movie title is not empty and Movie rate from 0-10";
    }
}
function checkNewValues(newrate, newtitle) {
    return (!!newtitle && !!newrate && Number.isInteger(newrate) && newrate > 0 && newrate < 10)
}
function addSaveCancelButtonsToRow(parent) {
    parent.innerHTML = `<td><INPUT class =tableinput value="${oldmovie.title}"></INPUT></td><td><INPUT class="tableinput" value="${oldmovie.rate}"></INPUT></td><td><button class ="Save-item">Save</button><button class="cancel-item">Cancel</button> </td>`;
}
