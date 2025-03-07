/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
* Copyright 2014 Adobe
* All Rights Reserved.
*
* NOTICE: All information contained herein is, and remains
* the property of Adobe and its suppliers, if any. The intellectual
* and technical concepts contained herein are proprietary to Adobe
* and its suppliers and are protected by all applicable intellectual
* property laws, including trade secret and copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe.
**************************************************************************/

/**
 * Stores constants for the window types supported by the CSXS infrastructure.
 */
function CSXSWindowType() {}

/** Constant for the CSXS window type Panel. */
CSXSWindowType._PANEL = "Panel";

/** Constant for the CSXS window type Modeless. */
CSXSWindowType._MODELESS = "Modeless";

/** Constant for the CSXS window type ModalDialog. */
CSXSWindowType._MODAL_DIALOG = "ModalDialog";

/** EvalScript error message */
EvalScript_ErrMessage = "EvalScript error.";

/**
 * @class SystemPath
 * Stores constants for the locations of system paths.
 */
function SystemPath() {}

/** The path to user data.  */
SystemPath.USER_DATA = "userData";

/** The path to common files for Adobe applications.  */
SystemPath.COMMON_FILES = "commonFiles";

/** The path to the user's default document folder.  */
SystemPath.MY_DOCUMENTS = "myDocuments";

/** @deprecated. Use #SystemPath.USER_DATA */
SystemPath.APPLICATION = "application";

/** @deprecated. Use #SystemPath.USER_DATA */
SystemPath.EXTENSION = "extension";

/** The path to shared data.  */
SystemPath.HOST_APPLICATION = "hostApplication";

/**
 * @class ColorType
 * Stores color type constants.
 */
function ColorType() {}

/** RGB color type. */
ColorType.RGB = "rgb";

/** Gradient color type. */
ColorType.GRADIENT = "gradient";

/** Null color type. */
ColorType.NONE = "none";

/**
 * @class RGBColor
 * Stores an RGB color with red, green, blue, and alpha values.
 *
 * @param red   The red value, in the range [0.0 to 255.0].
 * @param green The green value, in the range [0.0 to 255.0].
 * @param blue  The blue value, in the range [0.0 to 255.0].
 * @param alpha The alpha (transparency) value, in the range [0.0 to 255.0].
 *      The default, 255.0, means that the color is fully opaque.
 *
 * @return A new RGBColor object.
 */
function RGBColor(red, green, blue, alpha) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
}

/**
 * @class Direction
 * A point value  in which the y component is 0 and the x component
 * is positive or negative for a right or left direction,
 * or the x component is 0 and the y component is positive or negative for
 * an up or down direction.
 *
 * @param x     The horizontal component of the point.
 * @param y     The vertical component of the point.
 *
 * @return A new Direction object.
 */
function Direction(x, y) {
    this.x = x;
    this.y = y;
}

/**
 * @class GradientStop
 * Stores gradient stop information.
 *
 * @param offset   The offset of the gradient stop, in the range [0.0 to 1.0].
 * @param rgbColor The color of the gradient at this stop, an RGBColor object.
 *
 * @return GradientStop object.
 */
function GradientStop(offset, rgbColor) {
    this.offset = offset;
    this.rgbColor = rgbColor;
}

/**
 * @class GradientColor
 * Stores gradient color information.
 *
 * @param type          The gradient type, must be "linear".
 * @param direction     A Direction object for the direction of the gradient
                (up, down, right, or left).
 * @param numStops          The number of stops in the gradient.
 * @param gradientStopList  An array of GradientStop objects.
 *
 * @return A new GradientColor object.
 */
function GradientColor(type, direction, numStops, arrGradientStop) {
    this.type = type;
    this.direction = direction;
    this.numStops = numStops;
    this.arrGradientStop = arrGradientStop;
}

/**
 * @class UIColor
 * Stores color information, including the type, anti-alias level, and specific color
 * values in a color object of an appropriate type.
 *
 * @param type          The color type, 1 for "rgb" and 2 for "gradient".
                The supplied color object must correspond to this type.
 * @param antialiasLevel    The anti-alias level constant.
 * @param color         A RGBColor or GradientColor object containing specific color information.
 *
 * @return A new UIColor object.
 */
function UIColor(type, antialiasLevel, color) {
    this.type = type;
    this.antialiasLevel = antialiasLevel;
    this.color = color;
}

/**
 * @class AppSkinInfo
 * Stores window-skin properties, such as color and font. All color parameter values are
 * expressed as decimal numbers, not hexadecimal numbers.
 *
 * @param baseFontFamily        The base font family of the application.
 * @param baseFontSize          The base font size of the application.
 * @param appBarBackgroundColor     The application bar background color.
 * @param panelBackgroundColor      The background color for panels.
 * @param appBarBackgroundColorSRGB     The application bar background color, as sRGB.
 * @param panelBackgroundColorSRGB      The background color for panels, as sRGB.
 * @param systemHighlightColor          The operating-system highlight color, as sRGB.
 *
 * @return AppSkinInfo object.
 */
