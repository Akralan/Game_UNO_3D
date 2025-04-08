# 🎮 UNO Online
> A real-time multiplayer UNO game with mobile interface

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-2.3.0-green.svg)](https://socket.io/)
[![Node.js](https://img.shields.io/badge/Node.js-Required-blue.svg)](https://nodejs.org/)

[🎮 Play Now](http://localhost:50000) | [📱 Mobile Version](http://localhost:50000/remote) | [📖 Documentation](docs/README.md)

## 🎯 Overview

This project was developed while I was a senior in high school, so there may be some errors in the programming or methodology.
Discover UNO Online, a faithful adaptation of the famous card game in digital version! Play with your friends using your phone as a game controller, while the main screen displays the game board on a PC or TV.

### 🖥️ Host Interface (PC)
![Host Interface](docs/images/host-view.png)
*Main game view on PC with the board and players' cards*

### 📱 Mobile Interface
<p align="center">
  <img src="docs/images/mobile-portrait.png" width="200" alt="Portrait View"/>
  <img src="docs/images/mobile-landscape.png" width="400" alt="Landscape View"/>
</p>
*Left: Login menu (portrait) - Right: Game interface (landscape)*

## 🚀 Features

- 🎮 Intuitive interface inspired by the real UNO game
- 📱 Mobile mode to use your phone as a controller
- 👥 Real-time multiplayer
- 🎨 Graphics faithful to the original cards
- 🔄 Smooth animations
- 🌐 Compatible with all modern browsers

## 🛠️ Technologies

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express
- **Communication**: Socket.IO 2.3.0
- **Assets**: Optimized SVG, PNG

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/Akralan/Game_UNO_3D.git

# Install dependencies
cd uno/uno_server
npm install

# Start the server
node index.js
```

## 🎮 How to Play

1. **Host (PC)**
   - Open `http://localhost:50000`
   - Create a new game
   - Share the game code with players

2. **Players (Mobile)**
   - Open `http://localhost:50000/remote`
   - Enter the game code
   - Rotate your phone to landscape mode

3. **Game Rules**
   - [Link to detailed rules](docs/RULES.md)

## 🏗️ Architecture

```
uno/
├── assets/           # Main assets (CSS, JS, images)
│   ├── css/         # Styles
│   ├── js/          # Host-side logic
│   ├── svg/         # Logos and icons
│   └── texture/     # Card textures
├── remote/          # Mobile interface
│   └── assets/      # Mobile-specific assets
└── uno_server/      # Node.js server
    └── index.js     # Server entry point
```

## 🔧 Configuration

### Prerequisites
- Node.js >= 12.0.0
- Modern browser with WebSocket support

### Environment Variables
```env
PORT=50000          # Server port (default: 50000)
HOST=localhost      # Host (default: localhost)
```

## 📝 License

MIT License - see [LICENSE.md](LICENSE.md)

## 👥 Team

- [Akralan](https://github.com/Akralan) - Lead Developer

## 🙏 Acknowledgments

- [Socket.IO](https://socket.io/) - For real-time communication
- [Express](https://expressjs.com/) - For web server
- [Mattel](https://www.mattel.com) - Original UNO game creators

## 📱 Compatibility

| Platform | Status |
|----------|--------|
| Chrome   | ✅     |
| Firefox  | ✅     |
| Safari   | ✅     |
| Edge     | ✅     |
| Mobile   | ✅     |

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/Akralan">Akralan</a>
</p>
