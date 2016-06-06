## Modules

<dl>
<dt><a href="#module_DataEnrichment">DataEnrichment</a></dt>
<dd><p>enriches delivered data with default values</p>
</dd>
<dt><a href="#module_Helper">Helper</a></dt>
<dd><p>Helper for general purposes</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#Bounds">Bounds</a></dt>
<dd></dd>
<dt><a href="#Cluster">Cluster</a></dt>
<dd></dd>
<dt><a href="#Interact">Interact</a></dt>
<dd></dd>
<dt><a href="#Label">Label</a></dt>
<dd></dd>
<dt><a href="#LatLng">LatLng</a></dt>
<dd></dd>
<dt><a href="#MappedJS">MappedJS</a></dt>
<dd></dd>
<dt><a href="#MapInformation">MapInformation</a></dt>
<dd></dd>
<dt><a href="#Marker">Marker</a></dt>
<dd></dd>
<dt><a href="#MarkerClusterer">MarkerClusterer</a></dt>
<dd></dd>
<dt><a href="#Point">Point</a></dt>
<dd></dd>
<dt><a href="#Publisher">Publisher</a></dt>
<dd></dd>
<dt><a href="#Rectangle">Rectangle</a></dt>
<dd></dd>
<dt><a href="#StateHandler">StateHandler</a></dt>
<dd></dd>
<dt><a href="#Tile">Tile</a></dt>
<dd></dd>
<dt><a href="#TileMap">TileMap</a></dt>
<dd></dd>
<dt><a href="#ToolTip">ToolTip</a></dt>
<dd></dd>
<dt><a href="#View">View</a></dt>
<dd></dd>
</dl>

## Objects

<dl>
<dt><a href="#Events">Events</a> : <code>object</code></dt>
<dd><p>Helper for naming events</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#STATES">STATES</a> : <code>Array</code></dt>
<dd><p>States of a tile</p>
</dd>
</dl>

<a name="module_DataEnrichment"></a>

## DataEnrichment
enriches delivered data with default values

**Author:** Michael Duve <mduve@designmail.net>  
**Copyright**: Michael Duve 2016  

