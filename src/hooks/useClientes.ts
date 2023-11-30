import { useState, useEffect } from "react";

import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import ColecaoCliente from "@/backend/db/ColecaoCliente";
import useTabelaOuForm from "./useTabelaOuForm";

export default function useClientes() {
    const repo: ClienteRepositorio = new ColecaoCliente();

    const { tabelaVisivel, formularioVisivel, exibirTabela, exibirFormulario } = useTabelaOuForm();

    const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());
    const [clientes, setClientes] = useState<Cliente[]>([]);

    useEffect(obterTodos, []);

    function obterTodos() {
        repo.obterTodos().then((clientes) => {
            setClientes(clientes);
            exibirTabela();
        });
    }

    function clienteSelecionado(clienteSelecionado: Cliente) {
        setCliente(clienteSelecionado);
        exibirFormulario();
    }

    async function clienteExcluido(clienteSelecionado: Cliente) {
        await repo.excluir(clienteSelecionado);
        obterTodos();
    }

    function novoCliente() {
        setCliente(Cliente.vazio());
        exibirFormulario();
    }

    async function salvarCliente(clienteSelecionado: Cliente) {
        await repo.salvar(clienteSelecionado);
        obterTodos();
    }

    return {
        novoCliente,
        salvarCliente,
        excluirCliente: clienteExcluido,
        selecionarCliente: clienteSelecionado,
        obterTodos,
        cliente,
        clientes,
        tabelaVisivel,
        formularioVisivel,
        exibirTabela,
        exibirFormulario,
    };
}
