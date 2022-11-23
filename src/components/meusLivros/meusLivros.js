import React, {useState,useEffect } from "react";
import Menu from '../template/Menu.js'
import Main from "../template/Main";
import axios from "axios";
import Card from "../ListaLivro/Cards.js";
import CrudLivro from "../CrudLivro/CrudLivro.js";
import AuthService from "../../services/Auth.service.js";

const title = "Consulta Livros";

const urlAPI = "http://localhost:5092/api/Livro";

export default function meusLivros() {
 
  const [lista, setLista] = useState ([])

  const [listaIdLivro, setListaIdLivro] = useState ([])
  
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

    const user = AuthService.getCurrentUser();

    axios(urlAPI+`/${user.user.username}`).then((resp) => {
           // tratar dps 
           // receber apenas os livros atrelados ao nome dele.
           setListaIdLivro(resp.data);
      });

      listaIdLivro.forEach(id => {
        setLista(
          Livro.filter(e => e.id == id )
        )
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
                <button onClick={e=>alugar(Livro)}>Cancelar</button>
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