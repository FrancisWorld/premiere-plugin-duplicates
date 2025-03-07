/**
 * Duplicate Detector - Main JavaScript
 * Handles the UI interactions and communicates with the JSX backend
 */

// Global variables
let csInterface;
let themeColor;
let settings = {
  similarityThreshold: 90,
  minDuration: 2.0,
  useHistogramComparison: true,
  useMotionTracking: true,
  useAudioAnalysis: true,
  gpuAcceleration: true,
  ignoreTaggedClips: true,
  preserveOriginalQuality: true,
  analysisMode: 'balanced',
  exportPreset: 'match',
  theme: 'auto',
  previewQuality: 'medium'
};
let duplicateSegments = [];
let selectedDuplicates = [];
let activePreview = null;

// Initialize application
$(document).ready(function() {
  initCSInterface();
  registerEventListeners();
  loadSettings();
});

// Initialize CEP Creative Suite Interface
function initCSInterface() {
  try {
    csInterface = new CSInterface();
    updateThemeColors();
    
    // Add event listener for theme color changes
    csInterface.addEventListener(CSInterface.THEME_COLOR_CHANGED_EVENT, updateThemeColors);

    // Initialize slider values
    updateSimilarityThresholdLabel();
    updateMinDurationLabel();
  } catch (error) {
    console.error("Error initializing CS Interface:", error);
  }
}

// Update UI theme colors to match host application
function updateThemeColors() {
  themeColor = csInterface.getHostEnvironment().appSkinInfo.appBarBackgroundColor;
  
  // Only apply theme changes if set to auto
  if (settings.theme === 'auto') {
    // Convert theme RGB components to hex
    const red = Math.round(themeColor.color.red);
    const green = Math.round(themeColor.color.green);
    const blue = Math.round(themeColor.color.blue);
    
    // Determine if the theme is light or dark
    const isDarkTheme = (red * 0.299 + green * 0.587 + blue * 0.114) < 128;
    
    if (isDarkTheme) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }
  }
}

// Register UI event listeners
function registerEventListeners() {
  // Navigation buttons
  $('#settingsBtn').on('click', showSettings);
  $('#closeSettingsBtn').on('click', hideSettings);
  $('#helpBtn').on('click', showHelp);
  $('#closeHelpBtn').on('click', hideHelp);
  $('#backToAnalyzeBtn').on('click', showAnalyzeSection);
  
  // Analysis controls
  $('#similarityThreshold').on('input', updateSimilarityThresholdLabel);
  $('#minDuration').on('input', updateMinDurationLabel);
  $('#analyzeBtn').on('click', analyzeSequence);
  
  // Results actions
  $('#selectAllBtn').on('click', selectAllDuplicates);
  $('#removeSelectedBtn').on('click', removeSelectedDuplicates);
  $('#exportBtn').on('click', exportResults);
  
  // Settings controls
  $('#saveSettingsBtn').on('click', saveSettings);
  $('#restoreDefaultsBtn').on('click', restoreDefaultSettings);
  
  // Register event listeners for JSX events
  window.addEventListener('projectItemsUpdated', onProjectItemsUpdated);
  window.addEventListener('selectedClipsUpdated', onSelectedClipsUpdated);
  window.addEventListener('analysisComplete', onAnalysisComplete);
  window.addEventListener('analysisError', onAnalysisError);
  window.addEventListener('duplicatesRemoved', onDuplicatesRemoved);
  window.addEventListener('exportComplete', onExportComplete);
  window.addEventListener('settingsUpdated', onSettingsUpdated);
  window.addEventListener('settingsLoaded', onSettingsLoaded);
}

// Load settings from JSX
function loadSettings() {
  try {
    csInterface.evalScript('loadSettings()');
  } catch (error) {
    console.error("Error loading settings:", error);
  }
}

