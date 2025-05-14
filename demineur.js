const demineur = (p) => {
    let cols = 10;
    let rows = 10;
    let cellSize;
    let grid = [];
    let totalMines = 15;
    let gameOver = false;
    let replayButton;
    let canvas;
  
    class Cell {
      constructor(i, j, w) {
        this.i = i;
        this.j = j;
        this.x = i * w;
        this.y = j * w;
        this.w = w;
        this.revealed = false;
        this.mine = false;
        this.neighborCount = 0;
      }
  
      show() {
        p.stroke(0);
        p.noFill();
        p.rect(this.x, this.y, this.w, this.w);
  
        if (this.revealed) {
          if (this.mine) {
            p.fill(255, 0, 0);
            p.ellipse(this.x + this.w / 2, this.y + this.w / 2, this.w * 0.5);
          } else {
            p.fill(200);
            p.rect(this.x, this.y, this.w, this.w);
            if (this.neighborCount > 0) {
              p.fill(0);
              p.textAlign(p.CENTER, p.CENTER);
              p.textSize(this.w * 0.5);
              p.text(this.neighborCount, this.x + this.w / 2, this.y + this.w / 2);
            }
          }
        }
      }
  
      countMines() {
        if (this.mine) {
          this.neighborCount = -1;
          return;
        }
        let total = 0;
        for (let xoff = -1; xoff <= 1; xoff++) {
          for (let yoff = -1; yoff <= 1; yoff++) {
            let i = this.i + xoff;
            let j = this.j + yoff;
            if (i > -1 && i < cols && j > -1 && j < rows) {
              let neighbor = grid[i][j];
              if (neighbor.mine) {
                total++;
              }
            }
          }
        }
        this.neighborCount = total;
      }
  
      reveal() {
        this.revealed = true;
        if (this.mine) {
          gameOver = true;
          revealAllMines();
          replayButton.show();
          positionReplayButton();
        } else if (this.neighborCount === 0) {
          this.floodFill();
        }
      }
  
      floodFill() {
        for (let xoff = -1; xoff <= 1; xoff++) {
          for (let yoff = -1; yoff <= 1; yoff++) {
            let i = this.i + xoff;
            let j = this.j + yoff;
            if (i > -1 && i < cols && j > -1 && j < rows) {
              let neighbor = grid[i][j];
              if (!neighbor.revealed && !neighbor.mine) {
                neighbor.reveal();
              }
            }
          }
        }
      }
  
      contains(x, y) {
        return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w;
      }
    }
  
    function make2DArray(cols, rows) {
      let arr = new Array(cols);
      for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
      }
      return arr;
    }
  
    function revealAllMines() {
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let cell = grid[i][j];
          if (cell.mine) {
            cell.revealed = true;
          }
        }
      }
    }
  
    function resetGame() {
      cellSize = Math.floor(Math.min(p.windowWidth, 400) / cols); // max 400px large
      grid = make2DArray(cols, rows);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          grid[i][j] = new Cell(i, j, cellSize);
        }
      }
  
      let options = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          options.push([i, j]);
        }
      }
  
      for (let n = 0; n < totalMines; n++) {
        let index = Math.floor(p.random(options.length));
        let choice = options.splice(index, 1)[0];
        let i = choice[0];
        let j = choice[1];
        grid[i][j].mine = true;
      }
  
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          grid[i][j].countMines();
        }
      }
  
      gameOver = false;
      replayButton.hide();
      positionReplayButton();
    }
  
    function positionReplayButton() {
      const x = (p.windowWidth - replayButton.width) / 2;
      const y = rows * cellSize + 500;
      replayButton.position(x, y);
    }
  
    p.setup = () => {
      cellSize = Math.floor(Math.min(p.windowWidth, 400) / cols);
      canvas = p.createCanvas(cols * cellSize, rows * cellSize + 80);
      canvas.parent("demineur-game");
  
      replayButton = p.createButton("Rejouer");
      replayButton.mousePressed(resetGame);
      replayButton.hide();
  
      resetGame();
    };
  
    p.draw = () => {
      p.background(255);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          grid[i][j].show();
        }
      }
  
      if (gameOver) {
        p.fill(255, 0, 0);
        p.textSize(24);
        p.textAlign(p.CENTER);
        p.text("Game Over", p.width / 2, rows * cellSize + 30);
      }
    };
  
    p.mousePressed = () => {
      if (gameOver) return;
  
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (grid[i][j].contains(p.mouseX, p.mouseY)) {
            grid[i][j].reveal();
          }
        }
      }
    };
  
    p.windowResized = () => {
      resetGame();
      p.resizeCanvas(cols * cellSize, rows * cellSize + 80);
      positionReplayButton();
    };
  };
  
new p5(demineur);
