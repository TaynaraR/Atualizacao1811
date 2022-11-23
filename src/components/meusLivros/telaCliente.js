import React, {useState,useEffect } from "react";
import Menu from '../template/Menu.js'
import Main from "../template/Main";
import axios from "axios";
import Card from "../ListaLivro/Cards.js";
import CrudLivro from "../CrudLivro/CrudLivro.js";


const title = "Consulta Livros";

const urlAPI = "http://localhost:5092/api/Livro";

export default function MeusLivros() {
 
  const [lista, setLista] = useState ([])
  
  const [Livro, setLivro] = useState([{
    id: 0,
    codLivro: 0,
    nomeLivro: "",
    dataLivro: "",
    imagem: "",
    alugado: false,
  }])

const [Atualizar, setAtualizar] = useState(false)

  useEffect(() =>{
    axios(urlAPI).then((resp) => {
           setLivro(resp.data);
           setLista(resp.data);
      });
  },[lista]) 


  // funcao para alugar o livro
  const alugar = (livro) =>{
    axios.put(urlAPI,{
      id: livro.id,
      codLivro: livro.codLivro,
      nomeLivro:livro.nomeLivro,
      dataLivro: livro.dataLivro,
      imagem: livro.imagem,
      alugado: true,

    }).then((resp) => {
      alert('livro alugado com exito!')
 });
  }



  const renderTable = () => {
    return (
      <div className="divPrincipal">
            {lista.map((Livro) => (
              <tr key={Livro.id}>
                <Card nomeLivro={Livro.nomeLivro} dataLivro={Livro.dataLivro} codLivro={Livro.codLivro} imgem={Livro.imagem}/>
                <button onClick={e=>alugar(Livro)}>Alugar</button>
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