import { Avatar } from "./Avatar"
import { Comment } from "./Comment"
import styles from "./styles/Post.module.css"
import {format, formatDistanceToNow} from 'date-fns'
import ptBR from "date-fns/locale/pt-BR"
import { FormEvent, useState, ChangeEvent, InvalidEvent } from "react"

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}



interface Content{
    type: 'paragraph' | 'link';
    content: string;
}

 export interface PostType {
    id: number;
    author: Author;
    publishedAt: Date;
    content: Content[];
}

interface Postprops {
    post: PostType;
}



export function Post({post}:Postprops){
    //constates do dateTime
    const publishedDatFormated = format(post.publishedAt, "d 'de' LLLL 'ás' HH:mm'h'", {locale: ptBR})
    const publishedDateToNow = formatDistanceToNow(post.publishedAt, {locale: ptBR, addSuffix: true},)

    //variaveis para armazenar estados do comentário
    //novo estado, estadoatual
    const [newCommentText, setNewCommentText] = useState('')

    //setando lista de comentários 
    const [comments, setComments] = useState([
        "Post dahora em"
    ])

    // função de controle do forms
     function handleCreateNewComment(event: FormEvent){
        //nãoa atualizar a pagina
        event.preventDefault()

        //setando nova lista, com os existentes mais o novo
        setComments([...comments, newCommentText])
        //setando estado pra null novamente
        setNewCommentText('')
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
    }

    //função para deletar um item da lista especificada
    function deleteComment(commmentToDelete: string){
        const commentsWithouDeletedOne = comments.filter(comment => {
            return comment !== commmentToDelete
        })
        setComments(commentsWithouDeletedOne)
    }

    function handleNewCommentValid(event: InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Este campo é obrigatório')

    }

    const isNewCommentEmpty = newCommentText.length === 0

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar  src={post.author.avatarUrl}/>

                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>
                <time 
                    title={publishedDatFormated} 
                    dateTime={post.publishedAt.toISOString()} 
                >
                    {publishedDateToNow}
                </time>
            </header>

            <div className={styles.content}>
                {post.content.map(line => {
                    if(line.type === 'paragraph'){
                        return <p key={line.content} >{line.content}</p>;
                    } else if(line.type === 'link'){
                        return <p key={line.content}><a
                         href="#">{line.content}</a></p>
                    }
                })}

            </div>
            <form  
                onSubmit={handleCreateNewComment} 
                className={styles.commentForm}
            >
                <strong>Deixe seu feedback</strong>

                <textarea name="comment"
                    placeholder="Deixe um comentário"
                    onChange={handleNewCommentChange}
                    value={newCommentText}
                    required
                  onInvalid={handleNewCommentValid}
                 ></textarea>

                <footer className={styles.commentFooter}>
                    <button 
                        className={styles.buttonForm} 
                        disabled={isNewCommentEmpty}
                        type="submit"
                    >Publicar
                    </button>
                </footer>

                <div className={styles.commentList}>
                    {comments.map(comment =>
                        {
                            return <Comment 
                            key={comment} 
                            content={comment} 
                            onDeleteComment={deleteComment} />
                        })}
                </div>        
            </form>
        </article>
    )
}