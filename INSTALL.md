# Installation Guide for Duplicate Detector

This guide walks you through installing the Duplicate Detector plugin for Adobe Premiere Pro on Windows and macOS.

## Prerequisites

- Adobe Premiere Pro CC 2019 or later
- Node.js and npm (for building from source)

## Option 1: Installing from Pre-built Package

If you've received a pre-built `.zxp` package:

1. Download and install the [Adobe Extension Manager](https://aescripts.com/learn/zxp-installer/) or another ZXP installer like [Anastasiy's Extension Manager](https://install.anastasiy.com/)
2. Open the Extension Manager
3. Drag and drop the `duplicate-detector.zxp` file onto the Extension Manager window
4. Follow the prompts to complete installation

## Option 2: Manual Installation (Recommended for Development)

### Windows

1. Build the extension:
   ```
   npm install
   npm run build
   ```

2. Create the extension directory:
   ```
   mkdir "C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\DuplicateDetector"
   ```

3. Copy the contents of the `dist` folder to the extension directory:
   ```
   xcopy /E /I dist\* "C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\DuplicateDetector"
   ```

4. Enable unsigned extensions by creating or editing the file:
   ```
   %APPDATA%\Adobe\CSXS\9\cef.plist
   ```
   
   Add the following content:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
   <plist version="1.0">
   <dict>
       <key>PlayerDebugMode</key>
       <string>1</string>
   </dict>
   </plist>
   ```

### macOS

1. Build the extension:
   ```
   npm install
   npm run build
   ```

2. Create the extension directory:
   ```
   mkdir -p "/Library/Application Support/Adobe/CEP/extensions/DuplicateDetector"
   ```

3. Copy the contents of the `dist` folder to the extension directory:
   ```
   cp -R dist/* "/Library/Application Support/Adobe/CEP/extensions/DuplicateDetector"
   ```

4. Enable unsigned extensions by creating or editing the file:
   ```
   ~/Library/Preferences/com.adobe.CSXS.9.pref
   ```
   
   Add the following content:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
   <plist version="1.0">
   <dict>
       <key>PlayerDebugMode</key>
       <string>1</string>
   </dict>
   </plist>
   ```

## Verifying Installation

1. Restart Adobe Premiere Pro
2. Go to **Window > Extensions > Duplicate Detector**
3. The extension panel should appear in the application

## Troubleshooting

If the extension doesn't appear:

1. Verify that the extension files are in the correct location
2. Make sure you've enabled unsigned extensions correctly
3. Check that you've restarted Premiere Pro completely
4. Look for any error messages in the Premiere Pro extension logs:
   - Windows: `%APPDATA%\Adobe\CEP\logs`
   - macOS: `~/Library/Logs/CSXS`

## For Developers

When making changes to the extension:

1. Modify files in the `src` directory
2. Run `npm run build` to update the `dist` directory
3. Copy the updated files to the extension directory
4. Restart Premiere Pro to see the changes

To package the extension as a `.zxp` file for distribution:

```
npm run package
```