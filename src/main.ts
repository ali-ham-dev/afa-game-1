import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import Phaser from 'phaser'

createApp(App).mount('#app')

// Phaser Game Configuration
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 300 },
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  },
  backgroundColor: '#1a1a2e'
}

let game: Phaser.Game | null = null

// Listen for the start game event
window.addEventListener('start-game', () => {
  if (!game) {
    game = new Phaser.Game(config)
  }
})

// Phaser Scene Functions
function preload(this: Phaser.Scene) {
  // Load assets here
  // this.load.image('logo', 'assets/logo.png')
}

function create(this: Phaser.Scene) {
  // Create game objects here
  const text = this.add.text(400, 300, 'Phaser Game Ready!', {
    fontSize: '32px',
    color: '#ffffff'
  })
  text.setOrigin(0.5)
  
  // Add a simple interactive element
  const graphics = this.add.graphics()
  graphics.fillStyle(0x667eea, 1)
  graphics.fillCircle(400, 400, 50)
  
  // Make it interactive
  const circle = this.add.circle(400, 400, 50, 0x667eea)
  circle.setInteractive()
  circle.on('pointerdown', () => {
    circle.setFillStyle(0x764ba2)
  })
  circle.on('pointerup', () => {
    circle.setFillStyle(0x667eea)
  })
}

function update(this: Phaser.Scene) {
  // Game loop logic here
}
