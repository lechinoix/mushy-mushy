import { Container, Heading } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import TerrainMap from "../../components/Maps/TerrainMap"

export const Route = createFileRoute("/_layout/map")({
  component: MapPage,
})

function MapPage() {
  return (
    <Container maxW="full">
      <Heading size="lg" textAlign={{ base: "center", md: "left" }} py={12}>
        Map
      </Heading>
      <TerrainMap />
    </Container>
  )
}