// Update UI with loaded settings
function onSettingsLoaded(event) {
  try {
    if (event.detail) {
      settings = event.detail;
      
      // Update UI elements with loaded settings
      $('#similarityThreshold').val(settings.similarityThreshold);
      $('#minDuration').val(settings.minDuration);
      $('#useHistogram').prop('checked', settings.useHistogramComparison);
      $('#useMotion').prop('checked', settings.useMotionTracking);
      $('#useAudio').prop('checked', settings.useAudioAnalysis);
      $('#gpuAcceleration').prop('checked', settings.gpuAcceleration);
      $('#ignoreTagged').prop('checked', settings.ignoreTaggedClips);
      $('#preserveQuality').prop('checked', settings.preserveOriginalQuality);
      $('#analysisMode').val(settings.analysisMode);
      $('#exportPreset').val(settings.exportPreset);
      $('#theme').val(settings.theme);
      $('#previewQuality').val(settings.previewQuality);
      
      // Update labels
      updateSimilarityThresholdLabel();
      updateMinDurationLabel();
      
      // Apply theme
      applyTheme(settings.theme);
    }
  } catch (error) {
    console.error("Error applying loaded settings:", error);
  }
}

// Apply theme setting
function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  } else if (theme === 'dark') {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
  } else {
    // Auto theme - call update function to set based on host app
    updateThemeColors();
  }
}

// Save settings
function saveSettings() {
  try {
    // Get settings from UI
    settings.similarityThreshold = parseInt($('#similarityThreshold').val());
    settings.minDuration = parseFloat($('#minDuration').val());
    settings.useHistogramComparison = $('#useHistogram').is(':checked');
    settings.useMotionTracking = $('#useMotion').is(':checked');
    settings.useAudioAnalysis = $('#useAudio').is(':checked');
    settings.gpuAcceleration = $('#gpuAcceleration').is(':checked');
    settings.ignoreTaggedClips = $('#ignoreTagged').is(':checked');
    settings.preserveOriginalQuality = $('#preserveQuality').is(':checked');
    settings.analysisMode = $('#analysisMode').val();
    settings.exportPreset = $('#exportPreset').val();
    settings.theme = $('#theme').val();
    settings.previewQuality = $('#previewQuality').val();
    
    // Save settings to JSX
    csInterface.evalScript(`updateSettings(${JSON.stringify(settings)})`);
    
    // Apply theme
    applyTheme(settings.theme);
    
    // Notify user
    showNotification('Settings saved successfully');
    
    // Hide settings panel
    hideSettings();
  } catch (error) {
    console.error("Error saving settings:", error);
    showNotification('Error saving settings', 'error');
  }
}

// Restore default settings
function restoreDefaultSettings() {
  // Default settings
  const defaultSettings = {
    similarityThreshold: 90,
    minDuration: 2.0,
    useHistogramComparison: true,
    useMotionTracking: true,
    useAudioAnalysis: true,
    gpuAcceleration: true,
    ignoreTaggedClips: true,
    preserveOriginalQuality: true,
    analysisMode: 'balanced',
    exportPreset: 'match',
    theme: 'auto',
    previewQuality: 'medium'
  };
  
  // Update UI with default settings
  $('#similarityThreshold').val(defaultSettings.similarityThreshold);
  $('#minDuration').val(defaultSettings.minDuration);
  $('#useHistogram').prop('checked', defaultSettings.useHistogramComparison);
  $('#useMotion').prop('checked', defaultSettings.useMotionTracking);
  $('#useAudio').prop('checked', defaultSettings.useAudioAnalysis);
  $('#gpuAcceleration').prop('checked', defaultSettings.gpuAcceleration);
  $('#ignoreTagged').prop('checked', defaultSettings.ignoreTaggedClips);
  $('#preserveQuality').prop('checked', defaultSettings.preserveOriginalQuality);
  $('#analysisMode').val(defaultSettings.analysisMode);
  $('#exportPreset').val(defaultSettings.exportPreset);
  $('#theme').val(defaultSettings.theme);
  $('#previewQuality').val(defaultSettings.previewQuality);
  
  // Update labels
  updateSimilarityThresholdLabel();
  updateMinDurationLabel();
  
  // Notify user
  showNotification('Default settings restored');
}

