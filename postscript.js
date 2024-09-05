const projectform = document.getElementById("projectform");
const projects = [];

projectform.addEventListener("submit", async (event) => {
    event.preventDefault(); 
  
    const newProject = {
        projectName: event.target.elements.projectName.value,
        link: event.target.elements.link.value,
        date: event.target.elements.date.value,
        image: event.target.elements.image.value,
        projectInfo: event.target.elements.projectInfo.value,
    };
  
    projects.push(newProject); 
  
    
    try {
      const response = await fetch("http://localhost:8008/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });
  
     
      if (response.status === 201) {
        console.log("project is added to server");
      } else {
        console.error("error at saving the project");
      }
    } catch (error) {
      console.error("failed at conntacting the server:", error);
    }
  });
