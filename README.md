# AmkyawDev AI

A modern AI assistant web application built with Vue.js 3, featuring PWA support, clean design, and professional developer experience.

![Vue.js](https://img.shields.io/badge/Vue.js-3.4+-42b883?style=flat&logo=vuedotjs&logoColor=ffffff)
![License](https://img.shields.io/badge/License-MIT-green.svg)
![Status](https://img.shields.io/badge/Status-Active-success.svg)

## Features

- **Interactive Chat** - Real-time AI chat interface
- **RESTful API** - Programmatically access AI capabilities
- **PWA Support** - Install as a native app on any device
- **Professional Design** - Clean, modern dark theme
- **Secure Authentication** - User login and registration
- **Documentation** - Comprehensive guides and API reference

## Tech Stack

- **Frontend**: Vue.js 3 + Vite
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **PWA**: vite-plugin-pwa
- **Styling**: Custom CSS with modern design system

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/amkyawdev/amk-ai.git
cd amk-ai

# Install dependencies
cd frontend
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
amk-ai/
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable Vue components
│   │   ├── pages/         # Page components
│   │   ├── router.js      # Vue Router configuration
│   │   ├── stores/        # Pinia stores
│   │   ├── App.vue        # Root component
│   │   └── main.js        # Application entry
│   ├── index.html         # HTML template
│   ├── package.json       # Dependencies
│   └── vite.config.js     # Vite configuration
└── README.md
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home - Landing page with hero section |
| `/chat` | Chat - Interactive AI chat interface |
| `/login` | Login - User authentication |
| `/register` | Register - Create new account |
| `/docs` | Documentation - Usage guides |
| `/api` | API Reference - REST API documentation |
| `/about` | About - Project information |

## API Endpoints

| Method | Endpoint | Description |
|-------|----------|-------------|
| POST | `/api/chat` | Send chat message |
| POST | `/api/auth/login` | User login |
| GET | `/api/user/profile` | Get user profile |

## Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=https://api.amkyawdev.ai
VITE_WS_URL=wss://ws.amkyawdev.ai
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

**AmkyawDev**
- GitHub: [@amkyawdev](https://github.com/amkyawdev)
- Email: hello@amkyawdev.ai

## Acknowledgments

- [Vue.js](https://vuejs.org/) - The progressive JavaScript framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Pinia](https://pinia.vuejs.org/) - Intuitive, type safe, light and flexible Store for Vue

---

Star us on GitHub if you find this project useful!