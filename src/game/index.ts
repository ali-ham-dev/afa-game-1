import Phaser from 'phaser';
import { MenuScene } from './scenes/menuScene';
import { ActionScene1 } from './scenes/actionScene1';
import { ActionScene2 } from './scenes/actionScene2';

export const createGameConfig = (parentElement: string): Phaser.Types.Core.GameConfig => {
  const container = document.getElementById(parentElement);
  const width = container?.clientWidth;
  const height = container?.clientHeight;

  const gravityX = 0;
  const gravityY = 300;

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
    scene: [MenuScene, ActionScene1, ActionScene2],
    backgroundColor: '#1a1a2e'
  };
}