function AppSkinInfo(baseFontFamily, baseFontSize, appBarBackgroundColor, panelBackgroundColor, appBarBackgroundColorSRGB, panelBackgroundColorSRGB, systemHighlightColor) {
    this.baseFontFamily = baseFontFamily;
    this.baseFontSize = baseFontSize;
    this.appBarBackgroundColor = appBarBackgroundColor;
    this.panelBackgroundColor = panelBackgroundColor;
    this.appBarBackgroundColorSRGB = appBarBackgroundColorSRGB;
    this.panelBackgroundColorSRGB = panelBackgroundColorSRGB;
    this.systemHighlightColor = systemHighlightColor;
}

/**
 * @class HostEnvironment
 * Stores information about the environment in which the extension is loaded.
 *
 * @param appName        The application name.
 * @param appVersion     The application version.
 * @param appLocale      The application current license locale.
 * @param appUILocale    The application current UI locale.
 * @param appId          The application ID.
 * @param isAppOnline    True if the application is currently online.
 * @param appSkinInfo    An AppSkinInfo object containing the application's default color and font styles.
 *
 * @return A new HostEnvironment object.
 */
function HostEnvironment(appName, appVersion, appLocale, appUILocale, appId, isAppOnline, appSkinInfo) {
    this.appName = appName;
    this.appVersion = appVersion;
    this.appLocale = appLocale;
    this.appUILocale = appUILocale;
    this.appId = appId;
    this.isAppOnline = isAppOnline;
    this.appSkinInfo = appSkinInfo;
}

/**
 * @class HostCapabilities
 * Stores information about the host capabilities.
 *
 * @param EXTENDED_PANEL_MENU True if the application supports panel menu.
 * @param EXTENDED_PANEL_ICONS True if the application supports panel icon.
 * @param DELEGATE_APE_ENGINE True if the application supports delegated APE engine.
 * @param SUPPORT_HTML_EXTENSIONS True if the application supports HTML extensions.
 * @param DISABLE_FLASH_EXTENSIONS True if the application disables FLASH extensions.
 *
 * @return A new HostCapabilities object.
 */
function HostCapabilities(EXTENDED_PANEL_MENU, EXTENDED_PANEL_ICONS, DELEGATE_APE_ENGINE, SUPPORT_HTML_EXTENSIONS, DISABLE_FLASH_EXTENSIONS) {
    this.EXTENDED_PANEL_MENU = EXTENDED_PANEL_MENU;
    this.EXTENDED_PANEL_ICONS = EXTENDED_PANEL_ICONS;
    this.DELEGATE_APE_ENGINE = DELEGATE_APE_ENGINE;
    this.SUPPORT_HTML_EXTENSIONS = SUPPORT_HTML_EXTENSIONS;
    this.DISABLE_FLASH_EXTENSIONS = DISABLE_FLASH_EXTENSIONS; // Since CS6
}

/**
 * @class ApiVersion
 * Stores current api version.
 *
 * Since 4.2.0
 *
 * @param major  The major version
 * @param minor  The minor version.
 * @param micro  The micro version.
 *
 * @return ApiVersion object.
 */
function ApiVersion(major, minor, micro) {
    this.major = major;
    this.minor = minor;
    this.micro = micro;
}

/**
 * @class MenuItemStatus
 * Stores flyout menu item status
 *
 * Since 5.2.0
 *
 * @param menuItemLabel  The menu item label.
 * @param enabled        True if user wants to enable the menu item.
 * @param checked        True if user wants to check the menu item.
 *
 * @return MenuItemStatus object.
 */
function MenuItemStatus(menuItemLabel, enabled, checked) {
    this.menuItemLabel = menuItemLabel;
    this.enabled = enabled;
    this.checked = checked;
}

/**
 * @class ContextMenuItemStatus
 * Stores context menu item status
 *
 * Since 5.2.0
 *
 * @param menuItemID     The menu item id.
 * @param enabled        True if user wants to enable the menu item.
 * @param checked        True if user wants to check the menu item.
 *
 * @return MenuItemStatus object.
 */
function ContextMenuItemStatus(menuItemID, enabled, checked) {
    this.menuItemID = menuItemID;
    this.enabled = enabled;
    this.checked = checked;
}

//------------------------------ CSInterface ----------------------------------

/**
 * @class CSInterface
 * This is the entry point to the CEP extensibility infrastructure.
 * Instantiate this object and use it to:
 * <ul>
 * <li>Access information about the host application in which an extension is running</li>
 * <li>Launch an extension</li>
 * <li>Register interest in event notifications, and dispatch events</li>
 * </ul>
 *
 * @return A new CSInterface object
 */
