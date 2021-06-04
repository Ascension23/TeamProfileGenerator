const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require("./lib/Employee")
const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")
const path = require("path")
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html")
const render = require("./lib/htmlFormat")
const teamMembers = [];

function createManager() {
    console.log("Please enter your Manager's info");
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your manager's name?"
        },
        {
            type: "input",
            name: "mangerId",
            message: "What is your manager's ID number?"
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is your manager's Email?"
        },
        {
            type: "input",
            name: "managerOfficeNumber",
            message: "What is your manager's office number?"
        }
    ]).then(answers => {
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
        teamMembers.push(manager);
        createTeam();
    });
}

function createTeam(){
    inquirer.prompt([
        {
            type: "list",
            name: "memberChoice",
            message: "Which team member role would you like to add?",
            choices: ["Engineer", "Intern", "I don't want to add any more team members"]
        }
    ]).then(userChoice => {
        switch(userChoice.memberChoice) {
            case "Engineer":
                addEngineer();
                break;
            case "Intern":
                addIntern();
                break;
            default:
                buildTeam();
        }
    });
}

function addEngineer(){
    console.log("Please enter your engineer's info");
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is your engineer's name?"
        },{
            type: "input",
            name: "engineerID",
            message: "What is your engineer's ID number?"
        },{
            type: "input",
            name: "engineerEmail",
            message: "What is your engineer's Email?"
        },{
            type: "input",
            name: "engineerGithub",
            message: "What is your engineer's Github account?"
        }
    ]).then(answers => {
        const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub);
        teamMembers.push(engineer);
        createTeam();
    });
  }

  function addIntern(){
    console.log("Please enter your intern's info");
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is your intern's name?"
        },{
            type: "input",
            name: "internID",
            message: "What is your intern's ID number?"
        },{
            type: "input",
            name: "internEmail",
            message: "What is your intern's Email?"
        },{
            type: "input",
            name: "internSchool",
            message: "What school is your intern from?"
        }
    ]).then(answers => {
        const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool);
        teamMembers.push(intern);
        createTeam();
    });
  }

  function buildTeam(){
    if(!fs.existsSync(OUTPUT_DIR)){
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers),'utf-8')
}

createManager();