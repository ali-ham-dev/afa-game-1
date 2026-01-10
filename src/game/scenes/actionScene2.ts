import Phaser from 'phaser';
import mapImage from '../assets/map.png';
import basketImage from '../assets/basket.png';

interface BlockedRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class ActionScene2 extends Phaser.Scene {
    player!: Phaser.Physics.Arcade.Image;
    cursor!: Phaser.Types.Input.Keyboard.CursorKeys;
    obstacles!: Phaser.Physics.Arcade.StaticGroup;
    dKey!: Phaser.Input.Keyboard.Key;

    // Define collision zones (blocked rectangles) in world coordinates
    // Format: { x: center_x, y: center_y, width, height }
    blockedRects: BlockedRect[] = [
        // Example obstacles—adjust these to match your map layout
        { x: 500, y: 500, width: 300, height: 100 },      // Top-left wall
        { x: 3000, y: 800, width: 400, height: 150 },    // Top-right wall
        { x: 1700, y: 1400, width: 200, height: 800 },   // Center vertical wall
        { x: 800, y: 2200, width: 500, height: 200 },    // Bottom-left wall
        { x: 2700, y: 2400, width: 600, height: 150 },   // Bottom-right wall
    ];

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

        // --- Obstacles Setup ---
        this.obstacles = this.physics.add.staticGroup();
        this.createObstacles();

        // --- Player Setup ---
        // Create player at center of map
        this.player = this.physics.add.image(mapWidth / 2, mapHeight / 2, "basket");
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0);
        this.player.setMaxVelocity(300, 300);

        // --- Collider Setup ---
        this.physics.add.collider(this.player, this.obstacles);

        // --- Camera Setup ---
        // Set camera bounds to match world bounds
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
        
        // Camera follows the player
        this.cameras.main.startFollow(this.player);
        
        // Set a reasonable zoom level (0.5 allows good visibility of the map while keeping player in focus)
        this.cameras.main.setZoom(0.5);

        // --- Input Setup ---
        this.cursor = this.input.keyboard!.createCursorKeys();
        this.dKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.dKey.on('down', () => {
            this.obstacles.children.entries.forEach((obstacle) => {
                const obj = obstacle as Phaser.GameObjects.Rectangle;
                obj.setAlpha(obj.alpha === 0 ? 0.3 : 0);
            });
        });
    }

    createObstacles() {
        for (const rect of this.blockedRects) {
            // Create a semi-transparent rectangle as the collision body
            const obstacle = this.add.rectangle(rect.x, rect.y, rect.width, rect.height, 0xff0000);
            
            // Make it semi-transparent by default (toggle with D key)
            obstacle.setAlpha(0.3);
            
            // Add static physics body
            this.physics.add.existing(obstacle, true);
            
            // Log obstacle info
            console.log(`Obstacle at (${rect.x}, ${rect.y}), size: ${rect.width}x${rect.height}`);
            
            // Add to static group for collider
            this.obstacles.add(obstacle);
        }
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