function CSInterface() {
    this.hostEnvironment = JSON.parse(window.__adobe_cep__.getHostEnvironment());
    this.hostCapabilities = JSON.parse(window.__adobe_cep__.getHostCapabilities());
    this.hostEnvironment.appSkinInfo = JSON.parse(this.hostEnvironment.appSkinInfo);

    this.hostEnvironment.appBarBackgroundColor = JSON.parse(this.hostEnvironment.appBarBackgroundColor);
    this.hostEnvironment.panelBackgroundColor = JSON.parse(this.hostEnvironment.panelBackgroundColor);

    var appBarBgColor = this.hostEnvironment.appBarBackgroundColor;
    var panelBgColor = this.hostEnvironment.panelBackgroundColor;

    if (!appBarBgColor.hasOwnProperty("color")) {
        appBarBgColor.color = appBarBgColor;
    }

    if (!panelBgColor.hasOwnProperty("color")) {
        panelBgColor.color = panelBgColor;
    }

    if (appBarBgColor.hasOwnProperty("color")) {
        var color = appBarBgColor.color;

        if (color) {
            color.red = Math.floor(color.red);
            color.green = Math.floor(color.green);
            color.blue = Math.floor(color.blue);
            color.alpha = Math.floor(color.alpha);
        }
    }

    if (panelBgColor.hasOwnProperty("color")) {
        var color = panelBgColor.color;

        if (color) {
            color.red = Math.floor(color.red);
            color.green = Math.floor(color.green);
            color.blue = Math.floor(color.blue);
            color.alpha = Math.floor(color.alpha);
        }
    }

    this.hostEnvironment.appSkinInfo.appBarBackgroundColor = appBarBgColor;
    this.hostEnvironment.appSkinInfo.panelBackgroundColor = panelBgColor;

    // Profile mask (new in CS6)
    this.hostEnvironment.appSkinInfo.panelBackgroundColorSRGB =
        JSON.parse(this.hostEnvironment.appSkinInfo.panelBackgroundColorSRGB);

    this.hostEnvironment.appSkinInfo.systemHighlightColor =
        JSON.parse(this.hostEnvironment.appSkinInfo.systemHighlightColor);
}

/**
 * Host capability constants
 */

/**
 * Capability that controls whether the host application supports panel menu
 * 
 * Since 5.2.0
 */
CSInterface.prototype.EXTENDED_PANEL_MENU = 1;

/**
 * Capability that controls whether the host application supports panel icon
 * 
 * Since 5.2.0
 */
CSInterface.prototype.EXTENDED_PANEL_ICONS = 2;

/**
 * Capability that controls whether the host application supports delegated APE engine
 * 
 * Since 5.2.0
 */
CSInterface.prototype.DELEGATE_APE_ENGINE = 4;

/**
 * Capability that controls whether the host application supports HTML extensions
 * 
 * Since 5.2.0
 */
CSInterface.prototype.SUPPORT_HTML_EXTENSIONS = 8;

/**
 * Capability that controls whether the host application disables FLASH extensions
 * 
 * Since 5.2.0
 */
CSInterface.prototype.DISABLE_FLASH_EXTENSIONS = 16;

/**
 * Callback for the success of a call to the synchronous "evalScript" function.
 *
 * @callback evalScriptSuccessCallback
 * @param result A string containing the result from the script
 */

/**
 * Callback for the failure of a call to the synchronous "evalScript" function.
 *
 * @callback evalScriptErrorCallback
 * @param error Error information returned by the ExtendScript engine.
 *            ExtendScript may also add information to the console.log.
 */

/**
 * Loads and launches another extension, or activates it if it is already loaded.
 *
 * Since 4.2.0
 *
 * @param extensionId   The extension's unique identifier.
 * @param startupParams Startup parameters, a string that is passed to the
 *      extension before it is launched.
 *
 * @example
 * To launch the extension "help" with ID "HLP" from this extension, call:
 *
 *     var CSInterface = new CSInterface();
 *     CSInterface.requestOpenExtension("HLP", "");
 */
CSInterface.prototype.requestOpenExtension = function(extensionId, params) {
    var params = params || "";
    window.__adobe_cep__.requestOpenExtension(extensionId, params);
};

/**
 * Dispatches a callback function to the extension of the specified ID.
 *
 * Since 6.0.0
 *
 * @param extensionId The extension's unique identifier.
 * @param callbackID The callback function in the target extension.
 * @param xdata     Arbitrary data that is passed to the callback function.
 *
 * @example
 * To dispatch the function "apiTest" with id "testAPI" to the extension "help" with ID "HLP" from this extension, call:
 *
 *     var CSInterface = new CSInterface();
 *     CSInterface.dispatchToExtension("HLP", "testAPI", {data: "example data"});
 */
CSInterface.prototype.dispatchToExtension = function(extensionId, callbackId, data) {
    window.__adobe_cep__.dispatchToExtension(extensionId, callbackId, JSON.stringify(data));
};

/**
 * Retrieves the callback function for the specified ID.
 *
 * Since 6.0.0
 *
 * @param callbackID The callback function's ID.
 *
 * @example
 * To add a callback function to this extension that can be called by other extensions, call:
 *
 *     var CSInterface = new CSInterface();
 *     CSInterface.setCallback("testAPI", apiTest);
 *
 *     function apiTest(xdata) {
 *         console.log("Data passed:", xdata);
 *     }
 */
CSInterface.prototype.setCallback = function(callbackId, callback) {
    if (!callbackId || !callback) {
        return;
    }

    window.__adobe_cep__.setCallback(callbackId, callback);
};

/**
 * Removes the callback function for the specified ID.
 *
 * Since 6.0.0
 *
 * @param callbackID The callback function's ID.
 *
 * @example
 * To remove the callback function with ID "testAPI" from this extension, call:
 *
 *     var CSInterface = new CSInterface();
 *     CSInterface.removeCallback("testAPI");
 */
