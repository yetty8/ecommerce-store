import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors p-6">
      
      {/* Logos */}
      <div className="flex gap-6 mb-6">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} alt="Vite logo" className="w-20 h-20 hover:scale-110 transition-transform" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} alt="React logo" className="w-20 h-20 hover:scale-110 transition-transform" />
        </a>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold mb-6">Vite + React</h1>

      {/* Counter Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex flex-col items-center gap-4">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Count is {count}
        </button>
        <p className="text-center text-gray-600 dark:text-gray-300">
          Edit <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">src/App.jsx</code> and save to test HMR
        </p>
      </div>

      {/* Footer */}
      <p className="mt-6 text-gray-500 dark:text-gray-400">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}
