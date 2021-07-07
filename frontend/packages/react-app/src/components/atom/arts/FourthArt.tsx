import * as React from "react";
// @ts-ignore
import P5Wrapper from "react-p5-wrapper";
import { ART_HEIGHT, ART_WIDTH, ArtProps } from "./FirstArt";

const colorsSource = [
  "#c20114",
  "#6d7275",
  "#c7d6d5",
  "#ecebf3",
  "#fac748",
  "#3f3d3d",
];

const FourthArt = ({ setP5Object }: ArtProps) => {
  function sketch(p: any) {
    const colors = [...colorsSource];

    p.setup = () => {
      setP5Object(p);
      p.pixelDensity(1);
      p.createCanvas(ART_WIDTH, ART_HEIGHT);
      p.rectMode(p.CENTER);

      p.shuffle(colors, true);
      p.background(colors[0]);
      colors.splice(0, 1);

      p.noStroke();
      rectRecursion(40, 40, p.width - 80, p.height - 80);
    };

    function rectRecursion(x: any, y: any, w: any, h: any) {
      let rnd = p.int(p.random(2));
      let cc = 5;
      let w1 = p.int(p.random(1, cc)) * (w / cc);
      let w2 = w - w1;
      let h1 = p.int(p.random(1, cc)) * (h / cc);
      let h2 = h - h1;
      let min = 20;

      if (w1 > min && w2 > min && h1 > min && h2 > min) {
        if (rnd == 0) {
          rectRecursion(x, y, w1, h);
          rectRecursion(x + w1, y, w2, h);
        }
        if (rnd == 1) {
          rectRecursion(x, y, w, h1);
          rectRecursion(x, y + h1, w, h2);
        }
      } else {
        p.shuffle(colors, true);
        rectForm(x + w / 2, y + h / 2, w - 7, h - 7);
      }
    }

    function rectForm(x: any, y: any, w: any, h: any) {
      let c1 = p.int(p.random(1, 7));
      let c2 = p.int(p.random(1, 7));
      let ww = w / c1;
      let hh = h / c2;
      let ow = p.random(0.1) * w;

      if (w > h) ow = p.random(0.1) * h;
      let oh = ow;
      p.fill(colors[0]);
      p.rect(x, y, w, h);
      p.fill(colors[1]);
      for (let i = 0; i < c1; i++) {
        for (let j = 0; j < c2; j++) {
          let xx = x + ww * i + ww / 2 - w / 2;
          let yy = y + hh * j + hh / 2 - h / 2;
          p.rect(xx, yy, ww - ow, hh - oh);
        }
      }
    }
  }

  return <P5Wrapper sketch={sketch} />;
};

export default FourthArt;
