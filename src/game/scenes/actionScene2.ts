import Phaser from 'phaser';
import mapImage from '../assets/map.png';
import basketImage from '../assets/basket.png';

export class ActionScene2 extends Phaser.Scene {
    player!: Phaser.Physics.Arcade.Image;
    cursor!: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super('ActionScene2');
    }

    preload() {
        this.load.image("map", mapImage);
        this.load.image("basket", basketImage);
    }

    create() {
        // --- Map Setup ---
        const mapWidth = 3455;
        const mapHeight = 2812;
        
        // Add the map image at world origin (0, 0) with origin at top-left
        const map = this.add.image(0, 0, "map");
        map.setOrigin(0, 0);

        // --- World Bounds Setup ---
        this.physics.world.setBounds(0, 0, mapWidth, mapHeight);

        // --- Player Setup ---
        // Create player at center of map
        this.player = this.physics.add.image(mapWidth / 2, mapHeight / 2, "basket");
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0);
        this.player.setMaxVelocity(300, 300);

        // --- Camera Setup ---
        // Set camera bounds to match world bounds
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
        
        // Camera follows the player
        this.cameras.main.startFollow(this.player);
        
        // Set a reasonable zoom level (0.5 allows good visibility of the map while keeping player in focus)
        this.cameras.main.setZoom(0.5);

        // --- Input Setup ---
        this.cursor = this.input.keyboard!.createCursorKeys();
    }

    update() {
        // Reset velocity each frame
        this.player.setVelocity(0, 0);

        // Handle horizontal movement
        if (this.cursor.left.isDown) {
            this.player.setVelocityX(-300);
        } else if (this.cursor.right.isDown) {
            this.player.setVelocityX(300);
        }

        // Handle vertical movement
        if (this.cursor.up.isDown) {
            this.player.setVelocityY(-300);
        } else if (this.cursor.down.isDown) {
            this.player.setVelocityY(300);
        }
    }
}
