## Classes

<dl>
<dt><a href="#LatLng">LatLng</a></dt>
<dd></dd>
<dt><a href="#MappedJS">MappedJS</a></dt>
<dd></dd>
<dt><a href="#Point">Point</a></dt>
<dd></dd>
<dt><a href="#Publisher">Publisher</a></dt>
<dd></dd>
<dt><a href="#Rectangle">Rectangle</a></dt>
<dd></dd>
<dt><a href="#State">State</a></dt>
<dd></dd>
<dt><a href="#Tile">Tile</a></dt>
<dd></dd>
<dt><a href="#TileMap">TileMap</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#instance">instance</a> : <code><a href="#Publisher">Publisher</a></code></dt>
<dd><p>singleton instance</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#PUBLISHER">PUBLISHER</a></dt>
<dd><p>Singleton instance of Publisher</p>
</dd>
<dt><a href="#STATES">STATES</a> : <code>Array</code></dt>
<dd><p>States of a tile</p>
</dd>
<dt><a href="#EVENT_TILE_LOADED">EVENT_TILE_LOADED</a> : <code>String</code></dt>
<dd><p>Name of event fired, when tile is loaded</p>
</dd>
<dt><a href="#EVENT_TILE_FAILED">EVENT_TILE_FAILED</a> : <code>String</code></dt>
<dd><p>Name of event fired, when tile is not found on loading</p>
</dd>
<dt><a href="#PUBLISHER">PUBLISHER</a></dt>
<dd><p>Singleton instance of Publisher</p>
</dd>
</dl>

<a name="LatLng"></a>
## LatLng
**Kind**: global class  

