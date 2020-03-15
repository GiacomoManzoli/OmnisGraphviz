//
var svgElement; // Elemento SVG generato da Viz.js
var svgString; // Rappresentazione testuale dell'elemento SVG
var parser = new DOMParser();
var viz = new Viz();



console.log('Loaded! main');


function updateGraphVizFromOmins(data) {
    var params = {
        src: data.src || 'digraph { a -> b }',
        options: {
            engine: data.engine || 'dot',
            format: 'svg'
        }
    };

    viz.renderSVGElement(params.src, params.options)
        .then(function(result) {
            console.log(result);
            var graph = document.querySelector("#output");

            if (svgElement) {
                graph.removeChild(svgElement);
            }

            svgElement = result;
            // Genera la versione testuale dell'SVG
            svgString = (new XMLSerializer()).serializeToString(svgElement);
          
         
            svgElement.id = "svg_output";
            graph.appendChild(svgElement);

            panZoom = svgPanZoom(svgElement, {
                zoomEnabled: true,
                controlIconsEnabled: true,
                fit: true,
                center: true,
                minZoom: 0.1
            });

            svgElement.addEventListener('paneresize', function (e) {
                panZoom.resize();
            }, false);
            window.addEventListener('resize', function (e) {
                panZoom.resize();
            });
        });

}

function svgToImage(svgXML, cb) {
    var img = new Image()
   
    img.onload = function() {
        cb(img)
    }
    function buildSvgImageUrl(svg) {
        const b64 = window.btoa(svg)
        return "data:image/svg+xml;base64," + b64
    }

    img.src = buildSvgImageUrl(svgXML)
}

function svgToPngBase64(svgAsXML) {
    var canvas = document.createElement("canvas")
    var context = canvas.getContext("2d")
    return new Promise((res, rej) => {
        svgToImage(svgAsXML, function(image) {
    
            canvas.width = image.width
            canvas.height = image.height
            context.fillStyle = "white"
            context.fillRect(0, 0, canvas.width, canvas.height)
            context.drawImage(image, 0, 0)

            // Non sono sicuro che questo timeout serva
            setTimeout(() => {
                const imageBase64 = canvas.toDataURL("image/png")
                res(imageBase64)
            }, 0)
        })
    })
}
