import { Link } from 'react-router-dom'
import { useState } from "react"
import { LayoutComponents } from "../../components/LayoutComponents"
import jg from "../../assets/jg.png";

export const Register =()=>{
    const [email, setEmail] = useState('')
    const [passworld, setPassworld] = useState('')
    const [name, setName] = useState("")
    return(
        <LayoutComponents>
            <form className="login-form">

        <span className="login-form-title">Criar Conta</span>
        <span className="login-form-title">
          <img src={jg} alt="Jogo do bicho" />
        </span>

        <div className="wrap-input">
          <input
            className={name !== '' ? 'has-val input' : 'input'}
            type="email"
            value={name}
            onChange={e => setName(e.target.value)}

          />
          <span className="focus-input" data-placeholder="Nome"></span>
        </div>
        
        <div className="wrap-input">
          <input
            className={email !== '' ? 'has-val input' : 'input'}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}

          />
          <span className="focus-input" data-placeholder="Email"></span>
        </div>

        <div className="wrap-input">
          <input
            className={passworld !== '' ? 'has-val input' : 'input'}
            type="passworld"
            value={passworld}
            onChange={e => setPassworld(e.target.value)}

          />
          <span className="focus-input" data-placeholder="Senha"></span>
        </div>

        <div className="container-login-form-btn">
          <button className="login-form-btn">Cadastra</button>
        </div>
        <div className="text-center">
          <span className="tx1">Já possui conta?</span>

          <Link className="txt2" to="/login">
            Acessar com Email e Senha.
          </Link>
        </div>
      </form>
        </LayoutComponents>
    )

}