import axios from "axios";
import IRestaurante from "../../../interfaces/IRestaurante";
import Prato from "../Prato";
import estilos from "./Restaurante.module.scss";
import React, { useEffect } from "react";
import IPrato from "../../../interfaces/IPrato";
import { IPaginacao } from "../../../interfaces/IPaginacao";

interface RestauranteProps {
    restaurante: IRestaurante;
}

const Restaurante = ({ restaurante }: RestauranteProps) => {
    const [pratos, setPratos] = React.useState<IPrato[]>();
    useEffect(() => {
        async function fetchPrato() {
            try {
                const response = await axios.get<IPrato[]>(
                    `http://localhost:8000/api/v1/restaurantes/${restaurante.id}/pratos/`
                );
                setPratos(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchPrato();
    }, [restaurante.id]);

    return (
        <section className={estilos.Restaurante}>
            <div className={estilos.Titulo}>
                <h2>{restaurante.nome}</h2>
            </div>
            <div>
                {pratos?.map((item) => <Prato prato={item} key={item.id} />)}
            </div>
        </section>
    );
};

export default Restaurante;
