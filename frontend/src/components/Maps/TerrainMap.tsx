import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"

import "mapbox-gl/dist/mapbox-gl.css"

const TerrainMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map>()

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibGVjaGlub2l4IiwiYSI6ImNtMjN0cWhnbzBhOWoya3NkY2JnaTMxcDAifQ.OgntNn99Z7_CT0DaboVFoQ"

    mapRef.current = new mapboxgl.Map({
      container: "map",
      zoom: 6,
      center: [5.71667, 45.166672],
      style: "mapbox://styles/mapbox/satellite-streets-v12",
    })

    mapRef.current.on("style.load", () => {
      if (!mapRef.current) return
      mapRef.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      })
      const avalancheUrl =
        "http://localhost:8081/geoserver/mmushy/wms?request=GetMap&service=WMS&version=1.1.0&layers=mmushy:avalanche&srs=EPSG:3857&bbox={bbox-epsg-3857}&width=500&height=500&format=image/png&transparent=true"
      mapRef.current.addSource("avalanche", {
        type: "raster",
        tiles: [avalancheUrl.toString()],
        tileSize: 500,
      })
      mapRef.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 })
      mapRef.current.addLayer({
        id: "avalanche",
        type: "raster",
        source: "avalanche",
        paint: {
          "raster-opacity": 0.6,
          "background-opacity": 0,
        },
        layout: {
          visibility: "visible",
        },
      })
    })
  }, [])

  return <div id="map" ref={mapContainerRef} style={{ height: "100%" }} />
}

export default TerrainMap
