import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"

import "mapbox-gl/dist/mapbox-gl.css"

const TerrainMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map>()

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibGVjaGlub2l4IiwiYSI6ImNtMjN0cWhnbzBhOWoya3NkY2JnaTMxcDAifQ.OgntNn99Z7_CT0DaboVFoQ'

    mapRef.current = new mapboxgl.Map({
      container: "map",
      zoom: 14,
      center: [-114.26608, 32.7213],
      pitch: 80,
      bearing: 41,
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
      mapRef.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 })
    })
  }, [])

  return <div id="map" ref={mapContainerRef} style={{ height: "100%" }} />
}

export default TerrainMap
