import { GeoJSON } from "@enums/GeoJsonEnum.js";

interface IGeometry {
  geoType: GeoJSON;
  coordinates: [number, number];
}

export { IGeometry };
