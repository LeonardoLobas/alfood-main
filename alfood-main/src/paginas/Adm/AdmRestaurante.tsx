import React, { useEffect } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import axios from "axios";

const AdmRestaurante = () => {
    const [restaurante, setRestaurantes] = React.useState<IRestaurante[]>([]);
    useEffect(() => {
        async function fetchAdmRestaurantes() {
            try {
                const resposta = await axios.get(
                    "http://localhost:8000/api/v2/restaurantes/"
                );
                setRestaurantes(resposta.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAdmRestaurantes();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableCell>Nome</TableCell>
                </TableHead>
                <TableBody>
                    {restaurante.map((restaurante) => (
                        <TableRow key={restaurante.id}>
                            <TableCell>{restaurante.nome}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdmRestaurante;
