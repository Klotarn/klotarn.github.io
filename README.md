# Get started with Handlebars
## Initiate a project
* Download and install Node.js
* Open a terminal to this directory and enter the following command:
```bash
npm init
```
* Follow the instructions.
    * Enter a name for your project or press enter if you are fine with the one that is shown.
    * Do the same with the project version.
    * Type a description for your project or press enter if you want to skip this.
    * Entry point is irrelevant for now and can be changed later, press enter to skip this.
    * Also skip "test command", "git repository" (unless you are using one for the project), "keywords", "author" and "license".
    * Double-check the information and press enter.

* If you are using a git repository, add `node_modules/` to your `.gitignore`.

## Compiler

* Install Handlebars and js-yaml by running the following command:
```bash
npm i handlebars js-yaml
```

* Create a `scripts/` folder from root and create a file in this folder named `hbs-compiler.js`. This file will compile .hbs-files to .html-files that will be displayed as a website.

* Enter the following code into `scripts/hbs-compiler.js`:
```js
// Import the required modules
const fs = require('fs'); // File system module
const yaml = require('js-yaml'); // Module for converting YAML to JS-Objects
const handlebars = require('handlebars'); // Handlebars module
```

* Create variables for filepaths to be used by the compiler by entering the following code beneath the above code block:
```js
// Define the paths to the files and folders used when compiling the Handlebars template
const templateFile = 'templates/index.hbs'; // Path to the Handlebars template file
const dataFolder = 'data/'; // Path to a data folder where all the data files will be stored
const outputFolder = 'public/'; // Path to the output folder

// Create the output folders if they don't exist
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
}
```

* Enter the following code to convert your data to a JS-Object:
```js
// Convert YAML to JS-Object
const dataObj = {}; // Initialize an empty object to store the data
fs.readdirSync(dataFolder).forEach(file => {
    const fileContents = fs.readFileSync(`${dataFolder}${file}`, 'utf8');
    const data = yaml.load(fileContents);
    const [dataFile] = file.split('.');  // Extract the location from the file name
    dataObj[dataFile] = data;
});

console.log(dataObj);
```

* The following code creates a function to compile your template file to HTML:
```js
// Create a function to compile the Handlebars template to HTML
const templateContents = fs.readFileSync(templateFile, 'utf8');
const template = handlebars.compile(templateContents); // Correctly use the Handlebars instance
```

* The following code will compile the html file:
```js
// Compile the html file
Object.keys(dataObj).forEach(dataFile => {
    const outputHtml = template(dataObj[dataFile]);

    const combinationOutputFolder = `${outputFolder}${dataFile}/`; // Path to the output folder

    // Create the output folders if they don't exist
    if (!fs.existsSync(combinationOutputFolder)) {
        fs.mkdirSync(combinationOutputFolder, { recursive: true });
    }

    const outputFile = `${combinationOutputFolder}index.html`; // Path to the output file

    // Write the compiled HTML to the output file
    fs.writeFileSync(outputFile, outputHtml); // Write the output to the file

    console.log(`Generated ${outputFile}`);
});
```

## Write a template file

* Create a `templates/` folder and create an `index.hbs` file in it.
* In `templates/index.hbs` write the following:
```hbs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Handlebars Website</title>
</head>
<body>
    
</body>
</html>
```
* In the body-tag, add this code:
```hbs
    <div id="{{exampleId}}">
        {{firstText}}
    </div>
```

## Create data-files

* Create a folder named `data/`. 
* In the folder, create a file named `firstDataFile.yml` and a file named `secondDataFile.yml` .
* In `firstDataFile.yml` write:
```yml
exampleId : "firstId"
exampleText : "This is the first text"
```

* In `secondDataFile.yml` write:
```yml
exampleId : "secondId"
exampleText : "This is the second text"
```

## Compile html-files

* Open a terminal in your projects directory and enter the following command:
```bash
node .\scripts\hbs-compiler.js
```