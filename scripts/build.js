/**
 * Cross-platform build script for Duplicate Detector extension
 */

const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
  console.log('Created dist directory');
}

/**
 * Copy a file from source to destination
 */
function copyFile(source, destination) {
  // Create destination directory if it doesn't exist
  const destDir = path.dirname(destination);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  fs.copyFileSync(source, destination);
}

/**
 * Copy directory recursively
 */
function copyDir(source, destination) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }
  
  // Get all files and directories in the source
  const entries = fs.readdirSync(source, { withFileTypes: true });
  
  // Process each entry
  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const destPath = path.join(destination, entry.name);
    
    if (entry.isDirectory()) {
      // Recursively copy directory
      copyDir(sourcePath, destPath);
    } else {
      // Copy file
      copyFile(sourcePath, destPath);
    }
  }
}

// Copy src to dist
const srcDir = path.join(__dirname, '..', 'src');
copyDir(srcDir, path.join(distDir));

console.log('Build completed successfully!');