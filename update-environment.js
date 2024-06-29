// update-environment.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const environmentFilesDirectory = path.join(__dirname, './src/environments');
const targetEnvironmentFileName = 'environment.ts';
const targetEnvironmentFilePath = path.join(environmentFilesDirectory, targetEnvironmentFileName);

const environmentContent = `
export const environment = {
  production: false,
  apiUrl: '${process.env.API_URL}'
};
`;

fs.writeFileSync(targetEnvironmentFilePath, environmentContent, { encoding: 'utf-8' });

console.log(`Angular environment.ts file has been updated with variables from .env`);