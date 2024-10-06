import {createMarkup} from "./function.js";

// object qui représente une tâche //
let taskModel = {
    id : "",
    title: "",
    description: ""
};

let taskListInStorage = localStorage.getItem("taskList")?.toString();
let taskList = [];// Tableau qui stockera nos tâches //

 if (taskListInStorage) {
     taskList = JSON.parse(taskListInStorage); 
 }
let updatingTaskElements = {}; //Objet qui va stocker nos valeur modifier

// Récuperer nos elements HTML (formulaire) et on les stocks //
let form = document.body.querySelector("#form");
let inputTitle = document.body.querySelector("#title");
let textareaDescription = document.body.querySelector("#description");
let ul = document.body.querySelector("#list");
let submitFormButton = form.querySelector("#submit-form-button");

if (taskList.length > 0 ) {
    taskList.forEach((item, index) => {
        // Creation des nouveaux éléments du DOM pour la nouvelle tâche //
        const liTask = createMarkup("li", ul)
        liTask.setAttribute('id', index);
        const titleTask = createMarkup("h1", liTask, item.title);
        const decriptionTask = createMarkup("p", liTask, item.description);
        const buttonDelete = createMarkup("button", liTask, "Supprimer");
        const buttonEdit = createMarkup("button", liTask, "Modifier");

         //Gestion d'évenement du boutton supprimer 
        buttonDelete.addEventListener("click", ()=>{
            let id = Number(liTask.getAttribute('id'));
            taskList.splice(id, 1);
            localStorage.setItem("taskList", JSON.stringify(taskList));
            liTask.remove();
        });

        // Gestion d'évenement du boutton modifier //
        buttonEdit.addEventListener("click", function editTask(event) {
            event.preventDefault();
            inputTitle.value = item.title;
            textareaDescription.value = item.description;

            submitFormButton.textContent = "Modifier";
            updatingTaskElements = {
                id: index,
                title: titleTask,
                description: decriptionTask,
            }
        
        });
    });
}

// Depuis la variable (form), je lui attache un evenement de type:Submit (soummision de formulaire) //
form.addEventListener("submit", function (event) {
    event.preventDefault();// Bloquer le rechargement de la page //

    // //Ce formulaire est un formulaire d'ajout ou de modification ? //
    if (submitFormButton.textContent === "Modifier") {
        if (inputTitle.value) {
            updatingTaskElements.title.textContent = inputTitle.value;
        }

        if (textareaDescription.value) {
            updatingTaskElements.description.textContent = textareaDescription.value;
        }

        // Repasser à un formulaire d'ajout
        submitFormButton.textContent = 'Ajouter ma tâche';
        inputTitle.value = "";
        textareaDescription.value = "";  

        // L'élément HMTL est modifié, il faut maintenant le modifier dans le tableau et le restocker dans le storage
        taskList[updatingTaskElements.id].title = updatingTaskElements.title.textContent;
        taskList[updatingTaskElements.id].description = updatingTaskElements.description.textContent;        

        localStorage.setItem("taskList", JSON.stringify(taskList));        

        return;
    };

    // let titleInputValue = inputTitle.value; // la valeur de input //
    // let descriptionInputValue = textareaDescription.value; // la valeur de textarea //
    let newTask = {
      title: inputTitle.value,
      description: textareaDescription.value,
    };
    inputTitle.value = "";
    textareaDescription.value = "";     

    // Creation des nouveaux éléments du DOM pour la nouvelle tâche //
    const liTask = createMarkup("li", ul)
    liTask.setAttribute('id', taskList.length);
    const titleTask = createMarkup("h1", liTask, newTask.title);
    const decriptionTask = createMarkup("p", liTask, newTask.description);
    const buttonDelete = createMarkup("button", liTask, "Supprimer");
    const buttonEdit = createMarkup("button", liTask, "Modifier");

    taskList.push(newTask);

    localStorage.setItem("taskList", JSON.stringify(taskList));

    //Gestion d'évenement du boutton supprimer 
    buttonDelete.addEventListener("click", ()=>{
        let id = Number(liTask.getAttribute('id'));
        taskList.splice(id, 1);
        localStorage.setItem("taskList", JSON.stringify(taskList));
        liTask.remove();
    });

    // Gestion d'évenement du boutton modifier //
    buttonEdit.addEventListener("click", function editTask(event) {
        event.preventDefault();
        inputTitle.value = newTask.title;
        textareaDescription.value = newTask.description;

        submitFormButton.textContent = "Modifier";
        updatingTaskElements = {
            id: Number(liTask.getAttribute('id')),
            title: titleTask,
            description: decriptionTask,
        }
    
    });
});

