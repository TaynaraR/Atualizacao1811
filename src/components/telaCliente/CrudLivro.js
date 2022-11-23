import React, {useState,useEffect } from "react";
import Menu from '../template/Menu.js'
import "./CrudLivro.css"
import Main from "../template/Main";
import axios from "axios";
import Card from "../CrudLivro/Cards.js";

const title = "Consulta e Cadastro de Livro";

const urlAPI = "http://localhost:5092/api/Livro";

export default function CrudLivro() {
 
  const [lista, setLista] = useState ([])
  
  const [Livro, setLivro] = useState([{
    id: 0,
    codLivro: 0,
    nomeLivro: "",
    dataLivro: "",
    imagem:""
    
  }])

const [Atualizar, setAtualizar] = useState(false)

  useEffect(() =>{
    axios(urlAPI).then((resp) => {
           setLivro(resp.data);
           setLista(resp.data);
      });
  },[lista]) 



  const getListaAtualizada = (Livro)=> {
      const lista = lista.filter((a) => a.id !== Livro.id);
      lista.unshift(Livro);
      axios(urlAPI).then((resp) => {
        setLista(resp.data);
    });
    return lista;
  }

  const atualizaCampo = (event) => {
    const Livros = Livro
    Livros[event.target.nomeLivro] = event.target.value;
    setLivro(Livros)
  }

  const renderForm = () => {
    return (
      <div className="inserir-container">
     
      {Atualizar && <>
      
        <label> <p className="textLabel">ID:</p> </label>
        <input

          disabled = {true}
          type="text"
          id="idLivro"
          placeholder="idLivro"
          className="form-input"
          name="codLivro"
          value={Livro.id}
        />
       </> }
      
        <label> <p className="textLabel">Código do Livro:</p> </label>
        <input
          type="text"
          id="codLivro"
          placeholder="Código do Livro"
          className="form-input"
          name="codLivro"
          value={Livro.codLivro}
        />
        <label> <p className="textLabel">Nome do Livro:</p> </label>
        <input
          type="text"
          id="nomeLivro"
          placeholder="Nome do Livro"
          className="form-input"
          name="nomeLivro"
          value={Livro.nomeLivro}         
        />
        <label> <p className="textLabel">Data da Leitura:</p> </label>
        <input
          type="text"
          id="dataLivro"
          className="form-input"
          name="dataLivro"
          placeholder="Data a Leitura"
          value={Livro.dataLivro}
        />
         <label> <p className="textLabel">Url da imagem:</p> </label>
        <input
          type="text"
          id="imagem"
          className="form-input"
          name="imagem"
          placeholder="imagem"
          value={Livro.imagem}
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

  const carregar = (Livro) => {
    setAtualizar(true)
    setLivro(Livro)
  }

  const remover = (Livro) => {
    const url = urlAPI + "/" + Livro.id;
    if (window.confirm("Confirma remoção de Livro: " + Livro.id)) {
      axios["delete"](url, Livro).then((resp) => {
      });
    }
  }

  const renderTable = () => {
    return (
      <div className="divPrincipal">
            {lista.map((Livro) => (
              <tr key={Livro.id}>
                <Card nomeLivro={Livro.nomeLivro} dataLivro={Livro.dataLivro} codLivro={Livro.codLivro} imgem={Livro.imagem}/>
                <td>
                  <button className="butao2"
                  onClick={() => carregar(Livro)}>Altera</button>
                </td>
                <td>
                  <button className="butao2"
                   onClick={() => remover(Livro)}>Remove</button>
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