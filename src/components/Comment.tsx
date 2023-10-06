import styles from './styles/Comment.module.css'
import Trash from '../assets/Trash.svg'
import Like from '../assets/like.svg'
import { Avatar } from "./Avatar"
import { useState } from 'react'

interface CommentProps {
    content: string;
    onDeleteComment: (comment: string) => void;

}

export function Comment({content, onDeleteComment}: CommentProps){

    function handleDeleteComment() {
        onDeleteComment(content)
    }

    const [likeCount, setLikeCount] = useState(0)

    function handleLikeComment(){
        setLikeCount((state) => {
            return state + 1
        })
    }

    return (
        <>
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://avatars.githubusercontent.com/u/43683688?v=4"/>
                
            <div className={styles.contentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Yuro Silva</strong>
                            <time title="11 de maio ás 08:13" dateTime="2022-05-11 08:03:20" >Cerca de 1h atrás</time>
                        </div>
                        <button onClick={handleDeleteComment} title='Deletar comentário'>
                            <img src={Trash}/>
                        </button>

                    </header>
                    <p>{content}</p>
                </div>

                <footer>
                   <button   onClick={handleLikeComment}> 
                    <img src={Like} alt="" />
                    Aplaudir <span>{likeCount}</span>
                   </button>
                   
                </footer>
            </div>
        </div>
        </>
    )
}