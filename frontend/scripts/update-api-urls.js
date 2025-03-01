const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '..', 'src', 'components');

// Read all JavaScript files in the components directory
fs.readdir(componentsDir, (err, files) => {
  if (err) {
    console.error('Error reading components directory:', err);
    return;
  }

  files.forEach(file => {
    if (path.extname(file) === '.js') {
      const filePath = path.join(componentsDir, file);
      
      // Read the file content
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Error reading file ${file}:`, err);
          return;
        }

        // Replace hardcoded API URLs
        const updatedContent = data
          .replace(/http:\/\/localhost:8000\/api/g, '${config.API_URL}')
          .replace(/const\s+\w+\s+=\s+async\s+\(\w+\)\s+=>\s+{/g, match => {
            if (!data.includes('import config from')) {
              return "import config from '../config';\n\n" + match;
            }
            return match;
          });

        // Write the updated content back to the file
        fs.writeFile(filePath, updatedContent, 'utf8', err => {
          if (err) {
            console.error(`Error writing file ${file}:`, err);
            return;
          }
          console.log(`Updated ${file} successfully.`);
        });
      });
    }
  });
});