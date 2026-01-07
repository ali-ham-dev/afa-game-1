<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import Phaser from 'phaser';
import { createGameConfig } from '../game/gameConfig';

let game: Phaser.Game | null = null;

onMounted(() => {
    const config = createGameConfig('game-container')
    game = new Phaser.Game(config)
});

onUnmounted(() => {
    if (game) {
        game.destroy(true)
        game = null
    }
});
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
    background: #070727;

    #game-container {
        width: 80%;
        height: 80%;
        border: 0.4rem solid #ba0f29;
        overflow: hidden;
    }
}
</style>