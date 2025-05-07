import React, { useEffect } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import axios, { AxiosRequestConfig } from "axios";
import { IPaginacao } from "../../interfaces/IPaginacao";

interface IParametrosBusca {
    ordering?: string;
    search?: string;
}

const ListaRestaurantes = () => {
    const [restaurantes, setRestaurantes] = React.useState<IRestaurante[]>([]);
    const [proximaPagina, setProximaPagina] = React.useState("");
    const [paginaAnterior, setPaginaAnterior] = React.useState("");
    const [busca, setBusca] = React.useState("");
    const [ordenacao, setOrdenacao] = React.useState("");

    async function fetchRestaurantes(
        url: string,
        opcoes: AxiosRequestConfig = {}
    ) {
        try {
            const resposta = await axios.get<IPaginacao<IRestaurante>>(
                url,
                opcoes
            );
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

    function buscar(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        const opcoes: AxiosRequestConfig = {
            params: {} as IParametrosBusca,
        };

        if (busca) {
            opcoes.params.search = busca;
        }
        if (ordenacao) {
            opcoes.params.ordering = ordenacao;
        }

        fetchRestaurantes("http://localhost:8000/api/v1/restaurantes/", opcoes);
    }

    return (
        <section className={style.ListaRestaurantes}>
            <h1>
                Os restaurantes mais <em>bacanas</em>!
            </h1>
            <form onSubmit={buscar}>
                <input
                    type="text"
                    value={busca}
                    onChange={(evento) => setBusca(evento.target.value)}
                />
                <button type="submit">buscar</button>
                <div>
                    <label htmlFor="select-ordenacao">Ordenação</label>
                    <select
                        name="select-ordenacao"
                        id="select-ordenacao"
                        value={ordenacao}
                        onChange={(evento) => setOrdenacao(evento.target.value)}
                    >
                        <option value="">Padrão</option>
                        <option value="id">Por ID</option>
                        <option value="nome">Por Nome</option>
                    </select>
                </div>
            </form>
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
