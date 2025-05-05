import React, { useEffect } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import http from "../../http/http";

const AdmRestaurante = () => {
    const [restaurante, setRestaurantes] = React.useState<IRestaurante[]>([]);
    useEffect(() => {
        async function fetchAdmRestaurantes() {
            try {
                const resposta = await http.get("restaurantes/");
                setRestaurantes(resposta.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAdmRestaurantes();
    }, []);

    async function deleteRestaurantes(exlusaoNomeRestaurante: IRestaurante) {
        try {
            await http.delete<IRestaurante>(
                `restaurantes/${exlusaoNomeRestaurante.id}/`
            );
            const listaDelete = restaurante.filter(
                (restaurante) => restaurante.id !== exlusaoNomeRestaurante.id
            );
            setRestaurantes([...listaDelete]);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableCell>Nome</TableCell>
                    <TableCell>Editar</TableCell>
                    <TableCell>Excluir</TableCell>
                </TableHead>
                <TableBody>
                    {restaurante.map((restaurante) => (
                        <TableRow key={restaurante.id}>
                            <TableCell>{restaurante.nome}</TableCell>
                            <TableCell>
                                <Link
                                    to={`/adm/restaurante/${restaurante.id}/`}
                                >
                                    Editar
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() =>
                                        deleteRestaurantes(restaurante)
                                    }
                                >
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdmRestaurante;
