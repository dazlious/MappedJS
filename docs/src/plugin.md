## Classes

<dl>
<dt><a href="#MappedJS">MappedJS</a></dt>
<dd></dd>
<dt><a href="#MapController">MapController</a></dt>
<dd></dd>
</dl>

<a name="MappedJS"></a>
## MappedJS
**Kind**: global class  

* [MappedJS](#MappedJS)
    * [new MappedJS(container, mapData, events)](#new_MappedJS_new)
    * [.initializeSettings(container, events)](#MappedJS+initializeSettings)
    * [.initializeData(mapData, cb)](#MappedJS+initializeData)
    * [.initializeMap()](#MappedJS+initializeMap)
    * [.initializeApi()](#MappedJS+initializeApi)
    * [.bindEvents()](#MappedJS+bindEvents)
    * [.resizeHandler()](#MappedJS+resizeHandler)
    * [.loadingFinished()](#MappedJS+loadingFinished)

<a name="new_MappedJS_new"></a>
### new MappedJS(container, mapData, events)
Constructor

**Params**

- container <code>string</code> | <code>Object</code> <code> = &quot;\&quot;.mjs\&quot;&quot;</code> - Container, either string, jQuery-object or dom-object
- mapData <code>string</code> | <code>Object</code> <code> = &quot;{}&quot;</code> - data of map tiles, can be json or path to file
- events <code>Object</code> <code> = {loaded:</code> - "mjs-loaded"}} - List of events

<a name="MappedJS+initializeSettings"></a>
### mappedJS.initializeSettings(container, events)
initializes the settings and handles errors

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
**Params**

- container <code>string</code> | <code>Object</code> - Container, either string, jQuery-object or dom-object
- events <code>object</code> - List of events

<a name="MappedJS+initializeData"></a>
### mappedJS.initializeData(mapData, cb)
initializes the data, asynchronous

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
**Params**

- mapData <code>Object</code> - data of map tiles, can be json or path to file
- cb <code>function</code> - called, when data is received

<a name="MappedJS+initializeMap"></a>
### mappedJS.initializeMap()
initializes Map module

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
<a name="MappedJS+initializeApi"></a>
### mappedJS.initializeApi()
initializes the public Api

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
<a name="MappedJS+bindEvents"></a>
### mappedJS.bindEvents()
binds all events to handlers

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
<a name="MappedJS+resizeHandler"></a>
### mappedJS.resizeHandler()
handles resizing of window

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
<a name="MappedJS+loadingFinished"></a>
### mappedJS.loadingFinished()
called when loading and initialization is finisehd

**Kind**: instance method of <code>[MappedJS](#MappedJS)</code>  
<a name="MapController"></a>
## MapController
**Kind**: global class  

* [MapController](#MapController)
    * [new MapController(container)](#new_MapController_new)
    * [.initialize()](#MapController+initialize)
    * [.resize()](#MapController+resize)
    * [.redraw()](#MapController+redraw)

<a name="new_MapController_new"></a>
### new MapController(container)
Constructor

**Params**

- container <code>Object</code> - jQuery-object holding the container

<a name="MapController+initialize"></a>
### mapController.initialize()
initializes the MapController

**Kind**: instance method of <code>[MapController](#MapController)</code>  
<a name="MapController+resize"></a>
### mapController.resize()
Handles resizing of map

**Kind**: instance method of <code>[MapController](#MapController)</code>  
<a name="MapController+redraw"></a>
### mapController.redraw()
Handles the redraw of the map

**Kind**: instance method of <code>[MapController](#MapController)</code>  
