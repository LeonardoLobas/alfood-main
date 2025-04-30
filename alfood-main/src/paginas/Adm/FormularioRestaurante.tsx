import { Button, TextField } from "@mui/material";
import axios from "axios";
import React from "react";

const FormularioRestaurante = () => {
    const [nomeRestaurante, setNomeRestaurante] = React.useState("");

    const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const postNameRestaurant = async () => {
            try {
                const resposta = await axios.post(
                    "http://localhost:8000/api/v2/restaurantes/",
                    {
                        nome: nomeRestaurante,
                    }
                );
                console.log(resposta);
            } catch (error) {
                console.log(error);
            }
        };
        postNameRestaurant();
    };

    return (
        <form onSubmit={aoSubmeterForm}>
            <TextField
                value={nomeRestaurante}
                onChange={(event) => setNomeRestaurante(event.target.value)}
                id="standard-basic"
                label="Restaurante nome"
                variant="standard"
            />
            <Button type="submit" variant="outlined">
                Salvar
            </Button>
        </form>
    );
};

export default FormularioRestaurante;
