import {DataEnrichment} from "../plugin/src/js/DataEnrichment.js";
import {Point} from "../plugin/src/js/Point.js";
import {LatLng} from "../plugin/src/js/LatLng.js";
import {Bounds} from "../plugin/src/js/Bounds.js";

describe('DataEnrichment', () => {
    "use strict";

    it("Empty input returns empty data", () => {
        DataEnrichment.marker([], (data) => {
            expect(data.length).toEqual(0);
        });
        DataEnrichment.marker(undefined, (data) => {
            expect(data.length).toEqual(0);
        });
    });


    it("Empty data in marker() input returns default object", () => {
        DataEnrichment.marker([{}], (data) => {
            expect(data.length).toEqual(1);
            expect(data[0]).toEqual(DataEnrichment.DATA_MARKER);
            expect(data[0].offset instanceof Point).toEqual(true);
            expect(data[0].latlng instanceof LatLng).toEqual(true);
            expect(data[0].size instanceof Point).toEqual(true);
            expect(data[0].hover).toEqual(false);
            expect(data[0].icon).toBeNull();
        });
    });

    it("data in marker() input returns correct object", () => {
        const item = {
            "icon": "img/icon.png",
            "hover": true,
            "position": {
                "lat": -60,
                "lng": 60
            },
            "offset": {
                "x": 0,
                "y": 0
            },
            "size": {
                "width": 64,
                "height": 32
            }
        };
        DataEnrichment.marker([item], (data) => {
            expect(data[0].offset.equals(new Point(0, 0))).toEqual(true);
            expect(data[0].latlng.equals(new LatLng(-60, 60))).toEqual(true);
            expect(data[0].size.equals(new Point(64,32))).toEqual(true);
            expect(data[0].hover).toEqual(true);
            expect(data[0].icon).toEqual(item.icon);
        });
    });

    it("Empty data in label() input returns default object", () => {
        const itemIcon = {
            "icon": {}
        };
        const itemText = {
            "text": {}
        };
        DataEnrichment.label(undefined, (data) => {
            expect(data.length).toEqual(1);
            expect(data[0]).toEqual(DataEnrichment.DATA_LABEL);
        });
        DataEnrichment.label([itemIcon], (data) => {
            expect(data[0].icon).toEqual(DataEnrichment.DATA_LABEL_ICON);
        });
        DataEnrichment.label([itemText], (data) => {
            expect(data[0].icon).toEqual(DataEnrichment.DATA_LABEL_TEXT);
        });
    });

    it("data in label() input returns correct object", () => {
        const item = {
            "position": [[52.506725, 13.229573], [52.514072, 13.345305], [52.527950, 13.125600], [52.517405, 13.398682], [52.536113, 13.433050], [52.552125, 13.465810], [52.604561, 13.524158]],
            "text": {
                "content": "B2",
                "color": "#333333",
                "offset": [0, 5],
                "align": "center",
                "baseline": "hanging",
                "font": "10pt Arial"
            },
            "icon": {
                "type": "image",
                "size": [32, 32],
                "offset": [-12, -32],
                "url": "img/icon.png"
            },
            "visibility": {
                "min": 3,
                "max": 5
            }
        };
        const item2 = {
            "position": [52.604561, 13.524158],
            "icon": {
                "size": 6
            }
        };
        const item3 = {
            "position": [52.604561, 13.524158],
            "icon": {
            }
        };
        DataEnrichment.marker([item, item2, item3], (data) => {
            expect(data[0].text.offset).toEqual(new Point(0, 5));
            expect(data[0].icon.offset).toEqual(new Point(-12, -32));
            expect(data[0].icon.size).toEqual(new Point(32, 32));
            expect(data[0].position).toBe(Array);
            expect(data[1].position).toBe(LatLng);
            expect(data[1].icon.size).toEqual(6);
            expect(data[1].position).toBe(Number);
            expect(data[2].icon.size).toEqual(2);

        });
    });

    it("Empty data in mapSettings() input returns default object", () => {
        DataEnrichment.mapSettings(undefined, (data) => {
            expect(data.length).toEqual(1);
            expect(data[0]).toEqual(DataEnrichment.MAP_SETTINGS);
            expect(data[0].bounds).toBe(Bounds);
            expect(data[0].center).toBe(LatLng);
        });
    });

    it("data in mapSettings() input returns default object", () => {
        const settings = {
            "limitToBounds": {
                "northWest": [52.777, 12.916],
                "southEast": [52.266, 13.938]
            }
        };
        DataEnrichment.mapSettings([settings], (data) => {
            expect(data[0].limitToBounds).not.toEqual(data[0].bounds);
        });
    });

    it("Empty data in tooltip() input returns default object", () => {
        DataEnrichment.tooltip(undefined, (data) => {
            expect(data[0]).toEqual(DataEnrichment.TOOLTIP);
        });
        DataEnrichment.tooltip([{}], (data) => {
            expect(data.length).toEqual(1);
            expect(data[0]).toEqual(DataEnrichment.TOOLTIP);
        });
    });

    it("data in tooltip() input returns default object", () => {
        const item = {
            image: "foo/test",
            foo: "test"
        };
        DataEnrichment.tooltip([item], (data) => {
            expect(data[0]).toEqual(DataEnrichment.TOOLTIP);
            expect(data[0].image).toEqual(item.image);
            expect(data[0].foo).toBeDefined();
            expect(data[0].foo).toEqual(item.foo);



        });
    });


});
