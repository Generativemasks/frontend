import * as React from "react";
// @ts-ignore
import P5Wrapper from "react-p5-wrapper";
import { ART_HEIGHT, ART_WIDTH, ArtProps } from "./FirstArt";

const colors = [
  "#E33A3B",
  "#F86506",
  "#F9AB08",
  "#0DAB82",
  "#ffffff",
  "#2E27A2",
];

const SecondArt = ({ setP5Object }: ArtProps) => {
  function sketch(p: any) {
    p.setup = () => {
      setP5Object(p);
      p.pixelDensity(1);
      p.createCanvas(ART_WIDTH, ART_HEIGHT);
      p.rectMode(p.CENTER);
      p.translate(p.width / 2, p.height / 2);
      p.scale(0.95);
      p.translate(-p.width / 2, -p.height / 2);
      p.background(255);
      p.strokeWeight(2);
      grid();
    };

    function grid() {
      let seg = 7;
      let w = p.width / seg;
      for (let i = 0; i < seg; i++) {
        for (let j = 0; j < seg; j++) {
          let x = i * w + w / 2;
          let y = j * w + w / 2;
          form(x, y, w);
        }
      }
    }

    function form(x: any, y: any, s: any) {
      let rnd = p.int(p.random(8));
      let ang = (p.int(p.random(4)) * p.TAU) / 4;
      let hs = s / 2;
      let col = p.random(colors);

      p.push();
      p.translate(x, y);
      if (p.random(1) < 0.5) p.scale(-1, 1);
      p.rotate(ang);
      p.stroke(0);
      p.line(-hs, hs, hs, hs);

      if (rnd == 0) {
        p.line(s * 0.08, s * 0.5, s * 0.08, s * 0.4);
        p.line(-s * 0.01, s * 0.5, -s * 0.01, s * 0.4);

        p.fill(col);
        p.beginShape();
        p.vertex(s * 0.1, s * 0.4);
        p.vertex(-s * 0.07, s * 0.4);
        p.vertex(s * 0.1, s * 0.0);
        p.endShape(p.CLOSE);

        p.circle(s * 0.075, hs * 0.05, s * 0.16);
      } else if (rnd == 1) {
        p.fill(col);
        p.circle(-s * 0.25, s * 0.3, s * 0.26);
        p.circle(-s * 0.155, s * 0.04, s * 0.17);
        p.circle(-s * 0.08, -s * 0.14, s * 0.1);
      } else if (rnd == 2) {
        p.line(hs * 0.5, 0, -hs * 0.5, 0);
        p.line(0, hs, 0, -hs * 0.5);
      } else if (rnd == 3) {
        p.beginShape();
        p.vertex(hs, hs);
        p.vertex(hs, hs * 0.5);
        p.vertex(hs * 0.5, hs * 0.5);
        p.vertex(hs * 0.5, 0);
        p.vertex(0, 0);
        p.vertex(0, -hs * 0.5);
        p.vertex(-hs * 0.5, -hs * 0.5);
        p.vertex(-hs * 0.5, -hs);
        p.vertex(-hs, -hs);
        p.endShape();
      } else if (rnd == 4) {
        p.noFill();
        p.arc(0, 0, hs, hs, p.PI, p.TAU);
        p.arc(hs * 0.25 * 0.5, 0, hs * 0.75, hs * 0.75, 0, p.PI * 0.5);
        p.arc(
          hs * 0.25 * 0.5,
          hs * 0.625,
          hs * 0.5,
          hs * 0.5,
          p.PI * 0.5,
          p.PI * 1.5
        );
        p.fill(col);
        p.circle(0, 0, hs * 0.2);
      } else if (rnd == 5) {
        p.line(s * 0.1, s * 0.5, s * 0.1, s * 0.25);
        p.line(0, s * 0.5, 0, s * 0.4);
      } else if (rnd == 6) {
        p.fill(p.random(colors));
        p.line(s * 0.5, s * 0.5, -s * 0.1, -s * 0.1);
        p.circle(s * 0.1, 0, s * 0.1);
        p.circle(s * 0.1, s * 0.2, s * 0.1);
        p.circle(s * 0.3, s * 0.2, s * 0.1);
        p.circle(s * 0.3, s * 0.4, s * 0.1);
      }
      p.pop();
    }
  }

  return <P5Wrapper sketch={sketch} />;
};

export default SecondArt;
