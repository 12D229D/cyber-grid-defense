# 🛡️ CyberGrid Defense

**CyberGrid Defense** es un juego táctico de *Tower Defense* de ambientación cyberpunk y retro-futurista desarrollado con **HTML5 Canvas 2D**, **Vanilla CSS (paleta HSL personalizada)** y la **Web Audio API** para síntesis de sonido procedural en tiempo real.

El jugador asume el rol de un **SecOps Cyber-Commander** encargado de defender la infraestructura de red y el mainframe central contra oleadas de malware destructivo, gusanos polimórficos, troyanos blindados y ciberataques distribuidos.

---

## ⚡ Características Principales

- **🎮 Motor Canvas 2D Autocontenido:** Simulación de bucle de juego a 60 FPS con cálculo de trayectorias, proyectiles, campos de ralentización criogénica, ondas de choque EMP y explosiones de partículas neón.
- **🔊 Sintetizador de Audio Procedural:** Efectos de sonido generados en tiempo real mediante la **Web Audio API** (disparos láser, congelamiento, descargas electromagnéticas, cañones cuánticos, alarmas de brecha y fanfarrias de victoria) sin dependencias de archivos de audio externos.
- **🗺️ 3 Sectores de Red Tácticos:**
  - **Sector 01: Gateway Primario:** Topología lineal con 15 oleadas. Ideal para establecer perímetros básicos.
  - **Sector 02: Datacenter Core:** 2 canales de entrada convergentes en el nodo de seguridad y 20 oleadas.
  - **Sector 03: Quantum Subnet:** 3 canales independientes con 25 oleadas y ataque del temible *Botnet Colossus*.
- **💎 5 Nodos de Defensa Especializados:**
  - **Firewall Basic (Packet Filter):** Proyectiles de alta cadencia para amenazas ligeras.
  - **Laser Pointer (Deep Packet Inspection):** Rayo continuo de energía concentrada con daño incremental por segundo.
  - **Cryo Subroutine (Latency Injector):** Emite pulsos que ralentizan el tráfico malicioso en un radio de acción.
  - **EMP Cannon (Surge Discharger):** Dispara proyectiles electromagnéticos de daño de área (AoE) con aturdimiento temporal.
  - **Quantum Railgun (Kernel Executioner):** Cañón de antimateria lógica de ultra-largo alcance y daño masivo perforante.
- **👾 6 Clases de Amenazas Maliciosas:**
  - `Ping Flood (Probe)`: Unidades veloces y de bajo coste enviadas en enjambres.
  - `Worm (Polymorphic)`: Amenazas estándar con velocidad constante y resistencia media.
  - `Trojan (Payload)`: Portador blindado que al ser destruido fragmenta en micro-amenazas secundarias.
  - `Spyware (Stealth)`: Malware encubierto que requiere ser detectado o neutralizado con daño de área.
  - `Ransomware (Encrypted)`: Posee escudos criptográficos de alta absorción de daño.
  - `Botnet Colossus (Boss)`: Monstruo de datos con masiva reserva de salud y escudos de red.
- **⌨️ Controles y Accesos Rápidos (Hotkeys):** Soporte completo para teclado y ratón.
- **🚀 100% Offline & Standalone:** Compatible con apertura directa mediante protocolo `file:///` sin necesidad de servidores HTTP locales o bundlers.

---

## 🕹️ Cómo Jugar

1. Abre directamente el archivo `index.html` en cualquier navegador moderno (Chrome, Edge, Firefox, Safari, Opera).
2. Haz clic en el botón de audio o pulsa en la pantalla para activar el sintetizador **Web Audio API**.
3. Selecciona una torre en el panel inferior (o pulsa las teclas numéricas `1` a `5`).
4. Haz clic en una casilla vacía de la cuadrícula táctica para desplegar el nodo de defensa (cuesta **Ancho de Banda / BW**).
5. Haz clic sobre un nodo desplegado para abrir el **Inspector Táctico**:
   - Puedes subir de nivel (**Nivel 1 ➔ Nivel 2 ➔ Nivel 3 Max**) para multiplicar su alcance, daño y cadencia.
   - Puedes **Desmantelar (Vender)** el nodo para recuperar el 70% de la inversión.
6. Pulsa **"Iniciar Oleada"** (o la tecla `Espacio`) para liberar las amenazas de la siguiente ola.
7. Si el malware alcanza el mainframe central, perderás **Integridad del Núcleo (HP)**. ¡Si la integridad cae a 0%, el sistema sufrirá un Kernel Panic!

---

## ⌨️ Atajos de Teclado (Hotkeys)

| Tecla | Acción |
|---|---|
| `1` | Seleccionar Firewall Basic |
| `2` | Seleccionar Laser Pointer |
| `3` | Seleccionar Cryo Subroutine |
| `4` | Seleccionar EMP Cannon |
| `5` | Seleccionar Quantum Railgun |
| `Espacio` | Iniciar / Acelerar siguiente oleada |
| `P` | Pausar / Reanudar simulación |
| `U` | Mejorar nodo seleccionado actualmente |
| `S` | Desmantelar / Vender nodo seleccionado |
| `Esc` | Cancelar selección de nodo |

---

## 📊 Especificaciones de Nodos Defensivos

| Nodo | Coste | Rango | Daño Base | Cadencia (seg) | Efecto Especial |
|---|---|---|---|---|---|
| **Firewall** | 100 BW | 120 px | 24 | 0.45 s | Disparo veloz contra paquetes individuales |
| **Laser Pointer** | 175 BW | 140 px | 35/s | Continuo | Daño continuo directo sin tiempo de viaje |
| **Cryo Subroutine** | 150 BW | 110 px | 12 | 1.10 s | Ralentiza un 45% la velocidad de los enemigos |
| **EMP Cannon** | 225 BW | 160 px | 65 (AoE) | 1.60 s | Explosión de área con radio de 65 px |
| **Quantum Railgun** | 350 BW | 240 px | 260 | 2.80 s | Impacto devastador de largo alcance |

---

## 🏗️ Arquitectura Técnica

- **`index.html`**: Estructura semántica HTML5 (`<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`), viewport responsivo, contenedor de lienzo Canvas de alta resolución y HUD de telemetría.
- **`css/style.css`**: Hoja de estilos en Vanilla CSS estructurada con variables `--hue-terminal`, `--hue-cyber`, efecto glassmorphism, cuadrícula HUD táctica, fuentes *Outfit* y *JetBrains Mono*, animaciones scanline y diseño responsivo.
- **`js/game.js`**: Bucle de juego desacoplado, motor de física discreta, gestor de entidades (`Tower`, `Enemy`, `Projectile`, `Particle`, `FloatingText`), mapa de caminos por waypoints y generador de ondas procedurales Web Audio API.

---

## 📄 Licencia

Desarrollado como parte del monorepositorio **Codex Portfolio**. Código abierto bajo licencia MIT.