CSInterface.prototype.removeCallback = function(callbackId) {
    if (!callbackId) {
        return;
    }

    window.__adobe_cep__.removeCallback(callbackId);
};

/**
 * Registers an interest in the specified CEP events, and handles them with the specified
 * callback function.
 *
 * Since 4.2.0
 *
 * @param eventType     A CSEvent type.
 * @param callback      The JavaScript callback function that handles the event.
 * @param data          Extra data that is passed to the callback function.
 *
 * @example
 * To register interest in the "documentCreated" event and handle it with the function
 * myDocCreatedHandler, call:
 *
 *     var CSInterface = new CSInterface();
 *     var callback = function(event) {
 *         myDocCreatedHandler(event);
 *     };
 *     CSInterface.addEventListener("documentCreated", callback);
 */
CSInterface.prototype.addEventListener = function(eventType, callback, data) {
    window.__adobe_cep__.addEventListener(eventType, callback, data);
};

/**
 * Removes the specified event listener.
 *
 * Since 4.2.0
 *
 * @param eventType The event type.
 * @param callback  The JavaScript callback function that was registered.
 * @param data      Optional data that accompanies the event listener.
 *
 * @example
 * To remove the event listener for the "documentCreated" event that was registered 
 * with myDocCreatedHandler:
 *
 *     var CSInterface = new CSInterface();
 *     var callback = function(event) {
 *         myDocCreatedHandler(event);
 *     };
 *     CSInterface.removeEventListener("documentCreated", callback);
 */
CSInterface.prototype.removeEventListener = function(eventType, callback, data) {
    window.__adobe_cep__.removeEventListener(eventType, callback, data);
};

/**
 * Triggers a CEP event programmatically. Developers can use this to create
 * custom events that can be handled by extensions.
 *
 * Since 4.2.0
 *
 * @param csEvent A custom event object of type CSEvent.
 */
CSInterface.prototype.dispatchEvent = function(event) {
    if (typeof event.data == "object") {
        event.data = JSON.stringify(event.data);
    }

    window.__adobe_cep__.dispatchEvent(event);
};

/**
 * Retrieves information about the host environment in which the extension is running.
 *
 * Since 4.2.0
 *
 * @return A \c #HostEnvironment object.
 */
CSInterface.prototype.getHostEnvironment = function() {
    return JSON.parse(window.__adobe_cep__.getHostEnvironment());
};

/**
 * Retrieves information about the host capabilities.
 *
 * Since 5.2.0
 *
 * @return A \c #HostCapabilities object.
 */
CSInterface.prototype.getHostCapabilities = function() {
    return JSON.parse(window.__adobe_cep__.getHostCapabilities());
};

/**
 * Triggers a request for the specified extension to be closed.
 *
 * Since 6.0.0
 * 
 * @param extensionId The ID of the extension to be closed.
 */
CSInterface.prototype.closeExtension = function() {
    window.__adobe_cep__.closeExtension();
};

/**
 * Retrieves a path for which a constant is defined in the system.
 *
 * Since 4.2.0
 *
 * @param pathType The path-type constant defined in \c #SystemPath ,
 *
 * @return The platform-specific system path string.
 */
CSInterface.prototype.getSystemPath = function(pathType) {
    var path = decodeURI(window.__adobe_cep__.getSystemPath(pathType));
    var OSVersion = this.getOSInformation();
    if (OSVersion.indexOf("Windows") >= 0) {
        path = path.replace("file:///", "");
    } else if (OSVersion.indexOf("Mac") >= 0) {
        path = path.replace("file://", "");
    }
    return path;
};

/**
 * Evaluates a JavaScript script, which can use the JavaScript DOM
 * of the host application.
 *
 * Since 4.2.0
 *
 * @param script    The JavaScript script.
 * @param callback  Optional. A callback function that receives the result of execution.
 *          If execution fails, the callback function receives the error message \c EvalScript_ErrMessage.
 */
CSInterface.prototype.evalScript = function(script, callback) {
    if (callback === null || callback === undefined) {
        callback = function(result) {
            return;
        };
    }
    window.__adobe_cep__.evalScript(script, callback);
};

/**
 * Retrieves the unique identifier of the application.
 * in which the extension is currently running.
 *
 * Since 4.2.0
 *
 * @return The unique ID of the application.
 */
CSInterface.prototype.getApplicationID = function() {
    var appId = this.hostEnvironment.appId;
    return appId;
};

/**
 * Retrieves host capability information for the application
 * in which the extension is currently running.
 *
 * Since 4.2.0
 *
 * @return An object containing capability information.
 */
CSInterface.prototype.getHostCapabilities = function() {
    return JSON.parse(window.__adobe_cep__.getHostCapabilities());
};

/**
 * Gets the current API version.
 *
 * Since 4.2.0
 *
 * @return The API version string.
 */
CSInterface.prototype.getCurrentApiVersion = function() {
    return JSON.parse(window.__adobe_cep__.getCurrentApiVersion());
};