// Update similarity threshold label
function updateSimilarityThresholdLabel() {
  const value = $('#similarityThreshold').val();
  $('#similarityThreshold').closest('.slider-container').find('.slider-value').text(value + '%');
}

// Update minimum duration label
function updateMinDurationLabel() {
  const value = $('#minDuration').val();
  $('#minDuration').closest('.slider-container').find('.slider-value').text(value + 's');
}

// Show settings section
function showSettings() {
  hideSection('#analyzeSection');
  hideSection('#resultsSection');
  hideSection('#helpSection');
  showSection('#settingsSection');
}

// Hide settings section
function hideSettings() {
  hideSection('#settingsSection');
  
  // Show appropriate section based on context
  if (duplicateSegments.length > 0) {
    showSection('#resultsSection');
  } else {
    showSection('#analyzeSection');
  }
}

// Show help section
function showHelp() {
  hideSection('#analyzeSection');
  hideSection('#resultsSection');
  hideSection('#settingsSection');
  showSection('#helpSection');
}

// Hide help section
function hideHelp() {
  hideSection('#helpSection');
  
  // Show appropriate section based on context
  if (duplicateSegments.length > 0) {
    showSection('#resultsSection');
  } else {
    showSection('#analyzeSection');
  }
}

// Show analyze section
function showAnalyzeSection() {
  hideSection('#resultsSection');
  hideSection('#settingsSection');
  hideSection('#helpSection');
  showSection('#analyzeSection');
  
  // Reset duplicates data
  duplicateSegments = [];
  selectedDuplicates = [];
}

// Show a section
function showSection(selector) {
  $(selector).removeClass('hidden-section').addClass('active-section');
}

// Hide a section
function hideSection(selector) {
  $(selector).removeClass('active-section').addClass('hidden-section');
}

// Show loading overlay
function showLoading(message = 'Analyzing sequence...') {
  $('#loadingMessage').text(message);
  $('#loadingOverlay').removeClass('hidden');
}

// Hide loading overlay
function hideLoading() {
  $('#loadingOverlay').addClass('hidden');
}

// Show notification message
function showNotification(message, type = 'success') {
  // Implementation would depend on what notification system you want to use
  // For now, we'll use console.log
  console.log(`Notification (${type}): ${message}`);
}

