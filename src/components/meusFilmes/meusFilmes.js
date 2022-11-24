import React, {useState,useEffect } from "react";
import Menu from '../template/Menu.js'
import Main from "../template/Main";
import axios from "axios";
import Card from "../ListaFilme/Cards.js";
import CrudFilme from "../CrudFilme/CrudFilme.js";
import AuthService from "../../services/Auth.service.js";

const title = "Consultar  Filmes";

const urlAPI = "http://localhost:5092/api/Filme";

export default function meusFilmes() {
 
  const [lista, setLista] = useState ([])

  const [listaIdFilme, setListaIdFilme] = useState ([])
  
  const [Filme, setFilme] = useState([{
    id: 0,
    codFilme: 0,
    nomeFilme: "",
    dataFilme: "",
    imagem: "",
    alugado: false,
  }])


const [Atualizar, setAtualizar] = useState(false)

  useEffect(() =>{

      axios(urlAPI).then((resp) => {
            setFilme(resp.data);
            setLista(resp.data);
      });

    const user = AuthService.getCurrentUser();

    axios(urlAPI+`/${user.user.username}`).then((resp) => {
           // tratar dps 
           // receber apenas os Filmes atrelados ao nome dele.
           setListaIdFilme(resp.data);
      });

      listaIdFilme.forEach(id => {
        setLista(
          Filme.filter(e => e.id == id )
        )
      });

  },[lista]) 


  


  const renderTable = () => {
    return (
      <div className="divPrincipal">
            {lista.map((Filme) => (
              <tr key={Filme.id}>
                <Card nomeFilme={Filme.nomeFilme} dataFilme={Filme.dataFilme} codFilme={Filme.codFilme} imgem={Filme.imagem}/>
                <button onClick={e=>alugar(Filme)}>Cancelar aluguel do filme</button>
              </tr> 
            ))}
      </div>
    );
  }
  
    return ( 
      <>
        {renderTable()}
      </>      
    );
  
}