/**
 * Opens a URL in the default system browser.
 *
 * Since 4.2.0
 *
 * @param url The URL to be opened, expressed as a string.
 */
CSInterface.prototype.openURLInDefaultBrowser = function(url) {
    window.cep.util.openURLInDefaultBrowser(url);
};

/**
 * Retrieves extension ID.
 *
 * Since 4.2.0
 *
 * @return The extension ID.
 */
CSInterface.prototype.getExtensionID = function() {
    return window.__adobe_cep__.getExtensionId();
};

/**
 * Retrieves the scale factor of the screen.
 * On Windows platform, the value might be different from the actual scale factor,
 * due to high DPI feature introduced since Windows 8.1.
 * Since version 5.0, CEP provides resolution scale support for high DPI monitors.
 *
 * Since 4.2.0
 *
 * @return The value for the scale factor, always greater than or equal to 1.0.
 */
CSInterface.prototype.getScaleFactor = function() {
    return window.__adobe_cep__.getScaleFactor();
};

/**
 * Set a handler for user session updates.
 *
 * Since 5.0.0
 *
 * @param callback    The callback function.
 */
CSInterface.prototype.setSessionUpdateCallback = function(callback) {
    window.__adobe_cep__.setSessionUpdateCallback(callback);
};

/**
 * get user session updates information.
 *
 * Since 5.0.0
 */
CSInterface.prototype.getUserSessionUpdateInfo = function() {
    return window.__adobe_cep__.getUserSessionUpdateInfo();
};

/**
 * Set a handler for information updates.
 *
 * Since 10.0.0
 *
 * @param callback    The callback function.
 */
CSInterface.prototype.setInfoUpdateCallback = function(callback) {
    window.__adobe_cep__.setInfoUpdateCallback(callback);
};

/**
 * get information updates.
 *
 * Since 10.0.0
 */
CSInterface.prototype.getInfoUpdate = function() {
    return window.__adobe_cep__.getInfoUpdate();
};

/**
 * Retrieves information about where the panels are placed in the host application.
 *
 * Since 6.0.0
 *
 * @return JSON Object containing the host application's panels and their locations.
 */
CSInterface.prototype.getPanelFlyoutMenu = function() {
    var flyoutMenuItems = JSON.parse(window.__adobe_cep__.getPanelFlyoutMenu());
    return flyoutMenuItems;
};

/**
 * Updates the content of a panel's flyout menu.
 *
 * Since 6.0.0
 *
 * @param menu    A JSON Object containing the information on the panel's flyout menu.
 * @param callback    The callback function.
 *
 * @see CSInterface.prototype.getPanelFlyoutMenu
 */
CSInterface.prototype.updatePanelMenuItem = function(menu, callback) {
    window.__adobe_cep__.updatePanelMenuItem(JSON.stringify(menu), callback);
};

/**
 * Get the context menu associated with this extension panel.
 *
 * Since 8.0.0
 *
 * @param callback    The callback function.
 *
 * @see CSInterface.prototype.updateContextMenuItem
 */
CSInterface.prototype.getContextMenu = function(callback) {
    window.__adobe_cep__.getContextMenu(callback);
};

/**
 * Update the context menu associated with this extension panel. 
 * A menu item with same menu ID will be updated if found.
 * If the menu ID is null, a new item will be appended to context menu.
 * The default behavior for an enabled context menu item is to invoke a function
 * with the same menu ID on the extension's script in the active tab. Extensions
 * can register menu item callback for a specific context menu item using registerContextMenuItemCallback
 *
 * Since 8.0.0
 *
 * @param menuItems    A JSON Object containing information about the context menu items.
 * @param callback    The callback function.
 *
 * @see CSInterface.prototype.getContextMenu
 * @see CSInterface.prototype.registerContextMenuItemCallback
 */
CSInterface.prototype.updateContextMenuItem = function(menuItems, callback) {
    window.__adobe_cep__.updateContextMenuItem(JSON.stringify(menuItems), callback);
};

/**
 * Register callback function for a specific context menu item.
 * The function will be invoked when the menu item is clicked,
 * The callback function takes no parameter and returns void.
 * Extensions can access the menu item information from e.g. getCurrentContextMenuItem()
 *
 * Since 8.0.0 
 *
 * @param menuItemID    String ID of the menu item to be registered the callback function.
 * @param callback    The callback function.
 *
 * @see CSInterface.prototype.updateContextMenuItem
 * @see CSInterface.prototype.getCurrentContextMenuItem
 */
CSInterface.prototype.registerContextMenuItemCallback = function(menuItemID, callback) {
    window.__adobe_cep__.registerContextMenuItemCallback(menuItemID, callback);
};

/**
 * Get the current context menu item when callback function is invoked.
 *
 * Since 8.0.0 
 *
 * @param callback    The callback function.
 *
 * @see CSInterface.prototype.updateContextMenuItem
 * @see CSInterface.prototype.registerContextMenuItemCallback
 */
CSInterface.prototype.getCurrentContextMenuItem = function(callback) {
    return JSON.parse(window.__adobe_cep__.getCurrentContextMenuItem());
};

/**
 * Set the title of the extension window.
 * This function doesn't work in panel extension.
 *
 * Since 6.0.0
 *
 * @param title    The window title, which can be HTML.
 */
