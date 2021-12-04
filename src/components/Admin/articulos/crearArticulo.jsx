import React, { useEffect, useState } from 'react'
import API from 'axios/API';


const CardCrearArticulo = ({setCrearArticulo, setArticulo, updateListArticulos, messageToast}) => {

    const [articuloData, setArticuloData] = useState({
        imagen: '',
        nombre: '',
        categoria: '',
        cantidad: 0,
        precio: 0
    })
    const [categorias, setCategorias] = useState()

    
    const [previewImagen, setPreviewImagen] = useState()

    useEffect(() => {
        API.get('/categorias/list')
        .then(response => {
            setCategorias(response.data)
        })
        .catch(err => {
            console.error(err)
        })
    }, [])

    const handleChange = (event) => {
        if(event.target.name==='imagen'){
            if(event.target.files[0]){
                setArticuloData({
                    ...articuloData,
                    [event.target.name]: event.target.files[0]
                });
                setPreviewImagen(URL.createObjectURL(event.target.files[0]))
            }

        }else{
            setArticuloData({
                ...articuloData,
                [event.target.name]: event.target.value
            });
        }
    }

    const cancelCrearArticulo = () => {
        setCrearArticulo(false)
        setArticulo({})
    }

    const crearArticulo = () => {
        // const localToken = localStorage.getItem('token')
        if(articuloData.imagen && articuloData.nombre && articuloData.categoria && articuloData.cantidad && articuloData.precio ){
            const localToken = localStorage.getItem('token')
            // let bodyFormData = articuloData
            const bodyFormData = new FormData();
            bodyFormData.append('imagen', articuloData.imagen)
            bodyFormData.append('nombre', articuloData.nombre)
            bodyFormData.append('categoria', articuloData.categoria)
            bodyFormData.append('cantidad', articuloData.cantidad)
            bodyFormData.append('precio', articuloData.precio)
            API.post('/articulos/add', bodyFormData, {headers:{token: localToken}})
            .then(response => {
                messageToast('Articulo creado', 'success')
                updateListArticulos()
                cancelCrearArticulo()

            })
            .catch(error => {
                messageToast(error.response.data.message, 'error')
            })
        }else{
            messageToast('faltan datos', 'error')
        }


    }
    return(
        <div className=" absolute h-full w-full flex items-center justify-center">
            <div className="w-1/2 lg:float-right">
                <div className=" bg-white h-auto tracking-wide border border-black-800 rounded-lg">
                        <p className="text-xl font-semibold pl-6 pt-6 pr-6 pb-2 text-center">
                            Crear Articulo
                        </p>

                        {
                            previewImagen
                            ?
                                <div className=" rounded-2xl flex justify-center my-6">
                                    <img className="h-40 rounded-2xl w-40 object-cover" src={previewImagen} alt="imagen" />
                                </div>
                            :
                                null
                        }

                        <div className="flex justify-center">        
                                
                            <label className=" rounded-full shadow-xl h-16 w-16 bg-gray-600  flex justify-center items-center" htmlFor="inputFile">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 prueba" viewBox="0 0 20 20" fill="currentColor" >
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                            </label>
                            <input
                                className=""
                                type="file"
                                name="imagen"
                                id="inputFile"
                                onChange={handleChange}
                                hidden={true}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 justify-center ">

                            <div 
                                className="flex flex-col border-b border-gray-500 my-2 mx-4 py-2"
                            >
                                <label 
                                    className="text-sm text-gray-500"
                                >
                                    Nombre
                                </label>
                                <input 
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                                    type="text"
                                    name="nombre"
                                    placeholder="nombre"
                                    value={articuloData.nombre}
                                    onChange={handleChange}
                                />
                            </div>

                            <div 
                                className="flex flex-col border-b border-gray-500 my-2 mx-4 py-2"
                            >
                                <label 
                                    className="text-sm text-gray-500"
                                >
                                    Categoria
                                </label>
                                {/* <input 
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                                    type="text"
                                    name="categoria"
                                    placeholder="categoria"
                                    value={articuloData.categoria}
                                    onChange={handleChange}
                                /> */}
                                <select 
                                    className="block w-full " 
                                    name="categoria" 
                                    value={articuloData.categoria} 
                                    onChange={handleChange}
                                    defaultValue=""
                                >
                                    <option disabled value="">Escoger Categoria</option>
                                    {
                                        categorias 
                                        ?
                                            categorias.map((categoria) => {
                                                return(
                                                    <option key={categoria.id}>{categoria.name}</option>
                                                )
                                            })
                                        :
                                            null
                                    }
                                    {/* <option>true</option>
                                    <option>false</option> */}
                                </select>
                            </div>

                            <div 
                                className="flex flex-col border-b border-gray-500 my-2 mx-4 py-2"
                            >
                                <label 
                                    className="text-sm text-gray-500"
                                >
                                    Cantidad
                                </label>
                                <input 
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                                    type="number"
                                    name="cantidad"
                                    placeholder="cantidad"
                                    value={articuloData.cantidad}
                                    onChange={handleChange}
                                />
                            </div>

                            <div 
                                className="flex flex-col border-b border-gray-500 my-2 mx-4 py-2"
                            >
                                <label 
                                    className="text-sm text-gray-500"
                                >
                                    Precio
                                </label>
                                <input 
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                                    type="number"
                                    name="precio"
                                    placeholder="precio"
                                    value={articuloData.precio}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="flex flex-row justify-center ">
                            <button 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 mx-2 rounded-full"
                                onClick={cancelCrearArticulo}
                            >
                                cancel
                            </button>
                            <button 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 mx-2 rounded-full"
                                onClick={crearArticulo}
                            >
                                ok
                            </button>
                        </div>
                </div>
            </div>

        </div>
    )
}

export default CardCrearArticulo
