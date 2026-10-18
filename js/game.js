/**
 * ==========================================================================
 * CYBERGRID DEFENSE - GAME ENGINE
 * Cyberpunk Tactical Tower Defense & Mainframe Security Simulator
 * 100% Native HTML5 Canvas 2D + Web Audio API (Zero External Dependencies)
 * ==========================================================================
 */

(function () {
  'use strict';

  // --- 1. Sound Synthesizer (Web Audio API) ---
  class SoundFX {
    constructor() {
      this.ctx = null;
      this.isMuted = false;
    }

    _init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      return this.isMuted;
    }

    playLaser() {
      if (this.isMuted) return;
      this._init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    }

    playFreeze() {
      if (this.isMuted) return;
      this._init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.linearRampToValueAtTime(1200, now + 0.12);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    }

    playEMP() {
      if (this.isMuted) return;
      this._init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.25);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
    }

    playRailgun() {
      if (this.isMuted) return;
      this._init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.linearRampToValueAtTime(1800, now + 0.05);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.2);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.21);
    }

    playExplosion() {
      if (this.isMuted) return;
      this._init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Noise burst for digital blast
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.linearRampToValueAtTime(80, now + 0.15);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.16);
    }

    playHit() {
      if (this.isMuted) return;
      this._init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.05);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    }

    playAlarm() {
      if (this.isMuted) return;
      this._init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.setValueAtTime(450, now + 0.1);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.23);
    }

    playBuild() {
      if (this.isMuted) return;
      this._init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.12); // G5

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.21);
    }

    playUpgrade() {
      if (this.isMuted) return;
      this._init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [587.33, 739.99, 880, 1174.66]; // D5, F#5, A5, D6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.12, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.1);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.11);
      });
    }
  }

  const sfx = new SoundFX();

  // --- 2. Tower Specifications ---
  const TOWER_TYPES = {
    laser: {
      id: 'laser',
      name: 'Bit Laser',
      desc: 'Disparo rápido de pulsos láser contra objetivos individuales.',
      cost: 100,
      range: 110,
      damage: 18,
      fireRate: 2.8, // shots per sec
      color: '#00ffe5',
      accentColor: '#00b3a1',
      projectileSpeed: 520,
      sound: 'playLaser'
    },
    cipher: {
      id: 'cipher',
      name: 'Cipher Lock',
      desc: 'Ralentiza la velocidad de transmisión de malware un 45%.',
      cost: 140,
      range: 120,
      damage: 8,
      fireRate: 1.5,
      slowFactor: 0.55,
      slowDuration: 2.2, // seconds
      color: '#bd00ff',
      accentColor: '#8400b8',
      projectileSpeed: 380,
      sound: 'playFreeze'
    },
    firewall: {
      id: 'firewall',
      name: 'Firewall Core',
      desc: 'Quema continua de datos en área a todos los paquetes cercanos.',
      cost: 180,
      range: 85,
      damage: 32, // DPS in aura
      fireRate: 0, // Continuous aura
      isAura: true,
      color: '#ff5500',
      accentColor: '#ff2200',
      sound: 'playHit'
    },
    honeypot: {
      id: 'honeypot',
      name: 'Honeypot Decoy',
      desc: 'Emite ondas de choque EMP de área con alto daño explosivo.',
      cost: 220,
      range: 130,
      damage: 65,
      fireRate: 0.85,
      splashRadius: 70,
      color: '#ff007f',
      accentColor: '#b30059',
      projectileSpeed: 320,
      sound: 'playEMP'
    },
    quantum: {
      id: 'quantum',
      name: 'Quantum Debugger',
      desc: 'Cañón railgun hiper-potente que perfora armaduras y jefes.',
      cost: 320,
      range: 180,
      damage: 190,
      fireRate: 0.45,
      pierce: true,
      color: '#ffee00',
      accentColor: '#cca200',
      projectileSpeed: 900,
      sound: 'playRailgun'
    }
  };

  // --- 3. Malware Specifications ---
  const MALWARE_TYPES = {
    worm: {
      name: 'Packet Worm',
      health: 85,
      speed: 85,
      bounty: 14,
      size: 9,
      color: '#00ff88',
      shape: 'diamond'
    },
    trojan: {
      name: 'Trojan Horse',
      health: 220,
      speed: 60,
      bounty: 25,
      size: 13,
      color: '#ffaa00',
      shape: 'hexagon',
      splitCount: 2 // spawns mini-worms on death
    },
    ransomware: {
      name: 'Ransomware',
      health: 480,
      speed: 42,
      bounty: 45,
      size: 16,
      armor: 0.35, // 35% damage reduction
      color: '#ff0055',
      shape: 'shield'
    },
    ddos: {
      name: 'DDoS Swarm',
      health: 55,
      speed: 110,
      bounty: 8,
      size: 7,
      color: '#00ddff',
      shape: 'circle'
    },
    zeroday: {
      name: 'Zero-Day Exploit',
      health: 160,
      speed: 95,
      bounty: 35,
      size: 11,
      stealth: true, // invisible unless in aura or damaged
      color: '#bb00ff',
      shape: 'cross'
    },
    rootkit: {
      name: 'Rootkit Titan',
      health: 2600,
      speed: 30,
      bounty: 220,
      size: 24,
      isBoss: true,
      color: '#ffffff',
      pulseAura: true,
      shape: 'octagon'
    }
  };

  // --- 4. Sector Map Definitions (Grid 20 cols x 12 rows) ---
  const MAP_SECTORS = [
    {
      id: 1,
      name: 'Sector 01: Mainframe Gateway',
      desc: 'Canal de datos perimetral con una única ruta de acceso lineal.',
      totalWaves: 15,
      startBandwidth: 350,
      startIntegrity: 20,
      // Waypoints: [[col, row], ...] in 0-indexed grid coordinates
      paths: [
        [
          [0, 2], [6, 2], [6, 9], [13, 9], [13, 3], [19, 3]
        ]
      ]
    },
    {
      id: 2,
      name: 'Sector 02: Cloud Datacenter',
      desc: 'Topología distribuida con 2 puertos de entrada convergentes.',
      totalWaves: 20,
      startBandwidth: 420,
      startIntegrity: 20,
      paths: [
        [
          [0, 1], [4, 1], [4, 5], [10, 5], [10, 10], [19, 10]
        ],
        [
          [0, 10], [4, 10], [4, 7], [10, 7], [15, 7], [15, 10], [19, 10]
        ]
      ]
    },
    {
      id: 3,
      name: 'Sector 03: Quantum Subnet',
      desc: 'Matriz compleja con 3 vectores de infiltración y nodos bloqueados.',
      totalWaves: 25,
      startBandwidth: 500,
      startIntegrity: 15,
      paths: [
        [
          [0, 1], [8, 1], [8, 4], [14, 4], [14, 1], [19, 1]
        ],
        [
          [0, 6], [5, 6], [5, 9], [11, 9], [11, 6], [19, 6]
        ],
        [
          [0, 11], [8, 11], [8, 8], [15, 8], [15, 11], [19, 11]
        ]
      ]
    }
  ];

  // --- 5. Enemy Entity Class ---
  class Enemy {
    constructor(typeKey, pathWaypoints, waveMultiplier = 1) {
      const def = MALWARE_TYPES[typeKey] || MALWARE_TYPES.worm;
      this.typeKey = typeKey;
      this.name = def.name;
      this.maxHealth = Math.round(def.health * waveMultiplier);
      this.health = this.maxHealth;
      this.baseSpeed = def.speed;
      this.speed = this.baseSpeed;
      this.bounty = Math.round(def.bounty * Math.sqrt(waveMultiplier));
      this.size = def.size;
      this.color = def.color;
      this.shape = def.shape;
      this.armor = def.armor || 0;
      this.isBoss = !!def.isBoss;
      this.stealth = !!def.stealth;
      this.isCloaked = this.stealth;

      this.path = pathWaypoints; // Array of {x, y} in pixels
      this.pathIndex = 0;
      this.x = pathWaypoints[0].x;
      this.y = pathWaypoints[0].y;

      this.isDead = false;
      this.hasReachedEnd = false;
      this.distanceTraveled = 0;

      // Status effects
      this.slowTimer = 0;
      this.slowMultiplier = 1;
      this.firewallTimer = 0;
    }

    update(dt) {
      if (this.isDead || this.hasReachedEnd) return;

      // Update slow effect
      if (this.slowTimer > 0) {
        this.slowTimer -= dt;
        if (this.slowTimer <= 0) {
          this.slowMultiplier = 1;
        }
      }

      this.speed = this.baseSpeed * this.slowMultiplier;

      // Move toward next waypoint
      if (this.pathIndex < this.path.length - 1) {
        const target = this.path[this.pathIndex + 1];
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const dist = Math.hypot(dx, dy);
        const step = this.speed * dt;

        if (dist <= step) {
          this.x = target.x;
          this.y = target.y;
          this.pathIndex++;
          this.distanceTraveled += dist;
          if (this.pathIndex >= this.path.length - 1) {
            this.hasReachedEnd = true;
          }
        } else {
          this.x += (dx / dist) * step;
          this.y += (dy / dist) * step;
          this.distanceTraveled += step;
        }
      }
    }

    takeDamage(amount, ignoreArmor = false) {
      this.isCloaked = false; // Reveal stealth upon taking damage
      const effectiveArmor = ignoreArmor ? 0 : this.armor;
      const finalDmg = Math.max(1, amount * (1 - effectiveArmor));
      this.health -= finalDmg;

      if (this.health <= 0) {
        this.health = 0;
        this.isDead = true;
      }
      return finalDmg;
    }

    applySlow(factor, duration) {
      this.slowMultiplier = Math.min(this.slowMultiplier, factor);
      this.slowTimer = Math.max(this.slowTimer, duration);
    }

    draw(ctx) {
      if (this.isDead || this.hasReachedEnd) return;

      ctx.save();
      ctx.translate(this.x, this.y);

      // Stealth transparency
      if (this.isCloaked) {
        ctx.globalAlpha = 0.25;
      }

      // Draw body shape
      ctx.fillStyle = this.color;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = this.isBoss ? 16 : 8;
      ctx.shadowColor = this.color;

      ctx.beginPath();
      if (this.shape === 'diamond') {
        ctx.moveTo(0, -this.size);
        ctx.lineTo(this.size, 0);
        ctx.lineTo(0, this.size);
        ctx.lineTo(-this.size, 0);
      } else if (this.shape === 'hexagon') {
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const px = Math.cos(angle) * this.size;
          const py = Math.sin(angle) * this.size;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
      } else if (this.shape === 'shield') {
        ctx.rect(-this.size, -this.size, this.size * 2, this.size * 2);
      } else if (this.shape === 'cross') {
        const s = this.size;
        const w = s * 0.35;
        ctx.rect(-w, -s, w * 2, s * 2);
        ctx.rect(-s, -w, s * 2, w * 2);
      } else {
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Health bar above enemy
      ctx.globalAlpha = 1.0;
      const barW = Math.max(20, this.size * 2.2);
      const barH = 4;
      const barY = -this.size - 8;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(-barW / 2, barY, barW, barH);

      const healthPct = Math.max(0, this.health / this.maxHealth);
      const barColor = healthPct > 0.5 ? '#00ff88' : (healthPct > 0.25 ? '#ffbb00' : '#ff0055');
      ctx.fillStyle = barColor;
      ctx.fillRect(-barW / 2, barY, barW * healthPct, barH);

      ctx.restore();
    }
  }

  // --- 6. Tower Entity Class ---
  class Tower {
    constructor(typeKey, gridCol, gridRow, tileSize) {
      const def = TOWER_TYPES[typeKey];
      this.typeKey = typeKey;
      this.col = gridCol;
      this.row = gridRow;
      this.x = (gridCol + 0.5) * tileSize;
      this.y = (gridRow + 0.5) * tileSize;
      this.size = tileSize * 0.42;

      this.name = def.name;
      this.color = def.color;
      this.accentColor = def.accentColor;
      this.baseCost = def.cost;

      this.level = 1;
      this.maxLevel = 4; // 1 to 3 + Overclock (Lvl 4)
      this.totalInvested = def.cost;

      this.baseRange = def.range;
      this.baseDamage = def.damage;
      this.baseFireRate = def.fireRate;

      this.range = this.baseRange;
      this.damage = this.baseDamage;
      this.fireRate = this.baseFireRate;
      this.isAura = !!def.isAura;

      this.cooldown = 0;
      this.target = null;
      this.targetMode = 'first'; // 'first', 'strongest', 'closest'
      this.rotation = 0;
      this.totalKills = 0;
      this.totalDamageDealt = 0;
    }

    getUpgradeCost() {
      if (this.level >= this.maxLevel) return null;
      return Math.round(this.baseCost * (0.85 * this.level));
    }

    upgrade() {
      if (this.level >= this.maxLevel) return false;
      const cost = this.getUpgradeCost();
      this.level++;
      this.totalInvested += cost;

      // Stats progression: +35% damage, +12% range, +15% fire rate
      this.damage = Math.round(this.baseDamage * (1 + (this.level - 1) * 0.4));
      this.range = Math.round(this.baseRange * (1 + (this.level - 1) * 0.12));
      if (this.baseFireRate > 0) {
        this.fireRate = +(this.baseFireRate * (1 + (this.level - 1) * 0.15)).toFixed(2);
      }
      return true;
    }

    getSellRefund() {
      return Math.round(this.totalInvested * 0.7);
    }

    update(dt, enemies, projectiles) {
      if (this.cooldown > 0) {
        this.cooldown -= dt;
      }

      // 1. Aura Towers (Firewall)
      if (this.isAura) {
        enemies.forEach(e => {
          if (!e.isDead && !e.hasReachedEnd) {
            const dist = Math.hypot(e.x - this.x, e.y - this.y);
            if (dist <= this.range) {
              const dmg = this.damage * dt;
              e.takeDamage(dmg);
              this.totalDamageDealt += dmg;
              if (e.isDead) this.totalKills++;
            }
          }
        });
        return;
      }

      // 2. Target Selection
      this.target = this._selectTarget(enemies);

      if (this.target) {
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        this.rotation = Math.atan2(dy, dx);

        if (this.cooldown <= 0) {
          this._fire(projectiles);
          this.cooldown = 1.0 / this.fireRate;
        }
      }
    }

    _selectTarget(enemies) {
      let candidate = null;

      for (const e of enemies) {
        if (e.isDead || e.hasReachedEnd) continue;
        if (e.isCloaked) continue; // Stealth enemies can't be targeted directly

        const dist = Math.hypot(e.x - this.x, e.y - this.y);
        if (dist <= this.range) {
          if (!candidate) {
            candidate = e;
            continue;
          }

          if (this.targetMode === 'first') {
            if (e.distanceTraveled > candidate.distanceTraveled) candidate = e;
          } else if (this.targetMode === 'strongest') {
            if (e.health > candidate.health) candidate = e;
          } else if (this.targetMode === 'closest') {
            const curDist = Math.hypot(candidate.x - this.x, candidate.y - this.y);
            if (dist < curDist) candidate = e;
          }
        }
      }

      return candidate;
    }

    _fire(projectiles) {
      if (!this.target) return;
      const def = TOWER_TYPES[this.typeKey];
      if (def.sound && typeof sfx[def.sound] === 'function') {
        sfx[def.sound]();
      }

      projectiles.push(new Projectile(this, this.target));
    }

    draw(ctx, isSelected = false) {
      ctx.save();
      ctx.translate(this.x, this.y);

      // Range indicator when selected or hovered
      if (isSelected) {
        ctx.beginPath();
        ctx.arc(0, 0, this.range, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 229, 0.08)';
        ctx.fill();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Base Platform
      ctx.fillStyle = '#11162b';
      ctx.strokeStyle = this.accentColor;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;

      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Rotating Turret Core
      ctx.rotate(this.rotation);

      if (this.isAura) {
        // Firewall Ring Pulse
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.6, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.85, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        // Turret Barrel
        ctx.fillStyle = this.color;
        ctx.fillRect(0, -3, this.size * 1.2, 6);

        // Center Node Core
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Level Badges (Dots)
      ctx.restore();
      ctx.save();
      ctx.translate(this.x, this.y);
      for (let i = 0; i < this.level; i++) {
        const angle = (Math.PI * 2 / this.level) * i;
        const lx = Math.cos(angle) * (this.size + 4);
        const ly = Math.sin(angle) * (this.size + 4);
        ctx.fillStyle = this.level === 4 ? '#ffee00' : '#00ffe5';
        ctx.beginPath();
        ctx.arc(lx, ly, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  // --- 7. Projectile & Particle Class ---
  class Projectile {
    constructor(sourceTower, targetEnemy) {
      this.tower = sourceTower;
      this.target = targetEnemy;
      this.x = sourceTower.x;
      this.y = sourceTower.y;
      this.typeKey = sourceTower.typeKey;

      const def = TOWER_TYPES[this.typeKey];
      this.speed = def.projectileSpeed || 400;
      this.damage = sourceTower.damage;
      this.color = def.color;
      this.splashRadius = def.splashRadius || 0;
      this.slowFactor = def.slowFactor || 1;
      this.slowDuration = def.slowDuration || 0;
      this.pierce = !!def.pierce;

      this.isDone = false;
      this.targetX = targetEnemy.x;
      this.targetY = targetEnemy.y;
    }

    update(dt, enemies, particles) {
      if (this.isDone) return;

      if (!this.target.isDead && !this.target.hasReachedEnd) {
        this.targetX = this.target.x;
        this.targetY = this.target.y;
      }

      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      const dist = Math.hypot(dx, dy);
      const step = this.speed * dt;

      if (dist <= step) {
        this._hit(enemies, particles);
        this.isDone = true;
      } else {
        this.x += (dx / dist) * step;
        this.y += (dy / dist) * step;
      }
    }

    _hit(enemies, particles) {
      sfx.playHit();

      // Create spark burst
      for (let i = 0; i < 8; i++) {
        particles.push(new Particle(this.x, this.y, this.color));
      }

      // 1. Splash Damage (EMP Honeypot)
      if (this.splashRadius > 0) {
        particles.push(new Shockwave(this.x, this.y, this.splashRadius, this.color));
        enemies.forEach(e => {
          if (!e.isDead && !e.hasReachedEnd) {
            const d = Math.hypot(e.x - this.x, e.y - this.y);
            if (d <= this.splashRadius) {
              const dmg = this.damage * (1 - (d / this.splashRadius) * 0.4);
              e.takeDamage(dmg);
              this.tower.totalDamageDealt += dmg;
              if (e.isDead) this.tower.totalKills++;
            }
          }
        });
        return;
      }

      // 2. Direct Hit
      if (!this.target.isDead) {
        const dmg = this.target.takeDamage(this.damage, this.pierce);
        this.tower.totalDamageDealt += dmg;
        if (this.slowDuration > 0) {
          this.target.applySlow(this.slowFactor, this.slowDuration);
        }
        if (this.target.isDead) {
          this.tower.totalKills++;
        }
      }
    }

    draw(ctx) {
      if (this.isDone) return;
      ctx.save();
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // --- 8. Particle Visual Effects ---
  class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 80 + 30;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.life = 0.45;
      this.maxLife = this.life;
      this.size = Math.random() * 3 + 1.5;
    }

    update(dt) {
      this.life -= dt;
      this.x += this.vx * dt;
      this.y += this.vy * dt;
    }

    draw(ctx) {
      if (this.life <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.life / this.maxLife);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.fillRect(this.x, this.y, this.size, this.size);
      ctx.restore();
    }
  }

  class Shockwave {
    constructor(x, y, maxRadius, color) {
      this.x = x;
      this.y = y;
      this.maxRadius = maxRadius;
      this.currentRadius = 5;
      this.color = color;
      this.life = 0.35;
      this.maxLife = this.life;
    }

    update(dt) {
      this.life -= dt;
      this.currentRadius += (this.maxRadius / this.maxLife) * dt;
    }

    draw(ctx) {
      if (this.life <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.life / this.maxLife);
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 3;
      ctx.shadowBlur = 12;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  // --- 9. Main Game Coordinator ---
  class CyberGridGame {
    constructor() {
      this.canvas = document.getElementById('game-canvas');
      this.ctx = this.canvas.getContext('2d');

      this.cols = 20;
      this.rows = 12;
      this.tileSize = 40;

      this.currentSectorIndex = 0;
      this.sector = MAP_SECTORS[0];

      // Gameplay state
      this.bandwidth = 350;
      this.coreIntegrity = 20;
      this.maxCoreIntegrity = 20;
      this.waveNumber = 0;
      this.score = 0;
      this.speedMultiplier = 1;
      this.isPaused = false;
      this.isWaveRunning = false;
      this.isGameOver = false;
      this.isVictory = false;

      // Entities
      this.towers = [];
      this.enemies = [];
      this.projectiles = [];
      this.particles = [];

      // Grid representation: 0 = buildable, 1 = path, 2 = tower, 3 = core/spawn
      this.grid = [];
      this.pixelPaths = []; // Array of pixel waypoints for each path route

      // UI Selection State
      this.selectedBuildType = 'laser';
      this.selectedTower = null;
      this.hoveredTile = null;

      // Wave Spawner
      this.spawnQueue = [];
      this.spawnInterval = 0.8;
      this.spawnTimer = 0;

      this.lastTime = performance.now();

      this._setupCanvas();
      this._initSector(0);
      this._bindEvents();
      this._bindHUD();
    }

    _setupCanvas() {
      this.width = this.cols * this.tileSize; // 800px
      this.height = this.rows * this.tileSize; // 480px
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }

    _initSector(sectorIdx) {
      this.currentSectorIndex = sectorIdx;
      this.sector = MAP_SECTORS[sectorIdx] || MAP_SECTORS[0];

      this.bandwidth = this.sector.startBandwidth;
      this.maxCoreIntegrity = this.sector.startIntegrity;
      this.coreIntegrity = this.maxCoreIntegrity;
      this.waveNumber = 0;
      this.score = 0;
      this.isGameOver = false;
      this.isVictory = false;
      this.isWaveRunning = false;

      this.towers = [];
      this.enemies = [];
      this.projectiles = [];
      this.particles = [];
      this.selectedTower = null;

      // Build grid matrix
      this.grid = Array.from({ length: this.rows }, () => new Array(this.cols).fill(0));
      this.pixelPaths = [];

      // Map paths onto grid and create pixel waypoints
      this.sector.paths.forEach((pCoords) => {
        const pxWaypoints = [];
        for (let i = 0; i < pCoords.length; i++) {
          const [c, r] = pCoords[i];
          pxWaypoints.push({ x: (c + 0.5) * this.tileSize, y: (r + 0.5) * this.tileSize });

          if (i > 0) {
            const [pc, pr] = pCoords[i - 1];
            // Mark path tiles in grid
            const minC = Math.min(pc, c);
            const maxC = Math.max(pc, c);
            const minR = Math.min(pr, r);
            const maxR = Math.max(pr, r);
            for (let row = minR; row <= maxR; row++) {
              for (let col = minC; col <= maxC; col++) {
                this.grid[row][col] = 1;
              }
            }
          }
        }
        this.pixelPaths.push(pxWaypoints);
      });

      this._updateHUD();
      this._closeModals();
    }

    startNextWave() {
      if (this.isWaveRunning || this.isGameOver || this.isVictory) return;
      this.waveNumber++;
      this.isWaveRunning = true;
      sfx.playAlarm();

      this.spawnQueue = this._generateWaveMalware(this.waveNumber);
      this.spawnTimer = 0;
      this._updateHUD();
    }

    _generateWaveMalware(waveNum) {
      const queue = [];
      const count = 6 + waveNum * 2;
      const mult = 1 + (waveNum - 1) * 0.18;

      for (let i = 0; i < count; i++) {
        let type = 'worm';
        if (waveNum >= 2 && Math.random() > 0.6) type = 'ddos';
        if (waveNum >= 4 && Math.random() > 0.55) type = 'trojan';
        if (waveNum >= 6 && Math.random() > 0.65) type = 'zeroday';
        if (waveNum >= 8 && Math.random() > 0.6) type = 'ransomware';

        // Boss on every 5th wave
        if (waveNum % 5 === 0 && i === count - 1) {
          type = 'rootkit';
        }

        // Assign to a random available path for multi-lane maps
        const pathIdx = Math.floor(Math.random() * this.pixelPaths.length);
        queue.push({ type, mult, pathIdx });
      }

      return queue;
    }

    _spawnNextEnemy() {
      if (this.spawnQueue.length === 0) return;
      const item = this.spawnQueue.shift();
      const pathWaypoints = this.pixelPaths[item.pathIdx] || this.pixelPaths[0];
      this.enemies.push(new Enemy(item.type, pathWaypoints, item.mult));
    }

    buildTower(typeKey, col, row) {
      if (col < 0 || col >= this.cols || row < 0 || row >= this.rows) return false;
      if (this.grid[row][col] !== 0) {
        this.showNotice('¡Sector bloqueado! Solo puedes construir en placas de circuito.');
        return false;
      }

      const def = TOWER_TYPES[typeKey];
      if (this.bandwidth < def.cost) {
        this.showNotice('¡Ancho de banda insuficiente para desplegar este nodo!');
        return false;
      }

      this.bandwidth -= def.cost;
      const tower = new Tower(typeKey, col, row, this.tileSize);
      this.towers.push(tower);
      this.grid[row][col] = 2; // Marked as tower

      sfx.playBuild();
      this.selectedTower = tower;
      this._updateHUD();
      this._updateTowerInspector();
      return true;
    }

    upgradeSelectedTower() {
      if (!this.selectedTower) return;
      const cost = this.selectedTower.getUpgradeCost();
      if (!cost) {
        this.showNotice('El nodo ya ha alcanzado el nivel de Overclock máximo.');
        return;
      }
      if (this.bandwidth < cost) {
        this.showNotice(`Requiere ${cost} GB de ancho de banda para optimizar.`);
        return;
      }

      this.bandwidth -= cost;
      this.selectedTower.upgrade();
      sfx.playUpgrade();
      this._updateHUD();
      this._updateTowerInspector();
    }

    sellSelectedTower() {
      if (!this.selectedTower) return;
      const refund = this.selectedTower.getSellRefund();
      this.bandwidth += refund;

      // Free grid tile
      this.grid[this.selectedTower.row][this.selectedTower.col] = 0;
      this.towers = this.towers.filter(t => t !== this.selectedTower);
      this.selectedTower = null;

      sfx.playBuild();
      this._updateHUD();
      this._updateTowerInspector();
    }

    _bindEvents() {
      // Canvas click for building or selecting
      this.canvas.addEventListener('click', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        const mouseX = (e.clientX - rect.left) * scaleX;
        const mouseY = (e.clientY - rect.top) * scaleY;

        const col = Math.floor(mouseX / this.tileSize);
        const row = Math.floor(mouseY / this.tileSize);

        // Check if clicked an existing tower
        const clickedTower = this.towers.find(t => t.col === col && t.row === row);
        if (clickedTower) {
          this.selectedTower = clickedTower;
          this._updateTowerInspector();
        } else {
          // If empty buildable tile, deploy current selected type
          if (this.selectedBuildType) {
            this.buildTower(this.selectedBuildType, col, row);
          } else {
            this.selectedTower = null;
            this._updateTowerInspector();
          }
        }
      });

      // Canvas hover
      this.canvas.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        const mouseX = (e.clientX - rect.left) * scaleX;
        const mouseY = (e.clientY - rect.top) * scaleY;

        const col = Math.floor(mouseX / this.tileSize);
        const row = Math.floor(mouseY / this.tileSize);

        if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
          this.hoveredTile = { col, row };
        } else {
          this.hoveredTile = null;
        }
      });

      this.canvas.addEventListener('mouseleave', () => {
        this.hoveredTile = null;
      });

      // Keyboard Hotkeys
      window.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT') return;
        const key = e.key.toLowerCase();
        if (key === '1') this._selectBuildType('laser');
        else if (key === '2') this._selectBuildType('cipher');
        else if (key === '3') this._selectBuildType('firewall');
        else if (key === '4') this._selectBuildType('honeypot');
        else if (key === '5') this._selectBuildType('quantum');
        else if (key === 'u') this.upgradeSelectedTower();
        else if (key === 's') this.sellSelectedTower();
        else if (key === ' ') {
          e.preventDefault();
          this.startNextWave();
        }
      });
    }

    _bindHUD() {
      // Tower select buttons
      document.querySelectorAll('.btn-node-card').forEach(btn => {
        btn.addEventListener('click', () => {
          const type = btn.dataset.type;
          this._selectBuildType(type);
        });
      });

      // Wave start button
      const waveBtn = document.getElementById('btn-start-wave');
      if (waveBtn) waveBtn.addEventListener('click', () => this.startNextWave());

      // Speed controls
      const btnSpeed1x = document.getElementById('btn-speed-1x');
      const btnSpeed2x = document.getElementById('btn-speed-2x');
      const btnPause = document.getElementById('btn-pause');

      if (btnSpeed1x) {
        btnSpeed1x.addEventListener('click', () => {
          this.speedMultiplier = 1;
          this.isPaused = false;
          btnSpeed1x.classList.add('active');
          btnSpeed2x?.classList.remove('active');
          btnPause?.classList.remove('active');
        });
      }

      if (btnSpeed2x) {
        btnSpeed2x.addEventListener('click', () => {
          this.speedMultiplier = 2.2;
          this.isPaused = false;
          btnSpeed2x.classList.add('active');
          btnSpeed1x?.classList.remove('active');
          btnPause?.classList.remove('active');
        });
      }

      if (btnPause) {
        btnPause.addEventListener('click', () => {
          this.isPaused = !this.isPaused;
          btnPause.classList.toggle('active', this.isPaused);
        });
      }

      // Audio mute button
      const muteBtn = document.getElementById('btn-mute');
      if (muteBtn) {
        muteBtn.addEventListener('click', () => {
          const isMuted = sfx.toggleMute();
          muteBtn.textContent = isMuted ? 'AUDIO: OFF' : 'AUDIO: ON';
        });
      }

      // Tower inspector controls
      const btnUpgrade = document.getElementById('inspector-btn-upgrade');
      const btnSell = document.getElementById('inspector-btn-sell');
      const targetSelect = document.getElementById('inspector-target-mode');

      if (btnUpgrade) btnUpgrade.addEventListener('click', () => this.upgradeSelectedTower());
      if (btnSell) btnSell.addEventListener('click', () => this.sellSelectedTower());
      if (targetSelect) {
        targetSelect.addEventListener('change', (e) => {
          if (this.selectedTower) {
            this.selectedTower.targetMode = e.target.value;
          }
        });
      }

      // Sector Selection Modal
      const sectorSelect = document.getElementById('sector-select');
      if (sectorSelect) {
        sectorSelect.addEventListener('change', (e) => {
          this._initSector(parseInt(e.target.value, 10));
        });
      }

      // Restart / Next buttons
      document.querySelectorAll('.btn-restart-game').forEach(b => {
        b.addEventListener('click', () => this._initSector(this.currentSectorIndex));
      });
      document.querySelectorAll('.btn-next-sector').forEach(b => {
        b.addEventListener('click', () => {
          const nextIdx = (this.currentSectorIndex + 1) % MAP_SECTORS.length;
          const selectEl = document.getElementById('sector-select');
          if (selectEl) selectEl.value = nextIdx;
          this._initSector(nextIdx);
        });
      });
    }

    _selectBuildType(type) {
      this.selectedBuildType = type;
      this.selectedTower = null;
      document.querySelectorAll('.btn-node-card').forEach(b => {
        b.classList.toggle('active', b.dataset.type === type);
      });
      this._updateTowerInspector();
    }

    _updateHUD() {
      const bwEl = document.getElementById('hud-bandwidth');
      const intEl = document.getElementById('hud-integrity');
      const waveEl = document.getElementById('hud-wave');
      const scoreEl = document.getElementById('hud-score');
      const waveBtn = document.getElementById('btn-start-wave');

      if (bwEl) bwEl.textContent = `${this.bandwidth} GB`;
      if (intEl) intEl.textContent = `${this.coreIntegrity}/${this.maxCoreIntegrity}`;
      if (waveEl) waveEl.textContent = `${this.waveNumber}/${this.sector.totalWaves}`;
      if (scoreEl) scoreEl.textContent = this.score.toString().padStart(6, '0');

      if (waveBtn) {
        waveBtn.disabled = this.isWaveRunning || this.isGameOver || this.isVictory;
        waveBtn.textContent = this.isWaveRunning ? 'INCURSIÓN ACTIVA' : 'LANZAR OLEADA';
      }
    }

    _updateTowerInspector() {
      const panel = document.getElementById('tower-inspector-panel');
      if (!panel) return;

      if (!this.selectedTower) {
        panel.classList.add('hidden');
        return;
      }

      panel.classList.remove('hidden');
      const t = this.selectedTower;
      const def = TOWER_TYPES[t.typeKey];

      const nameEl = document.getElementById('inspector-name');
      const lvlEl = document.getElementById('inspector-level');
      const dmgEl = document.getElementById('inspector-damage');
      const rngEl = document.getElementById('inspector-range');
      const spdEl = document.getElementById('inspector-speed');
      const killsEl = document.getElementById('inspector-kills');
      const upCostEl = document.getElementById('inspector-upgrade-cost');
      const sellValEl = document.getElementById('inspector-sell-value');
      const targetSelect = document.getElementById('inspector-target-mode');

      if (nameEl) nameEl.textContent = t.name;
      if (lvlEl) lvlEl.textContent = t.level === 4 ? 'OVERCLOCK' : `NIVEL ${t.level}`;
      if (dmgEl) dmgEl.textContent = `${t.damage} DPS`;
      if (rngEl) rngEl.textContent = `${t.range} px`;
      if (spdEl) spdEl.textContent = `${t.fireRate} /s`;
      if (killsEl) killsEl.textContent = `${t.totalKills} eliminados`;

      const upCost = t.getUpgradeCost();
      if (upCostEl) upCostEl.textContent = upCost ? `${upCost} GB` : 'MÁX';
      if (sellValEl) sellValEl.textContent = `+${t.getSellRefund()} GB`;
      if (targetSelect) targetSelect.value = t.targetMode;
    }

    showNotice(msg) {
      const notice = document.getElementById('tactical-notice');
      if (!notice) return;
      notice.textContent = msg;
      notice.classList.add('visible');
      clearTimeout(this._noticeTimer);
      this._noticeTimer = setTimeout(() => {
        notice.classList.remove('visible');
      }, 2500);
    }

    _closeModals() {
      document.getElementById('modal-gameover')?.classList.add('hidden');
      document.getElementById('modal-victory')?.classList.add('hidden');
    }

    start() {
      this.lastTime = performance.now();
      const loop = (currentTime) => {
        const rawDt = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        const dt = Math.min(rawDt, 0.1) * (this.isPaused ? 0 : this.speedMultiplier);

        this.update(dt);
        this.draw();
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }

    update(dt) {
      if (this.isGameOver || this.isVictory || dt <= 0) return;

      // 1. Spawn wave malware
      if (this.isWaveRunning && this.spawnQueue.length > 0) {
        this.spawnTimer += dt;
        if (this.spawnTimer >= this.spawnInterval) {
          this.spawnTimer = 0;
          this._spawnNextEnemy();
        }
      }

      // 2. Update Enemies
      for (let i = this.enemies.length - 1; i >= 0; i--) {
        const e = this.enemies[i];
        e.update(dt);

        if (e.isDead) {
          this.bandwidth += e.bounty;
          this.score += e.bounty * 10;
          sfx.playExplosion();

          // Trojan split mechanic
          if (MALWARE_TYPES[e.typeKey].splitCount) {
            for (let s = 0; s < 2; s++) {
              const mini = new Enemy('worm', e.path);
              mini.pathIndex = e.pathIndex;
              mini.x = e.x + (Math.random() * 16 - 8);
              mini.y = e.y + (Math.random() * 16 - 8);
              this.enemies.push(mini);
            }
          }

          this.enemies.splice(i, 1);
          this._updateHUD();
        } else if (e.hasReachedEnd) {
          this.coreIntegrity--;
          sfx.playAlarm();
          this.enemies.splice(i, 1);
          this._updateHUD();

          if (this.coreIntegrity <= 0) {
            this.coreIntegrity = 0;
            this.isGameOver = true;
            document.getElementById('modal-gameover')?.classList.remove('hidden');
            return;
          }
        }
      }

      // Check Wave Completion
      if (this.isWaveRunning && this.spawnQueue.length === 0 && this.enemies.length === 0) {
        this.isWaveRunning = false;
        this.bandwidth += 40 + this.waveNumber * 10;
        this.score += 250 * this.waveNumber;
        sfx.playUpgrade();
        this._updateHUD();

        if (this.waveNumber >= this.sector.totalWaves) {
          this.isVictory = true;
          document.getElementById('modal-victory')?.classList.remove('hidden');
        }
      }

      // 3. Update Towers
      this.towers.forEach(t => t.update(dt, this.enemies, this.projectiles));

      // 4. Update Projectiles
      for (let i = this.projectiles.length - 1; i >= 0; i--) {
        const p = this.projectiles[i];
        p.update(dt, this.enemies, this.particles);
        if (p.isDone) {
          this.projectiles.splice(i, 1);
        }
      }

      // 5. Update Particles
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const part = this.particles[i];
        part.update(dt);
        if (part.life <= 0) {
          this.particles.splice(i, 1);
        }
      }
    }

    draw() {
      const ctx = this.ctx;
      const ts = this.tileSize;

      // Background Void
      ctx.fillStyle = '#060914';
      ctx.fillRect(0, 0, this.width, this.height);

      // Grid Tiles
      for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.cols; c++) {
          const type = this.grid[r][c];
          const x = c * ts;
          const y = r * ts;

          if (type === 1) {
            // Data Highway (Path)
            ctx.fillStyle = '#0b1426';
            ctx.fillRect(x, y, ts, ts);

            ctx.strokeStyle = 'rgba(0, 255, 234, 0.15)';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, ts, ts);

            // Circuit trace line
            ctx.strokeStyle = 'rgba(0, 255, 234, 0.3)';
            ctx.beginPath();
            ctx.moveTo(x + ts / 2, y);
            ctx.lineTo(x + ts / 2, y + ts);
            ctx.stroke();
          } else {
            // Motherboard Circuit Board Tile
            ctx.fillStyle = '#090d1c';
            ctx.fillRect(x, y, ts, ts);

            ctx.strokeStyle = 'rgba(26, 40, 75, 0.4)';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, ts, ts);
          }
        }
      }

      // Draw Path Directional Arrows / Gateways
      this.pixelPaths.forEach(path => {
        if (path.length > 0) {
          // Spawn Portal
          const spawn = path[0];
          ctx.save();
          ctx.fillStyle = '#ff0055';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#ff0055';
          ctx.beginPath();
          ctx.arc(spawn.x, spawn.y, ts * 0.35, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Server Core Target
          const core = path[path.length - 1];
          ctx.save();
          ctx.fillStyle = '#00ffe5';
          ctx.shadowBlur = 14;
          ctx.shadowColor = '#00ffe5';
          ctx.beginPath();
          ctx.arc(core.x, core.y, ts * 0.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      // Hover Tile Indicator
      if (this.hoveredTile) {
        const hx = this.hoveredTile.col * ts;
        const hy = this.hoveredTile.row * ts;
        const isBuildable = this.grid[this.hoveredTile.row][this.hoveredTile.col] === 0;

        ctx.fillStyle = isBuildable ? 'rgba(0, 255, 229, 0.15)' : 'rgba(255, 0, 85, 0.2)';
        ctx.fillRect(hx, hy, ts, ts);
        ctx.strokeStyle = isBuildable ? '#00ffe5' : '#ff0055';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(hx, hy, ts, ts);
      }

      // Draw Towers
      this.towers.forEach(t => t.draw(ctx, t === this.selectedTower));

      // Draw Enemies
      this.enemies.forEach(e => e.draw(ctx));

      // Draw Projectiles
      this.projectiles.forEach(p => p.draw(ctx));

      // Draw Particles
      this.particles.forEach(part => part.draw(ctx));
    }
  }

  // --- Bootstrap on Load ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const game = new CyberGridGame();
      game.start();
      window.cyberGridGame = game;
    });
  } else {
    const game = new CyberGridGame();
    game.start();
    window.cyberGridGame = game;
  }
})();
