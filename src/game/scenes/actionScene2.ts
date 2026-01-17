import Phaser from 'phaser';
import mapImage from '../assets/map.png';
import characterSpriteSheet from '../assets/character_sprite.png';

interface BlockedRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

type Direction = 'down' | 'downleft' | 'left' | 'upleft' | 'up' | 'upright' | 'right' | 'downright';

export class ActionScene2 extends Phaser.Scene {
    player!: Phaser.Physics.Arcade.Sprite;
    cursor!: Phaser.Types.Input.Keyboard.CursorKeys;
    obstacles!: Phaser.Physics.Arcade.StaticGroup;
    dKey!: Phaser.Input.Keyboard.Key;
    lastDirection: Direction = 'down';

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
        this.load.spritesheet("character", characterSpriteSheet, {
            frameWidth: 516,
            frameHeight: 516
        });
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
        // Create player at center of map using sprite instead of image
        this.player = this.physics.add.sprite(mapWidth / 2, mapHeight / 2, "character");
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0);
        this.player.setMaxVelocity(300, 300);
        
        // Scale character down to reasonable size (adjust as needed)
        this.player.setScale(0.4);

        // --- Animations Setup ---
        this.createAnimations();

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

    createAnimations() {
        // Define animations for each direction (8 directions × 5 frames each)
        const directions: Array<{ name: Direction; row: number }> = [
            { name: 'down', row: 0 },
            { name: 'downleft', row: 1 },
            { name: 'left', row: 2 },
            { name: 'upleft', row: 3 },
            { name: 'up', row: 4 },
            { name: 'upright', row: 5 },
            { name: 'right', row: 6 },
            { name: 'downright', row: 7 }
        ];

        directions.forEach(({ name, row }) => {
            const startFrame = row * 5;
            const endFrame = startFrame + 4;
            
            this.anims.create({
                key: `walk-${name}`,
                frames: this.anims.generateFrameNumbers('character', {
                    start: startFrame,
                    end: endFrame
                }),
                frameRate: 10,
                repeat: -1
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

    getDirectionFromVelocity(vx: number, vy: number): Direction {
        // Determine direction based on velocity
        const threshold = 10; // Minimum velocity to consider as movement
        
        const moveUp = vy < -threshold;
        const moveDown = vy > threshold;
        const moveLeft = vx < -threshold;
        const moveRight = vx > threshold;

        // Normalize diagonal speed (optional but ensures diagonal movement isn't faster)
        if ((moveUp || moveDown) && (moveLeft || moveRight)) {
            // Moving diagonally
            if (moveUp && moveLeft) return 'upleft';
            if (moveUp && moveRight) return 'upright';
            if (moveDown && moveLeft) return 'downleft';
            if (moveDown && moveRight) return 'downright';
        }

        // Cardinal directions
        if (moveUp) return 'up';
        if (moveDown) return 'down';
        if (moveLeft) return 'left';
        if (moveRight) return 'right';

        // No movement
        return this.lastDirection;
    }

    update() {
        // Reset velocity each frame
        this.player.setVelocity(0, 0);

        let vx = 0;
        let vy = 0;

        // Handle horizontal movement
        if (this.cursor.left.isDown) {
            vx = -300;
        } else if (this.cursor.right.isDown) {
            vx = 300;
        }

        // Handle vertical movement
        if (this.cursor.up.isDown) {
            vy = -300;
        } else if (this.cursor.down.isDown) {
            vy = 300;
        }

        // Normalize diagonal movement to prevent faster diagonal speed
        if (vx !== 0 && vy !== 0) {
            const magnitude = Math.sqrt(vx * vx + vy * vy);
            const normalizedSpeed = 300;
            vx = (vx / magnitude) * normalizedSpeed;
            vy = (vy / magnitude) * normalizedSpeed;
        }

        this.player.setVelocity(vx, vy);

        // Determine current direction and play animation
        const currentDirection = this.getDirectionFromVelocity(vx, vy);

        if (vx === 0 && vy === 0) {
            // Idle: stop animation and show first frame of last direction
            this.player.stop();
            const idleFrame = this.getIdleFrame(this.lastDirection);
            this.player.setFrame(idleFrame);
        } else {
            // Moving: update last direction and play animation
            this.lastDirection = currentDirection;
            this.player.play(`walk-${currentDirection}`, true);
        }
    }

    getIdleFrame(direction: Direction): number {
        // Map direction to the first frame of its row
        const directionMap: Record<Direction, number> = {
            'down': 0,
            'downleft': 5,
            'left': 10,
            'upleft': 15,
            'up': 20,
            'upright': 25,
            'right': 30,
            'downright': 35
        };
        return directionMap[direction];
    }
}
