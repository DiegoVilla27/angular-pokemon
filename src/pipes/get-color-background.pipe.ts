import { Pipe, PipeTransform } from "@angular/core";
import { Rgb } from "../app/interfaces/colors.interface";

@Pipe({
  name: "getColorBackground",
  standalone: true
})
export class GetColorBackgroundPipe implements PipeTransform {
  transform(color?: string | number | Rgb): object {
    const colorMapType = color as Rgb;
    return {
      "background-color": color
        ? `rgb(${colorMapType[0]}, ${colorMapType[1]}, ${colorMapType[2]})`
        : `rgb(255, 255, 255)`
    };
  }
}
