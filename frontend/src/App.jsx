import { useState } from "react";
import jg from "./assets/jg.png";
import './styles.css'

function App() {
  const [email,setEmail]= useState('')
  const [passworld,setPassworld]= useState('')
  const [nome,setNome]=useState('')
  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <from className="login-form">
            
            <span className="login-form-title">Bem vindo!!!</span>
            <span className="login-form-title">
              <img src={jg }  alt="Jogo do bicho" />
            </span>
            <div className="wrap-input">
              <input 
              className={nome!==''? 'has-val input':'input'}
              type="nome"
              value={nome}
              onChange={e=>setNome(e.target.value)}
              />
              <span className="focus-input" data-placeholder='Nome'></span>

            </div>


            <div className="wrap-input">
              <input 
              className={email!==''? 'has-val input' :'input'} 
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              
              />
              <span className="focus-input" data-placeholder="Email"></span>
            </div>

             <div className="wrap-input">
              <input 
              className={passworld!==''? 'has-val input':'input'}
              type="passworld"
               value={passworld}
               onChange={e => setPassworld(e.target.value)}

              />
              <span className="focus-input" data-placeholder="Senha"></span>
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn">Login</button>
            </div>
            <div className="text-center">
              <span className="tx1">Não possui conta?</span>

              <a className="txt2" href="#"> Criar conta.</a>
            </div>
          </from>
        </div>
      </div> 
    </div>
    
  );
}

export default App
