# Duplicate Detector - Adobe Premiere Pro Plugin

Duplicate Detector is a high-efficiency Adobe Premiere Pro plugin that automatically detects and removes repeated video segments (duplicate takes, accidental loops, or redundant scenes) by analyzing frame-by-frame visual similarity and audio waveform correlation.

## Features

- **Intelligent Detection**: Uses a combination of histogram comparison, motion tracking, and audio analysis to find duplicate segments
- **Customizable Sensitivity**: Adjust similarity threshold and minimum duration to fine-tune detection
- **Visual Timeline**: See where duplicates appear in your sequence with an intuitive timeline visualization
- **Side-by-Side Preview**: Compare original and duplicate segments to verify matches
- **Quick Removal**: Batch select and remove multiple duplicates at once
- **GPU Acceleration**: High-performance analysis optimized for speed
- **Quality Preservation**: Export options to maintain original quality
- **Multi-Track Support**: Works with complex timelines and nested sequences
- **Format Compatibility**: Supports common formats including MP4, MOV, and ProRes

## Installation

1. Download the latest release from the [releases page](https://github.com/yourusername/duplicate-detector/releases)
2. Extract the ZIP file to your Adobe CEP extensions folder:
   - **Windows**: `C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\`
   - **macOS**: `/Library/Application Support/Adobe/CEP/extensions/`
3. If needed, enable loading of unsigned extensions in Adobe Premiere Pro:
   - Create or edit the `CSXS.9.pref` file (or other version) located at:
     - **Windows**: `%APPDATA%\Adobe\CSXS\9\`
     - **macOS**: `~/Library/Preferences/com.adobe.CSXS.9.pref`
   - Add the following line: `<entry key="PlayerDebugMode" value="1"/>`
4. Restart Adobe Premiere Pro
5. The plugin will be available under Window > Extensions > Duplicate Detector

## Usage

### Basic Workflow

1. Open your sequence in Adobe Premiere Pro
2. Launch Duplicate Detector from Window > Extensions > Duplicate Detector
3. Adjust the similarity threshold and minimum duration as needed
4. Select which analysis methods to use (histogram, motion tracking, audio)
5. Click "Analyze Sequence" to scan for duplicates
6. Review the detected duplicates in the results panel
7. Select which duplicates to remove
8. Click "Remove Selected" to clean up your sequence

### Settings

- **Similarity Threshold**: The percentage similarity required to consider segments as duplicates (higher = more precise matches)
- **Minimum Duration**: The minimum length of duplicates to detect (in seconds)
- **Analysis Methods**:
  - **Histogram Comparison**: Fast analysis of color distribution (good for obvious duplicates)
  - **Motion Tracking**: Analyzes movement patterns (better for similar but not identical shots)
  - **Audio Analysis**: Compares audio waveforms (improves accuracy, especially for dialogue)
- **GPU Acceleration**: Enable to use your graphics card for faster processing
- **Ignore Tagged Clips**: Preserves clips with marker tags indicating they should be kept
- **Analysis Mode**: Choose between balanced, speed-optimized, or accuracy-optimized analysis

## Performance Tips

- For large projects, analyze smaller segments at a time
- Use GPU acceleration when available for faster processing
- Start with a higher similarity threshold and gradually reduce if needed
- Close other CPU/GPU-intensive applications when analyzing long sequences
- Use the "Speed Optimized" analysis mode for initial scans, then switch to "Accuracy Optimized" for final checks

## Development

### Prerequisites

- Adobe CEP Extension Builder
- Node.js and npm
- Adobe Premiere Pro CC 2019 or later

### Building from Source

1. Clone the repository
   ```
   git clone https://github.com/yourusername/duplicate-detector.git
   ```
2. Install dependencies
   ```
   npm install
   ```
3. Build the extension
   ```
   npm run build
   ```
4. Copy the built extension to your Adobe CEP extensions folder

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, feature requests, or bug reports, please [open an issue](https://github.com/yourusername/duplicate-detector/issues) on GitHub or contact support@duplicatedetector.com.