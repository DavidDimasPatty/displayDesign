import { useEffect, useState } from 'react';
import '../styles/main.css'
import Header from './Header'
import Footer from './Footer'

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

    function goLink(link) {
        window.open(link, "_blank");
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <Header />
            <div className="col main-content">
                <h3 className='text-center mb-4'>tes</h3>
                <div className="row gap-3 align-items-center justify-content-center">
                    {products.slice().sort((a, b) => a.urutan - b.urutan).map(item => {
                        return (
                            <div className="col-2 col-md-5">
                                <div className="card" onClick={() => goLink(item.url)}>
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
                            </div>
                        )
                    })}
                </div>
            </div>
            <Footer />
        </>
    )

}


export default Main;