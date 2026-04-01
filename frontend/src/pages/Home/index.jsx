import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jg from "../../assets/jg.png";

export const Home = () => {
  const API_URL = "http://localhost:3333/api/users";
  const navigate = useNavigate();

  const [saldo, setSaldo] = useState(0);
  const [animal, setAnimal] = useState("");
  const [valor, setValor] = useState("");
  const [resultado, setResultado] = useState("");
  const [historico, setHistorico] = useState([]);
  const [user, setUser] = useState(null);

  const [tipo, setTipo] = useState("grupo");
  const [apostaNumero, setApostaNumero] = useState("");
  const [premio, setPremio] = useState(0);

  const [numeroSorteado, setNumeroSorteado] = useState("");
  const [dezenaSorteada, setDezenaSorteada] = useState("");
  const [grupoSorteado, setGrupoSorteado] = useState("");
  const [animalResultado, setAnimalResultado] = useState("");

  const animais = [
    "Avestruz", "Águia", "Burro", "Borboleta", "Cachorro",
    "Cabra", "Carneiro", "Camelo", "Cobra", "Coelho",
    "Cavalo", "Elefante", "Galo", "Gato", "Jacaré",
    "Leão", "Macaco", "Porco", "Pavão", "Peru",
    "Touro", "Tigre", "Urso", "Veado", "Vaca"
  ];

  const tabelaGrupos = [
    { grupo: "01", animal: "Avestruz", dezenas: ["01", "02", "03", "04"] },
    { grupo: "02", animal: "Águia", dezenas: ["05", "06", "07", "08"] },
    { grupo: "03", animal: "Burro", dezenas: ["09", "10", "11", "12"] },
    { grupo: "04", animal: "Borboleta", dezenas: ["13", "14", "15", "16"] },
    { grupo: "05", animal: "Cachorro", dezenas: ["17", "18", "19", "20"] },
    { grupo: "06", animal: "Cabra", dezenas: ["21", "22", "23", "24"] },
    { grupo: "07", animal: "Carneiro", dezenas: ["25", "26", "27", "28"] },
    { grupo: "08", animal: "Camelo", dezenas: ["29", "30", "31", "32"] },
    { grupo: "09", animal: "Cobra", dezenas: ["33", "34", "35", "36"] },
    { grupo: "10", animal: "Coelho", dezenas: ["37", "38", "39", "40"] },
    { grupo: "11", animal: "Cavalo", dezenas: ["41", "42", "43", "44"] },
    { grupo: "12", animal: "Elefante", dezenas: ["45", "46", "47", "48"] },
    { grupo: "13", animal: "Galo", dezenas: ["49", "50", "51", "52"] },
    { grupo: "14", animal: "Gato", dezenas: ["53", "54", "55", "56"] },
    { grupo: "15", animal: "Jacaré", dezenas: ["57", "58", "59", "60"] },
    { grupo: "16", animal: "Leão", dezenas: ["61", "62", "63", "64"] },
    { grupo: "17", animal: "Macaco", dezenas: ["65", "66", "67", "68"] },
    { grupo: "18", animal: "Porco", dezenas: ["69", "70", "71", "72"] },
    { grupo: "19", animal: "Pavão", dezenas: ["73", "74", "75", "76"] },
    { grupo: "20", animal: "Peru", dezenas: ["77", "78", "79", "80"] },
    { grupo: "21", animal: "Touro", dezenas: ["81", "82", "83", "84"] },
    { grupo: "22", animal: "Tigre", dezenas: ["85", "86", "87", "88"] },
    { grupo: "23", animal: "Urso", dezenas: ["89", "90", "91", "92"] },
    { grupo: "24", animal: "Veado", dezenas: ["93", "94", "95", "96"] },
    { grupo: "25", animal: "Vaca", dezenas: ["97", "98", "99", "00"] },
  ];

  useEffect(() => {
    const storagedUser = localStorage.getItem("@Auth:user");
    const token = localStorage.getItem("@Auth:token");

    if (storagedUser && storagedUser !== "undefined") {
      setUser(JSON.parse(storagedUser));
    }

    if (token && token !== "null" && token !== "undefined") {
      carregarSaldo();
      carregarHistorico();
    }
  }, []);

  const sair = () => {
    localStorage.removeItem("@Auth:user");
    localStorage.removeItem("@Auth:token");
    navigate("/");
  };

  async function carregarSaldo() {
    const token = localStorage.getItem("@Auth:token");
    const storagedUser = localStorage.getItem("@Auth:user");

    try {
      const res = await fetch(`${API_URL}/balance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setSaldo(data.balance ?? 0);
      } else {
        const userData = storagedUser ? JSON.parse(storagedUser) : null;
        setSaldo(userData?.balance ?? 0);
      }
    } catch (error) {
      console.error(error); 
      const userData = storagedUser ? JSON.parse(storagedUser) : null;
      setSaldo(userData?.balance ?? 0);
    }
  }

  async function carregarHistorico() {
    const token = localStorage.getItem("@Auth:token");

    try {
      const res = await fetch(`${API_URL}/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setHistorico(Array.isArray(data) ? data : []);
      } else {
        setHistorico([]);
      }
    } catch (error) {
      console.error(error); 
      setHistorico([]);
    }
  }

  const apostar = async () => {
    if (!valor || Number(valor) <= 0) {
      alert("Digite um valor válido");
      return;
    }

    let aposta = "";

    if (tipo === "grupo") {
      if (!animal) {
        alert("Escolha um animal");
        return;
      }

      aposta = String(animais.indexOf(animal) + 1).padStart(2, "0");
    }

    if (tipo === "dezena") {
      if (!/^\d{2}$/.test(apostaNumero)) {
        alert("Digite uma dezena válida (00 a 99)");
        return;
      }

      aposta = apostaNumero;
    }

    if (tipo === "milhar") {
      if (!/^\d{4}$/.test(apostaNumero)) {
        alert("Digite uma milhar válida (0000 a 9999)");
        return;
      }

      aposta = apostaNumero;
    }

    const token = localStorage.getItem("@Auth:token");

    try {
      const res = await fetch(`${API_URL}/play`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Number(valor),
          tipo,
          aposta,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.message || data || "Erro ao apostar");
        return;
      }

      setPremio(data.premio ?? 0);
      setSaldo(data.balance ?? saldo);
      setNumeroSorteado(data.numeroSorteado ?? "");
      setDezenaSorteada(data.dezenaSorteada ?? "");
      setGrupoSorteado(data.grupoSorteado ?? "");

      const grupoInfo = tabelaGrupos.find(
        (item) => item.grupo === (data.grupoSorteado ?? "")
      );

      setAnimalResultado(grupoInfo?.animal || "");
      setResultado(data.message || "");

      await carregarHistorico();

      setValor("");
      setAnimal("");
      setApostaNumero("");
    } catch (error) {
      console.error(error); 
      alert("Erro ao apostar");
    }
  };

  const grupoSelecionado = tabelaGrupos.find((g) =>
    g.dezenas.includes(apostaNumero)
  );

  const tipoButtonStyle = (ativo) => ({
    padding: "10px 18px",
    borderRadius: "999px",
    border: ativo ? "2px solid #22c55e" : "1px solid #475569",
    background: ativo ? "#16a34a" : "#0f172a",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.2s",
  });

  const cardStyle = {
    backgroundColor: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
  };

  return (
    <div
      style={{
        padding: "32px",
        background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            ...cardStyle,
            position: "relative",
            marginBottom: "24px",
          }}
        >
          <button
            onClick={sair}
            style={{
              position: "absolute",
              top: "20px",
              right: "130px",
              padding: "10px 16px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#dc2626",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Sair
          </button>

          <img
            src={jg}
            alt="Logo"
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              width: "90px",
              borderRadius: "12px",
              opacity: 0.95,
            }}
          />

          <h1 style={{ margin: 0, fontSize: "42px" }}>Jogo do Bicho</h1>
          <p style={{ marginTop: "10px", fontSize: "22px" }}>Olá, {user?.name}</p>

          <div
            style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "10px 16px",
              borderRadius: "12px",
              backgroundColor: "#16a34a",
              fontWeight: "bold",
              fontSize: "22px",
            }}
          >
            Saldo: R$ {saldo}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "24px",
            alignItems: "start",
          }}
        >
          <div style={cardStyle}>
            <h2 style={{ marginTop: 0 }}>Nova aposta</h2>

            <h3>Tipo de aposta</h3>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
              <button
                style={tipoButtonStyle(tipo === "grupo")}
                onClick={() => {
                  setTipo("grupo");
                  setAnimal("");
                  setApostaNumero("");
                }}
              >
                Grupo
              </button>

              <button
                style={tipoButtonStyle(tipo === "dezena")}
                onClick={() => {
                  setTipo("dezena");
                  setAnimal("");
                  setApostaNumero("");
                }}
              >
                Dezena
              </button>

              <button
                style={tipoButtonStyle(tipo === "milhar")}
                onClick={() => {
                  setTipo("milhar");
                  setAnimal("");
                  setApostaNumero("");
                }}
              >
                Milhar
              </button>
            </div>

            {tipo === "grupo" && (
              <>
                <h3>Escolha um animal</h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >
                  {animais.map((a, index) => (
                    <button
                      key={index}
                      onClick={() => setAnimal(a)}
                      style={{
                        padding: "14px",
                        borderRadius: "12px",
                        border: animal === a ? "2px solid #22c55e" : "1px solid #64748b",
                        background: animal === a ? "#dcfce7" : "white",
                        color: "#0f172a",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")} - {a}
                    </button>
                  ))}
                </div>

                {animal && (
                  <div
                    style={{
                      marginBottom: "20px",
                      padding: "12px",
                      borderRadius: "10px",
                      backgroundColor: "#1e293b",
                      border: "1px solid #475569",
                    }}
                  >
                    Animal escolhido: <strong>{animal}</strong>
                  </div>
                )}
              </>
            )}

            {tipo === "dezena" && (
              <>
                <h3>Digite a dezena</h3>
                <input
                  type="text"
                  maxLength="2"
                  placeholder="00 a 99"
                  value={apostaNumero}
                  onChange={(e) => setApostaNumero(e.target.value.replace(/\D/g, ""))}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "12px",
                    border: "1px solid #64748b",
                    marginBottom: "12px",
                    fontSize: "16px",
                  }}
                />

                {grupoSelecionado && (
                  <div
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                      backgroundColor: "#fef3c7",
                      color: "#78350f",
                      fontWeight: "bold",
                      marginBottom: "18px",
                    }}
                  >
                    A dezena <strong>{apostaNumero}</strong> pertence ao grupo{" "}
                    <strong>{grupoSelecionado.grupo}</strong> - {grupoSelecionado.animal}
                  </div>
                )}
              </>
            )}

            {tipo === "milhar" && (
              <>
                <h3>Digite a milhar</h3>
                <input
                  type="text"
                  maxLength="4"
                  placeholder="0000 a 9999"
                  value={apostaNumero}
                  onChange={(e) => setApostaNumero(e.target.value.replace(/\D/g, ""))}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "12px",
                    border: "1px solid #64748b",
                    marginBottom: "18px",
                    fontSize: "16px",
                  }}
                />
              </>
            )}

            <h3>Valor da aposta</h3>
            <input
              type="number"
              placeholder="Digite o valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #64748b",
                marginBottom: "18px",
                fontSize: "16px",
              }}
            />

            <button
              onClick={apostar}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: "#22c55e",
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Apostar
            </button>

            {resultado && (
              <div
                style={{
                  marginTop: "24px",
                  padding: "18px",
                  backgroundColor: "#020617",
                  borderRadius: "14px",
                  border: "1px solid #334155",
                }}
              >
                <h3 style={{ marginTop: 0 }}>{resultado}</h3>
                <p>🎯 Número sorteado: <strong>{numeroSorteado}</strong></p>
                <p>🔢 Dezena: <strong>{dezenaSorteada}</strong></p>
                <p>
                  🐾 Grupo: <strong>{grupoSorteado}</strong>
                  {animalResultado ? ` - ${animalResultado}` : ""}
                </p>

                {premio > 0 ? (
                  <div
                    style={{
                      marginTop: "10px",
                      display: "inline-block",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      backgroundColor: "#16a34a",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    💰 Prêmio: R$ {premio}
                  </div>
                ) : (
                  <div
                    style={{
                      marginTop: "10px",
                      display: "inline-block",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      backgroundColor: "#7f1d1d",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Sem prêmio nesta rodada
                  </div>
                )}
              </div>
            )}
          </div>

          {(tipo === "grupo" || tipo === "dezena") && (
            <div style={cardStyle}>
              <h2 style={{ marginTop: 0 }}>Tabela de grupos e dezenas</h2>

              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    backgroundColor: "white",
                    color: "#0f172a",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#e2e8f0" }}>
                      <th style={{ padding: "12px" }}>Grupo</th>
                      <th style={{ padding: "12px" }}>Animal</th>
                      <th style={{ padding: "12px" }}>Dezenas</th>
                    </tr>
                  </thead>

                  <tbody>
                    {tabelaGrupos.map((item) => (
                      <tr
                        key={item.grupo}
                        style={{
                          backgroundColor:
                            grupoSelecionado?.grupo === item.grupo ? "#fde68a" : "white",
                        }}
                      >
                        <td style={{ padding: "10px", textAlign: "center", fontWeight: "bold" }}>
                          {item.grupo}
                        </td>
                        <td style={{ padding: "10px" }}>{item.animal}</td>
                        <td style={{ padding: "10px" }}>{item.dezenas.join(", ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div style={{ ...cardStyle, marginTop: "24px" }}>
          <h2 style={{ marginTop: 0 }}>Histórico de apostas</h2>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                backgroundColor: "#0f172a",
                color: "white",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#1e293b" }}>
                  <th style={{ padding: "12px", border: "1px solid #334155" }}>Tipo</th>
                  <th style={{ padding: "12px", border: "1px solid #334155" }}>Aposta</th>
                  <th style={{ padding: "12px", border: "1px solid #334155" }}>Valor</th>
                  <th style={{ padding: "12px", border: "1px solid #334155" }}>Número sorteado</th>
                  <th style={{ padding: "12px", border: "1px solid #334155" }}>Grupo sorteado</th>
                  <th style={{ padding: "12px", border: "1px solid #334155" }}>Status</th>
                  <th style={{ padding: "12px", border: "1px solid #334155" }}>Prêmio</th>
                  <th style={{ padding: "12px", border: "1px solid #334155" }}>Data</th>
                </tr>
              </thead>

              <tbody>
                {historico.map((item, index) => (
                  <tr key={index}>
                    <td style={{ padding: "10px", border: "1px solid #334155" }}>{item.tipo}</td>
                    <td style={{ padding: "10px", border: "1px solid #334155" }}>{item.aposta}</td>
                    <td style={{ padding: "10px", border: "1px solid #334155" }}>R$ {item.valor}</td>
                    <td style={{ padding: "10px", border: "1px solid #334155" }}>{item.numeroSorteado}</td>
                    <td style={{ padding: "10px", border: "1px solid #334155" }}>{item.grupoSorteado ?? "-"}</td>
                    <td
                      style={{
                        padding: "10px",
                        border: "1px solid #334155",
                        color: item.ganhou ? "#4ade80" : "#f87171",
                        fontWeight: "bold",
                      }}
                    >
                      {item.ganhou ? "Ganhou" : "Perdeu"}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #334155" }}>R$ {item.premio ?? 0}</td>
                    <td style={{ padding: "10px", border: "1px solid #334155" }}>
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};