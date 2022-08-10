import { useState } from "react";
import { answerType, questionType, qnaProps } from '../const/p1Types'
import styles from '../../styles/QnA.module.scss';
import { Button } from "antd";

const POST_MESSAGE_URL = "/api/v2/message/newMessage";

export const Collapse = (props  : qnaProps) => {
    const [data, setData] = useState(props.item);
    const [isAnswerCollapsed, setIsAnswerCollapsed] = useState(true);
    const [isFormCollapsed, setIsFormCollapsed] = useState(true);
    const [textarea, setTextarea] = useState("")
    const [values, setValues] = useState({username: '', password: ''})
    
    
    const convertTime = (t: string) => {
        console.log('t as param', t)
        const hour = t.split('T')[1]
        const date = t.split('T')[0]
        return (
            date.substring(0,4) + '-' +
            date.substring(4,6) + '-' +
            date.substring(6,8) + ' ' + hour)
    }
    const handleClick = () => {
        setIsAnswerCollapsed(current => !current);
    }
    const handleAnswer = () => {
        setIsFormCollapsed(current => !current);
    }
    const handleChange = event => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    }
    const handleTextarea = event => {
        setTextarea(event.target.value);
    }
    const postNewMessage = async (msgNum: number) => {
        const contentsReplaceNewline = () => {
            return textarea.replaceAll("<br>", "\r\n"); 
        }
        let params = {
            msgNum: msgNum.toString(),
            content: contentsReplaceNewline(),
            ...values
        };
        let query = Object.keys(params) 
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])) 
            .join('&');

        let response = await fetch(POST_MESSAGE_URL + '?' + query, {
            method: "POST",
            mode: 'no-cors',
            headers: {
                "Content-Type": "text/plain",
            },
            body: JSON.stringify({
                msgNum: msgNum.toString(),
                content: textarea,
                ...values
            }),
        });
        return response.ok;
    }
    const getMaxMessageNumber = () => {
        return Math.max(...data.answers.map(o => o.sequence))
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        let isPosted = await postNewMessage(data.msgNum);
        if(isPosted){
            let d = new Date();
            let newItem = {
                sequence: getMaxMessageNumber() + 1,
                userName: values.username,
                password: values.password,
                content: textarea,
                time: d.toISOString().slice(0, -5).replaceAll("-", ""),
            };
            let newData = data;
            newData.answers.unshift(newItem);
            setData(newData);
            setIsFormCollapsed(true);
            setTextarea("");
            setValues({username: '', password: ''});
        }
    }
    return (
        <li key={data.msgNum + data.userName} className={styles.collapseList}>
            <div className={styles.collapseTitleBox} onClick={handleClick}>
                <p className={isAnswerCollapsed?
                    styles.collapseTitleParagraph:
                    styles.collapseTitleParagraphOpened
                }>
                    <div>
                    {data.content.split("\n").map(line => (
                        <p key={line}>
                            {line}
                            <br />
                        </p>
                    ))}
                    </div>
                </p>
                <div className={styles.collapseArrow}>{isAnswerCollapsed?'▼':'▲'}</div>
            </div>
            {
            isAnswerCollapsed ? null : 
            <div className={styles.collapseContentBox}>
                {
                    data.answers.length <= 0 ?
                    <p className={styles.noAnswer}>아직 답변이 없군요😥 지식은 공유할수록 가치가 커진답니다.</p> :
                    data.answers.map((answer: answerType) => (
                        <div key={data.msgNum + answer.sequence} className={styles.collapseContentParagraph}>
                            <p className={styles.userName}>{answer.userName}</p>
                            <p className={styles.content}>
                                {answer.content.split("\n").map(line => (
                                    <span key={line}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </p>
                            <p className={styles.time}>{convertTime(answer.time)}</p>
                        </div> ))
                }
                <div className={styles.answerButtonBox}>
                    <button className={styles.answerButton}
                        onClick={handleAnswer}>
                            내 지식 공유하기 {isFormCollapsed ? '▼' : '►'}
                    </button>   
                </div>
                {
                    isFormCollapsed ? null :
                    <form onSubmit={handleSubmit}
                        className={styles.inputFormContainer}>
                        <div className={styles.inputBox}>
                            <label>이름</label>
                            <input type="text"
                                name="username"
                                value={values.username}
                                onChange={handleChange}/>
                        </div>
                        <div className={styles.inputBox}>
                            <label>비밀번호</label>
                            <input type="password"
                                name="password"
                                value={values.password || ""}
                                onChange={handleChange}/>
                        </div>
                        <div className={styles.inputBox}>
                            <label>내용</label>
                            <textarea 
                                value={textarea}
                                onChange={handleTextarea}/>
                        </div>
                        <button
                            type='submit' 
                            className={styles.submitButton}>
                            등록하기
                        </button>
                    </form>
                }
            </div>
            }
        </li>
    )
}
