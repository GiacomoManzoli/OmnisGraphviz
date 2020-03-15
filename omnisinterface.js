


jOmnis.callbackObject = {
    omnisOnLoad: function () {
        console.log('8bim: Omnis interface loaded. Waiting for the communication link...');
    },
    omnisOnWebSocketOpened: function () {
        console.log('8bim: web socket opened.');
    },
    updateGraphViz: function(data) {
        updateGraphVizFromOmins(data);
    },
    exportSVG: function() {
        console.log("exportSVG")
        jOmnis.sendEvent("ev_ExportSVG_done", {
            svg: svgString
        })
    },
    exportPNG: function() {
        console.log("exportPNG")

        svgToPngBase64(svgString).then(function(pngBase64) {
            jOmnis.sendEvent("ev_ExportPNG_done", {
                png: pngBase64
            })
        })
    }

}


/**
 * Wrappa jOmnis.sendControlEvent.
 * @param {String} evName Nome dell'evento, tipicamente ha un prefisso "ev"
 * @param {Object | String} [evData] Dati dell'evento come oggetto o come JSON.stringify
 * @param {String} [omnisCallbackName] Nome del metodo di callback di Omnis
 */
jOmnis.sendEvent = function sendEvent(evName, evData, omnisCallbackName) {
    console.log("sendEvent - sending ", evName, evData, omnisCallbackName);
    var message = {
        evType: evName
    };
    if (evData) {
        message.data = (typeof(data) === "string") ? evData : JSON.stringify(evData);
    }
    if (omnisCallbackName) {
        message.callback = omnisCallbackName;
    }
    jOmnis.sendControlEvent(message);
};
