import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jg from "../../assets/jg.png";
import { API_BASE_URL } from "../../services/api";

export const Home = () => {
  const API_URL = `${API_BASE_URL}/api/users`;
  const navigate = useNavigate();

  const [saldo, setSaldo] = useState(0);
  const [animal, setAnimal] = useState("");
  const [valor, setValor] = useState("");
  const [valorDeposito, setValorDeposito] = useState("");
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
    if (storagedUser && storagedUser !== "undefined") setUser(JSON.parse(storagedUser));
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
      const res = await fetch(`${API_URL}/balance`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (res.ok) { setSaldo(data.balance ?? 0); }
      else { const u = storagedUser ? JSON.parse(storagedUser) : null; setSaldo(u?.balance ?? 0); }
    } catch {
      const u = storagedUser ? JSON.parse(storagedUser) : null; setSaldo(u?.balance ?? 0);
    }
  }

  async function carregarHistorico() {
    const token = localStorage.getItem("@Auth:token");
    try {
      const res = await fetch(`${API_URL}/history`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setHistorico(res.ok && Array.isArray(data) ? data : []);
    } catch { setHistorico([]); }
  }

  const depositar = async () => {
    const token = localStorage.getItem("@Auth:token");
    if (!valorDeposito || Number(valorDeposito) <= 0) { alert("Digite um valor válido para depósito"); return; }
    try {
      const res = await fetch(`${API_URL}/deposit`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ value: Number(valorDeposito) }),
      });
      const data = await res.json();
      if (!res.ok) { alert(data?.message || "Erro ao depositar"); return; }
      setSaldo(data.balance ?? saldo);
      setValorDeposito("");
      const storagedUser = localStorage.getItem("@Auth:user");
      const userData = storagedUser ? JSON.parse(storagedUser) : null;
      if (userData) {
        const updatedUser = { ...userData, balance: data.balance };
        localStorage.setItem("@Auth:user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
      alert("Depósito realizado com sucesso 💰");
    } catch { alert("Erro ao conectar com o servidor"); }
  };

  const apostar = async () => {
    if (!valor || Number(valor) <= 0) { alert("Digite um valor válido"); return; }
    let aposta = "";
    if (tipo === "grupo") {
      if (!animal) { alert("Escolha um animal"); return; }
      aposta = String(animais.indexOf(animal) + 1).padStart(2, "0");
    }
    if (tipo === "dezena") {
      if (!/^\d{2}$/.test(apostaNumero)) { alert("Digite uma dezena válida (00 a 99)"); return; }
      aposta = apostaNumero;
    }
    if (tipo === "milhar") {
      if (!/^\d{4}$/.test(apostaNumero)) { alert("Digite uma milhar válida (0000 a 9999)"); return; }
      aposta = apostaNumero;
    }
    const token = localStorage.getItem("@Auth:token");
    try {
      const res = await fetch(`${API_URL}/play`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ amount: Number(valor), tipo, aposta }),
      });
      const data = await res.json();
      if (!res.ok) { alert(data?.message || data || "Erro ao apostar"); return; }
      setPremio(data.premio ?? 0);
      setSaldo(data.balance ?? saldo);
      setNumeroSorteado(data.numeroSorteado ?? "");
      setDezenaSorteada(data.dezenaSorteada ?? "");
      setGrupoSorteado(data.grupoSorteado ?? "");
      const grupoInfo = tabelaGrupos.find((item) => item.grupo === (data.grupoSorteado ?? ""));
      setAnimalResultado(grupoInfo?.animal || "");
      setResultado(data.message || "");
      const storagedUser = localStorage.getItem("@Auth:user");
      const userData = storagedUser ? JSON.parse(storagedUser) : null;
      if (userData && data.balance !== undefined) {
        const updatedUser = { ...userData, balance: data.balance };
        localStorage.setItem("@Auth:user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
      await carregarHistorico();
      setValor(""); setAnimal(""); setApostaNumero("");
    } catch { alert("Erro ao apostar"); }
  };

  const grupoSelecionado = tabelaGrupos.find((g) => g.dezenas.includes(apostaNumero));

  const tipoBtn = (ativo) =>
    `cursor-pointer rounded-full px-[18px] py-2.5 font-bold text-white transition ${
      ativo ? "border-2 border-green-500 bg-green-600" : "border border-slate-600 bg-slate-900"
    }`;

  const escolherTipo = (t) => {
    setTipo(t);
    setAnimal("");
    setApostaNumero("");
  };

  const card = "rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.25)]";
  const inputCls = "mb-[18px] w-full rounded-xl border border-slate-500 bg-slate-800 p-3.5 text-base text-white";
  const th = "border border-slate-700 p-3";
  const td = "border border-slate-700 p-2.5";
  const hideMobile = "max-md:hidden";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-3 font-sans text-white md:p-4">
      <div className="mx-auto max-w-[1300px]">
        {/* ── Header ── */}
        <div className={`${card} relative mb-6`}>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-[26px] leading-tight md:text-4xl">Jogo do Bicho</h1>
            <div className="flex shrink-0 items-center gap-3">
              <button onClick={sair} className="cursor-pointer whitespace-nowrap rounded-[10px] bg-red-600 px-4 py-2.5 font-bold text-white">
                Sair
              </button>
              <img src={jg} alt="Logo" className="w-[52px] shrink-0 rounded-xl opacity-95 md:w-[72px]" />
            </div>
          </div>

          <p className="mb-1.5 text-lg">Olá, {user?.name}</p>

          <div className="mt-1.5 inline-block rounded-xl bg-green-600 px-4 py-2.5 text-[17px] font-bold md:text-xl">
            Saldo: R$ {saldo}
          </div>

          <div className="mt-5">
            <h3 className="mb-2.5 font-bold">Depositar saldo</h3>
            <div className="mt-2.5 flex flex-wrap gap-2.5">
              <input
                type="number"
                placeholder="Valor do depósito"
                value={valorDeposito}
                onChange={(e) => setValorDeposito(e.target.value)}
                className="min-w-0 flex-[1_1_180px] rounded-[10px] border border-slate-500 bg-slate-800 p-2.5 text-base text-white"
              />
              <button onClick={depositar} className="cursor-pointer whitespace-nowrap rounded-[10px] bg-green-500 px-4 py-2.5 font-bold text-white">
                Depositar
              </button>
            </div>
          </div>
        </div>

        {/* ── Grid principal ── */}
        <div className="grid items-start gap-6 md:grid-cols-[1.2fr_1fr]">
          {/* Card aposta */}
          <div className={card}>
            <h2 className="mb-2 text-2xl font-bold">Nova aposta</h2>

            <h3 className="mb-2 font-bold">Tipo de aposta</h3>
            <div className="mb-5 flex flex-wrap gap-2.5">
              <button className={tipoBtn(tipo === "grupo")} onClick={() => escolherTipo("grupo")}>Grupo</button>
              <button className={tipoBtn(tipo === "dezena")} onClick={() => escolherTipo("dezena")}>Dezena</button>
              <button className={tipoBtn(tipo === "milhar")} onClick={() => escolherTipo("milhar")}>Milhar</button>
            </div>

            {tipo === "grupo" && (
              <>
                <h3 className="mb-2 font-bold">Escolha um animal</h3>
                <div className="mb-5 grid grid-cols-3 gap-2 min-[400px]:grid-cols-[repeat(auto-fill,minmax(90px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(120px,1fr))] md:gap-2.5">
                  {animais.map((a, index) => (
                    <button
                      key={index}
                      onClick={() => setAnimal(a)}
                      className={`cursor-pointer rounded-xl px-1 py-2.5 text-center text-[11px] font-bold leading-snug text-slate-900 md:px-2 md:py-3 md:text-[13px] ${
                        animal === a ? "border-2 border-green-500 bg-green-100" : "border border-slate-500 bg-white"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")} - {a}
                    </button>
                  ))}
                </div>

                {animal && (
                  <div className="mb-5 rounded-[10px] border border-slate-600 bg-slate-800 p-3">
                    Animal escolhido: <strong>{animal}</strong>
                  </div>
                )}
              </>
            )}

            {tipo === "dezena" && (
              <>
                <h3 className="mb-2 font-bold">Digite a dezena</h3>
                <input
                  type="text"
                  maxLength="2"
                  placeholder="00 a 99"
                  value={apostaNumero}
                  onChange={(e) => setApostaNumero(e.target.value.replace(/\D/g, ""))}
                  className={`${inputCls} !mb-3`}
                />
                {grupoSelecionado && (
                  <div className="mb-[18px] rounded-xl bg-amber-100 p-3 font-bold text-amber-900">
                    A dezena <strong>{apostaNumero}</strong> pertence ao grupo{" "}
                    <strong>{grupoSelecionado.grupo}</strong> - {grupoSelecionado.animal}
                  </div>
                )}
              </>
            )}

            {tipo === "milhar" && (
              <>
                <h3 className="mb-2 font-bold">Digite a milhar</h3>
                <input
                  type="text"
                  maxLength="4"
                  placeholder="0000 a 9999"
                  value={apostaNumero}
                  onChange={(e) => setApostaNumero(e.target.value.replace(/\D/g, ""))}
                  className={inputCls}
                />
              </>
            )}

            <h3 className="mb-2 font-bold">Valor da aposta</h3>
            <input
              type="number"
              placeholder="Digite o valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className={inputCls}
            />

            <button onClick={apostar} className="w-full cursor-pointer rounded-xl bg-green-500 p-3.5 text-base font-bold text-white">
              Apostar
            </button>

            {resultado && (
              <div className="mt-6 rounded-[14px] border border-slate-700 bg-slate-950 p-[18px]">
                <h3 className="mb-2 font-bold">{resultado}</h3>
                <p>🎯 Número sorteado: <strong>{numeroSorteado}</strong></p>
                <p>🔢 Dezena: <strong>{dezenaSorteada}</strong></p>
                <p>🐾 Grupo: <strong>{grupoSorteado}</strong>{animalResultado ? ` - ${animalResultado}` : ""}</p>
                {premio > 0 ? (
                  <div className="mt-2.5 inline-block rounded-[10px] bg-green-600 px-3.5 py-2.5 font-bold text-white">
                    💰 Prêmio: R$ {premio}
                  </div>
                ) : (
                  <div className="mt-2.5 inline-block rounded-[10px] bg-red-900 px-3.5 py-2.5 font-bold text-white">
                    Sem prêmio nesta rodada
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Card tabela */}
          {(tipo === "grupo" || tipo === "dezena") && (
            <div className={card}>
              <h2 className="mb-2 text-2xl font-bold">Tabela de grupos e dezenas</h2>
              <div className="overflow-x-auto">
                <table className="w-full overflow-hidden rounded-xl bg-white text-xs text-slate-900 md:text-sm">
                  <thead>
                    <tr className="bg-slate-200">
                      <th className="p-3">Grupo</th>
                      <th className="p-3">Animal</th>
                      <th className="p-3">Dezenas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tabelaGrupos.map((item) => (
                      <tr key={item.grupo} className={grupoSelecionado?.grupo === item.grupo ? "bg-amber-200" : "bg-white"}>
                        <td className="p-2.5 text-center font-bold">{item.grupo}</td>
                        <td className="p-2.5">{item.animal}</td>
                        <td className="p-2.5">{item.dezenas.join(", ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* ── Histórico ── */}
        <div className={`${card} mt-6`}>
          <h2 className="mb-2 text-2xl font-bold">Histórico de apostas</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-slate-900 text-xs text-white md:text-sm">
              <thead>
                <tr className="bg-slate-800">
                  <th className={th}>Tipo</th>
                  <th className={th}>Aposta</th>
                  <th className={th}>Valor</th>
                  <th className={`${th} ${hideMobile}`}>Nº sorteado</th>
                  <th className={`${th} ${hideMobile}`}>Grupo</th>
                  <th className={th}>Status</th>
                  <th className={th}>Prêmio</th>
                  <th className={`${th} ${hideMobile}`}>Data</th>
                </tr>
              </thead>
              <tbody>
                {historico.map((item, index) => (
                  <tr key={index}>
                    <td className={td}>{item.tipo}</td>
                    <td className={td}>{item.aposta}</td>
                    <td className={td}>R$ {item.valor}</td>
                    <td className={`${td} ${hideMobile}`}>{item.numeroSorteado}</td>
                    <td className={`${td} ${hideMobile}`}>{item.grupoSorteado ?? "-"}</td>
                    <td className={`${td} font-bold ${item.ganhou ? "text-green-400" : "text-red-400"}`}>
                      {item.ganhou ? "Ganhou" : "Perdeu"}
                    </td>
                    <td className={td}>R$ {item.premio ?? 0}</td>
                    <td className={`${td} ${hideMobile}`}>{new Date(item.createdAt).toLocaleString()}</td>
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
