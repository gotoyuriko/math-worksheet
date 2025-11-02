# Math Worksheet - Rounding Off to Nearest 10

An interactive math worksheet application built with React for practicing rounding numbers to the nearest 10.

## 🎯 Features

- **12 Interactive Questions**: Multiple-choice questions about rounding numbers to the nearest 10
- **Real-time Feedback**: Visual feedback showing correct and incorrect answers after submission
- **Score Tracking**: Automatic score calculation (0-12 points)
- **Name Validation**: Requires users to enter their name before submitting
- **Reset Functionality**: Clear all answers and start over
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: CSS animations for enhanced user experience
- **Clean Code**: Well-structured, maintainable React components

## 🚀 Live Demo

- **Web App**: [Your deployed URL here]
- **Repository**: [Your GitHub repository URL here]

## 📋 Requirements Met

### Core Requirements
✅ Incorporates all worksheet content including copyright information  
✅ Responsive design with mobile-first approach  
✅ Creative layout with gradient background and card-based design  
✅ Reset button to clear all selected answers  
✅ Submit button to calculate score (0-12)  
✅ Score display section  
✅ Name validation before score calculation  
✅ Cloud deployment ready (Vercel/Netlify)

### Bonus Features
✅ Framer Motion animations for enhanced UX (fade-in, slide-up, scale, spring effects)
✅ Clean and maintainable code structure with SCSS
⭕ Backend score logging (optional - can be added)

## 🛠️ Technologies Used

- **React 19.1** - UI framework
- **Vite 7.1** - Build tool and dev server
- **SCSS** - Advanced CSS preprocessing with variables and mixins
- **Framer Motion** - Production-ready motion library for React
- **JavaScript ES6+** - Modern JavaScript features

## 📦 Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd math-worksheet
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

The build files will be in the `dist` directory.

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## 🎨 Design Features

- **Color Scheme**: Purple gradient theme (#667eea to #764ba2)
- **Typography**: Segoe UI font family for readability
- **Animations** (Framer Motion):
  - Staggered fade-in on load
  - Slide-up for question cards
  - Scale animations on interaction
  - Shake animation for validation errors
  - Spring animations for score reveal
  - Smooth hover and tap effects

## 📝 Project Structure

```
math-worksheet/
├── src/
│   ├── App.jsx           # Main application component
│   ├── App.scss          # Component styles (SCSS)
│   ├── questionsData.js  # Question data
│   ├── main.jsx          # Application entry point
│   └── index.scss        # Global styles (SCSS)
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
└── README.md            # Project documentation
```

## 🚢 Deployment

### Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify

## 👨‍💻 Author

**Goto Yuriko**
- Position: Front End Web Developer
- Experience: 2+ years with React and Next.js

## 📄 License

This project is created as a technical assessment for Bridge International Asia.

## 🙏 Acknowledgments

- Worksheet source: www.mathinenglish.com
- Built with React and Vite