* [LatLng](#LatLng)
    * [new LatLng(lat, lng)](#new_LatLng_new)
    * [.toString()](#LatLng+toString) ⇒ <code>String</code>

<a name="new_LatLng_new"></a>
### new LatLng(lat, lng)
Constructor

**Returns**: <code>[LatLng](#LatLng)</code> - new instance of LatLng  
**Params**

- lat <code>number</code> <code> = 0</code> - = 0 - representation of latitude
- lng <code>number</code> <code> = 0</code> - = 0 - representation of longitude

<a name="LatLng+toString"></a>
### latLng.toString() ⇒ <code>String</code>
representation of a LatLng as String

**Kind**: instance method of <code>[LatLng](#LatLng)</code>  
**Returns**: <code>String</code> - representation of this LatLng  
<a name="MappedJS"></a>
## MappedJS
**Kind**: global class  

* [MappedJS](#MappedJS)
    * [new MappedJS(container, mapData, mapSettings, events, jasmine)](#new_MappedJS_new)
    * [.initializeSettings(container, events)](#MappedJS+initializeSettings) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.initializeData(mapData, cb)](#MappedJS+initializeData) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.initializeMap()](#MappedJS+initializeMap) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.initializeApi()](#MappedJS+initializeApi) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.bindEvents()](#MappedJS+bindEvents) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.resizeHandler()](#MappedJS+resizeHandler) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.loadingFinished()](#MappedJS+loadingFinished) ⇒ <code>[MappedJS](#MappedJS)</code>

<a name="new_MappedJS_new"></a>
### new MappedJS(container, mapData, mapSettings, events, jasmine)
Constructor

**Returns**: <code>[MappedJS](#MappedJS)</code> - instance of MappedJS  
**Params**

- container <code>string</code> | <code>Object</code> <code> = &quot;\&quot;.mjs\&quot;&quot;</code> - Container, either string, jQuery-object or dom-object
- mapData <code>string</code> | <code>Object</code> <code> = &quot;{}&quot;</code> - data of map tiles, can be json or path to file
- mapSettings <code>Object</code> <code> = {}</code> - settings for map, must be json
- events <code>Object</code> <code> = {loaded:</code> - "mjs-loaded"} - List of events
- jasmine <code>Boolean</code> <code> = false</code> - Option for jasmine tests

<a name="MappedJS+initializeSettings"></a>
### mappedJS.initializeSettings(container, events) ⇒ <code>[MappedJS](#MappedJS)</code>
initializes the settings and handles errors

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
**Returns**: <code>[MappedJS](#MappedJS)</code> - instance of MappedJS  
**Params**

- container <code>string</code> | <code>Object</code> - Container, either string, jQuery-object or dom-object
- events <code>object</code> - List of events

<a name="MappedJS+initializeData"></a>
### mappedJS.initializeData(mapData, cb) ⇒ <code>[MappedJS](#MappedJS)</code>
initializes the data, asynchronous

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
**Returns**: <code>[MappedJS](#MappedJS)</code> - instance of MappedJS  
**Params**

- mapData <code>Object</code> - data of map tiles, can be json or path to file
- cb <code>function</code> - called, when data is received

<a name="MappedJS+initializeMap"></a>
### mappedJS.initializeMap() ⇒ <code>[MappedJS](#MappedJS)</code>
initializes Map module

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
**Returns**: <code>[MappedJS](#MappedJS)</code> - instance of MappedJS  
<a name="MappedJS+initializeApi"></a>
### mappedJS.initializeApi() ⇒ <code>[MappedJS](#MappedJS)</code>
initializes the public Api

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
**Returns**: <code>[MappedJS](#MappedJS)</code> - instance of MappedJS  
<a name="MappedJS+bindEvents"></a>
### mappedJS.bindEvents() ⇒ <code>[MappedJS](#MappedJS)</code>
binds all events to handlers

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
**Returns**: <code>[MappedJS](#MappedJS)</code> - instance of MappedJS  
<a name="MappedJS+resizeHandler"></a>
### mappedJS.resizeHandler() ⇒ <code>[MappedJS](#MappedJS)</code>
handles resizing of window

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
**Returns**: <code>[MappedJS](#MappedJS)</code> - instance of MappedJS  
<a name="MappedJS+loadingFinished"></a>
### mappedJS.loadingFinished() ⇒ <code>[MappedJS](#MappedJS)</code>
called when loading and initialization is finished

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
**Returns**: <code>[MappedJS](#MappedJS)</code> - instance of MappedJS  
<a name="Point"></a>
## Point
**Kind**: global class  

* [Point](#Point)
    * [new Point(x, y)](#new_Point_new)
    * _instance_
        * [.sub(point)](#Point+sub) ⇒ <code>[Point](#Point)</code>
        * [.add(point)](#Point+add) ⇒ <code>[Point](#Point)</code>
        * [.equals(point)](#Point+equals) ⇒ <code>Boolean</code>
        * [.difference(point)](#Point+difference) ⇒ <code>[Point](#Point)</code>
        * [.distance(point)](#Point+distance) ⇒ <code>[Point](#Point)</code>
        * [.translate(x, y)](#Point+translate) ⇒ <code>[Point](#Point)</code>
        * [.toString()](#Point+toString) ⇒ <code>String</code>
    * _static_
        * [.createFromPoint(point)](#Point.createFromPoint) ⇒ <code>[Point](#Point)</code>

<a name="new_Point_new"></a>
### new Point(x, y)
Constructor

**Returns**: <code>[Point](#Point)</code> - new instance of point  
**Params**

- x <code>number</code> <code> = 0</code> - = 0 - representation of x coordinate
- y <code>number</code> <code> = 0</code> - = 0 - representation of y coordinate

<a name="Point+sub"></a>
### point.sub(point) ⇒ <code>[Point](#Point)</code>
substracts 2 points

**Kind**: instance method of <code>[Point](#Point)</code>  
**Returns**: <code>[Point](#Point)</code> - difference between this point and parameter point  
**Params**

- point <code>[Point](#Point)</code> - the point to substract from this

<a name="Point+add"></a>
### point.add(point) ⇒ <code>[Point](#Point)</code>
adds 2 points

**Kind**: instance method of <code>[Point](#Point)</code>  
**Returns**: <code>[Point](#Point)</code> - addition of this point and parameter point  
**Params**

- point <code>[Point](#Point)</code> - the point to add to this

<a name="Point+equals"></a>
### point.equals(point) ⇒ <code>Boolean</code>
check if points are equal

**Kind**: instance method of <code>[Point](#Point)</code>  
**Returns**: <code>Boolean</code> - is true, if x and y are the same  
**Params**

- point <code>[Point](#Point)</code> - the point to check against this

<a name="Point+difference"></a>
### point.difference(point) ⇒ <code>[Point](#Point)</code>
Returns the difference from this Point to a specified Point

**Kind**: instance method of <code>[Point](#Point)</code>  
**Returns**: <code>[Point](#Point)</code> - the difference between this Point and specified point  
**Params**

- point <code>[Point](#Point)</code> - the specified point to be measured against this Point

<a name="Point+distance"></a>
### point.distance(point) ⇒ <code>[Point](#Point)</code>
Returns the distance from this Point to a specified Point

**Kind**: instance method of <code>[Point](#Point)</code>  
**Returns**: <code>[Point](#Point)</code> - the distance between this Point and specified point  
**Params**

- point <code>[Point](#Point)</code> - the specified point to be measured against this Point

<a name="Point+translate"></a>
### point.translate(x, y) ⇒ <code>[Point](#Point)</code>
moves a point by x and y

**Kind**: instance method of <code>[Point](#Point)</code>  
**Returns**: <code>[Point](#Point)</code> - instance of Point  
**Params**

- x <code>number</code> - value to move x
- y <code>number</code> - value to move y

<a name="Point+toString"></a>
### point.toString() ⇒ <code>String</code>
representation of a Point as String

**Kind**: instance method of <code>[Point](#Point)</code>  
**Returns**: <code>String</code> - representation of this Point  
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
    * [new Publisher()](#new_Publisher_new)
    * _instance_
        * [.subscribe(type, fn)](#Publisher+subscribe) ⇒ <code>[Publisher](#Publisher)</code>
        * [.unsubscribe(type, fn)](#Publisher+unsubscribe) ⇒ <code>[Publisher](#Publisher)</code>
        * [.publish(type, arg)](#Publisher+publish) ⇒ <code>[Publisher](#Publisher)</code>
        * [.handle(action, type, a)](#Publisher+handle) ⇒ <code>[Publisher](#Publisher)</code>
        * [.destroy()](#Publisher+destroy)
    * _static_
        * [.PUBLISH](#Publisher.PUBLISH) : <code>String</code>
        * [.UNSUBSCRIBE](#Publisher.UNSUBSCRIBE) : <code>String</code>

<a name="new_Publisher_new"></a>
### new Publisher()
Constructor

**Returns**: <code>[Publisher](#Publisher)</code> - instance of Publisher  
<a name="Publisher+subscribe"></a>
### publisher.subscribe(type, fn) ⇒ <code>[Publisher](#Publisher)</code>
subscribe to a topic

**Kind**: instance method of <code>[Publisher](#Publisher)</code>  
**Returns**: <code>[Publisher](#Publisher)</code> - instance of Publisher  
**Params**

- type <code>string</code> <code> = &quot;\&quot;any\&quot;&quot;</code> - a topic
- fn <code>function</code> <code> = function(){}</code> - a function to callback

<a name="Publisher+unsubscribe"></a>
### publisher.unsubscribe(type, fn) ⇒ <code>[Publisher](#Publisher)</code>
unsubscribe from a topic

**Kind**: instance method of <code>[Publisher](#Publisher)</code>  
**Returns**: <code>[Publisher](#Publisher)</code> - instance of Publisher  
**Params**

- type <code>string</code> <code> = &quot;\&quot;any\&quot;&quot;</code> - a topic
- fn <code>function</code> <code> = function(){}</code> - a function to callback

<a name="Publisher+publish"></a>
### publisher.publish(type, arg) ⇒ <code>[Publisher](#Publisher)</code>
publish to a topic

**Kind**: instance method of <code>[Publisher](#Publisher)</code>  
**Returns**: <code>[Publisher](#Publisher)</code> - instance of Publisher  
**Params**

- type <code>string</code> <code> = &quot;\&quot;any\&quot;&quot;</code> - a topic
- arg <code>function</code> <code> = [</code> - list of parameters

<a name="Publisher+handle"></a>
### publisher.handle(action, type, a) ⇒ <code>[Publisher](#Publisher)</code>
handle subscribe to a topic

**Kind**: instance method of <code>[Publisher](#Publisher)</code>  
**Returns**: <code>[Publisher](#Publisher)</code> - instance of Publisher  
**Params**

- action <code>string</code> - eventname
- type <code>string</code> <code> = &quot;\&quot;any\&quot;&quot;</code> - a topic
- a <code>Object</code> - function to callback or arguments

<a name="Publisher+destroy"></a>
### publisher.destroy()
destroys singleton instance

**Kind**: instance method of <code>[Publisher](#Publisher)</code>  
<a name="Publisher.PUBLISH"></a>
### Publisher.PUBLISH : <code>String</code>
Eventname for publishing

**Kind**: static property of <code>[Publisher](#Publisher)</code>  
<a name="Publisher.UNSUBSCRIBE"></a>
### Publisher.UNSUBSCRIBE : <code>String</code>
Eventname for unsubscribing

**Kind**: static property of <code>[Publisher](#Publisher)</code>  
<a name="Rectangle"></a>
## Rectangle
**Kind**: global class  

* [Rectangle](#Rectangle)
    * [new Rectangle(x, y, width, height)](#new_Rectangle_new)
    * [.center](#Rectangle+center) ⇒ <code>[Point](#Point)</code>
    * [.topLeft](#Rectangle+topLeft) ⇒ <code>[Point](#Point)</code>
    * [.topRight](#Rectangle+topRight) ⇒ <code>[Point](#Point)</code>
    * [.bottomLeft](#Rectangle+bottomLeft) ⇒ <code>[Point](#Point)</code>
    * [.bottomRight](#Rectangle+bottomRight) ⇒ <code>[Point](#Point)</code>
    * [.right](#Rectangle+right) ⇒ <code>number</code>
    * [.left](#Rectangle+left) ⇒ <code>number</code>
    * [.top](#Rectangle+top) ⇒ <code>number</code>
    * [.bottom](#Rectangle+bottom) ⇒ <code>number</code>
    * [.intersects(rect)](#Rectangle+intersects) ⇒ <code>Boolean</code>
    * [.contains(rectOrPoint)](#Rectangle+contains) ⇒ <code>Boolean</code>
    * [.containsPoint(point)](#Rectangle+containsPoint) ⇒ <code>Boolean</code>
    * [.containsRect(rect)](#Rectangle+containsRect) ⇒ <code>Boolean</code>
    * [.getDistortedRect(factor)](#Rectangle+getDistortedRect) ⇒ <code>[Rectangle](#Rectangle)</code>
    * [.equals(rectangle)](#Rectangle+equals) ⇒ <code>Boolean</code>
    * [.toString()](#Rectangle+toString) ⇒ <code>String</code>

<a name="new_Rectangle_new"></a>
### new Rectangle(x, y, width, height)
Constructor

**Returns**: <code>[Rectangle](#Rectangle)</code> - new instance of Rectangle  
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
<a name="Rectangle+intersects"></a>
### rectangle.intersects(rect) ⇒ <code>Boolean</code>
Checks whether Rectangle intersects with specified Rectangle

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>Boolean</code> - true if containment is entirely  
**Params**

- rect <code>[Rectangle](#Rectangle)</code> - the specified rectangle to check against

<a name="Rectangle+contains"></a>
### rectangle.contains(rectOrPoint) ⇒ <code>Boolean</code>
Checks whether Rectangle entirely contains the Rectangle or Point

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>Boolean</code> - true if containment is entirely  
**Params**

- rectOrPoint <code>[Rectangle](#Rectangle)</code> | <code>[Point](#Point)</code> - the specified point or rectangle to check against

<a name="Rectangle+containsPoint"></a>
### rectangle.containsPoint(point) ⇒ <code>Boolean</code>
Checks whether Rectangle entirely contains the Point

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>Boolean</code> - true if containment is entirely  
**Params**

- point <code>[Point](#Point)</code> - the specified point to check against

<a name="Rectangle+containsRect"></a>
### rectangle.containsRect(rect) ⇒ <code>Boolean</code>
Checks whether Rectangle entirely contains the Rectangle

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>Boolean</code> - true if containment is entirely  
**Params**

- rect <code>[Rectangle](#Rectangle)</code> - the specified rectangle to check against

<a name="Rectangle+getDistortedRect"></a>
### rectangle.getDistortedRect(factor) ⇒ <code>[Rectangle](#Rectangle)</code>
distort rectangle by factor

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Rectangle](#Rectangle)</code> - a new instance of Rectangle  
**Params**

- factor <code>number</code> - the specified factor of distortion

<a name="Rectangle+equals"></a>
### rectangle.equals(rectangle) ⇒ <code>Boolean</code>
check if rectangles are equal

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>Boolean</code> - is true, if x, y, width and height are the same  
**Params**

- rectangle <code>[Rectangle](#Rectangle)</code> - the specified rectangle to check against this

<a name="Rectangle+toString"></a>
### rectangle.toString() ⇒ <code>String</code>
representation of a Rectangle as String

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>String</code> - representation of this Rectangle  
<a name="State"></a>
## State
**Kind**: global class  

* [State](#State)
    * [new State(states_array)](#new_State_new)
    * [.current](#State+current) ⇒ <code>Object</code>
    * [.next()](#State+next) ⇒ <code>[State](#State)</code>
    * [.hasNext()](#State+hasNext) ⇒ <code>Boolean</code>

<a name="new_State_new"></a>
### new State(states_array)
Constructor

**Returns**: <code>[State](#State)</code> - instance of State  
**Params**

- states_array <code>Array</code> <code> = [{value:</code> - 0, description: 'Default'}] - [description]

<a name="State+current"></a>
### state.current ⇒ <code>Object</code>
get current state

**Kind**: instance property of <code>[State](#State)</code>  
**Returns**: <code>Object</code> - a state from STATES-array  
<a name="State+next"></a>
### state.next() ⇒ <code>[State](#State)</code>
get the next element

**Kind**: instance method of <code>[State](#State)</code>  
**Returns**: <code>[State](#State)</code> - instance of State  
<a name="State+hasNext"></a>
### state.hasNext() ⇒ <code>Boolean</code>
checks if there is a next element

**Kind**: instance method of <code>[State](#State)</code>  
**Returns**: <code>Boolean</code> - wheter there is a next state or not  
<a name="Tile"></a>
## Tile
**Kind**: global class  

* [Tile](#Tile)
    * [new Tile(path, x, y, w, h)](#new_Tile_new)
    * [.Publisher](#Tile+Publisher)
    * [.initialize()](#Tile+initialize) ⇒ <code>[Tile](#Tile)</code>
    * [.equals(tile)](#Tile+equals) ⇒ <code>Boolean</code>

<a name="new_Tile_new"></a>
### new Tile(path, x, y, w, h)
Constructor

**Returns**: <code>[Tile](#Tile)</code> - instance of Tile  
**Params**

- path <code>string</code> <code> = null</code> - path to image
- x <code>number</code> <code> = 0</code> - position x of tile
- y <code>number</code> <code> = 0</code> - position y of tile
- w <code>number</code> <code> = 0</code> - tile width
- h <code>number</code> <code> = 0</code> - tile height

<a name="Tile+Publisher"></a>
### tile.Publisher
Return the Publisher

**Kind**: instance property of <code>[Tile](#Tile)</code>  
<a name="Tile+initialize"></a>
### tile.initialize() ⇒ <code>[Tile](#Tile)</code>
initializes tile and starts loading image

**Kind**: instance method of <code>[Tile](#Tile)</code>  
**Returns**: <code>[Tile](#Tile)</code> - instance of Tile  
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
    * _instance_
        * [.left](#TileMap+left) ⇒ <code>number</code>
        * [.top](#TileMap+top) ⇒ <code>number</code>
        * [.width](#TileMap+width) ⇒ <code>number</code>
        * [.height](#TileMap+height) ⇒ <code>number</code>
        * [.visibleTiles](#TileMap+visibleTiles) ⇒ <code>array</code>
        * [.distortion](#TileMap+distortion) ⇒ <code>number</code>
        * [.initialize()](#TileMap+initialize) ⇒ <code>[TileMap](#TileMap)</code>
        * [.initializeCanvas()](#TileMap+initializeCanvas) ⇒ <code>[TileMap](#TileMap)</code>
        * [.bindEvents()](#TileMap+bindEvents) ⇒ <code>[TileMap](#TileMap)</code>
        * [.initializeTiles()](#TileMap+initializeTiles) ⇒ <code>[TileMap](#TileMap)</code>
        * [.getCurrentLevelData()](#TileMap+getCurrentLevelData) ⇒ <code>Object</code>
        * [.onTilesLoaded(tile)](#TileMap+onTilesLoaded) ⇒ <code>[TileMap](#TileMap)</code>
        * [.drawTile(tile)](#TileMap+drawTile) ⇒ <code>[TileMap](#TileMap)</code>
        * [.resize()](#TileMap+resize) ⇒ <code>[TileMap](#TileMap)</code>
        * [.resizeView()](#TileMap+resizeView) ⇒ <code>[TileMap](#TileMap)</code>
        * [.draw()](#TileMap+draw) ⇒ <code>[TileMap](#TileMap)</code>
    * _static_
        * [.IMG_DATA_NAME](#TileMap.IMG_DATA_NAME) : <code>String</code>

<a name="new_TileMap_new"></a>
### new TileMap(container, tilesData, settings)
Constructor

**Returns**: <code>[TileMap](#TileMap)</code> - instance of TileMap  
**Params**

- container <code>Object</code> - jQuery-object holding the container
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
<a name="TileMap+visibleTiles"></a>
### tileMap.visibleTiles ⇒ <code>array</code>
get all visible tiles

**Kind**: instance property of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>array</code> - all tiles that are currently visible  
<a name="TileMap+distortion"></a>
### tileMap.distortion ⇒ <code>number</code>
Returns current distortion

**Kind**: instance property of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>number</code> - returns current distortion of latitude  
<a name="TileMap+initialize"></a>
### tileMap.initialize() ⇒ <code>[TileMap](#TileMap)</code>
initializes the TileMap

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>[TileMap](#TileMap)</code> - instance of TileMap  
<a name="TileMap+initializeCanvas"></a>
### tileMap.initializeCanvas() ⇒ <code>[TileMap](#TileMap)</code>
initializes the canvas, adds to DOM

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>[TileMap](#TileMap)</code> - instance of TileMap  
<a name="TileMap+bindEvents"></a>
### tileMap.bindEvents() ⇒ <code>[TileMap](#TileMap)</code>
Handles all events for class

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>[TileMap](#TileMap)</code> - instance of TileMap  
<a name="TileMap+initializeTiles"></a>
### tileMap.initializeTiles() ⇒ <code>[TileMap](#TileMap)</code>
initializes tiles

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>[TileMap](#TileMap)</code> - instance of TileMap  
<a name="TileMap+getCurrentLevelData"></a>
### tileMap.getCurrentLevelData() ⇒ <code>Object</code>
gets data of current zoom level

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>Object</code> - data for current level as json  
<a name="TileMap+onTilesLoaded"></a>
### tileMap.onTilesLoaded(tile) ⇒ <code>[TileMap](#TileMap)</code>
handles on load of a tile

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>[TileMap](#TileMap)</code> - instance of TileMap  
**Params**

- tile <code>[Tile](#Tile)</code> - a tile of the TileMap

<a name="TileMap+drawTile"></a>
### tileMap.drawTile(tile) ⇒ <code>[TileMap](#TileMap)</code>
draws tiles on canvas

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>[TileMap](#TileMap)</code> - instance of TileMap  
**Params**

- tile <code>[Tile](#Tile)</code> - a tile of the TileMap

<a name="TileMap+resize"></a>
### tileMap.resize() ⇒ <code>[TileMap](#TileMap)</code>
Handles resizing of TileMap

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>[TileMap](#TileMap)</code> - instance of TileMap  
<a name="TileMap+resizeView"></a>
### tileMap.resizeView() ⇒ <code>[TileMap](#TileMap)</code>
Handles resizing of view

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>[TileMap](#TileMap)</code> - instance of TileMap  
<a name="TileMap+draw"></a>
### tileMap.draw() ⇒ <code>[TileMap](#TileMap)</code>
Handles draw of TileMap

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>[TileMap](#TileMap)</code> - instance of TileMap  
<a name="TileMap.IMG_DATA_NAME"></a>
### TileMap.IMG_DATA_NAME : <code>String</code>
name of imagedata in data.json

**Kind**: static property of <code>[TileMap](#TileMap)</code>  
<a name="instance"></a>
## instance : <code>[Publisher](#Publisher)</code>
singleton instance

**Kind**: global variable  
<a name="PUBLISHER"></a>
## PUBLISHER
Singleton instance of Publisher

**Kind**: global constant  
<a name="STATES"></a>
## STATES : <code>Array</code>
States of a tile

**Kind**: global constant  
<a name="EVENT_TILE_LOADED"></a>
## EVENT_TILE_LOADED : <code>String</code>
Name of event fired, when tile is loaded

**Kind**: global constant  
<a name="EVENT_TILE_FAILED"></a>
## EVENT_TILE_FAILED : <code>String</code>
Name of event fired, when tile is not found on loading

**Kind**: global constant  
<a name="PUBLISHER"></a>
## PUBLISHER
Singleton instance of Publisher

**Kind**: global constant  
