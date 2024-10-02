// import { addTask } from "./function.js";

// maFonction()

// object qui représente une tâche //

let taskModel = {
  title: "",
  description: "",
};

// Tableau qui stockera nos tâches //
let taskList = [];

// Récuperer nos elements HTML (formulaire) et on les stocks //
let form = document.getElementById("form");
let title = document.getElementById("title");
let description = document.getElementById("description");

// Depuis la variable (form), je lui attache un evenement de type:Submit (soummision de formulaire) //
form.addEventListener("submit", function addTask(event) {
  // Bloquer le rechargement de la page //

  event.preventDefault();

  {
    // Récupération et stock les valeurs de mon champs //
    let titleInputValue = title.value; // la valeur de input //
    let descriptionInputValue = description.value; // la valeur de textarea //
    let newTask = {
      title: title.value,
      description: description.value,
    };

    // si notre input est vide une alerte appareil //

    if (titleInputValue === "" || descriptionInputValue === "") {
      alert("les champs sont vide");
      return;
    }

    // Créer un élément de liste (li) pour la tâche //
    let li = document.createElement("li");
    //Permet d'ajouter notre titre et description dans la liste (li) creer au dessus
    li.textContent = `${title.value} : ${description.value}`;

    // Création du boutton "Modifier" //
    let modifBoutton = document.createElement("button");
    modifBoutton.textContent = "Modifier";
    // Création du boutton "Supprimer" //
    let suppBoutton = document.createElement("button");
    suppBoutton.textContent = "Supprimer";

    // Affichage des tâches stockée dans une liste ul //
    let affichage = document.getElementById("list");
    list.innerHTML= `${title.value} : ${description.value}`;
    taskList.push(newTask);
    console.log(affichage,suppBoutton);
  }
});
