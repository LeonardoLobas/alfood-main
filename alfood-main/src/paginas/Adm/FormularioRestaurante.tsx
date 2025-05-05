import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../interfaces/IRestaurante";

const FormularioRestaurante = () => {
    const [nomeRestaurante, setNomeRestaurante] = React.useState("");

    const parametro = useParams();

    useEffect(() => {
        async function fetchRestaurante() {
            if (parametro.id) {
                try {
                    const respostas = await axios.get<IRestaurante>(
                        `http://localhost:8000/api/v2/restaurantes/${parametro.id}/`
                    );
                    setNomeRestaurante(respostas.data.nome);
                } catch (erro) {
                    console.log(erro);
                }
            }
        }
        fetchRestaurante();
    }, [parametro.id]);

    const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (parametro.id) {
            const putNameRestaurant = async () => {
                try {
                    const resposta = await axios.put(
                        `http://localhost:8000/api/v2/restaurantes/${parametro.id}/`,
                        { nome: nomeRestaurante }
                    );
                    setNomeRestaurante(resposta.data.nome);
                } catch (erro) {
                    console.log(erro);
                }
            };
            putNameRestaurant();
        } else {
            const postNameRestaurant = async () => {
                try {
                    const resposta = await axios.post(
                        "http://localhost:8000/api/v2/restaurantes/",
                        { nome: nomeRestaurante }
                    );
                    console.log(resposta);
                } catch (error) {
                    console.log(error);
                }
            };
            postNameRestaurant();
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h6">
                    Formulário de Restaurantes
                </Typography>
                <Box component="form" onSubmit={aoSubmeterForm}>
                    <TextField
                        value={nomeRestaurante}
                        onChange={(event) =>
                            setNomeRestaurante(event.target.value)
                        }
                        id="standard-basic"
                        label="Restaurante nome"
                        variant="standard"
                        fullWidth
                        required
                    />
                    <Button
                        sx={{ marginTop: 1 }}
                        type="submit"
                        fullWidth
                        variant="outlined"
                    >
                        Salvar
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default FormularioRestaurante;
