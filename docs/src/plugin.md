## Classes

<dl>
<dt><a href="#Bounds">Bounds</a></dt>
<dd></dd>
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
<dt><a href="#View">View</a></dt>
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

<a name="Bounds"></a>
## Bounds
**Kind**: global class  

* [Bounds](#Bounds)
    * [new Bounds(northWest, southEast)](#new_Bounds_new)
    * [.width](#Bounds+width) ⇒ <code>number</code>
    * [.height](#Bounds+height) ⇒ <code>number</code>

<a name="new_Bounds_new"></a>
### new Bounds(northWest, southEast)
Constructor

**Returns**: <code>[Bounds](#Bounds)</code> - new instance of Bounds  
**Params**

- northWest <code>number</code> - = new LatLng() - representation of northWest boundary
- southEast <code>number</code> - = new LatLng() - representation of southEast boundary

<a name="Bounds+width"></a>
### bounds.width ⇒ <code>number</code>
gets width of boundaries

**Kind**: instance property of <code>[Bounds](#Bounds)</code>  
**Returns**: <code>number</code> - width of boundaries  
<a name="Bounds+height"></a>
### bounds.height ⇒ <code>number</code>
gets height of boundaries

**Kind**: instance property of <code>[Bounds](#Bounds)</code>  
**Returns**: <code>number</code> - height of boundaries  
<a name="LatLng"></a>
## LatLng
**Kind**: global class  

* [LatLng](#LatLng)
    * [new LatLng(lat, lng, isDistance)](#new_LatLng_new)
    * [.sub(coord)](#LatLng+sub) ⇒ <code>[LatLng](#LatLng)</code>
    * [.difference(coord)](#LatLng+difference) ⇒ <code>[LatLng](#LatLng)</code>
    * [.add(coord)](#LatLng+add) ⇒ <code>[LatLng](#LatLng)</code>
    * [.toPoint()](#LatLng+toPoint) ⇒ <code>[Point](#Point)</code>
    * [.equals(coord)](#LatLng+equals) ⇒ <code>Boolean</code>

<a name="new_LatLng_new"></a>
### new LatLng(lat, lng, isDistance)
Constructor

**Returns**: <code>[LatLng](#LatLng)</code> - new instance of LatLng  
**Params**

- lat <code>number</code> <code> = 0</code> - = 0 - representation of latitude
- lng <code>number</code> <code> = 0</code> - = 0 - representation of longitude
- isDistance <code>Boolean</code> <code> = false</code> - = false - if LatLng should be checked against bounds

<a name="LatLng+sub"></a>
### latLng.sub(coord) ⇒ <code>[LatLng](#LatLng)</code>
substract specified coord from this coordinate

**Kind**: instance method of <code>[LatLng](#LatLng)</code>  
**Returns**: <code>[LatLng](#LatLng)</code> - the new calculated LatLng  
**Params**

- coord <code>[LatLng](#LatLng)</code> - specified coordinate to substract from this coord

<a name="LatLng+difference"></a>
### latLng.difference(coord) ⇒ <code>[LatLng](#LatLng)</code>
substract specified coord from this coordinate

**Kind**: instance method of <code>[LatLng](#LatLng)</code>  
**Returns**: <code>[LatLng](#LatLng)</code> - the new calculated LatLng  
**Params**

- coord <code>[LatLng](#LatLng)</code> - specified coordinate to substract from this coord

<a name="LatLng+add"></a>
### latLng.add(coord) ⇒ <code>[LatLng](#LatLng)</code>
add specified coord to this coordinate

**Kind**: instance method of <code>[LatLng](#LatLng)</code>  
**Returns**: <code>[LatLng](#LatLng)</code> - the new calculated LatLng  
**Params**

- coord <code>[LatLng](#LatLng)</code> - specified coordinate to add to this coord

<a name="LatLng+toPoint"></a>
### latLng.toPoint() ⇒ <code>[Point](#Point)</code>
converts Latlng to a Point

**Kind**: instance method of <code>[LatLng](#LatLng)</code>  
**Returns**: <code>[Point](#Point)</code> - Returns a Point representing LatLng in Pixels  
<a name="LatLng+equals"></a>
### latLng.equals(coord) ⇒ <code>Boolean</code>
checks if specified coord equals this coord

**Kind**: instance method of <code>[LatLng](#LatLng)</code>  
**Returns**: <code>Boolean</code> - Returns if specified coord equals this coord  
**Params**

- coord <code>[LatLng](#LatLng)</code> - specified coord to check against

<a name="MappedJS"></a>
## MappedJS
**Kind**: global class  

* [MappedJS](#MappedJS)
    * [new MappedJS(container, mapData, mapSettings, events, jasmine)](#new_MappedJS_new)
    * [.initializeSettings(container, events)](#MappedJS+initializeSettings) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.initializeData(mapData, cb)](#MappedJS+initializeData) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.initializeMap()](#MappedJS+initializeMap) ⇒ <code>[MappedJS](#MappedJS)</code>
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
    * [.translate(x, y)](#Rectangle+translate) ⇒ <code>[Rectangle](#Rectangle)</code>
    * [.transform(x, y, width, height)](#Rectangle+transform) ⇒ <code>[Rectangle](#Rectangle)</code>
    * [.move(x, y)](#Rectangle+move) ⇒ <code>[Rectangle](#Rectangle)</code>
    * [.change(x, y, width, height)](#Rectangle+change) ⇒ <code>[Rectangle](#Rectangle)</code>
    * [.equals(rectangle)](#Rectangle+equals) ⇒ <code>Boolean</code>

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

<a name="Rectangle+translate"></a>
### rectangle.translate(x, y) ⇒ <code>[Rectangle](#Rectangle)</code>
moves a rectangle by specified coords

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Rectangle](#Rectangle)</code> - Returns the altered rectangle  
**Params**

- x <code>number</code> - how far to move in x direction
- y <code>number</code> - how far to move in y direction

<a name="Rectangle+transform"></a>
### rectangle.transform(x, y, width, height) ⇒ <code>[Rectangle](#Rectangle)</code>
transforms a rectangle by specified coords

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Rectangle](#Rectangle)</code> - Returns the altered rectangle  
**Params**

- x <code>number</code> - how far to transform in x direction
- y <code>number</code> - how far to transform in y direction
- width <code>number</code> - adds to the width
- height <code>number</code> - adds to the width

<a name="Rectangle+move"></a>
### rectangle.move(x, y) ⇒ <code>[Rectangle](#Rectangle)</code>
moves a rectangle by specified coords

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Rectangle](#Rectangle)</code> - Returns the altered rectangle  
**Params**

- x <code>number</code> - how far to move in x direction
- y <code>number</code> - how far to move in y direction

<a name="Rectangle+change"></a>
### rectangle.change(x, y, width, height) ⇒ <code>[Rectangle](#Rectangle)</code>
changes a rectangle by specified coords

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>[Rectangle](#Rectangle)</code> - Returns the altered rectangle  
**Params**

- x <code>number</code> - how far to change in x direction
- y <code>number</code> - how far to change in y direction
- width <code>number</code> - changes the width
- height <code>number</code> - changes the width

<a name="Rectangle+equals"></a>
### rectangle.equals(rectangle) ⇒ <code>Boolean</code>
check if rectangles are equal

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Returns**: <code>Boolean</code> - is true, if x, y, width and height are the same  
**Params**

- rectangle <code>[Rectangle](#Rectangle)</code> - the specified rectangle to check against this

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
        * [.initialize()](#TileMap+initialize) ⇒ <code>[TileMap](#TileMap)</code>
        * [.initializeCanvas()](#TileMap+initializeCanvas) ⇒ <code>[TileMap](#TileMap)</code>
        * [.getCurrentLevelData()](#TileMap+getCurrentLevelData) ⇒ <code>Object</code>
        * [.resize()](#TileMap+resize) ⇒ <code>[TileMap](#TileMap)</code>
        * [.resizeView()](#TileMap+resizeView) ⇒ <code>[TileMap](#TileMap)</code>
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
<a name="TileMap+getCurrentLevelData"></a>
### tileMap.getCurrentLevelData() ⇒ <code>Object</code>
gets data of current zoom level

**Kind**: instance method of <code>[TileMap](#TileMap)</code>  
**Returns**: <code>Object</code> - data for current level as json  
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
<a name="TileMap.IMG_DATA_NAME"></a>
### TileMap.IMG_DATA_NAME : <code>String</code>
name of imagedata in data.json

**Kind**: static property of <code>[TileMap](#TileMap)</code>  
<a name="View"></a>
## View
**Kind**: global class  

* [View](#View)
    * [new View(settings, viewport, mapView, bounds, center, data)](#new_View_new)
    * [.distortion](#View+distortion) ⇒ <code>number</code>
    * [.offset](#View+offset)
    * [.mapOffset](#View+mapOffset) ⇒ <code>number</code>
    * [.visibleTiles](#View+visibleTiles) ⇒ <code>array</code>
    * [.onTilesLoaded(tile)](#View+onTilesLoaded) ⇒ <code>[TileMap](#TileMap)</code>
    * [.drawVisibleTiles()](#View+drawVisibleTiles) ⇒ <code>[TileMap](#TileMap)</code>
    * [.drawTile(tile)](#View+drawTile) ⇒ <code>[TileMap](#TileMap)</code>
    * [.bindEvents()](#View+bindEvents) ⇒ <code>[TileMap](#TileMap)</code>
    * [.initializeTiles()](#View+initializeTiles) ⇒ <code>[TileMap](#TileMap)</code>

<a name="new_View_new"></a>
### new View(settings, viewport, mapView, bounds, center, data)
Constructor

**Returns**: <code>[View](#View)</code> - Instance of View  
**Params**

- settings <code>Object</code> - the settings Object
- viewport <code>[Rectangle](#Rectangle)</code> - = new Rectangle() - current representation of viewport
- mapView <code>[Rectangle](#Rectangle)</code> - = new Rectangle() - current representation of map
- bounds <code>[Bounds](#Bounds)</code> - = new Bounds() - current bounds of map
- center <code>[LatLng](#LatLng)</code> - = new LatLng() - current center of map
- data <code>Object</code> - = {} - data of current map

<a name="View+distortion"></a>
### view.distortion ⇒ <code>number</code>
Returns current distortion

**Kind**: instance property of <code>[View](#View)</code>  
**Returns**: <code>number</code> - returns current distortion of latitude  
<a name="View+offset"></a>
### view.offset
Returns the offset of the center

**Kind**: instance property of <code>[View](#View)</code>  
<a name="View+mapOffset"></a>
### view.mapOffset ⇒ <code>number</code>
Returns the offset of the map

**Kind**: instance property of <code>[View](#View)</code>  
**Returns**: <code>number</code> - calculated offset  
**Params**

- distortion <code>number</code> - the current latitude distortion

<a name="View+visibleTiles"></a>
### view.visibleTiles ⇒ <code>array</code>
get all visible tiles

**Kind**: instance property of <code>[View](#View)</code>  
**Returns**: <code>array</code> - all tiles that are currently visible  
<a name="View+onTilesLoaded"></a>
### view.onTilesLoaded(tile) ⇒ <code>[TileMap](#TileMap)</code>
handles on load of a tile

**Kind**: instance method of <code>[View](#View)</code>  
**Returns**: <code>[TileMap](#TileMap)</code> - instance of TileMap  
**Params**

- tile <code>[Tile](#Tile)</code> - a tile of the TileMap

<a name="View+drawVisibleTiles"></a>
### view.drawVisibleTiles() ⇒ <code>[TileMap](#TileMap)</code>
Handles draw of TileMap

**Kind**: instance method of <code>[View](#View)</code>  
**Returns**: <code>[TileMap](#TileMap)</code> - instance of TileMap  
<a name="View+drawTile"></a>
### view.drawTile(tile) ⇒ <code>[TileMap](#TileMap)</code>
draws tiles on canvas

**Kind**: instance method of <code>[View](#View)</code>  
**Returns**: <code>[TileMap](#TileMap)</code> - instance of TileMap  
**Params**

- tile <code>[Tile](#Tile)</code> - a tile of the TileMap

<a name="View+bindEvents"></a>
### view.bindEvents() ⇒ <code>[TileMap](#TileMap)</code>
Handles all events for class

**Kind**: instance method of <code>[View](#View)</code>  
**Returns**: <code>[TileMap](#TileMap)</code> - instance of TileMap  
<a name="View+initializeTiles"></a>
### view.initializeTiles() ⇒ <code>[TileMap](#TileMap)</code>
initializes tiles

**Kind**: instance method of <code>[View](#View)</code>  
**Returns**: <code>[TileMap](#TileMap)</code> - instance of TileMap  
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
