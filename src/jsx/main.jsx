/**
 * DuplicateDetector - Premiere Pro plugin for detecting and removing duplicate video segments
 */

// Global variables
var app = null;
var extensionId = "com.duplicateDetector";
var projectItems = [];
var selectedClips = [];
var duplicateSegments = [];
var settings = {
  similarityThreshold: 90,
  minDuration: 2.0,
  useHistogramComparison: true,
  useMotionTracking: true,
  useAudioAnalysis: true,
  ignoreTaggedClips: true,
  preserveOriginalQuality: true
};

// Initialize the extension
function init() {
  if (typeof(CSInterface) !== 'undefined') {
    cs = new CSInterface();
    app = csInterface.getHostEnvironment();
    loadProjectItems();
    registerEventListeners();
  } else {
    alert("Unable to load Creative Suite Interface. Check your installation.");
  }
}

// Register event listeners for Premiere Pro events
function registerEventListeners() {
  cs.addEventListener("com.adobe.csxs.events.ApplicationStarted", function() {
    loadProjectItems();
  });
  
  cs.addEventListener("com.adobe.csxs.events.ProjectChanged", function() {
    loadProjectItems();
  });
  
  cs.addEventListener("com.adobe.csxs.events.SequenceSelectionChanged", function() {
    updateSelectedClips();
  });
}

// Load all project items from the current project
function loadProjectItems() {
  try {
    var project = app.project;
    if (!project) return;
    
    projectItems = [];
    var rootItem = project.rootItem;
    traverseProjectItems(rootItem);
    
    // Send project items to the UI
    cs.evalScript("window.dispatchEvent(new CustomEvent('projectItemsUpdated', { detail: " + JSON.stringify(projectItems) + " }));");
  } catch (e) {
    console.error("Error loading project items: " + e.message);
  }
}

// Recursively traverse project items
function traverseProjectItems(item) {
  if (!item) return;
  
  if (item.type === ProjectItemType.CLIP || item.type === ProjectItemType.SEQUENCE) {
    projectItems.push({
      id: item.nodeId,
      name: item.name,
      type: item.type,
      duration: item.duration,
      mediaType: item.mediaType,
      hasVideo: item.hasVideo,
      hasAudio: item.hasAudio
    });
  }
  
  // Process child items
  if (item.children && item.children.numItems > 0) {
    for (var i = 0; i < item.children.numItems; i++) {
      var child = item.children[i];
      traverseProjectItems(child);
    }
  }
}

// Update the list of selected clips in the active sequence
function updateSelectedClips() {
  try {
    var activeSequence = app.project.activeSequence;
    if (!activeSequence) return;
    
    selectedClips = [];
    var selectedItems = activeSequence.getSelection();
    
    if (selectedItems && selectedItems.length > 0) {
      for (var i = 0; i < selectedItems.length; i++) {
        var item = selectedItems[i];
        selectedClips.push({
          id: item.nodeId,
          name: item.name,
          type: item.type,
          inPoint: item.inPoint.seconds,
          outPoint: item.outPoint.seconds,
          duration: item.duration.seconds,
          mediaPath: item.mediaPath
        });
      }
    }
    
    // Send selected clips to the UI
    cs.evalScript("window.dispatchEvent(new CustomEvent('selectedClipsUpdated', { detail: " + JSON.stringify(selectedClips) + " }));");
  } catch (e) {
    console.error("Error updating selected clips: " + e.message);
  }
}

// Analyze video for duplicate segments
function analyzeDuplicates(options) {
  try {
    cs.evalScript("window.dispatchEvent(new CustomEvent('analysisStarted'));");
    
    if (!options) options = settings;
    duplicateSegments = [];
    
    // Get the active sequence
    var activeSequence = app.project.activeSequence;
    if (!activeSequence) {
      throw new Error("No active sequence found");
    }
    
    // Extract frames for analysis
    var frameData = extractFrameData(activeSequence, options);
    
    // Analyze extracted frames for duplicates
    var duplicates = findDuplicateSegments(frameData, options.similarityThreshold);
    
    // If audio analysis is enabled, refine results with audio comparison
    if (options.useAudioAnalysis) {
      duplicates = refineWithAudioAnalysis(duplicates, activeSequence);
    }
    
    // Filter out duplicates shorter than minimum duration
    duplicateSegments = filterByDuration(duplicates, options.minDuration);
    
    // Filter out tagged clips if option is enabled
    if (options.ignoreTaggedClips) {
      duplicateSegments = filterTaggedClips(duplicateSegments);
    }
    
    // Send results to UI
    cs.evalScript("window.dispatchEvent(new CustomEvent('analysisComplete', { detail: " + JSON.stringify(duplicateSegments) + " }));");
    
    return duplicateSegments;
  } catch (e) {
    console.error("Error analyzing duplicates: " + e.message);
    cs.evalScript("window.dispatchEvent(new CustomEvent('analysisError', { detail: '" + e.message + "' }));");
    return [];
  }
}