CSInterface.prototype.setWindowTitle = function(title) {
    window.__adobe_cep__.invokeSync("setWindowTitle", title);
};

/**
 * Get the title of the extension window.
 * This function doesn't work in panel extension.
 *
 * Since 6.0.0
 *
 * @return The window title.
 */
CSInterface.prototype.getWindowTitle = function() {
    return window.__adobe_cep__.invokeSync("getWindowTitle", "");
};

/**
 * Retrieve a pointer to the current content window while in a custom window.
 * This pointer can be used to enable interaction between the extension's content
 * and the main content of the extension.
 *
 * Since 10.0.0
 *
 * @return A window pointer.
 */
CSInterface.prototype.getMainWindow = function() {
    return window;
};

/**
 * Focus on the current window.
 * 
 * Since 6.1.0
 *
 * @param callback    Optional. A callback function to be called when the window is focused. 
 */
CSInterface.prototype.bringToFront = function(callback) {
    if (callback) {
        window.__adobe_cep__.bringToFront(callback);
    } else {
        window.__adobe_cep__.bringToFront(function() {});
    }
};

/**
 * Resize window.
 *
 * Since 6.1.0
 *
 * @param width    The new width
 * @param height    The new height
 */
CSInterface.prototype.resizeContent = function(width, height) {
    window.__adobe_cep__.resizeContent(width, height);
};

/**
 * Register the interest in specific key events to the rich application.
 * This function works only for modeless extension with custom window frame.
 *
 * Since 6.1.0
 *
 * @param keyEventsInterest    A JSON string describing the interest in key events. Example: {"keyup":true, "keydown":true, "keypress":true}
 *                             A value of true means the extension is interested in the corresponding key event type, while false means not interested.
 */
CSInterface.prototype.registerKeyEventsInterest = function(keyEventsInterest) {
    window.__adobe_cep__.registerKeyEventsInterest(keyEventsInterest);
};

/**
 * Set the storage mode.
 * By default, the runtime (CEP) isolates data access / storage per extension & per host.
 * This function sets an option that when enabled to VirtualMachine (vm) mode,
 * the extension's data will be stored per VM instead.
 *
 * Since 6.1.0
 *
 * @param mode    The mode value, VirtualMachine or PerUser.
 */
CSInterface.prototype.setStorageMode = function(mode) {
    window.__adobe_cep__.setStorageMode(mode);
};

/**
 * Set the extension to auto-visibility mode in the host application.
 *
 * Since 6.1.0
 *
 * @param isAutoVisibile    True for auto-visible, false for auto-hidden.
 * @param callback          Optional. A callback function to be called when the auto-visibility mode is set.
 */
CSInterface.prototype.setAutoVisibility = function(isAutoVisible, callback) {
    if (callback) {
        window.__adobe_cep__.setAutoVisibility(isAutoVisible, callback);
    } else {
        window.__adobe_cep__.setAutoVisibility(isAutoVisible, function() {});
    }
};

/**
 * Register an interest in specific context menu event.
 * This function works for both modeless and panel extension.
 *
 * Since 7.0.0
 *
 * @param contextMenuItems    A JSON string that describes the context menu events to be registered.
 *                                 Example: [{"label":"Refresh", "id":"refresh", "enabled":true, "checkable":true},
 *                                    {"label":"Forward", "id":"forward", "enabled":false, "checkable":false}]
 */
CSInterface.prototype.registerContextMenuItems = function(contextMenuItems) {
    window.__adobe_cep__.registerContextMenuItems(contextMenuItems);
};

/**
 * Set current context menu item to check and enable/disable.
 * This function works for panel extension.
 *
 * Since 7.0.0
 *
 * @param menuItemID          The menu item ID.
 * @param enabled            True for enabled, false for disabled.
 * @param checked            True for checked, false for unchecked.
 */
CSInterface.prototype.setContextMenuByID = function(menuItemID, enabled, checked) {
    var itemStatus = JSON.stringify({
        "menuItemID": menuItemID,
        "enabled": enabled,
        "checked": checked
    });
    window.__adobe_cep__.setContextMenuByID(itemStatus);
};

/**
 * Set context menu by JSON string.
 * This function works for panel extension.
 *
 * Since 7.0.0
 *
 * @param menuItemsStatus    A JSON string that describes the status of the context menu items.
 *                                 Example: [{"id":"refresh", "enabled":true, "checked":true},
 *                                    {"id":"forward", "enabled":false, "checked":false}].
 */
CSInterface.prototype.setContextMenu = function(menuItemsStatus) {
    window.__adobe_cep__.setContextMenu(menuItemsStatus);
};

/**
 * Check if the current operating system is a supported Mac OS version.
 *
 * Since 7.0.0
 *
 * @return True if the current operating system is Mac OS and the version is higher than or equal to 10.9.0, false otherwise.
 */
CSInterface.prototype.isSupportedMacVersion = function() {
    var osInfo = this.getOSInformation();
    if (osInfo) {
        return osInfo.indexOf("Mac") >= 0 && compareVersions(osInfo.substring(osInfo.indexOf("Mac") + 4), 10, 9) >= 0;
    }
    return false;
};

