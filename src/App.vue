<script setup lang="ts">
import { ref, onMounted } from 'vue'

const gameStarted = ref(false)

const startGame = () => {
  gameStarted.value = true
  // Emit event to initialize Phaser game
  window.dispatchEvent(new CustomEvent('start-game'))
}

onMounted(() => {
  // Listen for game initialization
  window.addEventListener('start-game', () => {
    console.log('Game is starting...')
  })
})
</script>

<template>
  <div class="app-container">
    <!-- Landing Page -->
    <div v-if="!gameStarted" class="landing-page">
      <div class="landing-content">
        <h1 class="game-title">AFA Game</h1>
        <p class="game-description">Welcome to the game!</p>
        <button class="start-button" @click="startGame">Start Game</button>
      </div>
    </div>

    <!-- Game Canvas Container -->
    <div v-show="gameStarted" id="game-container"></div>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  width: 100%;
  height: 100vh;
  position: relative;
}

.landing-page {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  .landing-content {
    text-align: center;
    color: white;
    
    .game-title {
      font-size: 4rem;
      font-weight: 700;
      margin-bottom: 1rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    .game-description {
      font-size: 1.5rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }
    
    .start-button {
      padding: 1rem 3rem;
      font-size: 1.25rem;
      font-weight: 600;
      color: #667eea;
      background: white;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
      }
      
      &:active {
        transform: translateY(0);
      }
    }
  }
}

#game-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a2e;
}
</style>
