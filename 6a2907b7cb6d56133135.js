const HTML = document;
const PROJECTADD = HTML.getElementById("projectadd");
const TASKS = HTML.getElementsByClassName("II3");
const MAIN = HTML.getElementById("middle");
const CONTENT = HTML.getElementById("content");
const SHOW = HTML.getElementById("right");

import './styles.css';

function Main() {
    if (!new.target) {
        console.log("ERROR");
        return;
    }
    this.num = 0;
    this.project = [];
    this.addProject = (title, description, id) => {
        const item = new Project(title, description, id);
        (this.project).push(item);
        this.num++;
    }
    this.removeProject = (id) => {
        if (this.num) {
            const index = (this.project).findIndex(i => i.id = id);
            (this.project).splice(index, 1);
            this.num--;
        }
    }
}

function Project(title, description, id) {
    if (!new.target) {
        console.log("ERROR");
        return;
    }
    this.title = title;
    this.id = id;
    this.tasks = [];
    this.description = description;
    this.addTask = (name, objective, priority, time, done) => {
        (this.tasks).push({ name, objective, priority, time, done });
    }
    this.setPriority = (name, priority) => {
        const index = (this.tasks).findIndex(i => i.name = name);
        (this.tasks)[index].priority = priority;
    }
    this.removeTask = (name) => {
        const index = (this.tasks).findIndex(i => i.name = name);
        (this.tasks).splice(index, 1);
    }
}

const Projects = new Main();
let ALIVE = 0;
let id = 0;

function localStoageManipulater() {
    localStorage.removeItem("project");
    localStorage.setItem("project", JSON.stringify(Projects));
    console.log(Projects);
    console.log(JSON.parse(localStorage.getItem("project")));
}

function getColor(priority) {
    if (priority.toUpperCase() == "LOW")
        return "#00c3ffff";
    else if (priority.toUpperCase() == "MID")
        return "#2eed2eff";
    else if (priority.toUpperCase() == "HIGH")
        return "#ee7272ff"

}

function isDone(done) {
    if (done)
        return "green";
    else
        return "red";
}

function AddTaskDOM(name, objective, priority, time, id) {
    Projects.project[id].addTask(name, objective, priority, time, false);
}

function TodoDOM(id, i) {
    let X = HTML.createElement("div");
    let Y1 = HTML.createElement("div");
    let Y2 = HTML.createElement("div");
    let Y3 = HTML.createElement("div");
    let Z1 = HTML.createElement("div");
    let Z2 = HTML.createElement("div");
    X.setAttribute("class", "dislay-task");
    X.setAttribute("style", "display:flex;flex-direction:column;border-radius:1vh 1vh 1vh 1vh;justify-content:center;align-items:center;margin-left:2%; margin-top:1vh;width:98%;height:12%;background-color:white;font-weight:700;")
    Y1.setAttribute("class", "put-name");
    Y2.setAttribute("class", "put-objective");
    Y3.setAttribute("class", "bottom");
    Z1.setAttribute("class", "put-priority");
    Z2.setAttribute("class", "put-DATE");
    Y1.setAttribute("style", "display:flex;flex-direction:row;justify-content:center;align-items:center;width:95%;height:20%;color:" + isDone(Projects.project[id].tasks[i].done) + ";font-size:1.5vh;");
    Y2.setAttribute("style", "display:flex;flex-direction:row;justify-content:center;align-items:center;width:100%;height:60%;color:black;font-size:1.5vh; background-color:#99AA99;");
    Y3.setAttribute("style", "display:flex;flex-direction:row;justify-content:center;align-items:center;width:95%;height:20%;color:black;font-size:1.5vh;");
    Z1.setAttribute("style", "background-color:" + getColor(Projects.project[id].tasks[i].priority) + ";" + "display:flex;flex-direction:row;justify-content:center;align-items:center;width:70%;height:100%;");
    Z2.setAttribute("style", "display:flex;flex-direction:row;justify-content:center;align-items:center;width:30%;height:100%;color:black;");
    Y1.innerText = Projects.project[id].tasks[i].name;
    Y2.innerText = Projects.project[id].tasks[i].objective;
    Z2.innerText = Projects.project[id].tasks[i].time.toISOString().split('T')[0];
    Y1.addEventListener("click", function () {
        if (Y1.style.color == "green") {
            Y1.style.color = "red";
            Projects.project[id].tasks[i].done = false;
        }
        else {
            Y1.style.color = "green";
            Projects.project[id].tasks[i].done = true;
        }
        localStoageManipulater();
    });
    Z1.addEventListener("click", function () {
        let color;
        if (getColor(Projects.project[id].tasks[i].priority) == "#00c3ffff") {
            Projects.project[id].tasks[i].priority = "MID";
            color = "#2eed2eff";
            Z1.setAttribute("style", "background-color:" + color + ";" + "display:flex;flex-direction:row;justify-content:center;align-items:center;width:70%;height:100%;");
        }
        else if (getColor(Projects.project[id].tasks[i].priority) == "#2eed2eff") {
            console.log("HI_MID");
            Projects.project[id].tasks[i].priority = "HIGH";
            color = "#ee7272ff";
            Z1.setAttribute("style", "background-color:" + color + ";" + "display:flex;flex-direction:row;justify-content:center;align-items:center;width:70%;height:100%;");
        }
        else {
            Projects.project[id].tasks[i].priority = "LOW";
            color = "#00c3ffff";
            Z1.setAttribute("style", "background-color:" + color + ";" + "display:flex;flex-direction:row;justify-content:center;align-items:center;width:70%;height:100%;");
        }
        localStoageManipulater();
    });
    Y3.appendChild(Z1);
    Y3.appendChild(Z2);
    X.appendChild(Y1);
    X.appendChild(Y2);
    X.appendChild(Y3);
    return X;
}

