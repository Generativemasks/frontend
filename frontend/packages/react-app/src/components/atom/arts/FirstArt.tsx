import * as React from "react";
// @ts-ignore
import P5Wrapper from "react-p5-wrapper";

export const ART_WIDTH = 1600;
export const ART_HEIGHT = 1600;

let colorsSource = [
  "#07B8D2",
  "#FED602",
  "#FF4B88",
  "#025EAB",
  "#ffffff",
  "#353535",
];

export interface ArtProps {
  readonly setP5Object: (pObject: any) => void;
}

const FirstArt = ({ setP5Object }: ArtProps) => {
  function sketch(p: any) {
    let shapes: any[] = [];
    let circles: any[] = [];
    let colors = [...colorsSource];

    p.setup = () => {
      setP5Object(p);
      p.pixelDensity(1);
      p.createCanvas(ART_WIDTH, ART_HEIGHT);
      p.rectMode(p.CENTER);
      generate();
    };

    function generate() {
      p.noiseSeed(p.int(p.random(100000)));
      tiling();

      p.shuffle(colors, true);
      p.background(colors[0]);
      colors.splice(0, 1);

      let hlen = p.int(shapes.length / 2);
      for (let i = 0; i < hlen; i++) {
        let x = shapes[i][0];
        let y = shapes[i][1];
        let w = shapes[i][2];
        let h = shapes[i][3];
        p.noStroke();
        p.fill(p.random(colors));
        p.rect(x, y, w - 5, h - 5);
      }

      for (let i = hlen; i < shapes.length; i++) {
        let x = shapes[i][0];
        let y = shapes[i][1];
        let w = shapes[i][2];
        let h = shapes[i][3];
        p.noStroke();
        p.fill(p.random(colors));
        if (p.random() < 0.5) {
          p.stroke(p.random(colors));
          p.noFill();
        }
        p.rect(x, y, w - 5, h - 5);
      }

      for (let i = 0; i < circles.length; i++) {
        let x = circles[i][0];
        let y = circles[i][1];
        let d = circles[i][2];
        let col = p.color(p.random(colors));
        let ac = p.TAU / (d * 2);
        if (p.random() < 0.5) {
          p.noStroke();
          p.fill(col);
          p.circle(x, y, d);
        }

        p.noFill();
        p.stroke(col);
        p.circle(x, y, d);
        col.setAlpha(40);
        p.stroke(col);
        for (let a = 0; a < p.TAU; a += ac) {
          noiseCurve(x + d * 0.5 * p.cos(a), y + d * 0.5 * p.sin(a));
        }
      }

      shapes.length = 0;
      circles.length = 0;
      p.noiseSeed(p.int(p.random(100000)));
    }

    function tiling() {
      let offset = 50;
      let gridCountW = 8;
      let gridCountH = gridCountW;
      let gridW = (p.width - offset * 2) / gridCountW;
      let gridH = (p.height - offset * 2) / gridCountH;
      let emp = gridCountW * gridCountH;
      let grids = [];

      for (let j = 0; j < gridCountW; j++) {
        let arr = [];
        for (let i = 0; i < gridCountH; i++) {
          arr[i] = false;
        }
        grids[j] = arr;
      }

      while (emp > 0) {
        let w = p.int(p.random(1, 5));
        let h = p.int(p.random(1, 5));
        let x = p.int(p.random(gridCountW - w + 1));
        let y = p.int(p.random(gridCountH - h + 1));
        let lap = true;

        for (let j = 0; j < h; j++) {
          for (let i = 0; i < w; i++) {
            if (grids[x + i][y + j]) {
              lap = false;
              break;
            }
          }
        }

        if (lap) {
          for (let j = 0; j < h; j++) {
            for (let i = 0; i < w; i++) {
              grids[x + i][y + j] = true;
            }
          }
          let ww = w * gridW;
          let hh = h * gridH;
          let xx = offset + x * gridW + ww * 0.5;
          let yy = offset + y * gridH + hh * 0.5;
          if (ww != hh) {
            shapes.push([xx, yy, ww, hh]);
          } else {
            circles.push([xx, yy, ww]);
          }
          emp -= w * h;
        }
      }
    }

    function noiseCurve(x: any, y: any) {
      let c = p.int(p.random(20, 100));
      p.beginShape();
      for (let i = 0; i < c; i++) {
        let scl = 0.00055;
        let angle = p.noise(x * scl, y * scl, i * 0.00035) * 120;
        p.vertex(x, y);
        x += p.cos(angle) * 5;
        y += p.sin(angle) * 5;
      }
      p.endShape();
    }

    p.draw = function () {};
  }

  return <P5Wrapper sketch={sketch} />;
};

export default FirstArt;
