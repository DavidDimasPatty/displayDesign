import { useEffect, useState } from 'react';
import '../styles/main.css'

const Main = () => {
    const [products, SetProducts] = useState([])
    const url = process.env.REACT_APP_API_ENDPOINT;

    const getData = async () => {
        try {
            //console.log(url + "/api/products");
            const response = await fetch(url + "/api/products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            //console.log(response)
            if (response.ok) {
                const json = await response.json();
                console.log(json)
                SetProducts(json)
            }
            else throw new Error("Fetch Failed")
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="row">
            <h3 className='text-center mb-4'>tes</h3>
            <div className="col d-flex gap-3">
                {products.map(item => {
                    return (
                        <div className="card">
                            <div className="card-header">
                                <div key={item.id}>{item.nama}</div>
                            </div>
                            <div className="card-body">
                                <img src={item.foto}></img>
                            </div>
                            <div className='card-footer'>
                                <div>
                                    {item.harga}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}


export default Main;