function expandDOM(id) {
    SHOW.innerHTML = "";
    console.log(Projects.project[id]);
    let LEN = Projects.project[id].tasks.length;
    let X = []
    for (let i = 0; i < LEN; i++) {
        let color = getColor(Projects.project[id].tasks[i].priority);
        X.push(TodoDOM(id, i));
        SHOW.appendChild(X[i]);
        console.log(Projects.project[id].tasks[i]);
    }
}


function ProjectEntryDOM(title, description, id) {
    let A = HTML.createElement("div");
    A.setAttribute("id", id.toString());
    A.setAttribute("style", "display:flex;flex-direction:row;border-radius:1.5vh 1.5vh 1.5vh 1.5vh;justify-content:center;align-items:center;margin-left:5%; margin-top:2vh;width:90%;height:5%;background-color:black;font-weight:700;")
    let B = HTML.createElement("div");
    let C = HTML.createElement("div");
    let D = HTML.createElement("div");
    let E = HTML.createElement("div");
    B.setAttribute("class", "content-leftbox");
    C.setAttribute("class", "content-middlebox");
    D.setAttribute("class", "content-rightbox");
    E.setAttribute("class", "content-endright");
    B.setAttribute("style", "display:flex;flex-direction:row;justify-content:center;align-items:center;width:25%;height:100%;color:white;font-size:2vh;");
    C.setAttribute("style", "display:flex;flex-direction:row;justify-content:center;align-items:center;width:60%;height:100%;color:white;font-size:2vh;background-color:#99AA99;");
    D.setAttribute("style", "display:flex;flex-direction:row;justify-content:center;align-items:center;width:5%;height:100%;color:white;font-size:2vh;");
    E.setAttribute("style", "display:flex;flex-direction:row;justify-content:center;align-items:center;width:5%;height:100%;color:white;font-size:2vh;background-color:#99AA99;");
    B.innerText = title;
    C.innerText = description;
    D.innerText = "+";
    E.innerText = "►";
    A.appendChild(B);
    A.appendChild(C);
    A.appendChild(D);
    A.appendChild(E);
    return [A, B, C, D, E];
}

function getProjectInfo() {
    let title, description;
    title = prompt("Title of the Project");
    if (title.length > 100) title = title.slice(0, 99);
    if (title == "" || title == NaN || title == null) title = "PROJECT";
    description = prompt("Description of the Project")
    if (description.length > 201) description = description.slice(0, 200);
    if (description == "" || description == NaN || description == null) description = "NA";
    return [title, description];
}

function getTodoInfo() {
    let name, objective, priority, time;
    name = prompt("Title of the Task")
    if (name.length > 50) title = title.slice(0, 49);
    if (name == "" || name == NaN || name == null) name = "TASK";
    objective = prompt("Description of the Task");
    if (objective.length > 100) objective = objective.slice(0, 99);
    if (objective == "" || objective == NaN || objective == null) objective = "NONE";
    priority = prompt("Set Priority(LOW/MID/HIGH):");
    priority = priority.toUpperCase();
    if (priority == "" || priority == NaN || priority == null || (priority != "LOW" && priority != "MID" && priority != "HIGH")) priority = "LOW";
    time = prompt("Set deadline for the task(YYYY-MM-DD)");
    if (time == "" || time == NaN || time == null) time = "2025-12-31";
    time = new Date(time);
    return [name, objective, priority, time];
}

PROJECTADD.addEventListener("click", function () {
    let id = ALIVE;
    let info = getProjectInfo();
    let RET = ProjectEntryDOM(info[0], info[1], id);
    RET[3].addEventListener("click", function () {
        let TodoInfo = getTodoInfo();
        AddTaskDOM(TodoInfo[0], TodoInfo[1], TodoInfo[2], TodoInfo[3], Number(RET[3].parentNode.id));
        localStoageManipulater();
    });
    RET[4].addEventListener("click", function () {
        SHOW.innerHTML = "";
        console.log(Projects.project[Number(RET[4].parentNode.id)]);
        expandDOM(Number(RET[4].parentNode.id));
    });
    CONTENT.appendChild(RET[0]);
    ALIVE++;
    Projects.addProject(info[0], info[1], id);
    localStoageManipulater();
});

function onLoadDOM() {
    let project = JSON.parse(localStorage.getItem("project"));
    let len_p = project.project.length;
    for (let i = 0; i < len_p; i++) {
        let RET = ProjectEntryDOM(project.project[i].title, project.project[i].description, project.project[i].id);
        CONTENT.appendChild(RET[0]);
        ALIVE++;
        Projects.addProject(project.project[i].title, project.project[i].description, project.project[i].id);
        let task_len = project.project[i].tasks.length;
        for (let j = 0; j < task_len; j++) {
            let time = new Date(project.project[i].tasks[j].time);
            Projects.project[project.project[i].id].addTask(project.project[i].tasks[j].name, project.project[i].tasks[j].objective, project.project[i].tasks[j].priority, time, project.project[i].tasks[j].done);
        }
        //expandDOM(project.project[i].id);
        RET[3].addEventListener("click", function () {
            let TodoInfo = getTodoInfo();
            AddTaskDOM(TodoInfo[0], TodoInfo[1], TodoInfo[2], TodoInfo[3], Number(RET[3].parentNode.id));
            localStoageManipulater();
        });
        RET[4].addEventListener("click", function () {
            SHOW.innerHTML = "";
            console.log(Projects.project[Number(RET[4].parentNode.id)]);
            expandDOM(Number(RET[4].parentNode.id));
        });
    }
}

window.onload = onLoadDOM();