const fetch = require("node-fetch");

var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    async prompting() {
        this.log("NOTE: Use the last path of the URL for the problem for the problem name. For example, the problem name of 'https://open.kattis.com/problems/hello' would be 'hello'");
        this.answers = await this.prompt([{
            type: "input",
            name: "problemName",
            message: "The problem name from the url: ",
            default: "hello",
        }, {
            type: "list",
            name: "language",
            message: "Select a programming language: ",
            store: true,
            choices: [{
                name: "python3",
                value: "python",
            }, {
                value: "go"
            }, {
                value: "javascript"
            }]
        }]);
        if (this.answers.language !== "javascript") {
            const temp = await this.prompt([{
                type: "list",
                name: "problemType",
                message: "Select the type the problem is: ",
                choices: [{
                    name: "Single line input",
                    value: "singleLine",
                }, {
                    name: "Read until end of file",
                    value: "eof"
                }, {
                    name: "Read first line then loop until finished",
                    value: "setLines"
                }]
            }]);
            this.answers.problemType = temp.problemType;
        } else {
            this.answers.problemType = "eof";
        }
    }

    writing() {
        if (this.answers.language === "python") {
            let templatePath = `${this.answers.problemType}.py`;
            this.fs.copyTpl(
                this.templatePath(templatePath),
                this.destinationPath(`${this.answers.problemName}-python/main.py`)
            );
        } else if (this.answers.language === "javascript") {
            let templatePath = `${this.answers.problemType}.js`;
            this.fs.copyTpl(
                this.templatePath(templatePath),
                this.destinationPath(`${this.answers.problemName}-javascript/main.js`)
            );
        } else if (this.answers.language === "go") {
            this.fs.copyTpl(
                this.templatePath("go.mod"),
                this.destinationPath(`${this.answers.problemName}-go/go.mod`),
                { problemName: this.answers.problemName }
            );
            let templatePath = `${this.answers.problemType}.go`;
            this.fs.copyTpl(
                this.templatePath(templatePath),
                this.destinationPath(`${this.answers.problemName}-go/main.go`)
            );
        }
    }
};