// Analyze sequence for duplicates
function analyzeSequence() {
  try {
    // Get analysis options from UI
    const options = {
      similarityThreshold: parseInt($('#similarityThreshold').val()),
      minDuration: parseFloat($('#minDuration').val()),
      useHistogramComparison: $('#useHistogram').is(':checked'),
      useMotionTracking: $('#useMotion').is(':checked'),
      useAudioAnalysis: $('#useAudio').is(':checked'),
      gpuAcceleration: settings.gpuAcceleration,
      ignoreTaggedClips: settings.ignoreTaggedClips,
      analysisMode: settings.analysisMode
    };
    
    // Show loading overlay
    showLoading('Analyzing sequence...');
    
    // Call JSX function to analyze sequence
    console.log("Calling analyzeDuplicates with options:", options);
    const optionsString = JSON.stringify(options).replace(/"/g, '\\"');
    csInterface.evalScript(`analyzeDuplicates("${optionsString}")`, function(result) {
      if (result === 'false' || result === false) {
        console.error("Analysis failed on JSX side");
        hideLoading();
        showNotification('Error analyzing sequence', 'error');
      }
    });
  } catch (error) {
    console.error("Error analyzing sequence:", error);
    hideLoading();
    showNotification('Error analyzing sequence', 'error');
  }
}

// Handle project items updated event
function onProjectItemsUpdated(event) {
  // Update UI with project items if needed
  console.log("Project items updated:", event.detail);
}

// Handle selected clips updated event
function onSelectedClipsUpdated(event) {
  // Update UI with selected clips if needed
  console.log("Selected clips updated:", event.detail);
}

// Handle analysis complete event
function onAnalysisComplete(event) {
  try {
    // Hide loading overlay
    hideLoading();
    
    // Get duplicate segments from event
    duplicateSegments = event.detail || [];
    
    // Update UI
    updateDuplicatesList();
    updateTimeline();
    
    // Show results section if duplicates were found
    if (duplicateSegments.length > 0) {
      hideSection('#analyzeSection');
      showSection('#resultsSection');
    } else {
      showNotification('No duplicates found');
    }
  } catch (error) {
    console.error("Error handling analysis complete:", error);
    hideLoading();
    showNotification('Error processing analysis results', 'error');
  }
}

// Handle analysis error event
function onAnalysisError(event) {
  // Hide loading overlay
  hideLoading();
  
  // Show error notification
  showNotification('Analysis error: ' + event.detail, 'error');
}

// Update duplicates list in UI
function updateDuplicatesList() {
  try {
    // Get container
    const container = $('#duplicatesList');
    
    // Clear container
    container.empty();
    
    // Update duplicate count
    $('#duplicateCount').text(`(${duplicateSegments.length})`);
    
    // If no duplicates, show empty state
    if (duplicateSegments.length === 0) {
      container.html('<div class="empty-state"><p>No duplicates found. Try adjusting the similarity threshold or analysis methods.</p></div>');
      return;
    }
    
    // Add each duplicate to the list
    duplicateSegments.forEach((duplicate, index) => {
      const item = $('<div>').addClass('duplicate-item').attr('data-index', index);
      
      // Add checkbox
      const checkbox = $('<div>').addClass('duplicate-checkbox');
      const input = $('<input>').attr({
        type: 'checkbox',
        id: `duplicate-${index}`
      });
      checkbox.append(input);
      
      // Add info
      const info = $('<div>').addClass('duplicate-info');
      
      // Add title
      const title = $('<div>').addClass('duplicate-title').text(duplicate.name || `Duplicate ${index + 1}`);
      
      // Add details
      const details = $('<div>').addClass('duplicate-details');
      
      // Format time code
      const formatTimeCode = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        const ms = Math.floor((seconds % 1) * 100);
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
      };
      
      // Add time info
      const timeInfo = $('<span>').text(`${formatTimeCode(duplicate.startTime)} - ${formatTimeCode(duplicate.endTime)}`);
      
      // Add duration
      const duration = $('<span>').text(`Duration: ${duplicate.duration.toFixed(2)}s`);
      
      // Add similarity
      const similarity = $('<span>').addClass('duplicate-similarity').text(`${duplicate.similarity}% similar`);
      
      // Assemble details
      details.append(timeInfo, duration, similarity);
      
      // Assemble info
      info.append(title, details);
      
      // Assemble item
      item.append(checkbox, info);
      
      // Add click handler
      item.on('click', function(e) {
        // Don't trigger if clicking the checkbox
        if ($(e.target).is('input[type="checkbox"]')) {
          return;
        }
        
        // Select the item
        selectDuplicateItem(index);
      });
      
      // Add checkbox change handler
      input.on('change', function() {
        if ($(this).is(':checked')) {
          selectedDuplicates.push(index);
        } else {
          const idx = selectedDuplicates.indexOf(index);
          if (idx !== -1) {
            selectedDuplicates.splice(idx, 1);
          }
        }
        
        // Update selected count
        updateSelectedCount();
        
        // Enable/disable remove button
        $('#removeSelectedBtn').prop('disabled', selectedDuplicates.length === 0);
      });
      
      // Add item to container
      container.append(item);
    });
  } catch (error) {
    console.error("Error updating duplicates list:", error);
  }
}

