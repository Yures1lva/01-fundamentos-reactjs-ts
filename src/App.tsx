import styles from "./App.module.css"
import { Header } from './components/Header'
import "./global.css"
import { Sidebar } from './components/Sidebar'
import {Post, PostType} from './components/Post'

// author: { avatr_url: "", name: "", role: ""}
// cpublishedAt: Date
// content: String

const posts: PostType[] =[
  {
    id: 1,
    author: {
      avatarUrl: "http://github.com/yures1lva.png",
      name: "Yuro Silva",
      role: "CTO @ SNST"
    },

    content: [
     { type: "paragraph", content: "Fala pessoal",},
      {type:"paragraph",content: "Acabei de subir mais um projeto no meu portfólio. É um projeto que fiz no NLW return, evento da Rocketseat", },
      {type: "link", content: "jane.design/doctorcare"},      
    ],

    publishedAt: new Date('2023-10-03 20:00:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: "http://github.com/AlexWendel.png",
      name: "Alex Wendel",
      role: "CTO @ SNST"
    },
    
    content: [
     { type: "paragraph", content: "Fala pessoal",},
      {type:"paragraph",content: "Acabei de realizar um bootcamp fornecido gratuitamente pela NevCode sobre inteligencia Artificial para desenvolvimento Mobile, foi muito bomm", },
      {type: "link", content: "jane.design/doctorcare"},      
    ],

    publishedAt: new Date('2023-10-04 20:00:00')
  }
];


export function App() {

  return (
    <>
      <Header/>

      <div className={styles.wrapper}>
        <Sidebar/>
        <main>
          {posts.map(post =>{
            return (<Post
              key={post.id}
              post={post}
            />
            )
          })}
        </main>
      </div>
        
      
    </>
  )
}


