import './App.css';
import firebase from 'firebase/compat/app';
import {auth,storage,db} from './firebase'
import {useEffect, useState} from 'react'
import logo from './Instagram-Logo.png'



function Header(props){

  const [progress, setProgress] = useState(0)
  const [file, setFile] = useState(null)

      useEffect(()=>{

      }, [])


    function CriarConta(e){
      e.preventDefault()

      let email = document.getElementById('email-cadastro').value
      let username = document.getElementById('username-cadastro').value
      let senha = document.getElementById('senha-cadastro').value

      auth.createUserWithEmailAndPassword(email,senha)
      .then((authUser)=>{
        authUser.user.updateProfile({
          displayName:username
        })
        alert('Conta criada com sucesso!');
        let modal = document.querySelector('.modalCriarConta')

          modal.style.display = "none";

      }).catch((error)=>{
        alert(error.message)
      })

    }
    
    function abrirModalCriarConta(e){
      e.preventDefault()
      
      let modal = document.querySelector('.modalCriarConta')

      modal.style.display = "block";

    }

    function fecharModalCriar(){
      let modal = document.querySelector('.modalCriarConta')

      modal.style.display = "none";
    }

    function logar(e){
      e.preventDefault()
      let email = document.getElementById('email-login').value
      let senha = document.getElementById('senha-login').value

      auth.signInWithEmailAndPassword(email,senha)
      .then((auth)=>{
        props.setUser(auth.user.displayName);
        alert('Logado com Sucesso')
        window.location.href = "/"
      }).catch((err)=>{
        alert(err.message)
      })

      
    }

      function abrirModalUpload(e){
        e.preventDefault()
        let modal = document.querySelector('.modalUpload')

        modal.style.display = 'block'
       
      }

      function fecharModalUpload(e){
        let modal = document.querySelector('.modalUpload')
  
        modal.style.display = 'none';
      }

      function uploadPost(e){
        e.preventDefault();

        let tituloPost = document.getElementById('titulo-upload').value;


        const uplotadTask = storage.ref(`images/${file.name}`).put(file)

        uplotadTask.on('state_changed',function(snapshot){
          const progress = Math.round(snapshot.bytesTransferred/snapshot.totalBytes) * 100;
          setProgress(progress)
        },function(error){

        }, function(){
          storage.ref('images').child(file.name).getDownloadURL()
          .then(function(url){
            db.collection('posts').add({
              titulo: tituloPost,
              image: url,
              userName: props.user,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })

            setProgress(0)
            setFile(null)

            alert('Postagem feita com sucesso!')

            document.getElementById('form-upload').reset()
            fecharModalUpload();
          })
        })

      }

      function deslogar(){
        auth.signOut().then(function(val){
          props.setUser(null);
        })
        
      }
    
    return(


      <div className='header'>

      <div className='modalCriarConta'>

        <div className='formCriarConta'>
          <div onClick={()=>fecharModalCriar()} className='close-modal-criar'>X</div>
            <h2>Criar Conta</h2>
            <p>Cadastre-se para ver fotos e vídeos dos seus amigos.</p>
              <form onSubmit={(e)=>CriarConta(e)}>
                <input id='email-cadastro' type="text" placeholder="E-mail" />
                <input id='username-cadastro' type="text" placeholder="Usuário" />
                <input id='senha-cadastro' type="password" placeholder="Senha" />
                <input type='submit' value="Criar Conta" />
              </form>
          </div>
      </div>

        <div className='modalUpload'>

          <div className='formUpload'>
            <div onClick={()=>fecharModalUpload()} className='close-modal-upload'>X</div>
            <h2>Postar</h2>
            <form id='form-upload' onSubmit={(e)=>uploadPost(e)}>
              <progress id='progress-upload' value={progress}></progress>
              <input id='titulo-upload' type="text" placeholder="Nome da sua foto" />
              <input onChange={(e)=>setFile(e.target.files[0])} type='file' name='file'/>
              <input type='submit' value="Postar" />
            </form>
          </div>
        </div>

        <div className='center'>

            {
              (props.user)?
              <div className='header__pai'>

                <div className='header__logo'>
                  <a href=''><img src={logo} /></a>
                </div>

                <div className='header__logadoInfo'>
                  <span>Olá <b>{props.user}</b></span>
                  <a onClick={(e)=>abrirModalUpload(e)} href=''>Postar</a>
                  <a onClick={()=>deslogar()} href=''>Deslogar</a>
                </div>

              </div>
              :
              <div className='header__loginForm'>

                <div className='header__logo'>
                  <a href=''><img src={logo} /></a>
                </div>

                <form onSubmit={(e)=>logar(e)}>
                  <input id='email-login' type='text' placeholder='Login'/>
                  <input id='senha-login' type='password' placeholder='Senha'/>
                  <input type='submit' value='Entrar'/>
                  </form>
                  <div className='btn_criarConta'>
                   <span>Não tem uma conta?</span> <a onClick={(e)=>abrirModalCriarConta(e)} href=''>Cadastre-se!</a>
                  </div>
              </div>
            } 

            </div>
         
        </div>
    )
}

export default Header



