import React, { Component } from "react";

function dist(p1x, p1y, p2x, p2y) {
  return Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2));
}

class Segment {
  constructor(parent, l, a, first) {
    this.first = first;
    if (first) {
      this.pos = {
        x: parent.x,
        y: parent.y,
      };
    } else {
      this.pos = {
        x: parent.nextPos.x,
        y: parent.nextPos.y,
      };
    }
    this.l = l;
    this.ang = a;
    this.nextPos = {
      x: this.pos.x + this.l * Math.cos(this.ang),
      y: this.pos.y + this.l * Math.sin(this.ang),
    };
  }
  update(t) {
    this.ang = Math.atan2(t.y - this.pos.y, t.x - this.pos.x);
    this.pos.x = t.x + this.l * Math.cos(this.ang - Math.PI);
    this.pos.y = t.y + this.l * Math.sin(this.ang - Math.PI);
    this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
    this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
  }
  fallback(t) {
    this.pos.x = t.x;
    this.pos.y = t.y;
    this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
    this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
  }
  show(context) {
    context.lineTo(this.nextPos.x, this.nextPos.y);
  }
}

class Tentacle {
  constructor(x, y, l, n, a) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.n = n;
    this.t = {};
    this.rand = Math.random();
    this.segments = [new Segment(this, this.l / this.n, 0, true)];
    for (let i = 1; i < this.n; i++) {
      this.segments.push(
        new Segment(this.segments[i - 1], this.l / this.n, 0, false)
      );
    }
  }
  move(last_target, target) {
    this.angle = Math.atan2(target.y - this.y, target.x - this.x);
    this.dt = dist(last_target.x, last_target.y, target.x, target.y) + 5;
    this.t = {
      x: target.x - 0.8 * this.dt * Math.cos(this.angle),
      y: target.y - 0.8 * this.dt * Math.sin(this.angle),
    };
    if (this.t.x) {
      this.segments[this.n - 1].update(this.t);
    } else {
      this.segments[this.n - 1].update(target);
    }
    for (let i = this.n - 2; i >= 0; i--) {
      this.segments[i].update(this.segments[i + 1].pos);
    }
    if (
      dist(this.x, this.y, target.x, target.y) <=
      this.l + dist(last_target.x, last_target.y, target.x, target.y)
    ) {
      this.segments[0].fallback({ x: this.x, y: this.y });
      for (let i = 1; i < this.n; i++) {
        this.segments[i].fallback(this.segments[i - 1].nextPos);
      }
    }
  }
  show(context, target) {
    if (dist(this.x, this.y, target.x, target.y) <= this.l) {
      context.globalCompositeOperation = "lighter";
      context.beginPath();
      context.lineTo(this.x, this.y);
      for (let i = 0; i < this.n; i++) {
        this.segments[i].show(context);
      }
      context.strokeStyle =
        "hsl(" +
        (this.rand * 60 + 180) +
        ",100%," +
        (this.rand * 60 + 25) +
        "%)";
      context.lineWidth = this.rand * 2;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.stroke();
      context.globalCompositeOperation = "source-over";
    }
  }
  show2(context, target) {
    context.beginPath();
    if (dist(this.x, this.y, target.x, target.y) <= this.l) {
      context.arc(this.x, this.y, 2 * this.rand + 1, 0, 2 * Math.PI);
      context.fillStyle = "white";
    } else {
      context.arc(this.x, this.y, this.rand * 2, 0, 2 * Math.PI);
      context.fillStyle = "darkcyan";
    }
    context.fill();
  }
}

class TentacleAnimation extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.mouse = { x: false, y: false };
    this.lastMouse = {};
    this.target = { x: 0, y: 0 };
    this.lastTarget = {};
    this.t = 0;
    this.q = 10;
    this.maxl = 300;
    this.minl = 50;
    this.n = 30;
    this.numt = 500;
    this.tent = [];
    this.clicked = false;
  }

  componentDidMount() {
    this.initCanvas();
    this.setupListeners();
    this.createTentacles();
    this.loop();
    setInterval(this.loop, 1000 / 60);
  }

  initCanvas() {
    const canvas = this.canvasRef.current;
    this.c = canvas.getContext("2d");
    this.w = canvas.width = window.innerWidth;
    this.h = canvas.height = window.innerHeight;
    this.c.fillStyle = "rgba(30,30,30,1)";
    this.c.fillRect(0, 0, this.w, this.h);
  }

  createTentacles() {
    for (let i = 0; i < this.numt; i++) {
      this.tent.push(
        new Tentacle(
          Math.random() * this.w,
          Math.random() * this.h,
          Math.random() * (this.maxl - this.minl) + this.minl,
          this.n,
          Math.random() * 2 * Math.PI
        )
      );
    }
  }

  setupListeners() {
    const canvas = this.canvasRef.current;

    canvas.addEventListener(
      "mousemove",
      (e) => {
        this.lastMouse.x = this.mouse.x;
        this.lastMouse.y = this.mouse.y;
        this.mouse.x = e.pageX - canvas.offsetLeft;
        this.mouse.y = e.pageY - canvas.offsetTop;
      },
      false
    );

    canvas.addEventListener("mouseleave", (e) => {
      this.mouse.x = false;
      this.mouse.y = false;
    });

    canvas.addEventListener(
      "mousedown",
      (e) => {
        this.clicked = true;
      },
      false
    );

    canvas.addEventListener(
      "mouseup",
      (e) => {
        this.clicked = false;
      },
      false
    );

    window.addEventListener("resize", () => {
      this.w = canvas.width = window.innerWidth;
      this.h = canvas.height = window.innerHeight;
      this.loop();
    });
  }

  loop = () => {
    window.requestAnimationFrame(this.loop);
    this.c.clearRect(0, 0, this.w, this.h);
    this.draw();
  };

  draw() {
    if (this.mouse.x) {
      this.target.errx = this.mouse.x - this.target.x;
      this.target.erry = this.mouse.y - this.target.y;
    } else {
      this.target.errx =
        this.w / 2 +
        ((this.h / 2 - this.q) * Math.sqrt(2) * Math.cos(this.t)) /
          (Math.pow(Math.sin(this.t), 2) + 1) -
        this.target.x;
      this.target.erry =
        this.h / 2 +
        ((this.h / 2 - this.q) *
          Math.sqrt(2) *
          Math.cos(this.t) *
          Math.sin(this.t)) /
          (Math.pow(Math.sin(this.t), 2) + 1) -
        this.target.y;
    }

    this.target.x += this.target.errx / 10;
    this.target.y += this.target.erry / 10;

    this.t += 0.01;

    this.c.beginPath();
    this.c.arc(
      this.target.x,
      this.target.y,
      dist(this.lastTarget.x, this.lastTarget.y, this.target.x, this.target.y) +
        5,
      0,
      2 * Math.PI
    );
    this.c.fillStyle = "hsl(210,100%,80%)";
    this.c.fill();

    for (let i = 0; i < this.numt; i++) {
      this.tent[i].move(this.lastTarget, this.target);
      this.tent[i].show2(this.c, this.target);
    }
    for (let i = 0; i < this.numt; i++) {
      this.tent[i].show(this.c, this.target);
    }
    this.lastTarget.x = this.target.x;
    this.lastTarget.y = this.target.y;
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

export default TentacleAnimation;
