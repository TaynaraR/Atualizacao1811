import React, {useState,useEffect } from "react";
import Menu from '../template/Menu.js'
import "./CrudFilme.css"
import Main from "../template/Main";
import axios from "axios";
import Card from "./Cards.js";
import AuthService from "../../services/Auth.service.js";

const title = "Consulta e Cadastro de Filmes";

const urlAPI = "http://localhost:5092/api/Filme";

export default function CrudFilme() {
 
  const [lista, setLista] = useState ([])
  
  const [Filme, setFilme] = useState([{
    id: 0,
    codFilme: 0,
    nomeFilme: "",
    dataFilme: "",
    imagem:"",
    alugado:false
    
  }])

const [Atualizar, setAtualizar] = useState(false)

  useEffect(() =>{
    axios(urlAPI).then((resp) => {
           setFilme(resp.data);
           setLista(resp.data);
      });
  },[lista]) 

   const limpar = () => {
     setLista([]);
   };
  
    const salvar = () => {
    const codFilme= document.getElementById("codFilme").value;
    const nomeFilme= document.getElementById("nomeFilme").value;
    const dataFilme= document.getElementById("dataFilme").value;
    const imagem = document.getElementById("imagem").value;
    const json = {
      id: 0,
      codFilme: codFilme,
      nomeFilme: nomeFilme,
      dataFilme: dataFilme,
      imagem: imagem,
      alugado:false,
      alugadoPor: null
    }
    const metodo = "post";
    axios[metodo](urlAPI, json).then((resp) => {
    setFilme(Filme)
      
    });
  }

  const atualizar = (id) => {
    const Filmes = {id: document.getElementById("idFilme").value, codFilme: document.getElementById("codFilme").value, nomeFilme: document.getElementById("nomeFilme").value, dataFilme: document.getElementById("dataFilme").value, imagem: document.getElementById("imagem").value,alugado:false,alugadoPor:null}
    const metodo = "put";
    axios[metodo](urlAPI + "/" + Filmes.id, Filmes).then((resp) => {
      const lista = getListaAtualizada(resp.data);
      setFilme(resp.data);
      setLista(lista);
    });
    setAtualizar(false);

    window.location.reload()
  }



  const getListaAtualizada = (Filme)=> {
      const lista = lista.filter((a) => a.id !== Filme.id);
      lista.unshift(Filme);
      axios(urlAPI).then((resp) => {
        setLista(resp.data);
    });
    return lista;
  }

  const atualizaCampo = (event) => {
    const Filmes = Filme
    Filmes[event.target.nomeFilme] = event.target.value;
    setFilme(Filmes)
  }

  const renderForm = () => {
    return (
      <div className="inserir-container">
     
      {Atualizar && <>
      
        <label> <p className="textLabel">ID:</p> </label>
        <input

          disabled = {true}
          type="text"
          id="idFilme"
          placeholder="idFilme"
          className="form-input"
          name="codFilme"
          value={Filme.id}
        />
       </> }
      
        <label> <p className="textLabel">Código do Filme:</p> </label>
        <input
          type="text"
          id="codFilme"
          placeholder="Código do Filme"
          className="form-input"
          name="codFilme"
          value={Filme.codFilme}
        />
        <label> <p className="textLabel">Nome do Filme:</p> </label>
        <input
          type="text"
          id="nomeFilme"
          placeholder="Nome do Filme"
          className="form-input"
          name="nomeFilme"
          value={Filme.nomeFilme}         
        />
        <label> <p className="textLabel">Data de Lançamento:</p> </label>
        <input
          type="text"
          id="dataFilme"
          className="form-input"
          name="dataFilme"
          placeholder="Data a Leitura"
          value={Filme.dataFilme}
        />
         <label> <p className="textLabel">Url da imagem:</p> </label>
        <input
          type="text"
          id="imagem"
          className="form-input"
          name="imagem"
          placeholder="imagem"
          value={Filme.imagem}
        />
        {!Atualizar ?
        <button className="butao" onClick={(e) => salvar(e)}>
          Salvar
        </button> : 
        <button className="butao" onClick={(e) => atualizar()}>
          Atualizar
        </button>
        }
        <button className="butao" onClick={(e) => limpar(e)}>
          Cancelar
        </button>
      </div>
    );
  }

  const carregar = (Filme) => {
    setAtualizar(true)
    setFilme(Filme)
  }

  const remover = (Filme) => {
    const url = urlAPI + "/" + Filme.id;
    if (window.confirm("Confirma remoção de Filme: " + Filme.id)) {
      axios["delete"](url, Filme).then((resp) => {
      });
    }
  }

  const renderTable = () => {
    return (
      <div className="divPrincipal">
            {lista.map((Filme) => (
              <tr key={Filme.id}>
                <Card nomeFilme={Filme.nomeFilme} dataFilme={Filme.dataFilme} codFilme={Filme.codFilme} imgem={Filme.imagem}/>
                <td>
                  <button className="butom"
                  onClick={() => carregar(Filme)}>Altera</button>
                </td>
                <td>
                  <button className="butom"
                   onClick={() => remover(Filme)}>Remove</button>
                </td>
              </tr> 
            ))}
      </div>
    );
  }
  
    return (
      <Main title={title}>
       
        {renderForm()}
        {renderTable()}
        
      </Main>
    );
  
}