* [DataEnrichment](#module_DataEnrichment)
    * [.marker(data)](#module_DataEnrichment.marker) ⇒ <code>object</code>
    * [.mapSettings(data)](#module_DataEnrichment.mapSettings) ⇒ <code>object</code>

<a name="module_DataEnrichment.marker"></a>

### DataEnrichment.marker(data) ⇒ <code>object</code>
enriches marker data with all needed data

**Kind**: static method of <code>[DataEnrichment](#module_DataEnrichment)</code>  
**Returns**: <code>object</code> - enriched marker data  
**Params**

- data <code>object</code> - specified data for marker

<a name="module_DataEnrichment.mapSettings"></a>

### DataEnrichment.mapSettings(data) ⇒ <code>object</code>
enriches map data with all needed data

**Kind**: static method of <code>[DataEnrichment](#module_DataEnrichment)</code>  
**Returns**: <code>object</code> - enriched mapsettings data  
**Params**

- data <code>object</code> - specified data for mapsettings

<a name="module_Helper"></a>

## Helper
Helper for general purposes

**Author:** Michael Duve <mduve@designmail.net>  
**Copyright**: Michael Duve 2016  

* [Helper](#module_Helper)
    * [.requestJSON(filename, callback)](#module_Helper.requestJSON) ⇒ <code>Helper</code>
    * [.clamp(v, min, max)](#module_Helper.clamp) ⇒ <code>number</code>
    * [.loadImage(cb)](#module_Helper.loadImage) ⇒ <code>Helper</code>
    * [.getFile(url, callback)](#module_Helper.getFile) ⇒ <code>Helper</code>
    * [.forEach(a, cb)](#module_Helper.forEach) ⇒ <code>Helper</code>
    * [.linearEase(t, b, c, d)](#module_Helper.linearEase) ⇒ <code>number</code>
    * [.toRadians(degrees)](#module_Helper.toRadians) ⇒ <code>number</code>
    * [.isMouse()](#module_Helper.isMouse) ⇒ <code>Boolean</code>
    * [.isTouch()](#module_Helper.isTouch) ⇒ <code>Boolean</code>
    * [.isIE()](#module_Helper.isIE) ⇒ <code>Boolean</code>
    * [.scrollEvent()](#module_Helper.scrollEvent) ⇒ <code>string</code>

<a name="module_Helper.requestJSON"></a>

### Helper.requestJSON(filename, callback) ⇒ <code>Helper</code>
request json-data from given file and calls callback on success

**Kind**: static method of <code>[Helper](#module_Helper)</code>  
**Returns**: <code>Helper</code> - Helper object for chaining  
**Params**

- filename <code>string</code> - path to file
- callback <code>Helper~requestJSONCallback</code> - function called when data is loaded successfully

<a name="module_Helper.clamp"></a>

### Helper.clamp(v, min, max) ⇒ <code>number</code>
clamps a value to specified min and max

**Kind**: static method of <code>[Helper](#module_Helper)</code>  
**Returns**: <code>number</code> - clamped value  
**Params**

- v <code>number</code> - = 0 - specified value to clamp
- min <code>number</code> - = v - minimum value to clamp to
- max <code>number</code> - = v - maximum value to clamp to

<a name="module_Helper.loadImage"></a>

### Helper.loadImage(cb) ⇒ <code>Helper</code>
loads an image and calls callback on success

**Kind**: static method of <code>[Helper](#module_Helper)</code>  
**Returns**: <code>Helper</code> - Helper object for chaining  
**Params**

- cb <code>Helper~loadImageCallback</code> - callback-function on success

<a name="module_Helper.getFile"></a>

### Helper.getFile(url, callback) ⇒ <code>Helper</code>
request data from given file and calls callback on success

**Kind**: static method of <code>[Helper](#module_Helper)</code>  
**Returns**: <code>Helper</code> - Helper object for chaining  
**Params**

- url <code>string</code> - path to file
- callback <code>Helper~getFileCallback</code> - function called when data is loaded successfully

<a name="module_Helper.forEach"></a>

### Helper.forEach(a, cb) ⇒ <code>Helper</code>
for each helper

**Kind**: static method of <code>[Helper](#module_Helper)</code>  
**Returns**: <code>Helper</code> - Helper object for chaining  
**Params**

- a <code>Array.&lt;Object&gt;</code> - array to iterate over each value
- cb <code>Helper~forEachCallback</code> - callback for each object

<a name="module_Helper.linearEase"></a>

### Helper.linearEase(t, b, c, d) ⇒ <code>number</code>
formula for linear easing

**Kind**: static method of <code>[Helper](#module_Helper)</code>  
**Returns**: <code>number</code> - linear value at specific time  
**Params**

- t <code>number</code> - current time
- b <code>[Point](#Point)</code> - start value
- c <code>[Point](#Point)</code> - total difference to start
- d <code>number</code> - duration

<a name="module_Helper.toRadians"></a>

### Helper.toRadians(degrees) ⇒ <code>number</code>
convert degree to radian

**Kind**: static method of <code>[Helper](#module_Helper)</code>  
**Returns**: <code>number</code> - converted radian  
**Params**

- degrees <code>number</code> - specified degrees

<a name="module_Helper.isMouse"></a>

### Helper.isMouse() ⇒ <code>Boolean</code>
checks if mouse is possible

**Kind**: static method of <code>[Helper](#module_Helper)</code>  
**Returns**: <code>Boolean</code> - if true, mouse is possible  
<a name="module_Helper.isTouch"></a>

### Helper.isTouch() ⇒ <code>Boolean</code>
checks if touch is possible

**Kind**: static method of <code>[Helper](#module_Helper)</code>  
**Returns**: <code>Boolean</code> - if true, touch is possible  
<a name="module_Helper.isIE"></a>

### Helper.isIE() ⇒ <code>Boolean</code>
checks if IE is used

**Kind**: static method of <code>[Helper](#module_Helper)</code>  
**Returns**: <code>Boolean</code> - if true, IE is used  
<a name="module_Helper.scrollEvent"></a>

### Helper.scrollEvent() ⇒ <code>string</code>
gets cross-browser scroll-event

**Kind**: static method of <code>[Helper](#module_Helper)</code>  
**Returns**: <code>string</code> - name of scroll event  
<a name="Bounds"></a>

## Bounds
**Kind**: global class  

* [Bounds](#Bounds)
    * [new Bounds(northWest, southEast)](#new_Bounds_new)
    * [.width](#Bounds+width) ⇒ <code>number</code>
    * [.height](#Bounds+height) ⇒ <code>number</code>

<a name="new_Bounds_new"></a>

### new Bounds(northWest, southEast)
**Returns**: <code>[Bounds](#Bounds)</code> - instance of Bounds for chaining  
**Params**

- northWest <code>number</code> - = new LatLng() - representation of northWest boundary
- southEast <code>number</code> - = new LatLng() - representation of southEast boundary

<a name="Bounds+width"></a>

### bounds.width ⇒ <code>number</code>
get width of boundaries

**Kind**: instance property of <code>[Bounds](#Bounds)</code>  
**Returns**: <code>number</code> - distance between east and west boundary  
<a name="Bounds+height"></a>

### bounds.height ⇒ <code>number</code>
get height of boundaries

**Kind**: instance property of <code>[Bounds](#Bounds)</code>  
**Returns**: <code>number</code> - distance between north and south boundary  
<a name="Cluster"></a>

## Cluster
**Kind**: global class  
<a name="Interact"></a>

## Interact
**Kind**: global class  

* [Interact](#Interact)
    * [new Interact(settings)](#new_Interact_new)
    * [.timeToLastMove](#Interact+timeToLastMove) ⇒ <code>number</code>
    * [.time](#Interact+time) ⇒ <code>number</code>
    * [.dataClone](#Interact+dataClone) ⇒ <code>Object</code>
    * [.getDefaultSettings()](#Interact+getDefaultSettings) ⇒ <code>Object</code>
    * [.getDefaultCallbacks()](#Interact+getDefaultCallbacks) ⇒ <code>Object</code>
    * [.getDefaultEventNames()](#Interact+getDefaultEventNames) ⇒ <code>Object</code>
    * [.getDefaultData()](#Interact+getDefaultData) ⇒ <code>Object</code>
    * [.handleViewport(viewport)](#Interact+handleViewport) ⇒ <code>[Interact](#Interact)</code>
    * [.init(container)](#Interact+init) ⇒ <code>[Interact](#Interact)</code>
    * [.bindEvents()](#Interact+bindEvents) ⇒ <code>[Interact](#Interact)</code>
    * [.bindIEEvents()](#Interact+bindIEEvents) ⇒ <code>[Interact](#Interact)</code>
    * [.bindTouchEvents()](#Interact+bindTouchEvents) ⇒ <code>[Interact](#Interact)</code>
    * [.bindMouseEvents()](#Interact+bindMouseEvents) ⇒ <code>[Interact](#Interact)</code>
    * [.preHandle(event)](#Interact+preHandle) ⇒ <code>Object</code>
    * [.scrollHandler(event)](#Interact+scrollHandler) ⇒ <code>Boolean</code>
    * [.normalizeWheelDelta(event)](#Interact+normalizeWheelDelta) ⇒ <code>number</code>
    * [.isPointerEvent(event)](#Interact+isPointerEvent) ⇒ <code>Boolean</code>
    * [.calculateStart(e)](#Interact+calculateStart) ⇒ <code>Object</code>
    * [.handlePointerEventStart(data, e)](#Interact+handlePointerEventStart) ⇒ <code>Object</code>
    * [.handleTouchEventStart(data, e)](#Interact+handleTouchEventStart) ⇒ <code>Object</code>
    * [.getPointerArray()](#Interact+getPointerArray) ⇒ <code>Object</code>
    * [.handleMultitouchStart(positionsArray)](#Interact+handleMultitouchStart) ⇒ <code>Object</code>
    * [.handleSingletouchStart(position)](#Interact+handleSingletouchStart) ⇒ <code>Object</code>
    * [.takeActionStart(action)](#Interact+takeActionStart) ⇒ <code>[Interact](#Interact)</code>
    * [.startHandler(event)](#Interact+startHandler) ⇒ <code>Boolean</code>
    * [.clearTimeouts(timeout)](#Interact+clearTimeouts) ⇒ <code>[Interact](#Interact)</code>
    * [.calculateMove(e)](#Interact+calculateMove) ⇒ <code>Object</code>
    * [.handlePointerEventMove(data, e)](#Interact+handlePointerEventMove) ⇒ <code>Object</code>
    * [.handleTouchEventMove(data, e)](#Interact+handleTouchEventMove) ⇒ <code>Object</code>
    * [.handleMultitouchMove(positionsArray)](#Interact+handleMultitouchMove) ⇒ <code>Object</code>
    * [.handleSingletouchMove(position)](#Interact+handleSingletouchMove) ⇒ <code>Object</code>
    * [.moveHandler(event)](#Interact+moveHandler) ⇒ <code>Boolean</code>
    * [.handlePinchAndZoom()](#Interact+handlePinchAndZoom) ⇒ <code>[Interact](#Interact)</code>
    * [.positionDidNotChange(e)](#Interact+positionDidNotChange) ⇒ <code>Boolean</code>
    * [.calculateEnd(e)](#Interact+calculateEnd) ⇒ <code>Object</code>
    * [.handleSingletouchEnd(position)](#Interact+handleSingletouchEnd) ⇒ <code>Object</code>
    * [.takeActionEnd(action)](#Interact+takeActionEnd) ⇒ <code>[Interact](#Interact)</code>
    * [.endHandler(event)](#Interact+endHandler) ⇒ <code>Boolean</code>
    * [.handleSwipeAndFlick()](#Interact+handleSwipeAndFlick) ⇒ <code>[Interact](#Interact)</code>
    * [.handleMultitouchEnd(e)](#Interact+handleMultitouchEnd) ⇒ <code>[Interact](#Interact)</code>
    * [.pinchBalance()](#Interact+pinchBalance) ⇒ <code>[Interact](#Interact)</code>
    * [.getSwipeDirections(direction)](#Interact+getSwipeDirections) ⇒ <code>Array.&lt;string&gt;</code>
    * [.setTimeoutForEvent(callback, timeout, args, holdTimeout)](#Interact+setTimeoutForEvent) ⇒ <code>[Interact](#Interact)</code>
    * [.eventCallback(callback, args)](#Interact+eventCallback) ⇒ <code>[Interact](#Interact)</code>
    * [.getRelativePosition(e)](#Interact+getRelativePosition) ⇒ <code>[Point](#Point)</code>
    * [.getAbsolutePosition(e)](#Interact+getAbsolutePosition) ⇒ <code>[Point](#Point)</code>
    * [.getScrollDirection(event)](#Interact+getScrollDirection) ⇒ <code>Array.&lt;string&gt;</code>
    * [.isDownDirection(axis, event)](#Interact+isDownDirection) ⇒ <code>Boolean</code>
    * [.isUpDirection(axis, event)](#Interact+isUpDirection) ⇒ <code>Boolean</code>
    * [.isRightDirection(axis, event)](#Interact+isRightDirection) ⇒ <code>Boolean</code>
    * [.isLeftDirection(axis, event)](#Interact+isLeftDirection) ⇒ <code>Boolean</code>
    * [.getEvent(e)](#Interact+getEvent) ⇒ <code>Object</code>

<a name="new_Interact_new"></a>

### new Interact(settings)
**Returns**: <code>[Interact](#Interact)</code> - new instance  
**Params**

- settings <code>Object</code> - = {} - all the settings
    - .container <code>string</code> | <code>Object</code> - = ".interact-container" - Container, either string, jQuery-object or dom-object
    - .timeTreshold <code>Object</code> - = {} - settings for the timing tresholds
        - .tap <code>number</code> - = 200 - timing treshold for tap
        - .hold <code>number</code> - = 500 - timing treshold for hold
        - .swipe <code>number</code> - = 300 - timing treshold for swipe
        - .flick <code>number</code> - = 30 - timing treshold for flick
    - .distanceTreshold <code>Object</code> - = {} - settings for the distance tresholds
        - .swipe <code>number</code> - = 200 - distance treshold for swipe
    - .overwriteViewportSettings <code>Boolean</code> | <code>string</code> - = false - on true prevents pinching, can be a custom string too
    - .stopPropagation <code>Boolean</code> - = true - on true stops the propagation of events
    - .preventDefault <code>Boolean</code> - = true - on true prevents the default actions of events
    - .autoFireHold <code>Boolean</code> - = false - if set to false hold-event is not fired
    - .pinchBalanceTime <code>number</code> - = 50 - prevents from firing too much pinching events
    - .callbacks <code>Object</code> - = {} - settings for the callback-functions
        - .tap <code>function</code> - = null - callback-function for tap
        - .tapHold <code>function</code> - = null - callback-function for tapHold
        - .doubletap <code>function</code> - = null - callback-function for doubletap
        - .hold <code>function</code> - = null - callback-function for hold
        - .pan <code>function</code> - = null - callback-function for pan
        - .swipe <code>function</code> - = null - callback-function for swipe
        - .flick <code>function</code> - = null - callback-function for flick
        - .zoom <code>function</code> - = null - callback-function for zoom
        - .wheel <code>function</code> - = null - callback-function for wheel
        - .pinch <code>function</code> - = null - callback-function for pinch
    - .events <code>Object</code> - = {} - settings all eventnames
        - .start <code>Object</code> - = {} - settings all start eventnames
            - .touch <code>Object</code> - = ("MSPointerDown pointerdown" || "touchstart") - settings start touch eventnames
            - .mouse <code>Object</code> - = ("MSPointerDown pointerdown" || "mousedown") - settings start mouse eventnames
        - .move <code>Object</code> - = {} - settings all move eventnames
            - .touch <code>Object</code> - = ("MSPointerMove pointermove" || "touchmove") - settings move touch eventnames
            - .mouse <code>Object</code> - = ("MSPointerMove pointermove" || "mousemove") - settings move mouse eventnames
        - .end <code>Object</code> - = {} - settings all end eventnames
            - .touch <code>Object</code> - = ("MSPointerUp pointerup" || "touchend") - settings end touch eventnames
            - .mouse <code>Object</code> - = ("MSPointerUp pointerup" || "mouseup") - settings end mouse eventnames
        - .leave <code>Object</code> - = {} - settings all leave eventnames
            - .touch <code>Object</code> - = ("MSPointerLeave pointerleave" || "touchleave") - settings leave touch eventnames
            - .mouse <code>Object</code> - = ("MSPointerLeave pointerleave" || "mouseleave") - settings leave mouse eventnames
        - .scroll <code>string</code> - = ("wheel" || "mousewhell" || "DOMMouseScroll") - settings all scroll eventnames

<a name="Interact+timeToLastMove"></a>

### interact.timeToLastMove ⇒ <code>number</code>
get time difference to last

**Kind**: instance property of <code>[Interact](#Interact)</code>  
**Returns**: <code>number</code> - difference  
<a name="Interact+time"></a>

### interact.time ⇒ <code>number</code>
get time difference to start

**Kind**: instance property of <code>[Interact](#Interact)</code>  
**Returns**: <code>number</code> - difference  
<a name="Interact+dataClone"></a>

### interact.dataClone ⇒ <code>Object</code>
clones the data object

**Kind**: instance property of <code>[Interact](#Interact)</code>  
**Returns**: <code>Object</code> - data object  
<a name="Interact+getDefaultSettings"></a>

### interact.getDefaultSettings() ⇒ <code>Object</code>
get the default settings

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Object</code> - settings  
<a name="Interact+getDefaultCallbacks"></a>

### interact.getDefaultCallbacks() ⇒ <code>Object</code>
get default callbacks

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Object</code> - callbacks  
<a name="Interact+getDefaultEventNames"></a>

### interact.getDefaultEventNames() ⇒ <code>Object</code>
get default eventnames

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Object</code> - eventnames  
<a name="Interact+getDefaultData"></a>

### interact.getDefaultData() ⇒ <code>Object</code>
get default data

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Object</code> - data  
<a name="Interact+handleViewport"></a>

### interact.handleViewport(viewport) ⇒ <code>[Interact](#Interact)</code>
handles the overwrite of viewport meta

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>[Interact](#Interact)</code> - Returns this instance  
**Params**

- viewport <code>Boolean</code> | <code>string</code> - specified viewport option

<a name="Interact+init"></a>

### interact.init(container) ⇒ <code>[Interact](#Interact)</code>
initializes class settings and bindings

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>[Interact](#Interact)</code> - Returns this instance  
**Params**

- container <code>Object</code> | <code>string</code> - Container, either string, jQuery-object or dom-object

<a name="Interact+bindEvents"></a>

### interact.bindEvents() ⇒ <code>[Interact](#Interact)</code>
binds all needed events

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>[Interact](#Interact)</code> - Returns this instance  
<a name="Interact+bindIEEvents"></a>

### interact.bindIEEvents() ⇒ <code>[Interact](#Interact)</code>
binds all needed events for IE

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>[Interact](#Interact)</code> - Returns this instance  
<a name="Interact+bindTouchEvents"></a>

### interact.bindTouchEvents() ⇒ <code>[Interact](#Interact)</code>
binds all needed events for touch devices

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>[Interact](#Interact)</code> - Returns this instance  
<a name="Interact+bindMouseEvents"></a>

### interact.bindMouseEvents() ⇒ <code>[Interact](#Interact)</code>
binds all needed events for mouse devices

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>[Interact](#Interact)</code> - Returns this instance  
<a name="Interact+preHandle"></a>

### interact.preHandle(event) ⇒ <code>Object</code>
pre handle all events

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Object</code> - normalized jQuery-fixed event  
**Params**

- event <code>Object</code> - original event of Vanilla JS

<a name="Interact+scrollHandler"></a>

### interact.scrollHandler(event) ⇒ <code>Boolean</code>
handles cross-browser and -device scroll

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Boolean</code> - always returns false  
**Params**

- event <code>Object</code> - jQuery-Event-Object

<a name="Interact+normalizeWheelDelta"></a>

### interact.normalizeWheelDelta(event) ⇒ <code>number</code>
Solution from http://jsfiddle.net/uNeBr/

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>number</code> - normalized wheel delta  
**Params**

- event <code>Object</code> - VanillaJS-Event-Object

<a name="Interact+isPointerEvent"></a>

### interact.isPointerEvent(event) ⇒ <code>Boolean</code>
check if event is a PointerEvent (IE)

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Boolean</code> - Whether event is PointerEvent  
**Params**

- event <code>Object</code> - original event of Vanilla JS

<a name="Interact+calculateStart"></a>

### interact.calculateStart(e) ⇒ <code>Object</code>
calculation to be made at start-handler

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Object</code> - calculated data  
**Params**

- e <code>Object</code> - jQuery-Event-Object

<a name="Interact+handlePointerEventStart"></a>

### interact.handlePointerEventStart(data, e) ⇒ <code>Object</code>
handle PointerEvent calculations

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Object</code> - manipulated enriched data  
**Params**

- data <code>Object</code> - current data
- e <code>Object</code> - jQuery-Event-Object

<a name="Interact+handleTouchEventStart"></a>

### interact.handleTouchEventStart(data, e) ⇒ <code>Object</code>
handle TouchEvent calculations for start

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Object</code> - manipulated enriched data  
**Params**

- data <code>Object</code> - current data
- e <code>Object</code> - jQuery-Event-Object

<a name="Interact+getPointerArray"></a>

### interact.getPointerArray() ⇒ <code>Object</code>
get array of pointers (IE)

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Object</code> - array of pointerIDs  
<a name="Interact+handleMultitouchStart"></a>

### interact.handleMultitouchStart(positionsArray) ⇒ <code>Object</code>
handles multitouch for start

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Object</code> - manipulated enriched data  
**Params**

- positionsArray <code>Object</code> - array of positions

<a name="Interact+handleSingletouchStart"></a>

### interact.handleSingletouchStart(position) ⇒ <code>Object</code>
handles singletouch for start

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Object</code> - manipulated enriched data  
**Params**

- position <code>[Point](#Point)</code> - position of touch

<a name="Interact+takeActionStart"></a>

### interact.takeActionStart(action) ⇒ <code>[Interact](#Interact)</code>
handle action at start event handler

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>[Interact](#Interact)</code> - instance of Interact for chaining  
**Params**

- action <code>String</code> - last action made

<a name="Interact+startHandler"></a>

### interact.startHandler(event) ⇒ <code>Boolean</code>
handles cross-browser and -device start-event

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Boolean</code> - always returns false  
**Params**

- event <code>Object</code> - jQuery-Event-Object

<a name="Interact+clearTimeouts"></a>

### interact.clearTimeouts(timeout) ⇒ <code>[Interact](#Interact)</code>
clear timeout helper

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>[Interact](#Interact)</code> - instance of Interact for chaining  
**Params**

- timeout <code>Object</code> - timeout object to be cleared

<a name="Interact+calculateMove"></a>

### interact.calculateMove(e) ⇒ <code>Object</code>
calculation to be made at move-handler

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Object</code> - calculated data  
**Params**

- e <code>Object</code> - jQuery-Event-Object

<a name="Interact+handlePointerEventMove"></a>

### interact.handlePointerEventMove(data, e) ⇒ <code>Object</code>
handle PointerEvent at moving (IE)

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Object</code> - manipulated enriched data  
**Params**

- data <code>Object</code> - specified input data
- e <code>Object</code> - jQuery-Event-Object

<a name="Interact+handleTouchEventMove"></a>

### interact.handleTouchEventMove(data, e) ⇒ <code>Object</code>
handle TouchEvent calculations for move

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Object</code> - manipulated enriched data  
**Params**

- data <code>Object</code> - current data
- e <code>Object</code> - jQuery-Event-Object

<a name="Interact+handleMultitouchMove"></a>

### interact.handleMultitouchMove(positionsArray) ⇒ <code>Object</code>
handles multitouch for move

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Object</code> - manipulated enriched data  
**Params**

- positionsArray <code>Object</code> - array of positions

<a name="Interact+handleSingletouchMove"></a>

### interact.handleSingletouchMove(position) ⇒ <code>Object</code>
handles singletouch for move

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Object</code> - manipulated enriched data  
**Params**

- position <code>[Point](#Point)</code> - position

<a name="Interact+moveHandler"></a>

### interact.moveHandler(event) ⇒ <code>Boolean</code>
handles cross-browser and -device move-event

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Boolean</code> - always returns false  
**Params**

- event <code>Object</code> - jQuery-Event-Object

<a name="Interact+handlePinchAndZoom"></a>

### interact.handlePinchAndZoom() ⇒ <code>[Interact](#Interact)</code>
handles pinch and zoom

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>[Interact](#Interact)</code> - instance of Interact for chaining  
<a name="Interact+positionDidNotChange"></a>

### interact.positionDidNotChange(e) ⇒ <code>Boolean</code>
check if position has been changed

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Boolean</code> - Whether or not position has changed  
**Params**

- e <code>Object</code> - jQuery-Event-Object

<a name="Interact+calculateEnd"></a>

### interact.calculateEnd(e) ⇒ <code>Object</code>
calculation to be made at end-handler

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Object</code> - calculated data  
**Params**

- e <code>Object</code> - jQuery-Event-Object

<a name="Interact+handleSingletouchEnd"></a>

### interact.handleSingletouchEnd(position) ⇒ <code>Object</code>
handles singletouch for end

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Object</code> - manipulated enriched data  
**Params**

- position <code>Object</code> - position

<a name="Interact+takeActionEnd"></a>

### interact.takeActionEnd(action) ⇒ <code>[Interact](#Interact)</code>
handle action at end event handler

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>[Interact](#Interact)</code> - instance of Interact for chaining  
**Params**

- action <code>String</code> - last action made

<a name="Interact+endHandler"></a>

### interact.endHandler(event) ⇒ <code>Boolean</code>
handles cross-browser and -device end-event

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Boolean</code> - always returns false  
**Params**

- event <code>Object</code> - jQuery-Event-Object

<a name="Interact+handleSwipeAndFlick"></a>

### interact.handleSwipeAndFlick() ⇒ <code>[Interact](#Interact)</code>
handles flick and swipe events

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>[Interact](#Interact)</code> - instance of Interact for chaining  
<a name="Interact+handleMultitouchEnd"></a>

### interact.handleMultitouchEnd(e) ⇒ <code>[Interact](#Interact)</code>
handles multitouch for end

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>[Interact](#Interact)</code> - instance of Interact for chaining  
**Params**

- e <code>e</code> - jQuery-Event-Object

<a name="Interact+pinchBalance"></a>

### interact.pinchBalance() ⇒ <code>[Interact](#Interact)</code>
balances pinching after release of finger

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>[Interact](#Interact)</code> - instance of Interact for chaining  
<a name="Interact+getSwipeDirections"></a>

### interact.getSwipeDirections(direction) ⇒ <code>Array.&lt;string&gt;</code>
Returns an array of strings, representing the directions

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Array.&lt;string&gt;</code> - returns an array representing the directions as strings  
**Params**

- direction <code>[Point](#Point)</code> - the specified direction in pixel

<a name="Interact+setTimeoutForEvent"></a>

### interact.setTimeoutForEvent(callback, timeout, args, holdTimeout) ⇒ <code>[Interact](#Interact)</code>
Helper for setting a timeout for events

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>[Interact](#Interact)</code> - Returns this instance  
**Params**

- callback <code>function</code> - function to be called
- timeout <code>number</code> - time in milliseconds
- args <code>Array.&lt;Object&gt;</code> - array of arguments
- holdTimeout <code>Boolean</code> - if true, a different variable will be used

<a name="Interact+eventCallback"></a>

### interact.eventCallback(callback, args) ⇒ <code>[Interact](#Interact)</code>
Eventhandler for handling the callbacks

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>[Interact](#Interact)</code> - Returns this instance  
**Params**

- callback <code>function</code> - function to be called
- args <code>Array.&lt;object&gt;</code> - arguments for the function

<a name="Interact+getRelativePosition"></a>

### interact.getRelativePosition(e) ⇒ <code>[Point](#Point)</code>
get the relative position of clientX and clientY

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>[Point](#Point)</code> - calculated relative position  
**Params**

- e <code>Object</code> - event object

<a name="Interact+getAbsolutePosition"></a>

### interact.getAbsolutePosition(e) ⇒ <code>[Point](#Point)</code>
get the absolute position of clientX and clientY

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>[Point](#Point)</code> - calculated absolute position  
**Params**

- e <code>Object</code> - event object

<a name="Interact+getScrollDirection"></a>

### interact.getScrollDirection(event) ⇒ <code>Array.&lt;string&gt;</code>
get scroll direction from event

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Array.&lt;string&gt;</code> - an array with scroll directions  
**Params**

- event <code>Object</code> - event object

<a name="Interact+isDownDirection"></a>

### interact.isDownDirection(axis, event) ⇒ <code>Boolean</code>
checks if direction is down

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Boolean</code> - Whether or not direction is down  
**Params**

- axis <code>number</code> - what axis is used
- event <code>Object</code> - Vanilla JS event

<a name="Interact+isUpDirection"></a>

### interact.isUpDirection(axis, event) ⇒ <code>Boolean</code>
checks if direction is up

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Boolean</code> - Whether or not direction is up  
**Params**

- axis <code>number</code> - what axis is used
- event <code>Object</code> - Vanilla JS event

<a name="Interact+isRightDirection"></a>

### interact.isRightDirection(axis, event) ⇒ <code>Boolean</code>
checks if direction is right

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Boolean</code> - Whether or not direction is right  
**Params**

- axis <code>number</code> - what axis is used
- event <code>Object</code> - Vanilla JS event

<a name="Interact+isLeftDirection"></a>

### interact.isLeftDirection(axis, event) ⇒ <code>Boolean</code>
checks if direction is left

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Boolean</code> - Whether or not direction is left  
**Params**

- axis <code>number</code> - what axis is used
- event <code>Object</code> - Vanilla JS event

<a name="Interact+getEvent"></a>

### interact.getEvent(e) ⇒ <code>Object</code>
Get event helper, applies jQuery-event-fix too

**Kind**: instance method of <code>[Interact](#Interact)</code>  
**Returns**: <code>Object</code> - new fixed and optimized event  
**Params**

- e <code>Object</code> - event object

<a name="Label"></a>

## Label
**Kind**: global class  
<a name="LatLng"></a>

## LatLng
**Kind**: global class  

* [LatLng](#LatLng)
    * [new LatLng(lat, lng)](#new_LatLng_new)
    * _instance_
        * [.length](#LatLng+length) ⇒ <code>number</code>
        * [.clone](#LatLng+clone) ⇒ <code>[LatLng](#LatLng)</code>
        * [.substract(coord)](#LatLng+substract) ⇒ <code>[LatLng](#LatLng)</code>
        * [.add(coord)](#LatLng+add) ⇒ <code>[LatLng](#LatLng)</code>
        * [.divide(factorLat, factorLng)](#LatLng+divide) ⇒ <code>[LatLng](#LatLng)</code>
        * [.multiply(factorLat, factorLng)](#LatLng+multiply) ⇒ <code>[LatLng](#LatLng)</code>
        * [.equals(coord)](#LatLng+equals) ⇒ <code>Boolean</code>
        * [.toString()](#LatLng+toString) ⇒ <code>string</code>
    * _static_
        * [.createFromLatLng(LatLng)](#LatLng.createFromLatLng) ⇒ <code>[LatLng](#LatLng)</code>

<a name="new_LatLng_new"></a>

### new LatLng(lat, lng)
**Returns**: <code>[LatLng](#LatLng)</code> - instance of LatLng for chaining  
**Params**

- lat <code>number</code> <code> = 0</code> - = 0 - representation of latitude
- lng <code>number</code> <code> = 0</code> - = 0 - representation of longitude

<a name="LatLng+length"></a>

### latLng.length ⇒ <code>number</code>
length of a latlng

**Kind**: instance property of <code>[LatLng](#LatLng)</code>  
**Returns**: <code>number</code> - length of a latlng  
<a name="LatLng+clone"></a>

### latLng.clone ⇒ <code>[LatLng](#LatLng)</code>
gets a clone of this latlng

**Kind**: instance property of <code>[LatLng](#LatLng)</code>  
**Returns**: <code>[LatLng](#LatLng)</code> - create a copy  
<a name="LatLng+substract"></a>

### latLng.substract(coord) ⇒ <code>[LatLng](#LatLng)</code>
substract specified coord from this coordinate

**Kind**: instance method of <code>[LatLng](#LatLng)</code>  
**Returns**: <code>[LatLng](#LatLng)</code> - instance of LatLng for chaining  
**Params**

- coord <code>[LatLng](#LatLng)</code> - = new LatLng() - specified coordinate to substract from this coord

<a name="LatLng+add"></a>

### latLng.add(coord) ⇒ <code>[LatLng](#LatLng)</code>
add specified coord to this coordinate

**Kind**: instance method of <code>[LatLng](#LatLng)</code>  
**Returns**: <code>[LatLng](#LatLng)</code> - instance of LatLng for chaining  
**Params**

- coord <code>[LatLng](#LatLng)</code> - = new LatLng() - specified coordinate to add to this coord

<a name="LatLng+divide"></a>

### latLng.divide(factorLat, factorLng) ⇒ <code>[LatLng](#LatLng)</code>
divides a latlng with a given factor

**Kind**: instance method of <code>[LatLng](#LatLng)</code>  
**Returns**: <code>[LatLng](#LatLng)</code> - instance of LatLng for chaining  
**Params**

- factorLat <code>number</code> <code> = 1</code> - = 1 - factor to divide lat with
- factorLng <code>number</code> - = factorLat - factor to divide lng with

<a name="LatLng+multiply"></a>

### latLng.multiply(factorLat, factorLng) ⇒ <code>[LatLng](#LatLng)</code>
multiplicates a latlng with a given factor

**Kind**: instance method of <code>[LatLng](#LatLng)</code>  
**Returns**: <code>[LatLng](#LatLng)</code> - instance of LatLng for chaining  
**Params**

- factorLat <code>number</code> <code> = 1</code> - = 1 - factor to multiplicate lat with
- factorLng <code>number</code> - = factorLat - factor to multiplicate lng with

<a name="LatLng+equals"></a>

### latLng.equals(coord) ⇒ <code>Boolean</code>
checks if specified coord equals this coord

**Kind**: instance method of <code>[LatLng](#LatLng)</code>  
**Returns**: <code>Boolean</code> - Returns if specified coord equals this coord  
**Params**

- coord <code>[LatLng](#LatLng)</code> - specified coord to check against

<a name="LatLng+toString"></a>

### latLng.toString() ⇒ <code>string</code>
converts a LatLng to string

**Kind**: instance method of <code>[LatLng](#LatLng)</code>  
**Returns**: <code>string</code> - representing LatLng  
<a name="LatLng.createFromLatLng"></a>

### LatLng.createFromLatLng(LatLng) ⇒ <code>[LatLng](#LatLng)</code>
Creates a LatLng from specified LatLng

**Kind**: static method of <code>[LatLng](#LatLng)</code>  
**Returns**: <code>[LatLng](#LatLng)</code> - the LatLng specified  
**Params**

- LatLng <code>[LatLng](#LatLng)</code> - specified LatLng

<a name="MappedJS"></a>

## MappedJS
**Kind**: global class  

* [MappedJS](#MappedJS)
    * [new MappedJS(container, mapData, markerData, mapSettings, events)](#new_MappedJS_new)
    * [.addControls()](#MappedJS+addControls)
    * [.initializeSettings(container, events, settings)](#MappedJS+initializeSettings) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.initializeData(mapData, cb)](#MappedJS+initializeData) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.initializeMap()](#MappedJS+initializeMap) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.getAbsolutePosition(point)](#MappedJS+getAbsolutePosition) ⇒ <code>[Point](#Point)</code>
    * [.initializeInteractForMap()](#MappedJS+initializeInteractForMap) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.bindEvents()](#MappedJS+bindEvents) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.resetToInitialState()](#MappedJS+resetToInitialState) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.zoomInToCenter()](#MappedJS+zoomInToCenter) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.zoomOutToCenter()](#MappedJS+zoomOutToCenter) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.keyPress(e)](#MappedJS+keyPress) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.handleMovementByKeys(direction)](#MappedJS+handleMovementByKeys) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.resizeHandler()](#MappedJS+resizeHandler) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.loadingFinished()](#MappedJS+loadingFinished) ⇒ <code>[MappedJS](#MappedJS)</code>

<a name="new_MappedJS_new"></a>

### new MappedJS(container, mapData, markerData, mapSettings, events)
**Returns**: <code>[MappedJS](#MappedJS)</code> - instance of MappedJS for chaining  
**Params**

- container <code>string</code> | <code>Object</code> <code> = &quot;\&quot;.mjs\&quot;&quot;</code> - Container, either string, jQuery-object or dom-object
- mapData <code>string</code> | <code>Object</code> <code> = &quot;{}&quot;</code> - data of map tiles, can be json or path to file
- markerData <code>string</code> | <code>Object</code> <code> = &quot;{}&quot;</code> - data of markers, can be json or path to file
- mapSettings <code>Object</code> <code> = {}</code> - settings for map, must be json
- events <code>Object</code> <code> = {loaded:</code> - "mjs-loaded"} - List of events

<a name="MappedJS+addControls"></a>

### mappedJS.addControls()
add controls (zoom, home) to DOM

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
<a name="MappedJS+initializeSettings"></a>

### mappedJS.initializeSettings(container, events, settings) ⇒ <code>[MappedJS](#MappedJS)</code>
initializes the settings and handles errors

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
**Returns**: <code>[MappedJS](#MappedJS)</code> - instance of MappedJS for chaining  
**Params**

- container <code>string</code> | <code>Object</code> - Container, either string, jQuery-object or dom-object
- events <code>object</code> - List of events
- settings <code>object</code> - List of settings

<a name="MappedJS+initializeData"></a>

### mappedJS.initializeData(mapData, cb) ⇒ <code>[MappedJS](#MappedJS)</code>
initializes the data, asynchronous

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
**Returns**: <code>[MappedJS](#MappedJS)</code> - instance of MappedJS for chaining  
**Params**

- mapData <code>Object</code> - data of map tiles, can be json or path to file
- cb <code>Helper~requestJSONCallback</code> - called, when data is received

<a name="MappedJS+initializeMap"></a>

### mappedJS.initializeMap() ⇒ <code>[MappedJS](#MappedJS)</code>
initializes Map module

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
**Returns**: <code>[MappedJS](#MappedJS)</code> - instance of MappedJS for chaining  
<a name="MappedJS+getAbsolutePosition"></a>

### mappedJS.getAbsolutePosition(point) ⇒ <code>[Point](#Point)</code>
get absolute position of a point

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
**Returns**: <code>[Point](#Point)</code> - absolute position to viewport  
**Params**

- point <code>[Point](#Point)</code> - specified relative position

<a name="MappedJS+initializeInteractForMap"></a>

### mappedJS.initializeInteractForMap() ⇒ <code>[MappedJS](#MappedJS)</code>
initializes interaction

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
**Returns**: <code>[MappedJS](#MappedJS)</code> - instance of MappedJS for chaining  
<a name="MappedJS+bindEvents"></a>

### mappedJS.bindEvents() ⇒ <code>[MappedJS](#MappedJS)</code>
binds all events to handlers

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
**Returns**: <code>[MappedJS](#MappedJS)</code> - instance of MappedJS for chaining  
<a name="MappedJS+resetToInitialState"></a>

### mappedJS.resetToInitialState() ⇒ <code>[MappedJS](#MappedJS)</code>
resets map to initial state

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
**Returns**: <code>[MappedJS](#MappedJS)</code> - instance of MappedJS for chaining  
<a name="MappedJS+zoomInToCenter"></a>

### mappedJS.zoomInToCenter() ⇒ <code>[MappedJS](#MappedJS)</code>
zooms into center of map

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
**Returns**: <code>[MappedJS](#MappedJS)</code> - instance of MappedJS for chaining  
<a name="MappedJS+zoomOutToCenter"></a>

### mappedJS.zoomOutToCenter() ⇒ <code>[MappedJS](#MappedJS)</code>
zooms out of center of map

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
**Returns**: <code>[MappedJS](#MappedJS)</code> - instance of MappedJS for chaining  
<a name="MappedJS+keyPress"></a>

### mappedJS.keyPress(e) ⇒ <code>[MappedJS](#MappedJS)</code>
Keypress handler

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
**Returns**: <code>[MappedJS](#MappedJS)</code> - instance of MappedJS for chaining  
**Params**

- e <code>object</code> - VanillaJS-Event-Object

<a name="MappedJS+handleMovementByKeys"></a>

### mappedJS.handleMovementByKeys(direction) ⇒ <code>[MappedJS](#MappedJS)</code>
handles the translation of the map by keypress

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
**Returns**: <code>[MappedJS](#MappedJS)</code> - instance of MappedJS for chaining  
**Params**

- direction <code>[Point](#Point)</code> - x,y point where to translate to

<a name="MappedJS+resizeHandler"></a>

### mappedJS.resizeHandler() ⇒ <code>[MappedJS](#MappedJS)</code>
handles resizing of window

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
**Returns**: <code>[MappedJS](#MappedJS)</code> - instance of MappedJS for chaining  
<a name="MappedJS+loadingFinished"></a>

### mappedJS.loadingFinished() ⇒ <code>[MappedJS](#MappedJS)</code>
called when loading and initialization is finished

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
**Returns**: <code>[MappedJS](#MappedJS)</code> - instance of MappedJS for chaining  
<a name="MapInformation"></a>

## MapInformation
**Kind**: global class  

* [MapInformation](#MapInformation)
    * _instance_
        * [.offsetToCenter](#MapInformation+offsetToCenter)
        * [.pixelPerLatLng](#MapInformation+pixelPerLatLng) ⇒ <code>[Point](#Point)</code>
        * [.convertPointToLatLng(point)](#MapInformation+convertPointToLatLng) ⇒ <code>[LatLng](#LatLng)</code>
        * [.convertLatLngToPoint(latlng)](#MapInformation+convertLatLngToPoint) ⇒ <code>[Point](#Point)</code>
        * [.getDistortionFactorForLatitude(latlng)](#MapInformation+getDistortionFactorForLatitude) ⇒ <code>number</code>
        * [.destroy()](#MapInformation+destroy)
    * _static_
        * [.instances](#MapInformation.instances) : <code>Object</code>

<a name="MapInformation+offsetToCenter"></a>

### mapInformation.offsetToCenter
Returns the current distorted viewport

**Kind**: instance property of <code>[MapInformation](#MapInformation)</code>  
<a name="MapInformation+pixelPerLatLng"></a>

### mapInformation.pixelPerLatLng ⇒ <code>[Point](#Point)</code>
how many pixels per lat and lng

**Kind**: instance property of <code>[MapInformation](#MapInformation)</code>  
**Returns**: <code>[Point](#Point)</code> - pixels per lat/lng  
<a name="MapInformation+convertPointToLatLng"></a>

### mapInformation.convertPointToLatLng(point) ⇒ <code>[LatLng](#LatLng)</code>
converts a Point to LatLng in view

**Kind**: instance method of <code>[MapInformation](#MapInformation)</code>  
**Returns**: <code>[LatLng](#LatLng)</code> - presentation of point in lat-lng system  
**Params**

- point <code>[Point](#Point)</code> - specified point to be converted

<a name="MapInformation+convertLatLngToPoint"></a>

### mapInformation.convertLatLngToPoint(latlng) ⇒ <code>[Point](#Point)</code>
converts a LatLng to Point in view

**Kind**: instance method of <code>[MapInformation](#MapInformation)</code>  
**Returns**: <code>[Point](#Point)</code> - presentation of point in pixel system  
**Params**

- latlng <code>[LatLng](#LatLng)</code> - specified latlng to be converted

<a name="MapInformation+getDistortionFactorForLatitude"></a>

### mapInformation.getDistortionFactorForLatitude(latlng) ⇒ <code>number</code>
get distortion factor for specified latitude

**Kind**: instance method of <code>[MapInformation](#MapInformation)</code>  
**Returns**: <code>number</code> - distortion factor  
**Params**

- latlng <code>[LatLng](#LatLng)</code> - lat/lng position

<a name="MapInformation+destroy"></a>

### mapInformation.destroy()
destroys singleton instance

**Kind**: instance method of <code>[MapInformation](#MapInformation)</code>  
<a name="MapInformation.instances"></a>

### MapInformation.instances : <code>Object</code>
singleton instance wrapper

**Kind**: static property of <code>[MapInformation](#MapInformation)</code>  
<a name="Marker"></a>

## Marker
**Kind**: global class  

* [Marker](#Marker)
    * [new Marker(data, _instance)](#new_Marker_new)
    * [.bindEvents()](#Marker+bindEvents) ⇒ <code>[Marker](#Marker)</code>
    * [.addMarkerToDOM($container)](#Marker+addMarkerToDOM) ⇒ <code>Object</code>
    * [.positionMarker()](#Marker+positionMarker) ⇒ <code>[Marker](#Marker)</code>

<a name="new_Marker_new"></a>

### new Marker(data, _instance)
**Returns**: <code>[Marker](#Marker)</code> - - instance of Marker for chaining  
**Params**

- data <code>Object</code> - = DataEnrichment.DATA_MARKER - enriched data
- _instance <code>[View](#View)</code> - = parent instance - instance of parent view

<a name="Marker+bindEvents"></a>

### marker.bindEvents() ⇒ <code>[Marker](#Marker)</code>
binds all events

**Kind**: instance method of <code>[Marker](#Marker)</code>  
**Returns**: <code>[Marker](#Marker)</code> - instance of Marker for chaining  
<a name="Marker+addMarkerToDOM"></a>

### marker.addMarkerToDOM($container) ⇒ <code>Object</code>
adds a marker to the DOM

**Kind**: instance method of <code>[Marker](#Marker)</code>  
**Returns**: <code>Object</code> - jQuery-selector of append markup  
**Params**

- $container <code>Object</code> - container to append to (jQuery selector)

<a name="Marker+positionMarker"></a>

### marker.positionMarker() ⇒ <code>[Marker](#Marker)</code>
set initial position of this marker

**Kind**: instance method of <code>[Marker](#Marker)</code>  
**Returns**: <code>[Marker](#Marker)</code> - instance of Marker for chaining  
<a name="MarkerClusterer"></a>

## MarkerClusterer
**Kind**: global class  
<a name="Point"></a>

## Point
**Kind**: global class  

* [Point](#Point)
    * [new Point(x, y)](#new_Point_new)
    * _instance_
        * [.length](#Point+length) ⇒ <code>number</code>
        * [.clone](#Point+clone) ⇒ <code>[Point](#Point)</code>
        * [.abs](#Point+abs) ⇒ <code>[Point](#Point)</code>
        * [.substract(point)](#Point+substract) ⇒ <code>[Point](#Point)</code>
        * [.add(point)](#Point+add) ⇒ <code>[Point](#Point)</code>
        * [.multiply(x, y)](#Point+multiply) ⇒ <code>[Point](#Point)</code>
        * [.divide(x, y)](#Point+divide) ⇒ <code>[Point](#Point)</code>
        * [.equals(point)](#Point+equals) ⇒ <code>Boolean</code>
        * [.distance(point)](#Point+distance) ⇒ <code>[Point](#Point)</code>
        * [.translate(x, y)](#Point+translate) ⇒ <code>[Point](#Point)</code>
        * [.position(x, y)](#Point+position) ⇒ <code>[Point](#Point)</code>
        * [.toArray()](#Point+toArray) ⇒ <code>Array</code>
    * _static_
        * [.createFromPoint(point)](#Point.createFromPoint) ⇒ <code>[Point](#Point)</code>

<a name="new_Point_new"></a>

### new Point(x, y)
**Returns**: <code>[Point](#Point)</code> - instance of Point for chaining  
**Params**

- x <code>number</code> <code> = 0</code> - = 0 - representation of x coordinate
- y <code>number</code> <code> = 0</code> - = 0 - representation of y coordinate

<a name="Point+length"></a>

### point.length ⇒ <code>number</code>
length of a point

**Kind**: instance property of <code>[Point](#Point)</code>  
**Returns**: <code>number</code> - length of a point  
<a name="Point+clone"></a>

### point.clone ⇒ <code>[Point](#Point)</code>
gets a clone of this point

**Kind**: instance property of <code>[Point](#Point)</code>  
**Returns**: <code>[Point](#Point)</code> - new instance equals this point  
<a name="Point+abs"></a>

### point.abs ⇒ <code>[Point](#Point)</code>
gets absolute Point

**Kind**: instance property of <code>[Point](#Point)</code>  
**Returns**: <code>[Point](#Point)</code> - returns Point with absolute values  
<a name="Point+substract"></a>

### point.substract(point) ⇒ <code>[Point](#Point)</code>
substracts 2 points

**Kind**: instance method of <code>[Point](#Point)</code>  
**Returns**: <code>[Point](#Point)</code> - instance of Point for chaining  
**Params**

- point <code>[Point](#Point)</code> - = new Point() - the point to substract from this

<a name="Point+add"></a>

### point.add(point) ⇒ <code>[Point](#Point)</code>
adds 2 points

**Kind**: instance method of <code>[Point](#Point)</code>  
**Returns**: <code>[Point](#Point)</code> - instance of Point for chaining  
**Params**

- point <code>[Point](#Point)</code> - = new Point() - the point to add to this

<a name="Point+multiply"></a>

### point.multiply(x, y) ⇒ <code>[Point](#Point)</code>
multiplicates a point with a given x and y

**Kind**: instance method of <code>[Point](#Point)</code>  
**Returns**: <code>[Point](#Point)</code> - instance of Point for chaining  
**Params**

- x <code>number</code> <code> = 1</code> - = 1 - factor to multiplicate x with
- y <code>number</code> - = x - factor to multiplicate y with

<a name="Point+divide"></a>

### point.divide(x, y) ⇒ <code>[Point](#Point)</code>
divide a point with a given x and y

**Kind**: instance method of <code>[Point](#Point)</code>  
**Returns**: <code>[Point](#Point)</code> - instance of Point for chaining  
**Params**

- x <code>number</code> <code> = 1</code> - = 1 - factor to divide x with
- y <code>number</code> - = x - factor to divide y with

<a name="Point+equals"></a>

### point.equals(point) ⇒ <code>Boolean</code>
check if points are equal

**Kind**: instance method of <code>[Point](#Point)</code>  
**Returns**: <code>Boolean</code> - is true, if x and y are the same  
**Params**

- point <code>[Point](#Point)</code> - the point to check against this

<a name="Point+distance"></a>

### point.distance(point) ⇒ <code>[Point](#Point)</code>
Returns the distance from this Point to a specified Point

**Kind**: instance method of <code>[Point](#Point)</code>  
**Returns**: <code>[Point](#Point)</code> - the distance between this Point and specified point  
**Params**

- point <code>[Point](#Point)</code> - = new Point() - the specified point to be measured against this Point

<a name="Point+translate"></a>

### point.translate(x, y) ⇒ <code>[Point](#Point)</code>
translates a point by x and y

**Kind**: instance method of <code>[Point](#Point)</code>  
**Returns**: <code>[Point](#Point)</code> - instance of Point for chaining  
**Params**

- x <code>number</code> <code> = 0</code> - = 0 - value to move x
- y <code>number</code> - = x - value to move y

<a name="Point+position"></a>

### point.position(x, y) ⇒ <code>[Point](#Point)</code>
positions a point by x and y

**Kind**: instance method of <code>[Point](#Point)</code>  
**Returns**: <code>[Point](#Point)</code> - instance of Point for chaining  
**Params**

- x <code>number</code> <code> = 0</code> - = 0 - value to position x
- y <code>number</code> - = x - value to position y

<a name="Point+toArray"></a>

### point.toArray() ⇒ <code>Array</code>
translates a Point to an array

**Kind**: instance method of <code>[Point](#Point)</code>  
**Returns**: <code>Array</code> - Returns Point as Array(x, y)  
<a name="Point.createFromPoint"></a>

### Point.createFromPoint(point) ⇒ <code>[Point](#Point)</code>
Creates a Point from specified point

**Kind**: static method of <code>[Point](#Point)</code>  
**Returns**: <code>[Point](#Point)</code> - the point specified  
**Params**

- point <code>[Point](#Point)</code> - specified point

<a name="Publisher"></a>

## Publisher
**Kind**: global class  

* [Publisher](#Publisher)
    * _instance_
        * [.subscribe(type, fn)](#Publisher+subscribe) ⇒ <code>[Publisher](#Publisher)</code>
        * [.unsubscribe(type, fn)](#Publisher+unsubscribe) ⇒ <code>[Publisher](#Publisher)</code>
        * [.publish(type, arg)](#Publisher+publish) ⇒ <code>[Publisher](#Publisher)</code>
        * [.handle(action, type, a)](#Publisher+handle) ⇒ <code>[Publisher](#Publisher)</code>
        * [.destroy()](#Publisher+destroy)
    * _static_
        * [.instances](#Publisher.instances) : <code>Object</code>

<a name="Publisher+subscribe"></a>

### publisher.subscribe(type, fn) ⇒ <code>[Publisher](#Publisher)</code>
subscribe to a topic

**Kind**: instance method of <code>[Publisher](#Publisher)</code>  
**Returns**: <code>[Publisher](#Publisher)</code> - instance of Publisher for chaining  
**Params**

- type <code>string</code> <code> = &quot;\&quot;any\&quot;&quot;</code> - a topic
- fn <code>function</code> <code> = function(){}</code> - a function to callback

<a name="Publisher+unsubscribe"></a>

### publisher.unsubscribe(type, fn) ⇒ <code>[Publisher](#Publisher)</code>
unsubscribe from a topic

**Kind**: instance method of <code>[Publisher](#Publisher)</code>  
**Returns**: <code>[Publisher](#Publisher)</code> - instance of Publisher for chaining  
**Params**

- type <code>string</code> <code> = &quot;\&quot;any\&quot;&quot;</code> - a topic
- fn <code>function</code> <code> = function(){}</code> - a function to callback

<a name="Publisher+publish"></a>

### publisher.publish(type, arg) ⇒ <code>[Publisher](#Publisher)</code>
publish to a topic

**Kind**: instance method of <code>[Publisher](#Publisher)</code>  
**Returns**: <code>[Publisher](#Publisher)</code> - instance of Publisher for chaining  
**Params**

- type <code>string</code> <code> = &quot;\&quot;any\&quot;&quot;</code> - a topic
- arg <code>function</code> <code> = [</code> - list of parameters

<a name="Publisher+handle"></a>

### publisher.handle(action, type, a) ⇒ <code>[Publisher](#Publisher)</code>
handle subscribe to a topic

**Kind**: instance method of <code>[Publisher](#Publisher)</code>  
**Returns**: <code>[Publisher](#Publisher)</code> - instance of Publisher for chaining  
**Params**

- action <code>string</code> - eventname
- type <code>string</code> <code> = &quot;\&quot;any\&quot;&quot;</code> - a topic
- a <code>Object</code> - function to callback or arguments

<a name="Publisher+destroy"></a>

### publisher.destroy()
destroys singleton instance

**Kind**: instance method of <code>[Publisher](#Publisher)</code>  
<a name="Publisher.instances"></a>

### Publisher.instances : <code>Object</code>
singleton instance wrapper

**Kind**: static property of <code>[Publisher](#Publisher)</code>  
<a name="Rectangle"></a>

## Rectangle
**Kind**: global class  

* [Rectangle](#Rectangle)
    * [new Rectangle(x, y, width, height)](#new_Rectangle_new)
    * _instance_
        * [.center](#Rectangle+center) ⇒ <code>[Point](#Point)</code>
        * [.topLeft](#Rectangle+topLeft) ⇒ <code>[Point](#Point)</code>
        * [.topRight](#Rectangle+topRight) ⇒ <code>[Point](#Point)</code>
        * [.bottomLeft](#Rectangle+bottomLeft) ⇒ <code>[Point](#Point)</code>
        * [.bottomRight](#Rectangle+bottomRight) ⇒ <code>[Point](#Point)</code>
        * [.right](#Rectangle+right) ⇒ <code>number</code>
        * [.left](#Rectangle+left) ⇒ <code>number</code>
        * [.top](#Rectangle+top) ⇒ <code>number</code>
        * [.bottom](#Rectangle+bottom) ⇒ <code>number</code>
        * [.clone](#Rectangle+clone) ⇒ <code>[Rectangle](#Rectangle)</code>
        * [.intersects(rect)](#Rectangle+intersects) ⇒ <code>Boolean</code>
        * [.contains(rectOrPoint)](#Rectangle+contains) ⇒ <code>Boolean</code>
        * [.setCenter(point)](#Rectangle+setCenter) ⇒ <code>[Rectangle](#Rectangle)</code>
        * [.setCenterX(x)](#Rectangle+setCenterX) ⇒ <code>[Rectangle](#Rectangle)</code>
        * [.setCenterY(y)](#Rectangle+setCenterY) ⇒ <code>[Rectangle](#Rectangle)</code>
        * [.containsPoint(point)](#Rectangle+containsPoint) ⇒ <code>Boolean</code>
        * [.containsRect(rect)](#Rectangle+containsRect) ⇒ <code>Boolean</code>
        * [.getDistortedRect(factor)](#Rectangle+getDistortedRect) ⇒ <code>[Rectangle](#Rectangle)</code>
        * [.getNormalRect(factor)](#Rectangle+getNormalRect) ⇒ <code>[Rectangle](#Rectangle)</code>
        * [.scaleX(x)](#Rectangle+scaleX) ⇒ <code>[Rectangle](#Rectangle)</code>
        * [.scaleY(y)](#Rectangle+scaleY) ⇒ <code>[Rectangle](#Rectangle)</code>
        * [.scale(x, y)](#Rectangle+scale) ⇒ <code>[Rectangle](#Rectangle)</code>
        * [.scaleCenter(x, y)](#Rectangle+scaleCenter) ⇒ <code>[Rectangle](#Rectangle)</code>
        * [.translate(x, y)](#Rectangle+translate) ⇒ <code>[Rectangle](#Rectangle)</code>
        * [.transform(x, y, width, height)](#Rectangle+transform) ⇒ <code>[Rectangle](#Rectangle)</code>
        * [.position(x, y)](#Rectangle+position) ⇒ <code>[Rectangle](#Rectangle)</code>
        * [.size(x, y, width, height)](#Rectangle+size) ⇒ <code>[Rectangle](#Rectangle)</code>
        * [.setSize(width, height)](#Rectangle+setSize) ⇒ <code>[Rectangle](#Rectangle)</code>
        * [.equals(rectangle)](#Rectangle+equals) ⇒ <code>Boolean</code>
    * _static_
        * [.createFromRectangle(rect)](#Rectangle.createFromRectangle) ⇒ <code>[Rectangle](#Rectangle)</code>

<a name="new_Rectangle_new"></a>

### new Rectangle(x, y, width, height)
**Returns**: <code>[Rectangle](#Rectangle)</code> - instance of Rectangle for chaining  
**Params**

- x <code>number</code> <code> = 0</code> - x-position of specified rectangle
- y <code>number</code> <code> = 0</code> - y-position of specified rectangle
- width <code>number</code> <code> = 0</code> - width of specified rectangle
- height <code>number</code> <code> = 0</code> - height of specified rectangle

<a name="Rectangle+center"></a>

### rectangle.center ⇒ <code>[Point](#Point)</code>
get center-position of rectangle

**Kind**: instance property of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Point](#Point)</code> - center point  
<a name="Rectangle+topLeft"></a>

### rectangle.topLeft ⇒ <code>[Point](#Point)</code>
get top-left-position of rectangle

**Kind**: instance property of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Point](#Point)</code> - top-left point  
<a name="Rectangle+topRight"></a>

### rectangle.topRight ⇒ <code>[Point](#Point)</code>
get top-right-position of rectangle

**Kind**: instance property of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Point](#Point)</code> - top-right point  
<a name="Rectangle+bottomLeft"></a>

### rectangle.bottomLeft ⇒ <code>[Point](#Point)</code>
get bottom-left-position of rectangle

**Kind**: instance property of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Point](#Point)</code> - bottom-left point  
<a name="Rectangle+bottomRight"></a>

### rectangle.bottomRight ⇒ <code>[Point](#Point)</code>
get bottom-right-position of rectangle

**Kind**: instance property of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Point](#Point)</code> - bottom-right point  
<a name="Rectangle+right"></a>

### rectangle.right ⇒ <code>number</code>
Returns right position of Rectangle

**Kind**: instance property of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>number</code> - right position  
<a name="Rectangle+left"></a>

### rectangle.left ⇒ <code>number</code>
Returns left position of Rectangle

**Kind**: instance property of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>number</code> - left position  
<a name="Rectangle+top"></a>

### rectangle.top ⇒ <code>number</code>
Returns top position of Rectangle

**Kind**: instance property of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>number</code> - top position  
<a name="Rectangle+bottom"></a>

### rectangle.bottom ⇒ <code>number</code>
Returns bottom position of Rectangle

**Kind**: instance property of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>number</code> - bottom position  
<a name="Rectangle+clone"></a>

### rectangle.clone ⇒ <code>[Rectangle](#Rectangle)</code>
clones a rectangle

**Kind**: instance property of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Rectangle](#Rectangle)</code> - duplicated rectangle  
<a name="Rectangle+intersects"></a>

### rectangle.intersects(rect) ⇒ <code>Boolean</code>
Checks whether Rectangle intersects with specified Rectangle

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>Boolean</code> - true if containment is entirely  
**Params**

- rect <code>[Rectangle](#Rectangle)</code> - = new Rectangle() - the specified rectangle to check against

<a name="Rectangle+contains"></a>

### rectangle.contains(rectOrPoint) ⇒ <code>Boolean</code>
Checks whether Rectangle entirely contains the Rectangle or Point

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>Boolean</code> - true if containment is entirely  
**Params**

- rectOrPoint <code>[Rectangle](#Rectangle)</code> | <code>[Point](#Point)</code> - the specified point or rectangle to check against

<a name="Rectangle+setCenter"></a>

### rectangle.setCenter(point) ⇒ <code>[Rectangle](#Rectangle)</code>
Sets the center of this Rectangle to specified point

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Rectangle](#Rectangle)</code> - instance of Rectangle for chaining  
**Params**

- point <code>[Point](#Point)</code> - = new Point() - specified point to set center of rectangle to

<a name="Rectangle+setCenterX"></a>

### rectangle.setCenterX(x) ⇒ <code>[Rectangle](#Rectangle)</code>
Sets the x-center of this Rectangle to specified x

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Rectangle](#Rectangle)</code> - instance of Rectangle for chaining  
**Params**

- x <code>number</code> <code> = 0</code> - = 0 - specified x coordinate to set x center of rectangle to

<a name="Rectangle+setCenterY"></a>

### rectangle.setCenterY(y) ⇒ <code>[Rectangle](#Rectangle)</code>
Sets the y-center of this Rectangle to specified y

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Rectangle](#Rectangle)</code> - instance of Rectangle for chaining  
**Params**

- y <code>number</code> <code> = 0</code> - = 0 - specified y coordinate to set y center of rectangle to

<a name="Rectangle+containsPoint"></a>

### rectangle.containsPoint(point) ⇒ <code>Boolean</code>
Checks whether Rectangle entirely contains the Point

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>Boolean</code> - true if containment is entirely  
**Params**

- point <code>[Point](#Point)</code> - = new Point() - the specified point to check against

<a name="Rectangle+containsRect"></a>

### rectangle.containsRect(rect) ⇒ <code>Boolean</code>
Checks whether Rectangle entirely contains the Rectangle

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>Boolean</code> - true if containment is entirely  
**Params**

- rect <code>[Rectangle](#Rectangle)</code> - = new Rectangle() - the specified rectangle to check against

<a name="Rectangle+getDistortedRect"></a>

### rectangle.getDistortedRect(factor) ⇒ <code>[Rectangle](#Rectangle)</code>
distorts rectangle by factor

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Rectangle](#Rectangle)</code> - a distorted Rectangle  
**Params**

- factor <code>number</code> <code> = 1</code> - = 1 - the specified factor of distortion

<a name="Rectangle+getNormalRect"></a>

### rectangle.getNormalRect(factor) ⇒ <code>[Rectangle](#Rectangle)</code>
redistorts rectangle by factor

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Rectangle](#Rectangle)</code> - an undistorted Rectangle  
**Params**

- factor <code>number</code> <code> = 1</code> - = 1- the specified factor of distortion

<a name="Rectangle+scaleX"></a>

### rectangle.scaleX(x) ⇒ <code>[Rectangle](#Rectangle)</code>
scale x and width of rectangle

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Rectangle](#Rectangle)</code> - instance of Rectangle for chaining  
**Params**

- x <code>number</code> <code> = 1</code> - = 1 - factor to be applied to scale

<a name="Rectangle+scaleY"></a>

### rectangle.scaleY(y) ⇒ <code>[Rectangle](#Rectangle)</code>
scale y and height of rectangle

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Rectangle](#Rectangle)</code> - instance of Rectangle for chaining  
**Params**

- y <code>number</code> <code> = 1</code> - = 1- factor to be applied to scale

<a name="Rectangle+scale"></a>

### rectangle.scale(x, y) ⇒ <code>[Rectangle](#Rectangle)</code>
scale x and y for width and height of rectangle

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Rectangle](#Rectangle)</code> - instance of Rectangle for chaining  
**Params**

- x <code>number</code> <code> = 1</code> - = 1 - factor to be applied to scale
- y <code>number</code> - = x - factor to be applied to scale

<a name="Rectangle+scaleCenter"></a>

### rectangle.scaleCenter(x, y) ⇒ <code>[Rectangle](#Rectangle)</code>
scale x and y for width and height of rectangle

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Rectangle](#Rectangle)</code> - instance of Rectangle for chaining  
**Params**

- x <code>number</code> <code> = 1</code> - = 1 - factor to be applied to scale
- y <code>number</code> - = x - factor to be applied to scale

<a name="Rectangle+translate"></a>

### rectangle.translate(x, y) ⇒ <code>[Rectangle](#Rectangle)</code>
moves a rectangle by specified coords

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Rectangle](#Rectangle)</code> - instance of Rectangle for chaining  
**Params**

- x <code>number</code> <code> = 0</code> - = 0 - specified x to be added to x position
- y <code>number</code> - = x - specified y to be added to y position

<a name="Rectangle+transform"></a>

### rectangle.transform(x, y, width, height) ⇒ <code>[Rectangle](#Rectangle)</code>
transforms a rectangle by specified coords

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Rectangle](#Rectangle)</code> - instance of Rectangle for chaining  
**Params**

- x <code>number</code> <code> = 0</code> - = 0 - specified x to be added to x position
- y <code>number</code> - = x - specified y to be added to y position
- width <code>number</code> <code> = 0</code> - = 0 - specified width to be added to this width
- height <code>number</code> <code> = 0</code> - = 0 - specified height to be added to this height

<a name="Rectangle+position"></a>

### rectangle.position(x, y) ⇒ <code>[Rectangle](#Rectangle)</code>
changes the position a rectangle by specified coords

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Rectangle](#Rectangle)</code> - instance of Rectangle for chaining  
**Params**

- x <code>number</code> <code> = 0</code> - = 0 - the new x position
- y <code>number</code> <code> = 0</code> - = 0 - he new y position

<a name="Rectangle+size"></a>

### rectangle.size(x, y, width, height) ⇒ <code>[Rectangle](#Rectangle)</code>
changes the size of a rectangle by specified params

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Rectangle](#Rectangle)</code> - instance of Rectangle for chaining  
**Params**

- x <code>number</code> <code> = 0</code> - = 0- the new x position
- y <code>number</code> - = x - the new y position
- width <code>number</code> <code> = 0</code> - = 0 - the new width
- height <code>number</code> <code> = 0</code> - = 0 - the new width

<a name="Rectangle+setSize"></a>

### rectangle.setSize(width, height) ⇒ <code>[Rectangle](#Rectangle)</code>
changes the size of a rectangle by specified params

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Rectangle](#Rectangle)</code> - instance of Rectangle for chaining  
**Params**

- width <code>number</code> <code> = 0</code> - = 0 - the new width
- height <code>number</code> - = width - the new width

<a name="Rectangle+equals"></a>

### rectangle.equals(rectangle) ⇒ <code>Boolean</code>
check if rectangles are equal

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>Boolean</code> - is true, if x, y, width and height are the same  
**Params**

- rectangle <code>[Rectangle](#Rectangle)</code> - the specified rectangle to check against this

<a name="Rectangle.createFromRectangle"></a>

### Rectangle.createFromRectangle(rect) ⇒ <code>[Rectangle](#Rectangle)</code>
Creates a Rectangle from specified Rectangle

**Kind**: static method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Rectangle](#Rectangle)</code> - a copy of specified rectangle  
**Params**

- rect <code>[Rectangle](#Rectangle)</code> - specified Rectangle

<a name="StateHandler"></a>

## StateHandler
**Kind**: global class  

* [StateHandler](#StateHandler)
    * [new StateHandler(states_array)](#new_StateHandler_new)
    * [.current](#StateHandler+current) ⇒ <code>Object</code>
    * [.length](#StateHandler+length) ⇒ <code>number</code>
    * [.next()](#StateHandler+next) ⇒ <code>[StateHandler](#StateHandler)</code>
    * [.previous()](#StateHandler+previous) ⇒ <code>[StateHandler](#StateHandler)</code>
    * [.changeTo(state)](#StateHandler+changeTo) ⇒ <code>[StateHandler](#StateHandler)</code>
    * [.changeToValue(prop, value)](#StateHandler+changeToValue) ⇒ <code>[StateHandler](#StateHandler)</code>
    * [.hasNext()](#StateHandler+hasNext) ⇒ <code>Boolean</code>
    * [.hasPrevious()](#StateHandler+hasPrevious) ⇒ <code>Boolean</code>

<a name="new_StateHandler_new"></a>

### new StateHandler(states_array)
**Returns**: <code>[StateHandler](#StateHandler)</code> - instance of StateHandler for chaining  
**Params**

- states_array <code>Array</code> <code> = [{value:</code> - 0, description: 'Default'}] - [description]

<a name="StateHandler+current"></a>

### stateHandler.current ⇒ <code>Object</code>
get current state

**Kind**: instance property of <code>[StateHandler](#StateHandler)</code>  
**Returns**: <code>Object</code> - current state from STATES-array  
<a name="StateHandler+length"></a>

### stateHandler.length ⇒ <code>number</code>
get number of states

**Kind**: instance property of <code>[StateHandler](#StateHandler)</code>  
**Returns**: <code>number</code> - number of states  
<a name="StateHandler+next"></a>

### stateHandler.next() ⇒ <code>[StateHandler](#StateHandler)</code>
get the next element

**Kind**: instance method of <code>[StateHandler](#StateHandler)</code>  
**Returns**: <code>[StateHandler](#StateHandler)</code> - instance of StateHandler for chaining  
<a name="StateHandler+previous"></a>

### stateHandler.previous() ⇒ <code>[StateHandler](#StateHandler)</code>
get the previous element

**Kind**: instance method of <code>[StateHandler](#StateHandler)</code>  
**Returns**: <code>[StateHandler](#StateHandler)</code> - instance of StateHandler for chaining  
<a name="StateHandler+changeTo"></a>

### stateHandler.changeTo(state) ⇒ <code>[StateHandler](#StateHandler)</code>
change the state to specified state

**Kind**: instance method of <code>[StateHandler](#StateHandler)</code>  
**Returns**: <code>[StateHandler](#StateHandler)</code> - instance of StateHandler for chaining  
**Params**

- state <code>number</code> - index of state in array

<a name="StateHandler+changeToValue"></a>

### stateHandler.changeToValue(prop, value) ⇒ <code>[StateHandler](#StateHandler)</code>
change the state to specified value of specified property

**Kind**: instance method of <code>[StateHandler](#StateHandler)</code>  
**Returns**: <code>[StateHandler](#StateHandler)</code> - instance of StateHandler for chaining  
**Params**

- prop <code>object</code> - specified property to be changed
- value <code>object</code> - specified value that should be changed to

<a name="StateHandler+hasNext"></a>

### stateHandler.hasNext() ⇒ <code>Boolean</code>
checks if there is a next element

**Kind**: instance method of <code>[StateHandler](#StateHandler)</code>  
**Returns**: <code>Boolean</code> - wheter there is a next state or not  
<a name="StateHandler+hasPrevious"></a>

### stateHandler.hasPrevious() ⇒ <code>Boolean</code>
checks if there is a previous element

**Kind**: instance method of <code>[StateHandler](#StateHandler)</code>  
**Returns**: <code>Boolean</code> - wheter there is a previous state or not  
<a name="Tile"></a>

## Tile
**Kind**: global class  

* [Tile](#Tile)
    * [new Tile(path, x, y, w, h)](#new_Tile_new)
    * [.initialize()](#Tile+initialize) ⇒ <code>[Tile](#Tile)</code>
    * [.draw()](#Tile+draw) ⇒ <code>[Tile](#Tile)</code>
    * [.equals(tile)](#Tile+equals) ⇒ <code>Boolean</code>

<a name="new_Tile_new"></a>

### new Tile(path, x, y, w, h)
**Returns**: <code>[Tile](#Tile)</code> - instance of Tile for chaining  
**Params**

- path <code>string</code> - = null - path to image
- x <code>number</code> - = 0 - position x of tile
- y <code>number</code> - = 0 - position y of tile
- w <code>number</code> - = 0 - tile width
- h <code>number</code> - = 0 - tile height

<a name="Tile+initialize"></a>

### tile.initialize() ⇒ <code>[Tile](#Tile)</code>
initializes tile and starts loading image

**Kind**: instance method of <code>[Tile](#Tile)</code>  
**Returns**: <code>[Tile](#Tile)</code> - instance of Tile for chaining  
<a name="Tile+draw"></a>

### tile.draw() ⇒ <code>[Tile](#Tile)</code>
draws image data of tile on context

**Kind**: instance method of <code>[Tile](#Tile)</code>  
**Returns**: <code>[Tile](#Tile)</code> - instance of Tile for chaining  
<a name="Tile+equals"></a>

### tile.equals(tile) ⇒ <code>Boolean</code>
check if tiles are equal

**Kind**: instance method of <code>[Tile](#Tile)</code>  
**Returns**: <code>Boolean</code> - is true, if x, y, width and height and path are the same  
**Params**

- tile <code>[Tile](#Tile)</code> - the specified tile to check against this

<a name="TileMap"></a>

## TileMap
**Kind**: global class  

* [TileMap](#TileMap)
    * [new TileMap(container, tilesData, settings)](#new_TileMap_new)
    * [.left](#TileMap+left) ⇒ <code>number</code>
    * [.top](#TileMap+top) ⇒ <code>number</code>
    * [.width](#TileMap+width) ⇒ <code>number</code>
    * [.height](#TileMap+height) ⇒ <code>number</code>
    * [.currentLevelData](#TileMap+currentLevelData) ⇒ <code>Object</code>
    * [.reset()](#TileMap+reset)
    * [.createViewFromData(bounds, center, data, zoom)](#TileMap+createViewFromData) ⇒ <code>[View](#View)</code>
    * [.repositionMarkerContainer()](#TileMap+repositionMarkerContainer) ⇒ <code>[View](#View)</code>
    * [.enrichMarkerData(markerData)](#TileMap+enrichMarkerData) ⇒ <code>Object</code>
    * [.initializeMarkers(markerData)](#TileMap+initializeMarkers) ⇒ <code>[TileMap](#TileMap)</code>
    * [.appendMarkerContainerToDom()](#TileMap+appendMarkerContainerToDom)
    * [.createTooltipContainer()](#TileMap+createTooltipContainer) ⇒ <code>[TileMap](#TileMap)</code>
    * [.bindEvents()](#TileMap+bindEvents) ⇒ <code>[TileMap](#TileMap)</code>
    * [.initializeCanvas()](#TileMap+initializeCanvas) ⇒ <code>[TileMap](#TileMap)</code>
    * [.redraw()](#TileMap+redraw) ⇒ <code>[TileMap](#TileMap)</code>
    * [.resize()](#TileMap+resize) ⇒ <code>[TileMap](#TileMap)</code>
    * [.moveView(delta)](#TileMap+moveView) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.zoom(factor, position)](#TileMap+zoom) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.resizeCanvas()](#TileMap+resizeCanvas) ⇒ <code>[TileMap](#TileMap)</code>
    * [.resizeView()](#TileMap+resizeView) ⇒ <code>[TileMap](#TileMap)</code>
    * [.mainLoop()](#TileMap+mainLoop)

<a name="new_TileMap_new"></a>

### new TileMap(container, tilesData, settings)
**Returns**: <code>[TileMap](#TileMap)</code> - instance of TileMap for chaining  
**Params**

- container <code>Object</code> - = null - jQuery-object holding the container
- tilesData <code>Object</code> <code> = {}</code> - json object representing data of TileMap
- settings <code>Object</code> <code> = {}</code> - json object representing settings of TileMap

<a name="TileMap+left"></a>

### tileMap.left ⇒ <code>number</code>
Returns left offset of container

**Kind**: instance property of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>number</code> - - left offset of container  
<a name="TileMap+top"></a>

### tileMap.top ⇒ <code>number</code>
Returns top offset of container

**Kind**: instance property of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>number</code> - - top offset of container  
<a name="TileMap+width"></a>

### tileMap.width ⇒ <code>number</code>
Returns width of container

**Kind**: instance property of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>number</code> - - width of container  
<a name="TileMap+height"></a>

### tileMap.height ⇒ <code>number</code>
Returns height of container

**Kind**: instance property of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>number</code> - - height of container  
<a name="TileMap+currentLevelData"></a>

### tileMap.currentLevelData ⇒ <code>Object</code>
gets data of current zoom level

**Kind**: instance property of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>Object</code> - data for current level as json  
<a name="TileMap+reset"></a>

### tileMap.reset()
resets view to initial state

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
<a name="TileMap+createViewFromData"></a>

### tileMap.createViewFromData(bounds, center, data, zoom) ⇒ <code>[View](#View)</code>
creates a View from specified parameters

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>[View](#View)</code> - created View  
**Params**

- bounds <code>[Bounds](#Bounds)</code> - specified boundaries
- center <code>[LatLng](#LatLng)</code> - specified center
- data <code>object</code> - specified data
- zoom <code>number</code> - initial zoom level

<a name="TileMap+repositionMarkerContainer"></a>

### tileMap.repositionMarkerContainer() ⇒ <code>[View](#View)</code>
reposition marker container

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>[View](#View)</code> - instance of View for chaining  
<a name="TileMap+enrichMarkerData"></a>

### tileMap.enrichMarkerData(markerData) ⇒ <code>Object</code>
enrich marker data

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>Object</code> - enriched marker data  
**Params**

- markerData <code>Object</code> - data of markers

<a name="TileMap+initializeMarkers"></a>

### tileMap.initializeMarkers(markerData) ⇒ <code>[TileMap](#TileMap)</code>
initializes all markers

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>[TileMap](#TileMap)</code> - instance of TileMap for chaining  
**Params**

- markerData <code>Object</code> - data of all markers

<a name="TileMap+appendMarkerContainerToDom"></a>

### tileMap.appendMarkerContainerToDom()
append marker container to DOM
´     * @return {TileMap} instance of TileMap for chaining

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
<a name="TileMap+createTooltipContainer"></a>

### tileMap.createTooltipContainer() ⇒ <code>[TileMap](#TileMap)</code>
creates an instance of ToolTip

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>[TileMap](#TileMap)</code> - instance of TileMap for chaining  
<a name="TileMap+bindEvents"></a>

### tileMap.bindEvents() ⇒ <code>[TileMap](#TileMap)</code>
bind all events

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>[TileMap](#TileMap)</code> - instance of TileMap for chaining  
<a name="TileMap+initializeCanvas"></a>

### tileMap.initializeCanvas() ⇒ <code>[TileMap](#TileMap)</code>
initializes the canvas, adds to DOM

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>[TileMap](#TileMap)</code> - instance of TileMap for chaining  
<a name="TileMap+redraw"></a>

### tileMap.redraw() ⇒ <code>[TileMap](#TileMap)</code>
complete clear and draw of all visible tiles

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>[TileMap](#TileMap)</code> - instance of TileMap for chaining  
<a name="TileMap+resize"></a>

### tileMap.resize() ⇒ <code>[TileMap](#TileMap)</code>
Handles resizing of TileMap

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>[TileMap](#TileMap)</code> - instance of TileMap for chaining  
<a name="TileMap+moveView"></a>

### tileMap.moveView(delta) ⇒ <code>[MappedJS](#MappedJS)</code>
move view by delta

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>[MappedJS](#MappedJS)</code> - instance of MappedJS for chaining  
**Params**

- delta <code>[Point](#Point)</code> - delta of x/y

<a name="TileMap+zoom"></a>

### tileMap.zoom(factor, position) ⇒ <code>[MappedJS](#MappedJS)</code>
handles zoom by factor and position

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>[MappedJS](#MappedJS)</code> - instance of MappedJS for chaining  
**Params**

- factor <code>number</code> - difference in zoom scale
- position <code>[Point](#Point)</code> - position to zoom to

<a name="TileMap+resizeCanvas"></a>

### tileMap.resizeCanvas() ⇒ <code>[TileMap](#TileMap)</code>
resizes the canvas sizes

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>[TileMap](#TileMap)</code> - instance of TileMap for chaining  
<a name="TileMap+resizeView"></a>

### tileMap.resizeView() ⇒ <code>[TileMap](#TileMap)</code>
Handles resizing of view

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>[TileMap](#TileMap)</code> - instance of TileMap for chaining  
<a name="TileMap+mainLoop"></a>

### tileMap.mainLoop()
main draw call

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
<a name="ToolTip"></a>

## ToolTip
**Kind**: global class  

* [ToolTip](#ToolTip)
    * [new ToolTip(container, templates)](#new_ToolTip_new)
    * [.allTemplatesLoaded](#ToolTip+allTemplatesLoaded) ⇒ <code>boolean</code>
    * [.registerHandlebarHelpers()](#ToolTip+registerHandlebarHelpers) ⇒ <code>[ToolTip](#ToolTip)</code>
    * [.initializeTemplates(templates)](#ToolTip+initializeTemplates) ⇒ <code>[ToolTip](#ToolTip)</code>
    * [.bindEvents()](#ToolTip+bindEvents) ⇒ <code>[ToolTip](#ToolTip)</code>
    * [.resizeHandler()](#ToolTip+resizeHandler) ⇒ <code>[ToolTip](#ToolTip)</code>
    * [.insertContent(content)](#ToolTip+insertContent) ⇒ <code>[ToolTip](#ToolTip)</code>
    * [.open(data)](#ToolTip+open) ⇒ <code>[ToolTip](#ToolTip)</code>
    * [.close()](#ToolTip+close) ⇒ <code>[ToolTip](#ToolTip)</code>
    * [.setPosition()](#ToolTip+setPosition) ⇒ <code>[ToolTip](#ToolTip)</code>
    * [.compileTemplates()](#ToolTip+compileTemplates) ⇒ <code>[ToolTip](#ToolTip)</code>

<a name="new_ToolTip_new"></a>

### new ToolTip(container, templates)
**Returns**: <code>[ToolTip](#ToolTip)</code> - instance of ToolTip for chaining  
**Params**

- container <code>string</code> | <code>object</code> - Container, either string, jQuery-object or dom-object
- templates <code>object</code> - defined templates

<a name="ToolTip+allTemplatesLoaded"></a>

### toolTip.allTemplatesLoaded ⇒ <code>boolean</code>
checks if all templates were loaded

**Kind**: instance property of <code>[ToolTip](#ToolTip)</code>  
**Returns**: <code>boolean</code> - wheter true if all templates were loaded or false  
<a name="ToolTip+registerHandlebarHelpers"></a>

### toolTip.registerHandlebarHelpers() ⇒ <code>[ToolTip](#ToolTip)</code>
register helpers for handlebars

**Kind**: instance method of <code>[ToolTip](#ToolTip)</code>  
**Returns**: <code>[ToolTip](#ToolTip)</code> - instance of ToolTip for chaining  
<a name="ToolTip+initializeTemplates"></a>

### toolTip.initializeTemplates(templates) ⇒ <code>[ToolTip](#ToolTip)</code>
initialize all templates

**Kind**: instance method of <code>[ToolTip](#ToolTip)</code>  
**Returns**: <code>[ToolTip](#ToolTip)</code> - instance of ToolTip for chaining  
**Params**

- templates <code>object</code> - = {} - all specified templates

<a name="ToolTip+bindEvents"></a>

### toolTip.bindEvents() ⇒ <code>[ToolTip](#ToolTip)</code>
bind all events

**Kind**: instance method of <code>[ToolTip](#ToolTip)</code>  
**Returns**: <code>[ToolTip](#ToolTip)</code> - instance of ToolTip for chaining  
<a name="ToolTip+resizeHandler"></a>

### toolTip.resizeHandler() ⇒ <code>[ToolTip](#ToolTip)</code>
on resize check if tooltip is bottom or left position

**Kind**: instance method of <code>[ToolTip](#ToolTip)</code>  
**Returns**: <code>[ToolTip](#ToolTip)</code> - instance of ToolTip for chaining  
<a name="ToolTip+insertContent"></a>

### toolTip.insertContent(content) ⇒ <code>[ToolTip](#ToolTip)</code>
inserts content to ToolTip instance container

**Kind**: instance method of <code>[ToolTip](#ToolTip)</code>  
**Returns**: <code>[ToolTip](#ToolTip)</code> - instance of ToolTip for chaining  
**Params**

- content <code>object</code> - = {} - content object

<a name="ToolTip+open"></a>

### toolTip.open(data) ⇒ <code>[ToolTip](#ToolTip)</code>
opens a tooltip

**Kind**: instance method of <code>[ToolTip](#ToolTip)</code>  
**Returns**: <code>[ToolTip](#ToolTip)</code> - instance of ToolTip for chaining  
**Params**

- data <code>object</code> - content object

<a name="ToolTip+close"></a>

### toolTip.close() ⇒ <code>[ToolTip](#ToolTip)</code>
closes a tooltip

**Kind**: instance method of <code>[ToolTip](#ToolTip)</code>  
**Returns**: <code>[ToolTip](#ToolTip)</code> - instance of ToolTip for chaining  
<a name="ToolTip+setPosition"></a>

### toolTip.setPosition() ⇒ <code>[ToolTip](#ToolTip)</code>
sets position of tooltip to left or bottom

**Kind**: instance method of <code>[ToolTip](#ToolTip)</code>  
**Returns**: <code>[ToolTip](#ToolTip)</code> - instance of ToolTip for chaining  
<a name="ToolTip+compileTemplates"></a>

### toolTip.compileTemplates() ⇒ <code>[ToolTip](#ToolTip)</code>
precompiles all Handlebars templates

**Kind**: instance method of <code>[ToolTip](#ToolTip)</code>  
**Returns**: <code>[ToolTip](#ToolTip)</code> - instance of ToolTip for chaining  
<a name="View"></a>

## View
**Kind**: global class  

* [View](#View)
    * [new View(viewport, currentView, bounds, center, initialCenter, data, $container, context, maxZoom, currentZoom, minZoom, $container, limitToBounds)](#new_View_new)
    * [.distortionFactor](#View+distortionFactor) ⇒ <code>number</code>
    * [.offsetToCenter](#View+offsetToCenter)
    * [.visibleTiles](#View+visibleTiles) ⇒ <code>array</code>
    * [.reset()](#View+reset)
    * [.loadThumb()](#View+loadThumb) ⇒ <code>[View](#View)</code>
    * [.setLatLngToPosition(latlng, position)](#View+setLatLngToPosition) ⇒ <code>[View](#View)</code>
    * [.getDeltaXToCenter(pos)](#View+getDeltaXToCenter) ⇒ <code>number</code>
    * [.zoom(factor, pos)](#View+zoom) ⇒ <code>[View](#View)</code>
    * [.calculateNewCenter()](#View+calculateNewCenter) ⇒ <code>[View](#View)</code>
    * [.moveView(pos)](#View+moveView) ⇒ <code>[View](#View)</code>
    * [.draw()](#View+draw) ⇒ <code>[View](#View)</code>
    * [.drawVisibleTiles()](#View+drawVisibleTiles) ⇒ <code>[View](#View)</code>
    * [.drawThumbnail()](#View+drawThumbnail) ⇒ <code>[View](#View)</code>
    * [.initializeTiles()](#View+initializeTiles) ⇒ <code>[View](#View)</code>

<a name="new_View_new"></a>

### new View(viewport, currentView, bounds, center, initialCenter, data, $container, context, maxZoom, currentZoom, minZoom, $container, limitToBounds)
**Returns**: <code>[View](#View)</code> - instance of View for chaining  
**Params**

- viewport <code>[Rectangle](#Rectangle)</code> - = new Rectangle() - current representation of viewport
- currentView <code>[Rectangle](#Rectangle)</code> - = new Rectangle() - current representation of map
- bounds <code>[Bounds](#Bounds)</code> - = new Bounds() - current bounds of map
- center <code>[LatLng](#LatLng)</code> - = new LatLng() - current center of map
- initialCenter <code>[LatLng](#LatLng)</code> - = new LatLng() - initial center of view
- data <code>Object</code> - = {} - tile data of current map
- $container <code>Object</code> - = null - parent container for markers
- context <code>Object</code> - = null - canvas context for drawing
- maxZoom <code>number</code> - = 1.5 - maximal zoom of view
- currentZoom <code>number</code> - = 1 - initial zoom of view
- minZoom <code>number</code> - = 0.8 - minimal zoom of view
- $container <code>object</code> - = null - jQuery-selector of container class
- limitToBounds <code>number</code> - where to limit panning

<a name="View+distortionFactor"></a>

### view.distortionFactor ⇒ <code>number</code>
Returns current distortionFactor

**Kind**: instance property of <code>[View](#View)</code>  
**Returns**: <code>number</code> - returns current distortionFactor of latitude  
<a name="View+offsetToCenter"></a>

### view.offsetToCenter
Returns the current distorted viewport

**Kind**: instance property of <code>[View](#View)</code>  
<a name="View+visibleTiles"></a>

### view.visibleTiles ⇒ <code>array</code>
get all visible tiles

**Kind**: instance property of <code>[View](#View)</code>  
**Returns**: <code>array</code> - all tiles that are currently visible  
<a name="View+reset"></a>

### view.reset()
resets current View to its initial position

**Kind**: instance method of <code>[View](#View)</code>  
<a name="View+loadThumb"></a>

### view.loadThumb() ⇒ <code>[View](#View)</code>
loads thumbnail of view

**Kind**: instance method of <code>[View](#View)</code>  
**Returns**: <code>[View](#View)</code> - instance of View for chaining  
<a name="View+setLatLngToPosition"></a>

### view.setLatLngToPosition(latlng, position) ⇒ <code>[View](#View)</code>
set specified lat/lng to position x/y

**Kind**: instance method of <code>[View](#View)</code>  
**Returns**: <code>[View](#View)</code> - instance of View for chaining  
**Params**

- latlng <code>[LatLng](#LatLng)</code> - specified latlng to be set Point to
- position <code>[Point](#Point)</code> - specified position to set LatLng to

<a name="View+getDeltaXToCenter"></a>

### view.getDeltaXToCenter(pos) ⇒ <code>number</code>
receive relative Position to center of viewport

**Kind**: instance method of <code>[View](#View)</code>  
**Returns**: <code>number</code> - delta of point to center of viewport  
**Params**

- pos <code>[Point](#Point)</code> - specified position

<a name="View+zoom"></a>

### view.zoom(factor, pos) ⇒ <code>[View](#View)</code>
zooming handler

**Kind**: instance method of <code>[View](#View)</code>  
**Returns**: <code>[View](#View)</code> - instance of View for chaining  
**Params**

- factor <code>number</code> - increase/decrease factor
- pos <code>[Point](#Point)</code> - Position to zoom to

<a name="View+calculateNewCenter"></a>

### view.calculateNewCenter() ⇒ <code>[View](#View)</code>
update center position of view

**Kind**: instance method of <code>[View](#View)</code>  
**Returns**: <code>[View](#View)</code> - instance of View for chaining  
<a name="View+moveView"></a>

### view.moveView(pos) ⇒ <code>[View](#View)</code>
moves the view's current position by pos

**Kind**: instance method of <code>[View](#View)</code>  
**Returns**: <code>[View](#View)</code> - instance of View for chaining  
**Params**

- pos <code>[Point](#Point)</code> - specified additional offset

<a name="View+draw"></a>

### view.draw() ⇒ <code>[View](#View)</code>
Handles draw of visible elements

**Kind**: instance method of <code>[View](#View)</code>  
**Returns**: <code>[View](#View)</code> - instance of View for chaining  
<a name="View+drawVisibleTiles"></a>

### view.drawVisibleTiles() ⇒ <code>[View](#View)</code>
draws all visible tiles

**Kind**: instance method of <code>[View](#View)</code>  
**Returns**: <code>[View](#View)</code> - instance of View for chaining  
<a name="View+drawThumbnail"></a>

### view.drawThumbnail() ⇒ <code>[View](#View)</code>
draws the thumbnail

**Kind**: instance method of <code>[View](#View)</code>  
**Returns**: <code>[View](#View)</code> - instance of View for chaining  
<a name="View+initializeTiles"></a>

### view.initializeTiles() ⇒ <code>[View](#View)</code>
initializes tiles

**Kind**: instance method of <code>[View](#View)</code>  
**Returns**: <code>[View](#View)</code> - instance of View for chaining  
<a name="Events"></a>

## Events : <code>object</code>
Helper for naming events

**Kind**: global namespace  
**Author:** Michael Duve <mduve@designmail.net>  
**Copyright**: Michael Duve 2016  

* [Events](#Events) : <code>object</code>
    * [.ToolTip](#Events.ToolTip) : <code>Object</code>
    * [.Marker](#Events.Marker) : <code>Object</code>
    * [.Publisher](#Events.Publisher) : <code>Object</code>
    * [.TileMap](#Events.TileMap) : <code>Object</code>
    * [.Handling](#Events.Handling) : <code>Object</code>
    * [.View](#Events.View) : <code>Object</code>
    * [.MarkerClusterer](#Events.MarkerClusterer) : <code>Object</code>

<a name="Events.ToolTip"></a>

### Events.ToolTip : <code>Object</code>
Eventnames for ToolTip class

**Kind**: static property of <code>[Events](#Events)</code>  
**Properties**

- OPEN <code>object</code> - when a tooltip should be openend  
- CLOSE <code>object</code> - when a tooltip should be closed  

<a name="Events.Marker"></a>

### Events.Marker : <code>Object</code>
Eventnames for Marker class

**Kind**: static property of <code>[Events](#Events)</code>  
**Properties**

- DEACTIVATE <code>object</code> - when a Marker should be in deactived state  

<a name="Events.Publisher"></a>

### Events.Publisher : <code>Object</code>
Eventnames for Publisher class

**Kind**: static property of <code>[Events](#Events)</code>  
**Properties**

- PUBLISH <code>object</code> - notifies all subscribers  
- SUBSCRIBE <code>object</code> - subscribes to a topic  
- UNSUBSCRIBE <code>object</code> - unsubscribes from a topic  

<a name="Events.TileMap"></a>

### Events.TileMap : <code>Object</code>
Eventnames for TileMap class

**Kind**: static property of <code>[Events](#Events)</code>  
**Properties**

- IMG_DATA_NAME <code>object</code> - notifies all subscribers  
- MARKER_DATA_NAME <code>object</code> - subscribes to a topic  
- NEXT_LEVEL <code>object</code> - next level of view  
- PREVIOUS_LEVEL <code>object</code> - previous level of view  
- RESIZE <code>object</code> - resize of view needed  
- ZOOM_TO_BOUNDS <code>object</code> - zoom to bounds  

<a name="Events.Handling"></a>

### Events.Handling : <code>Object</code>
Eventnames for Handling in all classes

**Kind**: static property of <code>[Events](#Events)</code>  
**Properties**

- RESIZE <code>object</code> - resize of window happened needed  
- CLICK <code>object</code> - click occured  
- TOUCHSTART <code>object</code> - Touch started  
- TOUCHEND <code>object</code> - Touch ended  
- MOUSEDOWN <code>object</code> - Mouse started  
- MOUSEUP <code>object</code> - Mouse ended  
- KEYDOWN <code>object</code> - key pressed  
- KEYUP <code>object</code> - key released  

<a name="Events.View"></a>

### Events.View : <code>Object</code>
Eventnames for View class

**Kind**: static property of <code>[Events](#Events)</code>  
**Properties**

- DRAW <code>object</code> - draw is needed  
- THUMB_LOADED <code>object</code> - thumbnail was loaded  

<a name="Events.MarkerClusterer"></a>

### Events.MarkerClusterer : <code>Object</code>
Eventnames for MarkerClusterer class

**Kind**: static property of <code>[Events](#Events)</code>  
**Properties**

- CLUSTERIZE <code>object</code> - create cluster  
- UNCLUSTERIZE <code>object</code> - destroy cluster  

<a name="STATES"></a>

## STATES : <code>Array</code>
States of a tile

**Kind**: global constant  
