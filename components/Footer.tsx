import styles from "../styles/Footer.module.scss"
const Footer = () => {

    return (
        <div className={styles.custom_footer}>
            <p className={styles.orgName}>D-lab | 이지스자산운용</p>
            <p>서울특별시 서초구 서초대로 396, 강남빌딩 9층(06619)</p>
            <p>copyright. IGIS D-lab. 2022. 06. 15</p>
        </div>
    )
}

export default Footer