// Extract frame data from sequence for analysis
function extractFrameData(sequence, options) {
  // This would use the Premiere API to extract frames
  // Implementation would depend on the available Premiere Pro API methods
  // GPU acceleration would be applied here if available
  
  // For now, return a placeholder
  return {
    frames: [],
    audioData: []
  };
}

// Find duplicate segments based on visual similarity
function findDuplicateSegments(frameData, similarityThreshold) {
  // Implementation would use various algorithms:
  // 1. Histogram comparison
  // 2. Motion tracking
  // 3. AI-based pattern recognition
  
  // For now, return a placeholder
  return [];
}

// Refine duplicate detection using audio waveform correlation
function refineWithAudioAnalysis(duplicates, sequence) {
  // Implementation would analyze audio waveforms
  // and confirm/reject visual duplicates based on audio similarity
  
  // For now, return the input
  return duplicates;
}

// Filter duplicates by minimum duration
function filterByDuration(duplicates, minDuration) {
  var filtered = [];
  for (var i = 0; i < duplicates.length; i++) {
    var duplicate = duplicates[i];
    if (duplicate.duration >= minDuration) {
      filtered.push(duplicate);
    }
  }
  return filtered;
}

// Filter out clips that have been tagged to ignore
function filterTaggedClips(duplicates) {
  // Implementation would check for marker tags that indicate
  // the clip should be preserved
  
  // For now, return the input
  return duplicates;
}

// Remove selected duplicate segments
function removeDuplicates(segmentsToRemove) {
  try {
    if (!segmentsToRemove || segmentsToRemove.length === 0) {
      throw new Error("No segments selected for removal");
    }
    
    var activeSequence = app.project.activeSequence;
    if (!activeSequence) {
      throw new Error("No active sequence found");
    }
    
    // Start an undo group to allow for undoing the entire operation
    app.project.beginUndoGroup("Remove Duplicate Segments");
    
    for (var i = 0; i < segmentsToRemove.length; i++) {
      var segment = segmentsToRemove[i];
      
      // Find the track item
      var trackItem = findTrackItemById(activeSequence, segment.trackItemId);
      if (trackItem) {
        // Remove the track item
        trackItem.remove(REMOVE_OPTION_RIPPLE_DELETE);
      }
    }
    
    // End the undo group
    app.project.endUndoGroup();
    
    // Notify UI that removal is complete
    cs.evalScript("window.dispatchEvent(new CustomEvent('duplicatesRemoved'));");
    
    return true;
  } catch (e) {
    console.error("Error removing duplicates: " + e.message);
    cs.evalScript("window.dispatchEvent(new CustomEvent('removalError', { detail: '" + e.message + "' }));");
    return false;
  }
}

// Find a track item by its ID
function findTrackItemById(sequence, trackItemId) {
  // Implementation would search through all tracks to find the item
  // with the matching ID
  
  // For now, return null
  return null;
}

// Update settings
function updateSettings(newSettings) {
  try {
    // Merge new settings with existing settings
    for (var key in newSettings) {
      if (newSettings.hasOwnProperty(key) && settings.hasOwnProperty(key)) {
        settings[key] = newSettings[key];
      }
    }
    
    // Save settings to persistent storage
    var settingsStr = JSON.stringify(settings);
    cs.evalScript("window.localStorage.setItem('duplicateDetectorSettings', '" + settingsStr + "');");
    
    // Notify UI that settings were updated
    cs.evalScript("window.dispatchEvent(new CustomEvent('settingsUpdated', { detail: " + settingsStr + " }));");
    
    return true;
  } catch (e) {
    console.error("Error updating settings: " + e.message);
    return false;
  }
}

// Load settings from persistent storage
function loadSettings() {
  try {
    var settingsStr = cs.evalScript("window.localStorage.getItem('duplicateDetectorSettings');");
    if (settingsStr && settingsStr !== "null") {
      var loadedSettings = JSON.parse(settingsStr);
      updateSettings(loadedSettings);
    }
    
    // Notify UI with current settings
    cs.evalScript("window.dispatchEvent(new CustomEvent('settingsLoaded', { detail: " + JSON.stringify(settings) + " }));");
    
    return settings;
  } catch (e) {
    console.error("Error loading settings: " + e.message);
    return settings;
  }
}

// Export settings for the removed duplicates
function exportWithPresets(presetName) {
  try {
    var activeSequence = app.project.activeSequence;
    if (!activeSequence) {
      throw new Error("No active sequence found");
    }
    
    // Implementation would use the Premiere Pro API to export
    // the sequence with the specified preset
    
    // Notify UI that export has started
    cs.evalScript("window.dispatchEvent(new CustomEvent('exportStarted'));");
    
    // Placeholder for export functionality
    
    // Notify UI that export is complete
    cs.evalScript("window.dispatchEvent(new CustomEvent('exportComplete'));");
    
    return true;
  } catch (e) {
    console.error("Error exporting with preset: " + e.message);
    cs.evalScript("window.dispatchEvent(new CustomEvent('exportError', { detail: '" + e.message + "' }));");
    return false;
  }
}

// Initialize the extension when loaded
init();