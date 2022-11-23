import './Card.css';

export default function Cards ({nomeFilme,dataFilme,codFilme,imgem}){
    return(


      
            < div className='card'>
               <div className='imge'>
                   <img src={imgem} width={150} height={150}/> 
                </div>   

                 <div className='codFilme'>
                   {codFilme}
                </div>           
                <div className='nomeFilme'>
                    {nomeFilme}
                </div>
                <div className='dataFilme'>
                    {dataFilme}
                </div>
            </div>
      
      
    )
}