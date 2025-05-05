import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../interfaces/IRestaurante";
import http from "../../http/http";

const FormularioRestaurante = () => {
    const [nomeRestaurante, setNomeRestaurante] = React.useState("");

    const parametro = useParams();

    useEffect(() => {
        async function fetchRestaurante() {
            if (parametro.id) {
                try {
                    const respostas = await http.get<IRestaurante>(
                        `restaurantes/${parametro.id}/`
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
                    const resposta = await http.put(
                        `restaurantes/${parametro.id}/`,
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
                    const resposta = await http.post("restaurantes/", {
                        nome: nomeRestaurante,
                    });
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
