import React, { useState, useEffect } from "react";
import Menu from '../template/Menu.js'
import Main from "../template/Main";
import axios from "axios";
import Card from "../ListaFilme/Cards.js";
import "./meusFilmes.css"
import CrudFilme from "../CrudFilme/CrudFilme.js";
import AuthService from "../../services/Auth.service.js";

const title = "Consultar  Filmes";

const urlAPI = "http://localhost:5092/api/Filme";

export default function MeusFilmes() {

  const [lista, setLista] = useState([])

  const [listaIdFilme, setListaIdFilme] = useState([])

  const [Filme, setFilme] = useState([{
    id: 0,
    codFilme: 0,
    nomeFilme: "",
    dataFilme: "",
    imagem: "",
    alugado: false,
    alugadoPor: null,
  }])


  const [Atualizar, setAtualizar] = useState(false)

  useEffect(() => {

    axios(urlAPI).then((resp) => {
      setFilme(resp.data);
      setLista(resp.data)
    });

    Filme.forEach(element => {
      console.log(element);
      if (element.alugadoPor == AuthService.getCurrentUser().user.username) {

        setLista(element)
      }
    });






  }, [])


  const deletar = (Filme) => {
    axios.put(urlAPI + `/${Filme.id}`, {
      id: Filme.id,
      codFilme: Filme.codFilme,
      nomeFilme: Filme.nomeFilme,
      dataFilme: Filme.dataFilme,
      imagem: Filme.imagem,
      alugado: false,
      alugadoPor: null

    }).then((resp) => {
      alert('Cancelamento de aluguel confirmado')
    }); window.location.reload();
  }


  const renderTable = () => {
    return (
      <div className="divPrincipal">
        {lista.map((Filme) => (
          <>
            {Filme.alugadoPor == AuthService.getCurrentUser().user.username && <tr key={Filme.id}>
              <Card nomeFilme={Filme.nomeFilme} dataFilme={Filme.dataFilme} codFilme={Filme.codFilme} imgem={Filme.imagem} />
              <button className="butao" onClick={e => deletar(Filme)}>Cancelar aluguel do filme</button>
            </tr>}
          </>
        ))}
      </div>
    );
  }

  return (
    <Main>
      {renderTable()}
    </Main>
  );

}