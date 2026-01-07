import Phaser from 'phaser'

function preload(this: Phaser.Scene) {
  // Load assets here
  // this.load.image('logo', 'assets/logo.png')
}

function create(this: Phaser.Scene) {
  const text = this.add.text(this.scale.width / 2, this.scale.height / 2 - 50, 'Phaser Game Ready!', {
    fontSize: '32px',
    color: '#ffffff'
  })
  text.setOrigin(0.5)

  const circle = this.add.circle(this.scale.width / 2, this.scale.height / 2 + 50, 50, 0x667eea)
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

export const createGameConfig = (parentElement: string): Phaser.Types.Core.GameConfig => {
  return {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight - 140,
    parent: parentElement,
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
}
