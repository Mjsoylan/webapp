
const projectList = document.getElementById("projectList");
const click =document.getElementById("projectList")
const project = [];
// for changing procetinfo
const projectname = document.getElementById("projectname");
const image = document.getElementById("image");
const projecttext = document.getElementById("projecttext");
const link = document.getElementById("link");


// endere til valge projekt 
click.addEventListener("click", async (event) => {
  event.preventDefault();
  updateChosenProjekt(event.target.id)
});

function updateChosenProjekt( idnumb) {
  projectname.textContent= `${project[idnumb].projectName}`;
  image.src =`${project[idnumb].image}`;
  projecttext.textContent=`${project[idnumb].projectInfo}`;
  link.textContent=`${project[idnumb].projecttext}`;
}

// updaterlisten
function updateprojectList() {
  console.log(project);
  projectList.innerHTML = "";
  const length = project.length
  let index  = 0;
  for (const element of project) {

    const listItem = document.createElement("li");
    listItem.textContent = `${element.projectName} - ${element.date}  `;
    listItem.id=index;
    index++;
    projectList.appendChild(listItem);
  }
}


function loadFromApi() {
  fetch("http://localhost:8008")
    .then((response) => response.json())
    .then((data) => {
      project.push(...data); 
      // lager en liste av procets og viser det firse procjete 
      updateprojectList(); 
      updateChosenProjekt(0);
    })
    .catch((error) => {
      console.error("failed at getting the data from server", error);
    });
}

function loadFromJSON() {
  fetch("static/data.json")
    .then((response) => {
      // Konverterer data til json format
      return response.json();
    })
    .then((data) => {
      // Henter ut div med id `data`
      const jsonId = document.getElementById("json");
      // Debugging
      console.log(data);
      // Går igjennom dataen og lager en `p` til hvert element.
      for (const project of data) {
        const element = document.createElement("p");
        // Legger til verdien koblet til `title` nøkkelen i .json filen
        element.textContent = `${project.title}`;
        // Legger innholdet til div-en
        jsonId.appendChild(element);
      }
    });
}

//loadFromJSON(); hadde problemer det for corps
loadFromApi();
