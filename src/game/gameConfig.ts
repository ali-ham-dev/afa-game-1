import Phaser from 'phaser'
import bgImage from './assets/bg.png'
import basketImage from './assets/basket.png'

function preload(this: Phaser.Scene) {
  this.load.image("bg", bgImage)
  this.load.image("basket", basketImage)
}

function create(this: Phaser.Scene) {
  const bg = this.add.image(this.scale.width / 2, this.scale.height / 2, "bg")
  bg.setOrigin(0.5, 0.5)
  
  // Maintain aspect ratio without stretching
  const scaleX = this.scale.width / bg.width
  const scaleY = this.scale.height / bg.height
  const scale = Math.min(scaleX, scaleY)

  bg.setScale(scale)

  const basket = this.physics.add.image(0, 400, "basket")
  basket.setOrigin(0, -1.5)
  basket.setImmovable(true)
  basket.body.allowGravity = false
}

function update(this: Phaser.Scene) {
  // Game loop logic here
}
 
export const createGameConfig = (parentElement: string): Phaser.Types.Core.GameConfig => {
  const container = document.getElementById(parentElement)
  const width = container?.clientWidth
  const height = container?.clientHeight

  const gravityX = 0
  const gravityY = 300

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
    scene: {
      preload,
      create,
      update
    },
    backgroundColor: '#1a1a2e'
  }
}
