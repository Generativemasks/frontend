import * as React from "react";
// @ts-ignore
import P5Wrapper from "react-p5-wrapper";
import { ART_HEIGHT, ART_WIDTH, ArtProps } from "./FirstArt";

const colorsSource = [
  "#E33A3B",
  "#F86506",
  "#F9AB08",
  "#0DAB82",
  "#ffffff",
  "#2E27A2",
];

const ThirdArt = ({ setP5Object }: ArtProps) => {
  function sketch(p: any) {
    const colors = [...colorsSource];

    p.setup = () => {
      setP5Object(p);
      p.pixelDensity(1);
      p.createCanvas(ART_WIDTH, ART_HEIGHT);
      p.imageMode(p.CENTER);

      p.translate(p.width / 2, p.height / 2);
      p.scale(0.9);
      p.translate(-p.width / 2, -p.height / 2);

      p.shuffle(colors, true);
      p.background(colors[0]);
      colors.splice(0, 1);

      let seg = 6;
      let w = p.width / seg;
      for (let i = 0; i < seg; i++) {
        for (let j = 0; j < seg; j++) {
          let x = i * w + w / 2;
          let y = j * w + w / 2;
          if ((i + j) % 2 == 0) {
            p.shuffle(colors, true);
            circleForm(x, y, w);
          }
        }
      }
    };

    function circleForm(x: any, y: any, d: any) {
      let ots = p.int(p.random(1, 5));
      p.push();
      p.translate(x, y);
      p.rotate(p.int(p.random(8)) * p.PI * 0.5);

      insGrfx(0, 0, d * 0.7);

      p.fill(p.random(colors));
      p.noStroke();
      if (ots == 1) {
        p.arc(0, 0, d, d, 0, p.PI, p.PIE);
      }
      if (ots == 2) {
        p.arc(0, 0, d, d, 0, p.PI * 1.5, p.PIE);
      }
      if (ots == 3) {
        p.arc(0, 0, d, d, 0, p.PI * 0.5, p.PIE);
        p.arc(0, 0, d, d, p.PI, p.PI * 1.5, p.PIE);
      }
      if (ots == 4) {
        p.arc(0, 0, d, d, 0, p.PI * 0.5, p.PIE);
      }

      let l = d;

      p.stroke(p.random(colors));
      p.line(0, l, 0, -l);
      p.stroke(p.random(colors));
      p.line(l, 0, -l, 0);
      p.pop();
    }

    function insGrfx(x: any, y: any, s: any) {
      let pg = p.createGraphics(s, s);
      let rnd = p.int(p.random(4));
      pg.translate(s * 0.5, s * 0.5);
      pg.background(colors[0]);
      pg.noStroke();

      if (rnd == 0) {
        let n = p.int(p.random(5, 12));
        for (let i = 0; i < n; i++) {
          let d = p.map(i, 0, n, s, 0);
          pg.fill(colors[i % colors.length]);
          pg.circle(0, 0, d);
        }
      } else if (rnd == 1) {
        let n = p.int(p.random(5, 10));
        let w = s / n;
        pg.fill(colors[1]);
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            if ((i + j) % 2 == 0) {
              pg.rect(i * w - s / 2, j * w - s / 2, w, w);
            }
          }
        }
      } else if (rnd == 2) {
        let n = p.int(p.random(5, 10));
        let w = s / n;
        pg.stroke(colors[1]);
        pg.strokeWeight(w * 0.5);
        pg.noFill();
        for (let i = 0; i <= n; i++) {
          pg.beginShape();
          for (let j = 0; j < s; j++) {
            pg.vertex(j - s / 2, i * w - s / 2);
          }
          pg.endShape();
        }
      } else if (rnd == 3) {
        let n = p.int(p.random(5, 10));
        let w = s / n;
        let r = s * p.random(0.1);
        let am = p.random(0.2);
        pg.stroke(colors[1]);
        pg.strokeWeight(w * 0.3);
        pg.noFill();
        for (let i = 0; i <= n; i++) {
          pg.beginShape();
          for (let j = 0; j < s; j++) {
            pg.vertex(j - s / 2, i * w + r * p.sin(j * am) - s / 2);
          }
          pg.endShape();
        }
      }

      pg.fill(0);
      pg.erase();
      pg.beginShape();
      pg.vertex(s / 2, s / 2);
      pg.vertex(s / 2, -s / 2);
      pg.vertex(-s / 2, -s / 2);
      pg.vertex(-s / 2, s / 2);
      pg.beginContour();
      for (let a = 0; a < p.TAU; a += p.TAU / 180) {
        pg.vertex(s * 0.5 * p.cos(a), s * 0.5 * p.sin(a));
      }
      pg.endContour();
      pg.endShape();

      p.image(pg, x, y);
    }
  }

  return <P5Wrapper sketch={sketch} />;
};

export default ThirdArt;
