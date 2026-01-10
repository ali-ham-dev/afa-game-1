import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  preload() {
    // Load menu assets if needed
  }

  create() {
    // --- Background ---
    const bg = this.add.rectangle(
      this.scale.width / 2,
      this.scale.height / 2,
      this.scale.width,
      this.scale.height,
      0x1a1a2e
    );

    // --- Title ---
    const title = this.add.text(
      this.scale.width / 2,
      this.scale.height / 4,
      'AFA Game',
      {
        fontSize: '64px',
        color: '#ffffff',
        fontStyle: 'bold'
      }
    );
    title.setOrigin(0.5);

    // --- Start Button ---
    const startBtn = this.add.rectangle(
      this.scale.width / 2,
      this.scale.height / 2 - 60,
      200,
      60,
      0x667eea
    );
    startBtn.setInteractive();
    startBtn.on('pointerover', () => startBtn.setFillStyle(0x764ba2));
    startBtn.on('pointerout', () => startBtn.setFillStyle(0x667eea));
    startBtn.on('pointerdown', () => this.scene.start('ActionScene2'));

    const startText = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2 - 60,
      'Start Game',
      { fontSize: '24px', color: '#ffffff' }
    );
    startText.setOrigin(0.5);

    // --- Load Button ---
    const loadBtn = this.add.rectangle(
      this.scale.width / 2,
      this.scale.height / 2 + 20,
      200,
      60,
      0x667eea
    );
    loadBtn.setInteractive();
    loadBtn.on('pointerover', () => loadBtn.setFillStyle(0x764ba2));
    loadBtn.on('pointerout', () => loadBtn.setFillStyle(0x667eea));
    loadBtn.on('pointerdown', () => this.scene.start('ActionScene2'));

    const loadText = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2 + 20,
      'Load Game',
      { fontSize: '24px', color: '#ffffff' }
    );
    loadText.setOrigin(0.5);

    // --- Settings Button ---
    const settingsBtn = this.add.rectangle(
      this.scale.width / 2,
      this.scale.height / 2 + 100,
      200,
      60,
      0x667eea
    );
    settingsBtn.setInteractive();
    settingsBtn.on('pointerover', () => settingsBtn.setFillStyle(0x764ba2));
    settingsBtn.on('pointerout', () => settingsBtn.setFillStyle(0x667eea));
    settingsBtn.on('pointerdown', () => {
      console.log('Settings - Coming soon!');
      // TODO: Implement settings
    });

    const settingsText = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2 + 100,
      'Settings',
      { fontSize: '24px', color: '#ffffff' }
    );
    settingsText.setOrigin(0.5);
  }
}