// Update timeline visualization
function updateTimeline() {
  try {
    // Get container
    const container = $('#timelineItems');
    
    // Clear container
    container.empty();
    
    // Get sequence duration from duplicates data
    let maxTime = 0;
    duplicateSegments.forEach(duplicate => {
      if (duplicate.endTime > maxTime) {
        maxTime = duplicate.endTime;
      }
    });
    
    // Add timeline markers for each duplicate
    duplicateSegments.forEach((duplicate, index) => {
      // Create marker element
      const marker = $('<div>').addClass('timeline-marker').attr('data-index', index);
      
      // Calculate position and width based on time
      const startPercent = (duplicate.startTime / maxTime) * 100;
      const widthPercent = ((duplicate.endTime - duplicate.startTime) / maxTime) * 100;
      
      // Set position and width
      marker.css({
        left: `${startPercent}%`,
        width: `${widthPercent}%`,
        top: `${index % 2 * 20}px`, // Alternate height to avoid overlap
        backgroundColor: generateColorFromSimilarity(duplicate.similarity)
      });
      
      // Add tooltip with time info
      marker.attr('title', `${duplicate.name || `Duplicate ${index + 1}`} - ${duplicate.similarity}% similar`);
      
      // Add click handler
      marker.on('click', function() {
        selectDuplicateItem(index);
      });
      
      // Add marker to container
      container.append(marker);
    });
    
    // Add timeline ruler markings based on total duration
    updateTimelineRuler(maxTime);
  } catch (error) {
    console.error("Error updating timeline:", error);
  }
}

// Update timeline ruler markings
function updateTimelineRuler(totalDuration) {
  // Get ruler element
  const ruler = $('.timeline-ruler');
  
  // Clear previous markings
  ruler.empty();
  
  // Determine appropriate time intervals
  let interval = 60; // 1 minute intervals by default
  if (totalDuration > 3600) {
    interval = 600; // 10 minute intervals for longer videos
  } else if (totalDuration < 300) {
    interval = 30; // 30 second intervals for shorter videos
  }
  
  // Add time markings
  for (let time = 0; time <= totalDuration; time += interval) {
    // Format time code
    const formatTime = (seconds) => {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.floor(seconds % 60);
      
      if (h > 0) {
        return `${h}:${m.toString().padStart(2, '0')}`;
      } else {
        return `${m}:${s.toString().padStart(2, '0')}`;
      }
    };
    
    // Create marking element
    const mark = $('<div>').addClass('timeline-mark');
    
    // Set position
    const posPercent = (time / totalDuration) * 100;
    mark.css('left', `${posPercent}%`);
    
    // Add time label
    const label = $('<span>').addClass('timeline-label').text(formatTime(time));
    mark.append(label);
    
    // Add to ruler
    ruler.append(mark);
  }
}

// Generate color based on similarity percentage
function generateColorFromSimilarity(similarity) {
  // Convert similarity to hue (120 = green, 60 = yellow, 0 = red)
  const hue = (similarity - 50) * 1.8; // Map 70-100 to 36-90 (orange to green)
  return `hsla(${hue}, 85%, 55%, 0.7)`;
}

// Select a duplicate item
function selectDuplicateItem(index) {
  try {
    // Get duplicate data
    const duplicate = duplicateSegments[index];
    
    // Highlight selected item in the list
    $('.duplicate-item').removeClass('selected');
    $(`.duplicate-item[data-index="${index}"]`).addClass('selected');
    
    // Highlight selected item in the timeline
    $('.timeline-marker').removeClass('selected');
    $(`.timeline-marker[data-index="${index}"]`).addClass('selected');
    
    // Update preview
    updatePreview(duplicate);
  } catch (error) {
    console.error("Error selecting duplicate item:", error);
  }
}

