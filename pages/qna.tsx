import { useEffect, useState } from 'react'
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/QnA.module.scss'
import { qna2Type, answerType, questionType } from '../components/const/p1Types'
import { Collapse } from '../components/partials/p1Collapse'
import { message } from 'antd';


const GET_MESSAGE_URL = "/v2/message/totalMessage";
const POST_MESSAGE_URL = "/api/v2/message/newMessage";

const QnA: NextPage = ({ contents }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const [data, setData] = useState<questionType[]>([]);
    const [isFormActive, changeFormState] = useState(false);
    const [textarea, setTextarea] = useState("")
    const [values, setValues] = useState({username: '', password: ''})

    useEffect(() => {
        contents.sort((a, b) => a.msgNum - b.msgNum);
        let newContents: questionType[] = [];
        contents.map((content: qna2Type) => {
            if (content.subthread === 0) {
                newContents.push({
                    msgNum: content.msgNum,
                    userName: content.username,
                    password: content.password,
                    content: content.content,
                    time: content.time,
                    answers: [],
                });
            } else {
                newContents[content.msgNum].answers.push({
                    sequence: content.subthread,
                    userName: content.username,
                    password: content.password,
                    content: content.content,
                    time: content.time,
                });
            }
        })
        newContents.sort((a, b) => b.msgNum - a.msgNum);
        newContents.map(item => item.answers.sort((a, b) => b.sequence - a.sequence))
        setData(newContents);
    }, []);

    const handleChange = event => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };
    const handleTextarea = event => {
        setTextarea(event.target.value);
    }
    const getMaxMessageNumber = () => {
        return Math.max(...data.map(o => o.msgNum))
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
    const handleSubmit = async (event) => {
        event.preventDefault();
        let newMsgNum = getMaxMessageNumber() + 1
        let isPosted = await postNewMessage(newMsgNum)
        if (isPosted) {
            let newItem = {
                msgNum: newMsgNum,
                userName: values.username,
                password: values.password,
                content: textarea,
                time: Date.now().toString(),
                answers: [],
            };
            let newData = data;
            newData.unshift(newItem);
            setData(newData);
            changeFormState(false);
            setTextarea("");
            setValues({username: '', password: ''});
        } else {
            message.error('Error occured while post your question. Please report to admin');
        }
    }
    const handleClick = event => {
        changeFormState(current => !current);
    }

    return (
        <div>
            <Header link={"/"}/>
            <div className={styles.qnaPageContainer}>
                <div className={styles.qnaContainer}>
                    <div className={styles.collapseContainer}>
                        <h1 className={styles.collapseHeading}>지식 공유하기</h1>
                        <form onSubmit={handleSubmit} 
                            className={styles.submitContainer}>
                            <textarea
                                placeholder='이지스 구성원에게 궁금한 점을 물어보세요' 
                                value={textarea}
                                onClick={handleClick}
                                onChange={handleTextarea}
                            />
                            {
                                !isFormActive ? null :
                                <>
                                <div className={styles.submitUserBox}>
                                    <div>
                                        <label>이름</label>
                                        <input type="text"
                                            name="username"
                                            value={values.username || ""}
                                            onChange={handleChange}/>
                                    </div>
                                    <div>
                                        <label>비밀번호</label>
                                        <input type="password" 
                                        name="password"
                                        value={values.password || ""}
                                        onChange={handleChange}/>
                                    </div>

                                </div>
                                <button 
                                    type='submit' 
                                    className={styles.submitButton}>
                                    등록하기
                                </button>
                                <p className={styles.collapseForm} onClick={handleClick}>
                                    오늘은 구경만 할게요🧐
                                </p>
                                </>
                            }
                        </form>
                        <ul>
                            {data.map((content: questionType) => (
                                <Collapse key={content.msgNum} item={content} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const apiBaseUrl = process.env.API_SERVER_URL;
    
    let res = await fetch(apiBaseUrl + GET_MESSAGE_URL);
    let contents = await res.json();

    return {
        props : {
            contents,
        },
    };
}

export default QnA;