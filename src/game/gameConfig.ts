import Phaser from 'phaser';
import bgImage from './assets/bg.png';
import basketImage from './assets/basket.png';
import apple from './assets/apple.png';

class GameScene extends Phaser.Scene {
    basket!: Phaser.Physics.Arcade.Image;
    cursor!: Phaser.Types.Input.Keyboard.CursorKeys;
    apple!: Phaser.Physics.Arcade.Image;

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

        // --- Input Setup ---
        this.cursor = this.input.keyboard!.createCursorKeys();
    }

    update() {
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
