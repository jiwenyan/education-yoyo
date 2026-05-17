import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import styles from './App.module.css';

const CatalogPage = React.lazy(() => import('./pages/CatalogPage/CatalogPage'));
const MathPage = React.lazy(() => import('./pages/MathPage/MathPage'));
const EnglishPage = React.lazy(() => import('./pages/EnglishPage/EnglishPage'));
const ProgressPage = React.lazy(() => import('./pages/ProgressPage/ProgressPage'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage/SettingsPage'));

function App() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/math" element={<MathPage />} />
            <Route path="/english" element={<EnglishPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
