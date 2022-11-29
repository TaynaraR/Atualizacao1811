import React, {useState,useEffect } from "react";
import Menu from '../template/Menu.js'
import Main from "../template/Main";
import axios from "axios";
import "./ListaFilme.css"
import Card from "./Cards.js";
import CrudFilme from "../CrudFilme/CrudFilme.js";


const title = "Consulta Filme";

const urlAPI = "http://localhost:5092/api/Filme";

export default function ListaFilme() {
 
  const [lista, setLista] = useState ([])
  
  const [Filme, setFilme] = useState([{
    id: 0,
    codFilme: 0,
    nomeFilme: "",
    dataFilme: "",
    imagem: ""
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
    const codFilme = document.getElementById("codFilme").value;
    const nomeFilme = document.getElementById("nomeFilme").value;
    const dataFilme = document.getElementById("dataFilme").value;
    const imagem = document.getElementById("imagem").value;
    const json = {
      id: 0,
      codFilme: codFilme,
      nomeFilme: nomeFilme,
      dataFilme: dataFilme,
      imagem: imagem
    }
    const metodo = "post";
    axios[metodo](urlAPI, json).then((resp) => {
    setFilme(Filme)
      
    });
  }

  const atualizar = (id) => {
    const Filmes = {id: document.getElementById("idFilme").value, codFilme: document.getElementById("codFilme").value, nomeFilme: document.getElementById("nomeFilme").value, dataFilme: document.getElementById("dataFilme").value, imagem: document.getElementById("imagem").value}
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

  <div className="inserir-container">

  </div>
  const renderTable = () => {
    return (
      <div className="divPrincipal">
            {lista.map((Filme) => (
              <tr key={Filme.id}>
                <Card nomeFilme={Filme.nomeFilme} dataFilme={Filme.dataFilme} codFilme={Filme.codFilme} imgem={Filme.imagem}/>
            
              </tr> 
            ))}
      </div>
    );
  }
  
    return (
 
   <Main >

   {renderForm()}
   {renderTable()}
   
 </Main>    
    );
  
}