/**
 * Check for presence and version of required runtime, typically CEP/CSXS
 *
 * Since 8.0.0
 *
 * @param requiredRuntime   Name of runtime to get version for
 * @param apiVersion        Optional minimum required runtime version
 *
 * @return True if the required runtime and version is present, false otherwise
 */
CSInterface.prototype.isRequiredRuntimeAvailable = function(requiredRuntime, apiVersion) {
    var runtimeInfos = JSON.parse(window.__adobe_cep__.getRequiredRuntimeList());
    for (var i = 0; i < runtimeInfos.length; i++) {
        var runtimeInfo = runtimeInfos[i];

        // Case-insensitive match
        if (runtimeInfo.name && runtimeInfo.name.toLowerCase() === requiredRuntime.toLowerCase()) {
            return !apiVersion || compareVersions(runtimeInfo.version, apiVersion) >= 0;
        }
    }
    return false;
};

/**
 * Launch a process.
 *
 * Since 7.0.0
 *
 * @param processPath        The path of the process to launch.
 * @param cmdLine          The command line parameters to pass to the process.
 * @param callback          The callback function to be called when the process is launched.
 *                                 The function takes a single parameter, which is the return value of this function.
 *                                 The return value is true if the launch succeeded, false if it failed.
 */
CSInterface.prototype.launchProcess = function(processPath, cmdLine, callback) {
    return window.__adobe_cep__.launchProcess(processPath, cmdLine, callback);
};

/**
 * Write installation information to a jsx file.
 *
 * Since 8.0.0
 */
CSInterface.prototype.dumpInstallationInfo = function() {
    return window.__adobe_cep__.dumpInstallationInfo();
};

/**
 * Retrieve version information for the given extension.
 *
 * Since 8.0.0
 *
 * @param extensionId        The id of the extension to retrieve the version information.
 * @param callback          The callback function to be called when the process is complete.
 *                          The function takes a single parameter, which is the version string or an error message.
 */
CSInterface.prototype.getExtensionVersion = function(extensionId, callback) {
    window.__adobe_cep__.getExtensionVersion(extensionId, callback);
};

/**
 * Register a callback function for extension install/uninstall events.
 *
 * Since 8.0.0
 *
 * @param callback          The callback function.
 */
CSInterface.prototype.setApplicationExtensionsChangeCallback = function(callback) {
    window.__adobe_cep__.setApplicationExtensionsChangeCallback(callback);
};

/**
 * Initiate the 'Save' dialog.
 * 
 * Since 9.0.0
 *
 * @param urlToOpen        The default URL shown in the dialog. Can be a path to a local file.
 * @param parameters        Array of parameters for the dialog. Available parameters: filter
 * @param callback          The callback function to be called when the dialog is closed.
 *                          The callback function takes a single parameter, which is a URL string to the selected file
 *                          (or null if the dialog is canceled).
 */
CSInterface.prototype.initiateSaveDialog = function(urlToOpen, parameters, callback) {
    window.__adobe_cep__.initiateSaveDialog(urlToOpen, parameters, callback);
};

/**
 * Initiate the 'Open' dialog.
 * 
 * Since 9.0.0
 *
 * @param allowMultiple        If true, allow the user to select multiple files.
 * @param urlToOpen            The default URL shown in the dialog. Can be a path to a local file.
 * @param parameters            Array of parameters for the dialog. Available parameters: filter
 * @param callback              The callback function to be called when the dialog is closed.
 *                              The callback function takes a single parameter, which is a URL string to the selected file(s)
 *                              (or null if the dialog is canceled).
 *                              - If allowMultiple is true, the parameter is an array of URLs.
 *                              - If allowMultiple is false, the parameter is a single URL.
 */
CSInterface.prototype.initiateOpenDialog = function(allowMultiple, urlToOpen, parameters, callback) {
    window.__adobe_cep__.initiateOpenDialog(allowMultiple, urlToOpen, parameters, callback);
};

/**
 * The THEME_COLOR_CHANGED_EVENT is dispatched to the extension when the host application's theme is changed.
 * The extension can use this event to update its UI based on the new theme.
 * 
 * Since 4.2.0
 */
CSInterface.THEME_COLOR_CHANGED_EVENT = "com.adobe.csxs.events.ThemeColorChanged";

/**
 * @class CSEvent
 * Base Event class
 *
 * @param type        The event type.
 * @param scope       The event scope.
 * @param appId       The application ID.
 * @param extensionId The extension ID.
 *
 * @return CSEvent object
 */
function CSEvent(type, scope, appId, extensionId) {
    this.type = type;
    this.scope = scope;
    this.appId = appId;
    this.extensionId = extensionId;
    this.data = "";
}

/**
 * Event scope constants
 */
CSEvent.prototype.SCOPE_SYSTEM = "GLOBAL";
CSEvent.prototype.SCOPE_APPLICATION = "APPLICATION";
CSEvent.prototype.SCOPE_EXTENSION = "EXTENSION";