// Update preview with duplicate data
function updatePreview(duplicate) {
  try {
    // Set active preview
    activePreview = duplicate;
    
    // Update similarity badge
    $('#similarityValue').text(duplicate.similarity);
    
    // Get preview containers
    const originalPreview = $('#previewOriginal');
    const duplicatePreview = $('#previewDuplicate');
    
    // Clear containers
    originalPreview.empty();
    duplicatePreview.empty();
    
    // In a real implementation, we would load the actual frames
    // For now, we'll just show placeholders with the clip names
    
    // Create original placeholder
    const originalPlaceholder = $('<div>').addClass('preview-placeholder').text(duplicate.originalClip || 'Original Clip');
    originalPreview.append(originalPlaceholder);
    
    // Create duplicate placeholder
    const duplicatePlaceholder = $('<div>').addClass('preview-placeholder').text(duplicate.duplicateClip || 'Duplicate Clip');
    duplicatePreview.append(duplicatePlaceholder);
    
    // In a real implementation, this is where we would set up the video preview
    // and synchronize playback between the two clips
  } catch (error) {
    console.error("Error updating preview:", error);
  }
}

// Select all duplicates
function selectAllDuplicates() {
  try {
    // Check all checkboxes
    $('input[type="checkbox"]').prop('checked', true);
    
    // Update selected duplicates array
    selectedDuplicates = duplicateSegments.map((_, index) => index);
    
    // Update selected count
    updateSelectedCount();
    
    // Enable remove button
    $('#removeSelectedBtn').prop('disabled', false);
  } catch (error) {
    console.error("Error selecting all duplicates:", error);
  }
}

// Update selected count
function updateSelectedCount() {
  $('#selectedCount').text(selectedDuplicates.length);
}

// Remove selected duplicates
function removeSelectedDuplicates() {
  try {
    // Create array of segments to remove
    const segmentsToRemove = selectedDuplicates.map(index => duplicateSegments[index]);
    
    // Show loading overlay
    showLoading('Removing duplicates...');
    
    // Call JSX function to remove duplicates
    csInterface.evalScript(`removeDuplicates(${JSON.stringify(segmentsToRemove)})`);
  } catch (error) {
    console.error("Error removing duplicates:", error);
    hideLoading();
    showNotification('Error removing duplicates', 'error');
  }
}

// Handle duplicates removed event
function onDuplicatesRemoved() {
  // Hide loading overlay
  hideLoading();
  
  // Show success notification
  showNotification(`${selectedDuplicates.length} duplicate segments removed`);
  
  // Remove selected duplicates from the array
  const newDuplicates = duplicateSegments.filter((_, index) => !selectedDuplicates.includes(index));
  duplicateSegments = newDuplicates;
  
  // Reset selected duplicates
  selectedDuplicates = [];
  
  // Update UI
  updateDuplicatesList();
  updateTimeline();
  updateSelectedCount();
  
  // Disable remove button
  $('#removeSelectedBtn').prop('disabled', true);
  
  // If all duplicates were removed, go back to analyze section
  if (duplicateSegments.length === 0) {
    showAnalyzeSection();
  }
}

// Export results
function exportResults() {
  try {
    // Show loading overlay
    showLoading('Exporting sequence...');
    
    // Get export preset from settings
    const preset = settings.exportPreset;
    
    // Call JSX function to export
    csInterface.evalScript(`exportWithPresets("${preset}")`);
  } catch (error) {
    console.error("Error exporting results:", error);
    hideLoading();
    showNotification('Error exporting results', 'error');
  }
}

// Handle export complete event
function onExportComplete() {
  // Hide loading overlay
  hideLoading();
  
  // Show success notification
  showNotification('Export completed successfully');
}

// Handle settings updated event
function onSettingsUpdated(event) {
  // Update settings object
  if (event.detail) {
    settings = event.detail;
  }
  
  // Show notification
  showNotification('Settings updated');
}