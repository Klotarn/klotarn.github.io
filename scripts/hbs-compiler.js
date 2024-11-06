// Helper functions
function convertYamlToJs(yamlFileFolder) {
    const dataObj = {}; // Initialize an empty object to store the data
    fs.readdirSync(yamlFileFolder).forEach((file) => {
        const fileContents = fs.readFileSync(`${yamlFileFolder}${file}`, "utf8");
        const data = yaml.load(fileContents);
        const [dataFile] = file.split("."); // Extract the location from the file name
        dataObj[dataFile] = data;
    });
    return dataObj;
}

const translate = (lang, key) => {
    return lang[key] || key;
};

// Import the required modules
const fs = require("fs"); // File system module
const yaml = require("js-yaml"); // Module for converting YAML to JS-Objects
const handlebars = require("handlebars"); // Handlebars module
handlebars.registerHelper("translate", translate);

// Define the paths to the files and folders used when compiling the Handlebars template
const templateFile = "templates/index.hbs"; // Path to the Handlebars template file
const dataFolder = "data/"; // Path to a data folder where all the data files will be stored
const languageDataFolder = "data/languages/"; // Path to a data folder where all the language data files will be stored
const generalDataFolder = "data/general/"; // Path to a data folder where all the general data files will be stored
const outputFolder = "public/"; // Path to the output folder

// Create the output folders if they don't exist
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
}

// Convert YAML to JS-Object
const generalDataObj = convertYamlToJs(generalDataFolder); // Initialize an empty object to store the data

const languageDataObj = convertYamlToJs(languageDataFolder); // Initialize an empty object to store the data

console.log(generalDataObj);
console.log(languageDataObj);

// Create a function to compile the Handlebars template to HTML
const templateContents = fs.readFileSync(templateFile, "utf8");
const template = handlebars.compile(templateContents); // Correctly use the Handlebars instance

// Compile the html file
Object.keys(generalDataObj).forEach((generalDataFile) => {
    Object.keys(languageDataObj).forEach((languageDataFile) => {
        const combinedData = {
            general: generalDataObj[generalDataFile],
            language: languageDataObj[languageDataFile],
        }; // Combine the general and language data
        const outputHtml = template(combinedData);

        const combinationOutputFolder = `${outputFolder}${languageDataFile}/`; // Path to the output folder

        // Create the output folders if they don't exist
        if (!fs.existsSync(combinationOutputFolder)) {
            fs.mkdirSync(combinationOutputFolder, { recursive: true });
        }

        const outputFile = `${combinationOutputFolder}index.html`; // Path to the output file

        // Write the compiled HTML to the output file
        fs.writeFileSync(outputFile, outputHtml); // Write the output to the file

        console.log(`Generated ${outputFile}`);
    });
});
