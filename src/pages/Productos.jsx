import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import API from 'axios/API'
import Producto from 'components/Productos/Producto'
import { useParams } from 'react-router'

const Productos = () => {
    const [listaProductos, setListaProductos] = useState([]);
    const [estadoBuscar, setEstadoBuscar] = useState(false)
    const [filtro, setFiltro] = useState('')


    const {name} = useParams()
    useEffect(() => {
        API.get('/articulos/list')
        .then(response => {
            setListaProductos(response.data.filter(producto => producto.categoria.includes(name)))
        })
        .catch(error => {
            console.log(error)
        })
    }, [name])

    const filtrado = () => {
        return listaProductos.filter(producto => producto.nombre.toLowerCase().includes(filtro.toLowerCase()))
    }

    const cambiarEstadoBuscar = () => {
        setEstadoBuscar(!estadoBuscar)
        if(estadoBuscar){//if el estado de buscar es false se resetea el filtro
            setFiltro('')
            filtrado()
        }
    }


    return (
        <div>
            <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">

                <nav id="store" className="w-full z-30 top-0 px-6 py-1">
                    <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">

                        <Link className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl " to="/">
                            Productos Deliciosos
                        </Link>
                        <div className="flex items-center">
                            <div 
                                className="flex flex-col border-b border-gray-500 my-2 mx-4 py-2"
                            >
                                <label 
                                    className="text-sm text-gray-500"
                                    hidden={!estadoBuscar}
                                >
                                    Filtro
                                </label>
                                <input 
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                                    type="text"
                                    name="filtro"
                                    placeholder="Filtrar categoria"
                                    value={filtro}
                                    onChange={(e) => {
                                        setFiltro(e.target.value);
                                    }}
                                    hidden={!estadoBuscar}
                                />

                            </div>

                            <button 
                                className="inline-flex items-center justify-center w-10 h-10 mr-2 mb-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-full focus:shadow-outline hover:bg-indigo-800"
                                onClick={cambiarEstadoBuscar}
                            >
                                {
                                    estadoBuscar
                                    ?   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    :   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                }

                            </button>
                        </div>


                    </div>
                </nav>

                {
                    filtrado().map((producto) =>{
                        return(
                            <Producto
                                key = {producto._id}
                                productData={producto}
                            />   
                        )

                    })
                } 

            </div>


        </div>
    )
}

export default Productos

