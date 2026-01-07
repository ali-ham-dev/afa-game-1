import Phaser from 'phaser';
import bgImage from './assets/bg.png';
import basketImage from './assets/basket.png';
import apple from './assets/apple.png';

class GameScene extends Phaser.Scene {
    basket!: Phaser.Physics.Arcade.Image;
    cursor!: Phaser.Types.Input.Keyboard.CursorKeys;
    apple!: Phaser.Physics.Arcade.Image;
    score: number = 0;
    scoreText!: Phaser.GameObjects.Text;
    timeLeft: number = 30;
    timerText!: Phaser.GameObjects.Text;
    gameOver: boolean = false;
    gameOverText!: Phaser.GameObjects.Text;

    constructor() {
        super('GameScene');
    }

    preload() {
        this.load.image("bg", bgImage);
        this.load.image("basket", basketImage);
        this.load.image("apple", apple);
    }

    create() {
        // --- Background Image Setup ---
        const bg = this.add.image(this.scale.width / 2, this.scale.height / 2, "bg");
        bg.setOrigin(0.5, 0.5);

        // Maintain aspect ratio without stretching
        const scaleX = this.scale.width / bg.width;
        const scaleY = this.scale.height / bg.height;
        const scale = Math.min(scaleX, scaleY);

        bg.setScale(scale);

        // --- Basket Setup ---
        this.basket = this.physics.add.image(this.scale.width / 2, 400, "basket");
        this.basket.setOrigin(0.5, -1.5);
        this.basket.setImmovable(true);
        // @ts-ignore
        this.basket.body!.allowGravity = false;
        this.basket.setCollideWorldBounds(true);

        // --- Apple Setup ---
        this.apple = this.physics.add.image(this.scale.width / 2, 0, "apple");
        this.apple.setMaxVelocity(0, 500);

        // --- Collision Detection ---
        this.physics.add.overlap(this.basket, this.apple, this.collectApple, undefined, this);

        // --- Score Display ---
        this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
            fontSize: '24px',
            color: '#ffffff'
        });
        this.scoreText.setDepth(10);

        // --- Timer Display ---
        this.timerText = this.add.text(this.scale.width - 16, 16, `Time: ${this.formatTime(this.timeLeft)}`, {
            fontSize: '24px',
            color: '#ffffff'
        });
        this.timerText.setOrigin(1, 0);
        this.timerText.setDepth(10);

        // --- Input Setup ---
        this.cursor = this.input.keyboard!.createCursorKeys();
    }

    collectApple() {
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);
        this.apple.setY(0);
        this.apple.setX(Phaser.Math.Between(this.scale.width * 0.3, this.scale.width * 0.7));
    }

    update() {
        if (this.gameOver) return;

        // Countdown timer
        this.timeLeft -= 1 / 60; // Decrease by frame (60 fps)
        this.timerText.setText(`Time: ${this.formatTime(this.timeLeft)}`);

        // Check if time is up
        if (this.timeLeft <= 0) {
            this.endGame();
            return;
        }

        if (this.cursor.left.isDown) {
            this.basket.setVelocityX(-500);
        } else if (this.cursor.right.isDown) {
            this.basket.setVelocityX(500);
        } else {
            this.basket.setVelocityX(0);
        }

        // Reset apple position if it falls off screen
        if (this.apple.y > this.scale.height) {
            this.apple.setY(0);
            this.apple.setX(Phaser.Math.Between(0, this.scale.width));
        }
    }

    formatTime(seconds: number): string {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    endGame() {
        this.gameOver = true;
        this.physics.pause();

        const won = this.score >= 500;
        const message = won ? 'YOU WON!' : 'YOU LOST!';
        const color = won ? '#00ff00' : '#ff0000';

        this.gameOverText = this.add.text(
            this.scale.width / 2,
            this.scale.height / 2,
            `${message}\nFinal Score: ${this.score}`,
            {
                fontSize: '48px',
                color: color,
                align: 'center'
            }
        );
        this.gameOverText.setOrigin(0.5);
        this.gameOverText.setDepth(100);
    }
}

export const createGameConfig = (parentElement: string): Phaser.Types.Core.GameConfig => {
  const container = document.getElementById(parentElement);
  const width = container?.clientWidth;
  const height = container?.clientHeight;

  const gravityX = 0;
  const gravityY = 300;

  return {
    type: Phaser.AUTO,
    width: width,
    height: height,
    parent: parentElement,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: gravityX, y: gravityY },
        debug: false
      }
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: GameScene,
    backgroundColor: '#1a1a2e'
  };
}
