import { Project, SyntaxKind } from 'ts-morph';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Define __dirname and __filename in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize a ts-morph Project
const project = new Project({
  tsConfigFilePath: path.resolve(__dirname, '../tsconfig.json'),
});

// Define directories and patterns to process
const directoriesToProcess = [
  'src/services',
  'src/routes',
  'src', // Include src/server.ts and others at root of src
];

// Function to correct import paths
function correctImportPaths(sourceFile: any) {
  const importDeclarations = sourceFile.getImportDeclarations();

  importDeclarations.forEach((importDecl: any) => {
    const moduleSpecifier = importDecl.getModuleSpecifierValue();

    // Check if the import is from 'lib'
    if (moduleSpecifier.startsWith('../lib') || moduleSpecifier.startsWith('./lib')) {
      // Calculate the correct relative path from the current file to the lib directory
      const currentFilePath = sourceFile.getFilePath();
      const libPath = path.resolve(__dirname, '../lib');
      let newImportPath = path.relative(path.dirname(currentFilePath), libPath);

      // Normalize path for import statement (use POSIX style)
      newImportPath = newImportPath.split(path.sep).join('/');

      // Ensure it starts with './' or '../'
      if (!newImportPath.startsWith('.')) {
        newImportPath = './' + newImportPath;
      }

      // Get the imported module component (e.g., 'api' from '../../lib/api')
      const importedModuleName = importDecl.getModuleSpecifier().getText().replace(/['"]/g, '');

      // Extract the path after 'lib', if any
      const pathAfterLib = importedModuleName.replace(/^[.]{1,2}\/lib\//, '');

      // Construct the new import path
      let finalImportPath = newImportPath;
      if (pathAfterLib) {
        finalImportPath = path.join(newImportPath, pathAfterLib).split(path.sep).join('/');
      }

      // Update the import declaration
      importDecl.setModuleSpecifier(finalImportPath);
      console.log(`Updated import path in ${sourceFile.getBaseName()}: '${moduleSpecifier}' -> '${finalImportPath}'`);
    }
  });
}

// Function to add console.log at the top of the file
function addTopLevelLogging(sourceFile: any) {
  const firstImport = sourceFile.getFirstDescendant((node: any) => node.getKind() === SyntaxKind.ImportDeclaration);

  if (firstImport) {
    // Add console.log after the first import declaration
    sourceFile.insertStatements(firstImport.getChildIndex() + 1, `console.log('Loaded ${sourceFile.getBaseName()}');`);
    console.log(`Added top-level console.log in ${sourceFile.getBaseName()}`);
  } else {
    // If no import declarations, add at the top
    sourceFile.insertStatements(0, `console.log('Loaded ${sourceFile.getBaseName()}');`);
    console.log(`Added top-level console.log in ${sourceFile.getBaseName()}`);
  }
}

// Function to add console.log at the start of each function
function addFunctionLogging(sourceFile: any) {
  const functions = sourceFile.getFunctions();
  const arrowFunctions = sourceFile.getDescendantsOfKind(SyntaxKind.ArrowFunction);
  const methodDeclarations = sourceFile.getDescendantsOfKind(SyntaxKind.MethodDeclaration);

  const allFunctions = [...functions, ...arrowFunctions, ...methodDeclarations];

  allFunctions.forEach((func: any) => {
    // Get the name of the function, or 'anonymous' if unnamed
    let functionName = 'anonymous';
    if (func.getName) {
      const name = func.getName();
      if (name) {
        functionName = name;
      }
    } else if (func.getSymbol) {
      const symbol = func.getSymbol();
      if (symbol && symbol.getName()) {
        functionName = symbol.getName();
      }
    }

    // Add console.log at the start of the function body
    func.getBody().insertStatements(0, `console.log('Executing function: ${functionName}');`);
    console.log(`Added console.log to function: ${functionName} in ${sourceFile.getBaseName()}`);
  });
}

// Main execution function
async function main() {
  directoriesToProcess.forEach((dir) => {
    const dirPath = path.resolve(__dirname, '../', dir);
    if (fs.existsSync(dirPath)) {
      project.addSourceFilesAtPaths(path.join(dirPath, '**/*.ts'));
      console.log(`Added source files from directory: ${dir}`);
    } else {
      console.warn(`Directory not found: ${dirPath}`);
    }
  });

  // Process each source file
  project.getSourceFiles().forEach((sourceFile) => {
    correctImportPaths(sourceFile);
    addTopLevelLogging(sourceFile);
    addFunctionLogging(sourceFile);
  });

  // Save all changes
  await project.save();
  console.log('Import paths corrected and logging statements added successfully.');
}

main().catch((error) => {
  console.error('Error running the script:', error);
});