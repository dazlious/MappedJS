## Classes

<dl>
<dt><a href="#MappedJS">MappedJS</a></dt>
<dd></dd>
<dt><a href="#MapController">MapController</a></dt>
<dd></dd>
<dt><a href="#Publisher">Publisher</a></dt>
<dd></dd>
<dt><a href="#State">State</a></dt>
<dd></dd>
<dt><a href="#Tile">Tile</a></dt>
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
<dt><a href="#PUBLISHER">PUBLISHER</a></dt>
<dd><p>Singleton instance of Publisher</p>
</dd>
</dl>

<a name="MappedJS"></a>
## MappedJS
**Kind**: global class  

* [MappedJS](#MappedJS)
    * [new MappedJS(container, mapData, events)](#new_MappedJS_new)
    * [.initializeSettings(container, events)](#MappedJS+initializeSettings) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.initializeData(mapData, cb)](#MappedJS+initializeData) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.initializeMap()](#MappedJS+initializeMap) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.initializeApi()](#MappedJS+initializeApi) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.bindEvents()](#MappedJS+bindEvents) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.resizeHandler()](#MappedJS+resizeHandler) ⇒ <code>[MappedJS](#MappedJS)</code>
    * [.loadingFinished()](#MappedJS+loadingFinished) ⇒ <code>[MappedJS](#MappedJS)</code>

<a name="new_MappedJS_new"></a>
### new MappedJS(container, mapData, events)
Constructor

**Returns**: <code>[MappedJS](#MappedJS)</code> - instance of MappedJS  
**Params**

- container <code>string</code> | <code>Object</code> <code> = &quot;\&quot;.mjs\&quot;&quot;</code> - Container, either string, jQuery-object or dom-object
- mapData <code>string</code> | <code>Object</code> <code> = &quot;{}&quot;</code> - data of map tiles, can be json or path to file
- events <code>Object</code> <code> = {loaded:</code> - "mjs-loaded"}} - List of events

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
<a name="MapController"></a>
## MapController
**Kind**: global class  

* [MapController](#MapController)
    * [new MapController(container, tilesData)](#new_MapController_new)
    * [.initialize()](#MapController+initialize) ⇒ <code>[MapController](#MapController)</code>
    * [.initializeTiles()](#MapController+initializeTiles) ⇒ <code>[MapController](#MapController)</code>
    * [.onTilesLoaded(tile)](#MapController+onTilesLoaded) ⇒ <code>[MapController](#MapController)</code>
    * [.drawTile(tile)](#MapController+drawTile) ⇒ <code>[MapController](#MapController)</code>
    * [.resize()](#MapController+resize) ⇒ <code>[MapController](#MapController)</code>
    * [.draw()](#MapController+draw) ⇒ <code>[MapController](#MapController)</code>

<a name="new_MapController_new"></a>
### new MapController(container, tilesData)
Constructor

**Returns**: <code>[MapController](#MapController)</code> - instance of MapController  
**Params**

- container <code>Object</code> - jQuery-object holding the container
- tilesData <code>Object</code> <code> = {}</code> - json object representing data of map

<a name="MapController+initialize"></a>
### mapController.initialize() ⇒ <code>[MapController](#MapController)</code>
initializes the MapController

**Kind**: instance method of <code>[MapController](#MapController)</code>  
**Returns**: <code>[MapController](#MapController)</code> - instance of MapController  
<a name="MapController+initializeTiles"></a>
### mapController.initializeTiles() ⇒ <code>[MapController](#MapController)</code>
initializes tiles

**Kind**: instance method of <code>[MapController](#MapController)</code>  
**Returns**: <code>[MapController](#MapController)</code> - instance of MapController  
<a name="MapController+onTilesLoaded"></a>
### mapController.onTilesLoaded(tile) ⇒ <code>[MapController](#MapController)</code>
handles on load of a tile

**Kind**: instance method of <code>[MapController](#MapController)</code>  
**Returns**: <code>[MapController](#MapController)</code> - instance of MapController  
**Params**

- tile <code>[Tile](#Tile)</code> - a tile of the map

<a name="MapController+drawTile"></a>
### mapController.drawTile(tile) ⇒ <code>[MapController](#MapController)</code>
draws tiles on canvas

**Kind**: instance method of <code>[MapController](#MapController)</code>  
**Returns**: <code>[MapController](#MapController)</code> - instance of MapController  
**Params**

- tile <code>[Tile](#Tile)</code> - a tile of the map

<a name="MapController+resize"></a>
### mapController.resize() ⇒ <code>[MapController](#MapController)</code>
Handles resizing of map

**Kind**: instance method of <code>[MapController](#MapController)</code>  
**Returns**: <code>[MapController](#MapController)</code> - instance of MapController  
<a name="MapController+draw"></a>
### mapController.draw() ⇒ <code>[MapController](#MapController)</code>
Handles draw of map

**Kind**: instance method of <code>[MapController](#MapController)</code>  
**Returns**: <code>[MapController](#MapController)</code> - instance of MapController  
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

<a name="Publisher.PUBLISH"></a>
### Publisher.PUBLISH : <code>String</code>
Eventname for publishing

**Kind**: static property of <code>[Publisher](#Publisher)</code>  
<a name="Publisher.UNSUBSCRIBE"></a>
### Publisher.UNSUBSCRIBE : <code>String</code>
Eventname for unsubscribing

**Kind**: static property of <code>[Publisher](#Publisher)</code>  
<a name="State"></a>
## State
**Kind**: global class  

* [State](#State)
    * [new State(states_array)](#new_State_new)
    * [.getState()](#State+getState) ⇒ <code>Object</code>
    * [.next()](#State+next) ⇒ <code>[State](#State)</code>
    * [.hasNext()](#State+hasNext) ⇒ <code>Boolean</code>

<a name="new_State_new"></a>
### new State(states_array)
Constructor

**Returns**: <code>[State](#State)</code> - instance of State  
**Params**

- states_array <code>Array</code> <code> = [</code> - [description]

<a name="State+getState"></a>
### state.getState() ⇒ <code>Object</code>
get current state

**Kind**: instance method of <code>[State](#State)</code>  
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
    * _instance_
        * [.initialize()](#Tile+initialize) ⇒ <code>[Tile](#Tile)</code>
        * [.loadImage(cb)](#Tile+loadImage) ⇒ <code>[Tile](#Tile)</code>
    * _static_
        * [.STATES](#Tile.STATES) : <code>Array</code>

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

<a name="Tile+initialize"></a>
### tile.initialize() ⇒ <code>[Tile](#Tile)</code>
initializes tile and starts loading image

**Kind**: instance method of <code>[Tile](#Tile)</code>  
**Returns**: <code>[Tile](#Tile)</code> - instance of Tile  
<a name="Tile+loadImage"></a>
### tile.loadImage(cb) ⇒ <code>[Tile](#Tile)</code>
image loader, asynchronous

**Kind**: instance method of <code>[Tile](#Tile)</code>  
**Returns**: <code>[Tile](#Tile)</code> - instance of Tile  
**Params**

- cb <code>function</code> - callback after loading image

<a name="Tile.STATES"></a>
### Tile.STATES : <code>Array</code>
States of a tile

**Kind**: static property of <code>[Tile](#Tile)</code>  
<a name="instance"></a>
## instance : <code>[Publisher](#Publisher)</code>
singleton instance

**Kind**: global variable  
<a name="PUBLISHER"></a>
## PUBLISHER
Singleton instance of Publisher

**Kind**: global constant  
<a name="PUBLISHER"></a>
## PUBLISHER
Singleton instance of Publisher

**Kind**: global constant  
