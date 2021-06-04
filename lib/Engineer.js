const Employee = require("./Employee");

class Engineer extends Employee {
    constructor (name, id, email, github) {
        super(name, id, email)
        this.github = github;
    }

    getName(){
        return this.name;
    }

    getID(){
        return this.id;
    }
    
    getEmail(){
        return this.email;
    }

    getRole(){
        return "Engineer"
    }

    getGithub(){
        return this.github;
    }
}

module.exports = Engineer