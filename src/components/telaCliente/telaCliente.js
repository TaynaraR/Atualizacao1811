import React, {useState,useEffect } from "react";
import Menu from '../template/Menu.js'
import Main from "../template/Main";
import axios from "axios";
import Card from "../telaCliente/Cards.js";
import "./telaCliente.css";
import CrudFilme from "../CrudFilme/CrudFilme.js";
import AuthService from "../../services/Auth.service.js";

const title = "Consulta de Filmes";

const urlAPI = "http://localhost:5092/api/Filme";

export default function TelaCliente() {
 
  const [lista, setLista] = useState ([])
  
  const [Filme, setFilme] = useState([{
    id: 0,
    codFilme: 0,
    nomeFilme: "",
    dataFilme: "",
    imagem: "",
    alugado: false,
  }])


  useEffect(() =>{
    axios(urlAPI).then((resp) => {
           setFilme(resp.data);
           setLista(resp.data);


      });
  },[lista]) 


  // funcao para alugar o Filme
  const alugar = (Filme) =>{
    console.log(Filme);
    axios.put(urlAPI+`/${Filme.id}`,{
      id: Filme.id,
      codFilme: Filme.codFilme,
      nomeFilme:Filme.nomeFilme,
      dataFilme: Filme.dataFilme,
      imagem: Filme.imagem,
      alugado: true,
      alugadoPor: AuthService.getCurrentUser().user.username

    }).then((resp) => {
        alert('Filme alugado com exito!')
 });
  }

<div className="inserir-container">

</div>

  const renderTable = () => {
    return (
      <div className="divPrincipal">
            {lista.map((Filme) => (
            <>
             {Filme.alugado == false && <tr key={Filme.id}>
                <Card nomeFilme={Filme .nomeFilme} dataFilme={Filme.dataFilme} codFilme={Filme.codFilme} imgem={Filme.imagem}/>
                <button className="butom" onClick={e=>alugar(Filme)}>Alugar</button>
              </tr>}
            </> 
            ))}
      </div>
    );
  }
  
    return ( 
      <Main >
       
      {renderTable()}
      
    </Main>   
    );
  
}