<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Phaser from 'phaser'

let game: Phaser.Game | null = null

onMounted(() => {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight - 140,
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

  game = new Phaser.Game(config)
})

onUnmounted(() => {
  if (game) {
    game.destroy(true)
    game = null
  }
})

function preload(this: Phaser.Scene) {
  // Load assets here
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
</script>

<template>
  <div class="game-box">
    <div id="game-container"></div>
  </div>
</template>

<style scoped lang="scss">
.game-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0f0f1e;

  #game-container {
    width: 100%;
    height: 100%;
  }
}
</style>