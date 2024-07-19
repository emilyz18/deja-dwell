const fs = require('fs-extra');
const path = require('path');

const source = path.resolve(__dirname, 'dist');
const destination = path.resolve(__dirname, '../server/dist');

fs.copy(source, destination, err => {
  if (err) {
    console.error('Error copying dist folder:', err);
    process.exit(1);
    } else {
    console.log('dist folder copied successfully');
    }
});