/**
 * Helper function to compare versions.
 *
 * @param v1            First version to compare.
 * @param v2            Second version to compare.
 * @param majorVersion  Optional. Major version to compare.
 * @param minorVersion  Optional. Minor version to compare.
 * @param microVersion  Optional. Micro version to compare.
 *
 * @return A numeric value: -1, 0, or 1.
 *      -1 if v1 < v2
 *       0 if v1 = v2
 *       1 if v1 > v2
 */
function compareVersions(v1, v2, majorVersion, minorVersion, microVersion) {
    var v1Parts = String(v1).split('.');
    var v2Parts = String(v2).split('.');

    if (v1Parts.length > 0) {
        var v1Major = parseInt(v1Parts[0]) || 0;
        if (majorVersion && v1Major != majorVersion) {
            return v1Major > majorVersion ? 1 : -1;
        }
        if (v2Parts.length > 0) {
            var v2Major = parseInt(v2Parts[0]) || 0;
            if (v1Major != v2Major) {
                return v1Major > v2Major ? 1 : -1;
            }

            if (v1Parts.length > 1) {
                var v1Minor = parseInt(v1Parts[1]) || 0;
                if (minorVersion && v1Minor != minorVersion) {
                    return v1Minor > minorVersion ? 1 : -1;
                }
                if (v2Parts.length > 1) {
                    var v2Minor = parseInt(v2Parts[1]) || 0;
                    if (v1Minor != v2Minor) {
                        return v1Minor > v2Minor ? 1 : -1;
                    }

                    if (v1Parts.length > 2) {
                        var v1Micro = parseInt(v1Parts[2]) || 0;
                        if (microVersion && v1Micro != microVersion) {
                            return v1Micro > microVersion ? 1 : -1;
                        }
                        if (v2Parts.length > 2) {
                            var v2Micro = parseInt(v2Parts[2]) || 0;
                            if (v1Micro != v2Micro) {
                                return v1Micro > v2Micro ? 1 : -1;
                            }
                        } else {
                            return v1Micro > 0 ? 1 : 0;
                        }
                    } else if (v2Parts.length > 2) {
                        var v2Micro = parseInt(v2Parts[2]) || 0;
                        return v2Micro > 0 ? -1 : 0;
                    }
                } else {
                    return v1Minor > 0 ? 1 : 0;
                }
            } else if (v2Parts.length > 1) {
                var v2Minor = parseInt(v2Parts[1]) || 0;
                return v2Minor > 0 ? -1 : 0;
            }
        }
    }

    return 0;
}

/**
 * Retrieve the OS information using the appropriate native API.
 *
 * @return A string containing OS version information.
 */
CSInterface.prototype.getOSInformation = function() {
    var userAgent = navigator.userAgent;

    if (navigator.platform == "Win32" || navigator.platform == "Windows") {
        var winVersion = "Windows";
        var winBit = "";
        if (userAgent.indexOf("Windows") > -1) {
            if (userAgent.indexOf("Windows NT 10") > -1) {
                winVersion = "Windows 10";
            } else if (userAgent.indexOf("Windows NT 6.3") > -1) {
                winVersion = "Windows 8.1";
            } else if (userAgent.indexOf("Windows NT 6.2") > -1) {
                winVersion = "Windows 8";
            } else if (userAgent.indexOf("Windows NT 6.1") > -1) {
                winVersion = "Windows 7";
            } else if (userAgent.indexOf("Windows NT 6.0") > -1) {
                winVersion = "Windows Vista";
            } else if (userAgent.indexOf("Windows NT 5.1") > -1) {
                winVersion = "Windows XP";
            } else if (userAgent.indexOf("Windows NT 5.0") > -1) {
                winVersion = "Windows 2000";
            }

            if (userAgent.indexOf("WOW64") > -1 || userAgent.indexOf("Win64") > -1) {
                winBit = " 64-bit";
            } else {
                winBit = " 32-bit";
            }
        }

        return winVersion + winBit;
    } else if (navigator.platform == "MacIntel" || navigator.platform == "Macintosh") {
        var agentStr = userAgent;
        var verLength = 0;
        var verStr = "";
        var macOS = "Mac OS";
        
        if (agentStr.indexOf("Version/") > -1) {
            verLength = agentStr.indexOf("Version/") + 8;
            verStr = agentStr.substring(verLength);
            verStr = verStr.substring(0, verStr.indexOf(" "));
            if (verStr.length > 0) {
                if (verStr.indexOf("10.14") > -1) {
                    macOS = "Mac OS 10.14 Mojave";
                } else if (verStr.indexOf("10.13") > -1) {
                    macOS = "Mac OS 10.13 High Sierra";
                } else if (verStr.indexOf("10.12") > -1) {
                    macOS = "Mac OS 10.12 Sierra";
                } else if (verStr.indexOf("10.11") > -1) {
                    macOS = "Mac OS 10.11 El Capitan";
                } else if (verStr.indexOf("10.10") > -1) {
                    macOS = "Mac OS 10.10 Yosemite";
                } else if (verStr.indexOf("10.9") > -1) {
                    macOS = "Mac OS 10.9 Mavericks";
                } else {
                    macOS = "Mac OS " + verStr;
                }
            }
        }
        return macOS;
    }

    return "Unknown OS";
};