<script setup lang="ts">
import { ref } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import GameBox from '../components/GameBox.vue'

const showGame = ref(false)

const startGame = () => {
  showGame.value = true
}
</script>

<template>
  <div class="landing-wrapper">
    <Header />

    <main class="main-content">
      <div v-if="!showGame" class="welcome-section">
        <div class="welcome-container">
          <h2 class="title">Welcome to AFA Game</h2>
          <p class="description">
            An exciting adventure awaits you. Build your skills, face challenges, and become a legend!
          </p>
          <button class="start-button" @click="startGame">
            Start Game
          </button>
        </div>
      </div>

      <div v-else class="game-section">
        <GameBox />
      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped lang="scss">
.landing-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 100%);
  overflow: hidden;
}

.welcome-section {
  text-align: center;
  animation: fadeIn 0.6s ease-in;
}

.welcome-container {
  max-width: 500px;
  padding: 2rem;

  .title {
    font-size: 3rem;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
  }

  .description {
    font-size: 1.1rem;
    color: #b0b0c0;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .start-button {
    padding: 1rem 3rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

.game-section {
  width: 100%;
  height: 100%;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
