var bigtosmall = true, numbersbigtosmall = true, oldmovie = null;
var submitbutton = document.querySelector("#test").addEventListener('click', addtolist);
var sortbutton = document.querySelector("#sort").addEventListener('click', sortnames);
var mainlist = document.querySelector("#main-list");
var sortbuttonfornumbers = document.querySelector("#sort-by-numbers").addEventListener('click', sortnumbers);
var result = document.querySelector("#inputtext");


mainlist.addEventListener('click', (e) => {
    target = e.target;
    if (target.classList[0] === "delete-item" || target.classList[0] === "edit-item") {
        parent = target.parentElement;
        parent = findparent(parent);
        if (target.classList[0] === "delete-item")
            parent.remove();
        else if (target.classList[0] === "edit-item") {
            restorevalues();
            newbuild(parent);
        }
    }
    else if (target.classList[0] === "Save-item") {
        savenewvalues();

    }
    else if (target.classList[0] === "cancel-item") {
        restorevalues();
    }


})




function addtolist() {
    const moviename = document.querySelector("#Item-for-list");
    const movierate = document.querySelector("#rate-for-movie");
    if (inputcheck(moviename, movierate)) {
        let maintr = document.createElement("tr");
        maintr.classList.add("item");
        let movieth = document.createElement("td");
        movieth.classList.add("moviename");
        movieth.textContent = moviename.value;
        maintr.append(movieth);
        let rateli = document.createElement("td");
        rateli.classList.add("movierate");
        rateli.textContent = movierate.value;
        maintr.append(rateli);
        thfordeletebutton = document.createElement("td");
        deletebutton = document.createElement("button");
        editbutton = document.createElement("button");
        editbutton.classList.add("edit-item");
        deletebutton.classList.add("delete-item");
        deletebutton.textContent = "Delete";
        editbutton.textContent = "Edit";
        thfordeletebutton.append(deletebutton);
        thfordeletebutton.append(editbutton);
        maintr.append(thfordeletebutton);
        mainlist.append(maintr);
    }


}

function sortnames() {
    restorevalues();
    var list = document.getElementsByClassName("item");
    flag = true;
    while (flag) {
        flag = false;
        for (let i = 0; i < list.length - 1; i++) {
            if (bigtosmall == true) {
                if (list[i].firstChild.textContent.toLowerCase() > list[i + 1].firstChild.textContent.toLowerCase()) {
                    switchpos(list[i], list[i + 1]);
                    flag = true;
                }
            }
            else
                if (list[i].firstChild.textContent.toLowerCase() < list[i + 1].firstChild.textContent.toLowerCase()) {
                    switchpos(list[i], list[i + 1]);
                    flag = true;
                }
        }
    }
    bigtosmall = !bigtosmall;
}

function switchpos(firstkid, secondkid) {
    mainlist.insertBefore(secondkid, firstkid);
}
function sortnumbers() {
    restorevalues();
    var list = document.getElementsByClassName("item");
    flag = true;
    while (flag) {
        flag = false;
        for (let i = 0; i < list.length - 1; i++) {
            if (numbersbigtosmall == true) {
                if (+(list[i].children[1].textContent) > +(list[i + 1].children[1].textContent)) {
                    switchpos(list[i], list[i + 1]);
                    flag = true;
                }
            }
            else
                if (+(list[i].children[1].textContent) < +(list[i + 1].children[1].textContent)) {
                    switchpos(list[i], list[i + 1]);
                    flag = true;
                }
        }
    }
    numbersbigtosmall = !numbersbigtosmall;

}
function inputcheck(moviename, movierate) {

    let flag = false;
    if (movierate.value != "" && moviename.value != "") {
        if (isNaN(movierate.value) || movierate.value < 0 || movierate.value > 10) {

            text = "Please Movie Rating must be 0-10";
            result.textContent = text;
            result.style.color = "red";
            movierate.style.borderColor = "red";
        } else {
            flag = true;
            movierate.style.borderColor = "black";
            moviename.style.borderColor = "black";
            result.style.color = "black";
            text = "Your Movie have been added ";
        }
        result.textContent = text;
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

    }
    else {
        text = "Please you have to put Movie name and rating from 0-10";
        movierate.style.borderColor = "red";
        moviename.style.borderColor = "red";
        result.style.color = "red";
        result.textContent = text;
    }
    return flag;
}

function findparent() {
    let flag = true;
    while (flag) {
        if (parent.classList[0] === "item")
            flag = false;
        else
            parent = parent.parentElement;

    }
    return parent;
}
function newbuild(parent) {
    oldmovie = {};
    oldmovie.movietitle = parent.children[0].textContent;
    oldmovie.movierate = parent.children[1].textContent;
    oldmovie.parent = parent;
    parent.children[1].textContent = parent.children[0].textContent = "";
    parent.children[2].children[0].textContent = "Save";
    parent.children[2].children[0].classList.remove("delete-item");
    parent.children[2].children[0].classList.add("Save-item");
    parent.children[2].children[1].textContent = "Cancel";
    parent.children[2].children[1].classList.remove("edit-item");
    parent.children[2].children[1].classList.add("cancel-item");
    let newmovietitle = document.createElement("INPUT");
    newmovietitle.classList.add("tableinput");
    newmovietitle.value = oldmovie.movietitle;
    parent.children[0].append(newmovietitle);
    let newmovierate = document.createElement("INPUT");
    newmovierate.classList.add("tableinput");
    newmovierate.value = oldmovie.movierate;
    parent.children[1].append(newmovierate);

}
function restorevalues() {
    if (oldmovie != null) {
        restorebuttons();
        oldmovie.parent.children[1].firstChild.remove();
        oldmovie.parent.children[1].textContent = oldmovie.movierate;
        oldmovie.parent.children[0].firstChild.remove();
        oldmovie.parent.children[0].textContent = oldmovie.movietitle;
        oldmovie = null;
    }


}
function restorebuttons() {
    oldmovie.parent.children[2].children[0].textContent = "Delete";
    oldmovie.parent.children[2].children[0].classList.remove("Save-item");
    oldmovie.parent.children[2].children[0].classList.add("delete-item");
    oldmovie.parent.children[2].children[1].textContent = "Edit";
    oldmovie.parent.children[2].children[1].classList.remove("cancel-item");
    oldmovie.parent.children[2].children[1].classList.add("edit-item");
}
function savenewvalues() {
    restorebuttons();

    let newtitle = oldmovie.parent.children[0].firstChild.value;
    let newrate = +(oldmovie.parent.children[1].firstChild.value);
    if (newtitle != "" && newrate != "" && Number.isInteger(newrate) && newrate > 0 && newrate < 10) {
        oldmovie.parent.children[1].firstChild.remove();
        oldmovie.parent.children[1].textContent = newrate;
        oldmovie.parent.children[0].firstChild.remove();
        oldmovie.parent.children[0].textContent = newtitle;
        oldmovie = null;

    }
    else{
        restorevalues();
    result.textContent = "Your Request Failed . Please Check that Movie title is not empty and Movie rate from 0-10";
    }
}