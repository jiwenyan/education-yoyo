import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../services/AppContext';
import SubjectCard from '../../widgets/SubjectCard/SubjectCard';
import { subjects } from '../../widgets/SubjectCard/subjects';
import styles from './CatalogPage.module.css';

function CatalogPage() {
  const { state } = useAppContext();
  const navigate = useNavigate();

  const getSubjectProgress = (id) => {
    if (id === 'math') {
      const { mathStats } = state;
      if (mathStats.totalAttempted === 0) return { progress: 0, stars: 0 };
      const pct = Math.round((mathStats.totalCorrect / mathStats.totalAttempted) * 100);
      const stars = mathStats.totalAttempted > 0
        ? Math.min(5, Math.floor(mathStats.totalCorrect / 2))
        : 0;
      return { progress: pct, stars };
    }
    if (id === 'english') {
      const count = state.alphabetProgress.length;
      const progress = Math.round((count / 26) * 100);
      const stars = Math.min(5, Math.floor(count / 5));
      return { progress, stars };
    }
    return { progress: 0, stars: 0 };
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to MathApp!</h1>
      <p className={styles.subtitle}>Choose a subject to start learning</p>
      <div className={styles.grid}>
        {subjects.map((subject) => {
          const { progress, stars } = getSubjectProgress(subject.id);
          return (
            <SubjectCard
              key={subject.id}
              title={subject.title}
              description={subject.description}
              icon={subject.icon}
              color={subject.color}
              progress={progress}
              stars={stars}
              onStart={() => navigate(subject.path)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CatalogPage;
