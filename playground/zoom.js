/*
        const oldZoom = this.zoomFactor;
        this.zoomFactor = Math.max(Math.min(this.zoomFactor + scale, 2), 0.5);
        var scaleChange = this.zoomFactor - oldZoom;
        let zoomOffset = this.currentView.topLeft.substract(pos).multiply(-1);

        zoomOffset.multiply(scaleChange).multiply(-1);

        const newSize = this.originalMapView.clone.scale(this.zoomFactor);
        this.currentView.size(this.currentView.x + zoomOffset.x, this.currentView.y + zoomOffset.y, newSize.width, newSize.height);

        const newCenter = this.viewport.center.substract(this.currentView.topLeft);
        this.center = this.convertPointToLatLng(newCenter);
*/

    /*
    WORKING TOO

    this.zoomFactor = Math.max(Math.min(this.zoomFactor + scale, 2), 0.5);
    let mapPosition = this.currentView.topLeft.substract(pos).multiply(-1);
    let latlngPosition = this.convertPointToLatLng(mapPosition).multiply(-1);
    const newSize = this.originalMapView.clone.scale(this.zoomFactor);
    this.currentView.size(newSize.x, newSize.y, newSize.width, newSize.height);
    let newFocus = this.convertLatLngToPoint(latlngPosition);
    let t = this.viewport.center.substract(newFocus);
    this.currentView.position(t.x, t.y);
    this.calculateNewCenter();
    var off = pos.clone.substract(this.viewport.center);
    this.currentView.translate(off.x, off.y);
    this.calculateNewCenter();

     */
        /* WORKING
        const oldZoom = this.zoomFactor;
        this.zoomFactor = Math.max(Math.min(this.zoomFactor + scale, 2), 0.5);

        let zoomOffset = this.currentView.topLeft.substract(pos).multiply(-1);

        zoomOffset.divide(this.currentView.width, this.currentView.height);

        const newSize = this.originalMapView.clone.scale(this.zoomFactor);

        this.currentView.size(newSize.x, newSize.y, newSize.width, newSize.height);

        zoomOffset.multiply(this.currentView.width, this.currentView.height).substract(pos);

        this.currentView.position(-zoomOffset.x, -zoomOffset.y);
        const newCenter = this.viewport.center.substract(this.currentView.topLeft);
        this.center = this.convertPointToLatLng(newCenter);
         */

/*
        this.currentView.translate(this.origin.x, this.origin.y);

        const beforeZoom = pos.clone.divide(this.zoomFactor);
        const afterZoom = pos.clone.divide(this.zoomFactor*scale);
        const differenceBetweenZooms = afterZoom.clone.substract(beforeZoom);

        this.origin.substract(differenceBetweenZooms);

        const oldSize = this.currentView.clone;

        this.currentView.width *= scale;
        this.currentView.height *= scale;

        this.currentView.translate(-this.origin.x, -this.origin.y);

        this.zoomFactor *= scale;//Math.max(Math.min(this.zoomFactor * scale, 3), 0.2);

        //const newCenter = this.viewport.center.substract(this.currentView.topLeft);
        //this.center = this.convertPointToLatLng(newCenter);
*/
