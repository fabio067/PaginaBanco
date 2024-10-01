// Função para adicionar cliente
function adicionarCliente() {
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;

    if (nome === '' || idade === '') {
        document.getElementById('resultado').textContent = 'Por favor, preencha todos os campos.';
        return;
    }

    // Enviar uma requisição POST para a API com os dados do cliente
    fetch('https://localhost:7271/FilaBanco/AdicionarCliente', {  // URL da API
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            idade: parseInt(idade)
        })
    })
        .then(response => {
            if (response.status === 204) {
                throw new Error('Nenhum conteúdo retornado pelo servidor');
            }
            if (!response.ok) {
                throw new Error('Erro ao adicionar cliente');
            }
            return response.json(); // Aqui você está tentando obter a resposta JSON da API
        })
        .then(data => {
            // Atualizar a interface com a resposta da API
            console.log(data); // Verifique o conteúdo do objeto retornado
            document.getElementById('resultado').textContent =
                `Cliente adicionado com sucesso! Nome: ${data.cliente.nome}, ID: ${data.cliente.id}`;
        })

        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('resultado').textContent = 'Erro ao adicionar cliente.';
        });

}

// Função para remover cliente
function removerCliente() {
    fetch('https://localhost:7271/FilaBanco/RemoverCliente', {  // URL da API
        method: 'DELETE'  // Corrigindo o método para DELETE
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao remover cliente');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('resultado').textContent = data.message;  // Acessa a mensagem correta
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('resultado').textContent = 'Erro ao remover cliente.';
        });
}

// Função para consultar a fila de clientes
function consultarFila() {
    fetch('https://localhost:7271/FilaBanco/ConsultarFila')  // URL da API
        .then(response => response.json())
        .then(fila => {
            const resultadoDiv = document.getElementById('resultado');
            resultadoDiv.innerHTML = ''; // Limpa o conteúdo anterior

            // Criar uma tabela HTML
            const tabela = document.createElement('table');
            const thead = tabela.createTHead();
            const headerRow = thead.insertRow();
            const th1 = headerRow.insertCell();
            const th2 = headerRow.insertCell();
            th1.textContent = 'Nome';
            th2.textContent = 'Idade';

            // Adicionar as linhas da tabela
            fila.forEach(cliente => {
                const row = tabela.insertRow();
                const cell1 = row.insertCell();
                const cell2 = row.insertCell();
                cell1.textContent = cliente.nome;  // De Nome para nome
                cell2.textContent = cliente.idade;  // De Idade para idade
            });

            resultadoDiv.appendChild(tabela);
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('resultado').textContent = 'Erro ao consultar a fila.';
        });
}

// Função para consultar os clientes atendidos
function consultarClientesAtendidos() {
    fetch('https://localhost:7271/FilaBanco/ConsultarClientesAtendidos')  // URL da API
        .then(response => response.json())
        .then(data => {
            console.log("Clientes atendidos recebidos:", data);  // Verifica se os dados estão chegando

            const resultadoDiv = document.getElementById('resultado');
            resultadoDiv.innerHTML = '';  // Limpa o conteúdo anterior

            if (data.length === 0) {
                resultadoDiv.textContent = 'Nenhum cliente foi atendido até agora.';
                return;
            }

            // Criar uma lista para mostrar os clientes atendidos
            const ul = document.createElement('ul');

            data.forEach(cliente => {
                const li = document.createElement('li');
                li.textContent = `Nome: ${cliente.nome}, Idade: ${cliente.idade}`;
                ul.appendChild(li);
            });

            resultadoDiv.appendChild(ul);
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('resultado').textContent = 'Erro ao consultar clientes atendidos.';
        });
}