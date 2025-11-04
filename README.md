# Resume Buddy

**AI-Powered Resume Feedback (MVP)**

Resume Buddy is a front-end application that helps job seekers improve their resumes through targeted AI analysis. Users upload their resume, select which sections it contains, and receive actionable feedback on readability, skills, and areas for improvement.

## 🚀 MVP Features (v0.1.0)

✅ **File Upload**: Upload PDF or DOCX resumes (max 8 MB)  
✅ **Section Selection**: Choose which sections your resume contains (Summary, Skills, Experience, etc.)  
✅ **Mock Analysis**: Simulated AI analysis with realistic feedback  
✅ **Visual Results**: View detailed analysis in a modal with color-coded scores  
✅ **LocalStorage Persistence**: Save analysis history to browser storage  
✅ **Responsive Design**: Works on desktop, tablet, and mobile  
✅ **Accessibility**: WCAG AA compliant with keyboard navigation and screen reader support  

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript 5
- **Build Tool**: Vite 7
- **UI Library**: PrimeReact 10 (Lara Light Blue theme)
- **State Management**: Zustand 5
- **Styling**: PrimeFlex 4 + Custom CSS
- **Validation**: Zod 4
- **Forms**: React Hook Form 7

## 📦 Installation

```bash
npm install
```

## 🧑‍💻 Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Build

```bash
npm run build
```

## 🧪 Lint

```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Header.tsx
│   ├── UploadPanel.tsx
│   ├── ActionsSidebar.tsx
│   └── AnalysisModal.tsx
├── pages/           # Top-level page layouts
│   └── Home.tsx
├── store/           # Zustand state management
│   └── useAnalysisStore.ts
├── types/           # TypeScript type definitions
│   └── index.ts
├── utils/           # Utility functions
│   ├── fileValidation.ts
│   ├── apiClient.ts (placeholder)
│   └── analysisMock.ts
├── App.tsx          # Root component
├── main.tsx         # App entry point
└── index.css        # Global styles
```

## 🎯 Milestones

- ✅ **Milestone 0**: Project scaffold & skeleton components
- ✅ **Milestone 1**: File upload & validation
- ✅ **Milestone 2**: Mock analysis flow & modal
- ✅ **Milestone 3**: LocalStorage persistence & polish

## 🔮 Future Enhancements (Post-MVP)

- Backend integration (Node.js + Express + Dify AI)
- Real PDF/DOCX parsing and AI analysis
- Multi-model selection (GPT-4, Claude, Llama)
- Job description comparison
- Dual resume comparison
- View history UI (read from localStorage)
- Export analysis (PDF/JSON)
- Dark mode toggle
- Legacy `.doc` support

## 📄 License

MIT

---

## Technical Details

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
