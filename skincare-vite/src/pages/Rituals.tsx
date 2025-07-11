import styles from '../App.module.css';

export default function Rituals() {
  return (
    <div className={styles.root}>
      <section style={{ padding: '4rem 2rem', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <h1 className={styles.headline}>Our Rituals</h1>
        <p className={styles.subtext} style={{ margin: '1.5rem auto 0 auto' }}>
          Discover the unique rituals that make MTM a multi-sensory, holistic experience. Our rituals blend tradition, innovation, and natural therapies to nurture your health, scalp, and spirit.
        </p>
      </section>
    </div>
  );
} 