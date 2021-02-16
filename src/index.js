var sortfromSmalltoBig = true; oldmovie = null;
var addmoviebutton = document.querySelector("#test").addEventListener('click', addRowToTable);
var buttonForSortingByMovietitle = document.querySelector("#sort").addEventListener('click', sortTableByMovieTitle);
var mainlist = document.querySelector("#main-list");
var buttonForSortingByRating = document.querySelector("#sort-by-numbers").addEventListener('click', sortTableByRating);
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
        let movieTitletd = document.createElement("td");
        movieTitletd.classList.add("moviename");
        movieTitletd.textContent = moviename.value;
        parent.append(movieTitletd);
        let movieRateTd = document.createElement("td");
        movieRateTd.classList.add("movierate");
        movieRateTd.textContent = movierate.value;
        parent.append(movieRateTd);
        tdfordeletebutton = document.createElement("td");
        deletebutton = document.createElement("button");
        editbutton = document.createElement("button");
        editbutton.classList.add("edit-item");
        deletebutton.classList.add("delete-item");
        deletebutton.textContent = "Delete";
        editbutton.textContent = "Edit";
        tdfordeletebutton.append(deletebutton);
        tdfordeletebutton.append(editbutton);
        parent.append(tdfordeletebutton);
        mainlist.append(parent);
    }


}

function sortTableByMovieTitle() {
    restoreOldValues();
    var list = document.getElementsByClassName("item");
    issorted = true;
    while (issorted) {
        issorted = false;
        for (let i = 0; i < list.length - 1; i++) {
            if (sortfromSmalltoBig == true) {
                if (list[i].firstChild.textContent.toLowerCase() > list[i + 1].firstChild.textContent.toLowerCase()) {
                    switchPos(list[i], list[i + 1]);
                    issorted = true;
                }
            }
            else
                if (list[i].firstChild.textContent.toLowerCase() < list[i + 1].firstChild.textContent.toLowerCase()) {
                    switchPos(list[i], list[i + 1]);
                    issorted = true;
                }
        }
    }
    sortfromSmalltoBig = !sortfromSmalltoBig;
}

function switchPos(firstkid, secondkid) {
    mainlist.insertBefore(secondkid, firstkid);
}
function sortTableByRating() {
    restoreOldValues();
    var list = document.getElementsByClassName("item");
    issorted = true;
    while (issorted) {
        issorted = false;
        for (let i = 0; i < list.length - 1; i++) {
            if (sortfromSmalltoBig == true) {
                if (+(list[i].children[1].textContent) > +(list[i + 1].children[1].textContent)) {
                    switchPos(list[i], list[i + 1]);
                    issorted = true;
                }
            }
            else
                if (+(list[i].children[1].textContent) < +(list[i + 1].children[1].textContent)) {
                    switchPos(list[i], list[i + 1]);
                    issorted = true;
                }
        }
    }
    sortfromSmalltoBig = !sortfromSmalltoBig;

}
function inputCheck(moviename, movierate) {
    if (movierate.value != "" && moviename.value != "") {
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
    else if (movierate.value != "" || moviename.value != "") {
        if (movierate.value != "") {
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
    oldmovie.movietitle = parent.children[0].textContent;
    oldmovie.movierate = parent.children[1].textContent;
    oldmovie.parent = parent;
    addSaveCancelButtonsToRow(parent);
    addTwoInputsTooRow(parent, oldmovie);


}
function restoreOldValues() {
    if (oldmovie != null) {
        restoreEditDeleteButtonsToRow();
        oldmovie.parent.children[1].firstChild.remove();
        oldmovie.parent.children[1].textContent = oldmovie.movierate;
        oldmovie.parent.children[0].firstChild.remove();
        oldmovie.parent.children[0].textContent = oldmovie.movietitle;
        oldmovie = null;
    }


}
function restoreEditDeleteButtonsToRow() {
    oldmovie.parent.children[2].children[0].textContent = "Delete";
    oldmovie.parent.children[2].children[0].classList.remove("Save-item");
    oldmovie.parent.children[2].children[0].classList.add("delete-item");
    oldmovie.parent.children[2].children[1].textContent = "Edit";
    oldmovie.parent.children[2].children[1].classList.remove("cancel-item");
    oldmovie.parent.children[2].children[1].classList.add("edit-item");
}
function saveChangesAfterEditting() {
    restoreEditDeleteButtonsToRow();
    let newtitle = oldmovie.parent.children[0].firstChild.value;
    let newrate = +(oldmovie.parent.children[1].firstChild.value);
    if (checkNewValues(newrate, newtitle)) {
        oldmovie.parent.children[1].firstChild.remove();
        oldmovie.parent.children[1].textContent = newrate;
        oldmovie.parent.children[0].firstChild.remove();
        oldmovie.parent.children[0].textContent = newtitle;
        oldmovie = null;
    }
    else {
        restoreOldValues();
        result.textContent = "Your Request Failed . Please Check that Movie title is not empty and Movie rate from 0-10";
    }
}
function checkNewValues(newrate, newtitle) {
    return (newtitle != "" && newrate != "" && Number.isInteger(newrate) && newrate > 0 && newrate < 10)
}
function addSaveCancelButtonsToRow(parent) {
    parent.children[1].textContent = parent.children[0].textContent = "";
    parent.children[2].children[0].textContent = "Save";
    parent.children[2].children[0].classList.remove("delete-item");
    parent.children[2].children[0].classList.add("Save-item");
    parent.children[2].children[1].textContent = "Cancel";
    parent.children[2].children[1].classList.remove("edit-item");
    parent.children[2].children[1].classList.add("cancel-item");
}
function addTwoInputsTooRow() {
    let newmovietitle = document.createElement("INPUT");
    newmovietitle.classList.add("tableinput");
    newmovietitle.value = oldmovie.movietitle;
    parent.children[0].append(newmovietitle);
    let newmovierate = document.createElement("INPUT");
    newmovierate.classList.add("tableinput");
    newmovierate.value = oldmovie.movierate;
    parent.children[1].append(newmovierate);
}
