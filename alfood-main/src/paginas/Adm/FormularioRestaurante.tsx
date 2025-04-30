import { Button, TextField } from "@mui/material";
import React from "react";

const FormularioRestaurante = () => {
    const [nomeRestaurante, setNomeRestaurante] = React.useState("");

    const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(nomeRestaurante);
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
