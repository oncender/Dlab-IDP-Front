import styles from "../styles/Footer.module.scss"
const Footer = () => {

    return (
        <div className={styles.custom_footer}>
            <a className={styles.feedback} href="mailto:d-lab@igisam.com?subject=베타테스트 의견">베타테스트 의견 접수</a>
            <p className={styles.orgName}>D-lab | 
            <a href="https://www.igisam.com/" target="_blank" rel="noopener noreferrer">이지스자산운용</a>
            </p>
            <p>서울특별시 서초구 서초대로 396, 강남빌딩 9층(06619)</p>
            <p>copyright. IGIS D-lab. 2022. 06. 15</p>
        </div>
    )
}

export default Footer