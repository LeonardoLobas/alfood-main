import React, { useEffect } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import axios from "axios";
import { IPaginacao } from "../../interfaces/IPaginacao";

const ListaRestaurantes = () => {
    const [restaurantes, setRestaurantes] = React.useState<IRestaurante[]>([]);
    const [proximaPagina, setProximaPagina] = React.useState("");
    const [paginaAnterior, setPaginaAnterior] = React.useState("");

    async function fetchRestaurantes(url: string) {
        try {
            const resposta = await axios.get<IPaginacao<IRestaurante>>(url);
            setRestaurantes(resposta.data.results);
            setProximaPagina(resposta.data.next);
            setPaginaAnterior(resposta.data.previous);
        } catch (erro) {
            console.error(erro);
        }
    }
    useEffect(() => {
        fetchRestaurantes("http://localhost:8000/api/v1/restaurantes/");
    }, []);
    // async function verMais(): Promise<void> {
    //     try {
    //         const resposta =
    //             await axios.get<IPaginacao<IRestaurante>>(proximaPagina);
    //         setRestaurantes([...restaurantes, ...resposta.data.results]);
    //         setProximaPagina(resposta.data.next);
    //     } catch (erro) {
    //         console.error(erro);
    //     }
    // }

    return (
        <section className={style.ListaRestaurantes}>
            <h1>
                Os restaurantes mais <em>bacanas</em>!
            </h1>
            {restaurantes?.map((item) => (
                <Restaurante restaurante={item} key={item.id} />
            ))}
            <button
                onClick={() =>
                    paginaAnterior && fetchRestaurantes(paginaAnterior)
                }
                disabled={!paginaAnterior}
            >
                {" "}
                Página anterior{" "}
            </button>
            <button
                onClick={() =>
                    proximaPagina && fetchRestaurantes(proximaPagina)
                }
                disabled={!proximaPagina}
            >
                {" "}
                Próxima página{" "}
            </button>
        </section>
    );
};

export default ListaRestaurantes;
