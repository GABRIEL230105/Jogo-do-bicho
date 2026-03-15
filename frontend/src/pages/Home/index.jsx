import { useState } from "react";
import jg from "../../assets/jg.png";

export const Home = () => {

  const [saldo, setSaldo] = useState(1000);
  const [animal, setAnimal] = useState("");
  const [valor, setValor] = useState("");
  const [resultado, setResultado] = useState("");
  const [historico, setHistorico] = useState([]);

  const animais = [
    "Avestruz","Águia","Burro","Borboleta","Cachorro",
    "Cabra","Carneiro","Camelo","Cobra","Coelho",
    "Cavalo","Elefante","Galo","Gato","Jacaré",
    "Leão","Macaco","Porco","Pavão","Peru",
    "Touro","Tigre","Urso","Veado","Vaca"
  ];

  const apostar = () => {

    if(!animal){
      alert("Escolha um animal");
      return;
    }

    if(valor <= 0){
      alert("Digite um valor válido");
      return;
    }

    if(valor > saldo){
      alert("Saldo insuficiente");
      return;
    }

    const sorteado = animais[Math.floor(Math.random() * animais.length)];

    let ganhou = animal === sorteado;
    let premio = ganhou ? valor * 10 : 0;

    let novoSaldo = saldo - valor + premio;

    setSaldo(novoSaldo);
    setResultado(sorteado);

    const novaAposta = {
      animalEscolhido: animal,
      valor,
      resultado: sorteado,
      status: ganhou ? "Ganhou" : "Perdeu",
      data: new Date().toLocaleString()
    };

    setHistorico([novaAposta, ...historico]);

    setValor("");
  };

  return (

    <div 
      style={{
        padding:"40px",
        position:"relative",
        backgroundColor:"#1e293b",
        minHeight:"100vh",
        color:"white"
      }}
    >

      
      <img
        src={jg}
        alt="Logo"
        style={{
          position: "absolute",
          top: "10px",
          right: "20px",
          width: "80px",
          opacity: 0.9,
          pointerEvents: "none"
        }}
      />

      <h1>Jogo do Bicho</h1>

      <h2>Saldo: R$ {saldo}</h2>

      <h3>Escolha um animal</h3>

      {/* GRID DE ANIMAIS */}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "10px",
        marginBottom: "20px"
      }}>

        {animais.map((a, index) => (

          <button
            key={index}
            onClick={() => setAnimal(a)}

            style={{
              padding: "15px",
              borderRadius: "8px",
              border: animal === a ? "3px solid green" : "1px solid gray",
              background: animal === a ? "#d4f7d4" : "white",
              cursor: "pointer"
            }}
          >

            {a}

          </button>

        ))}

      </div>

      {animal && (
        <h3>Animal escolhido: {animal}</h3>
      )}

      <input
        type="number"
        placeholder="Valor da aposta"
        value={valor}
        onChange={(e)=>setValor(Number(e.target.value))}
      />

      <br /><br />

      <button onClick={apostar}>
        Apostar
      </button>

      {resultado && (
        <h3 style={{marginTop:"20px"}}>
          Animal sorteado: {resultado}
        </h3>
      )}

      <hr />

      <h2>Histórico de apostas</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Animal</th>
            <th>Valor</th>
            <th>Resultado</th>
            <th>Status</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>

          {historico.map((aposta, index)=>(
            <tr key={index}>
              <td>{aposta.animalEscolhido}</td>
              <td>R$ {aposta.valor}</td>
              <td>{aposta.resultado}</td>
              <td>{aposta.status}</td>
              <td>{aposta.data}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>

  );
};