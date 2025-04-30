import React, { useEffect } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import axios from "axios";
import { IPaginacao } from "../../interfaces/IPaginacao";

const ListaRestaurantes = () => {
    const [restaurantes, setRestaurantes] = React.useState<IRestaurante[]>([]);
    const [proximaPagina, setProximaPagina] = React.useState("");

    useEffect(() => {
        async function fetchRestaurantes() {
            try {
                const resposta = await axios.get<IPaginacao<IRestaurante>>(
                    "http://localhost:8000/api/v1/restaurantes/"
                );
                setRestaurantes(resposta.data.results);
                setProximaPagina(resposta.data.next);
            } catch (erro) {
                console.error(erro);
            }
        }
        fetchRestaurantes();
    }, []);
    async function verMais(): Promise<void> {
        try {
            const resposta =
                await axios.get<IPaginacao<IRestaurante>>(proximaPagina);
            setRestaurantes([...restaurantes, ...resposta.data.results]);
            setProximaPagina(resposta.data.next);
        } catch (erro) {
            console.error(erro);
        }
    }

    return (
        <section className={style.ListaRestaurantes}>
            <h1>
                Os restaurantes mais <em>bacanas</em>!
            </h1>
            {restaurantes?.map((item) => (
                <Restaurante restaurante={item} key={item.id} />
            ))}
            {proximaPagina && <button onClick={verMais}> ver mais </button>}
        </section>
    );
};

export default ListaRestaurantes;
