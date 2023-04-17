//Search and Filter Functionality

import projects from './data.json' assert {type: 'json'};

const path = "https://127.0.0.1:8080/static/images/portraits/";

//displaying the html
for(let i of projects){
    let clickable = document.createElement("a");
    clickable.setAttribute("href", i["studentName"].replace(" ", "%20"));
    clickable.classList.add("card", i["category"], "year-hidden");
    clickable.classList.add("card", i["gradYear"], "year-hidden");
    let card = document.createElement("div");
    //Image
    let imgContainer = document.createElement("div");
    imgContainer.classList.add("image-container");
    let imageOne = document.createElement("img");
    let image = i["imageOne"]
    if(image == ""){
        imageOne.setAttribute("src", "https://127.0.0.1:8080/static/images/pds.png");
    }else{
        imageOne.setAttribute("src", path.concat(image));
    }
    imgContainer.appendChild(imageOne);
    card.appendChild(imgContainer);
    //Container
    let container = document.createElement("div");
    container.classList.add("container");
    //Project Name
    let name = document.createElement("h3");
    name.classList.add("project-name");
    name.innerText = i["projectName"].toUpperCase();
    container.appendChild(name);
    //Student
    let student = document.createElement("h4");
    student.classList.add("student-name");
    student.innerText = i["studentName"].toUpperCase() + " '"+i["gradYear"].substring(2) +", "+ " mentored by " + i["mentor"].toUpperCase();
    container.appendChild(student);
    //Category
    let category = document.createElement("h6");
    category.innerText = i["category"].toUpperCase().replace("_", " ");
    container.appendChild(category);
    card.appendChild(container);
    clickable.appendChild(card);
    document.getElementById("projects").appendChild(clickable);
}

function filterProject(value){
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
        if(value.toUpperCase() == button.innerText.toUpperCase()){
            button.classList.add("active");
        }else{
            button.classList.remove("active");
        }
    });

    let elements = document.querySelectorAll(".card");
    elements.forEach((element) => {
        if(value == "all"){
            element.classList.remove("category-hidden");
        }
        else{
            //having a space messes it up, make it _
            if(element.classList.contains(value.replace(" ", "_"))){
                element.classList.remove("category-hidden");
            }
            else{
                element.classList.add("category-hidden");
            }
        }
    });
}

function filterProject2(value){
    let buttons = document.querySelectorAll(".grad-button");
    buttons.forEach((button) => {
        if(value.toUpperCase() == button.innerText.toUpperCase()){
            button.classList.add("active");
        }else{
            button.classList.remove("active");
        }
    });

    let elements = document.querySelectorAll(".card");
    elements.forEach((element) => {
        if(value == "All Years"){
            element.classList.remove("year-hidden");
        }
        else{
            //having a space messes it up, make it _
            if(element.classList.contains(value.replace(" ", "_"))){
                element.classList.remove("year-hidden");
            }
            else{
                element.classList.add("year-hidden");
            }
        }
    });
}

//IS THIS ILLEGAL??!?!?!
window.filterProject = filterProject; 
window.filterProject2 = filterProject2;
// Search functionality for NAME

document.getElementById("search").addEventListener
("click", () => {
    let searchInput = document.getElementById("search-input").value;
    let elements = document.querySelectorAll(".student-name");
    let cards = document.querySelectorAll(".card");
    elements.forEach((element, index) =>{
        if(element.innerText.includes(searchInput.toUpperCase())){
            cards[index].classList.remove("year-hidden");
        }
        else{
            cards[index].classList.add("year-hidden");
        }
    });
});

window.onload = () =>{
    filterProject("all");
    filterProject2("All Years");
};