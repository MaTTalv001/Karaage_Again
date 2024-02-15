import { Bodies } from "matter-js";
import { MatterObject } from "./MatterObject";

class Polygon extends MatterObject {
  DefaultSides = 5;
  DefaultRadius = 50;
  constructor(
    x,
    y,
    type = "default",
    sides = this.DefaultSides,
    radius = this.DefaultRadius,
    option = {},
  ) {
    super(x, y, type);
    this.object = Bodies.polygon(x, y, sides, radius, this.getOptionAddColor(option, type));
  }
}

export { Polygon };