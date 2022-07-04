import Link from 'next/link';
import MovingComponent from 'react-moving-text';
import styles from "../../styles/Result.module.scss";


export default function HowItWorksContents(props: any) {
  return (
    <div className={styles.introduction}>
      <p>How it works?</p>
      <div className={styles.contentsContainer}>
        <div className={styles.content}>
          <img src="/data-and-documents.jpg" /> 
          <p>Digitize documents</p>
        </div>
        <div className={styles.content}>
          <img src="/server-data.jpg" /> 
          <p>Train models</p>
        </div>
        <div className={styles.content}>
          <img src="/data-analytics.jpg" />
          <p>Data analytics</p>
        </div>
      </div>
    </div>
  )
}