import Link from 'next/link';
import styles from "../../styles/QnA.module.scss";
import { answerType, questionType, qnaProps } from "../const/p1Types";

export default function QnAContents(props: qnaProps) {
    return (
        <div className={styles.qnaContainer}>
            <div className={styles.qnaInnerBox}>
                <h1>지식 공유하기</h1>
                <ul>
                {props.content.map((item: questionType) => (
                    <li key={item.msgNum}>
                        <Link href={{ pathname: '/qna' }}>
                            <p>{item.content}</p>
                        </Link>
                    </li>
                ))}
                </ul>
                
                <Link href={`/qna`}>
                    <a href='#' className={styles.textLink}>
                    더 많은 지식공유 보러가기
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 24 24'>
                            <path d="M9.8 17.4c-.2 0-.5-.1-.6-.3-.4-.4-.4-.9 0-1.3L13 12 9.1 8.1c-.4-.4-.4-.9 0-1.3s.9-.4 1.3 0l4.5 4.5c.4.4.4.9 0 1.3l-4.5 4.5c-.2.2-.4.3-.6.3" fillRule="evenodd" clipRule="evenodd" fill="#b0b8c1"></path>
                        </svg>
                    </span>
                    </a>
                </Link>
            </div>
        </div>
    )
}