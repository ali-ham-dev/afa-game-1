<script setup lang="ts">
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import GameBox from '../components/GameBox.vue'
</script>

<template>
  <div class="landing-wrapper">
    <Header />

    <main class="main-content">
      <div class="game-section">
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
  background: linear-gradient(135deg, #190f1e 0%, #1a252e 100%);
  overflow: hidden;
}

.game-section {
  width: 100%;
  height: 100%;
}
</style>
