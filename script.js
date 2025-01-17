const table = document.getElementById("table");
const form = document.getElementById('form');
const campoTurma = document.getElementById('turma');
const campoNome = document.getElementById('nome');
const campoPeso = document.getElementById('peso');
const campoAltura = document.getElementById('altura');
var tabela = JSON.parse(localStorage.getItem('tabela')) || []; // Carrega dados do localStorage



if (tabela == "") {
    document.getElementById("pdf").style.display = "none"
    document.getElementById("turmas").style.display = "none"
} else {
    document.getElementById("pdf").style.display = "block"


}

checarTurmas = []


//Lista as turmas que existem 
//Oculta se tiver somente 1 turma 
//Exibe se exxiste mais de 1 turma
function atualizaTurmas(){


for(let i=0;i<tabela.length;i++){
    if(checarTurmas.includes(tabela[i].turma) == false){
        checarTurmas.push(tabela[i].turma)
    }
}

if(checarTurmas.length == 0 ){
    document.getElementById("turmas").style.display = "none"

}else if(checarTurmas.length == 1){
    document.getElementById("turmas").style.display = "none"

    listarTurma(checarTurmas[0])

}else if(checarTurmas.length >1){
    document.getElementById("turmas").style.display = "flex"
    
}

console.log(checarTurmas)

}

atualizaTurmas()



campoAltura.addEventListener('input', () => {
    campoAltura.value = campoAltura.value.replace(/[^0-9]/g, '');

    let campo = campoAltura;

    if (campo.value.length > 1) {
        campo.value = `${campo.value[0]}.${campo.value.slice(1)}`;
    }
});

campoPeso.addEventListener('input', () => {
    campoPeso.value = campoPeso.value.replace(/[^0-9]/g, '');

    let campo = campoPeso;

    if (campo.value.length > 2) {
        campo.value = `${campo.value[0]}${campo.value[1]}.${campo.value.slice(2)}`;
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    document.getElementById("pdf").style.display = "block"
    document.getElementById("turmas").style.display = "flex"


    tabela.push({
        turma: campoTurma.value,
        nome: campoNome.value,
        peso: parseFloat(campoPeso.value), // Converte para número decimal
        altura: parseFloat(campoAltura.value) // Converte para número decimal
    });

    localStorage.setItem('tabela', JSON.stringify(tabela)); // Salva no localStorage

    atualizaTurmas()

    turmaDaVez = campoTurma.value;

    table.innerHTML = `
    <tr class ="titulo">
        <th> N° </th>
        <th >Nome</th>   
        <th >Turma</th>   
        <th>IMC</th>
        <th>Condição</th>
        <th>ㅤㅤㅤㅤ</th>
    </tr>
    `;

    for (i = 0; i < tabela.length; i++) {
        const imc = tabela[i].peso / (tabela[i].altura ** 2); // Calcula o IMC
        const ordenado = tabela.sort((a, b) => a.nome.localeCompare(b.nome));

        var estado = "";
        if (imc < 18.5) {
            estado = "MAGREZA";
        } else if (imc > 18.5 && imc < 24.9) {
            estado = "NORMAL";
        } else if (imc > 25 && imc < 29.9) {
            estado = "SOBREPESO";
        } else if (imc > 30 && imc < 39.9) {
            estado = "OBESIDADE";
        } else if (imc > 40) {
            estado = "OBESIDADE";
        }

        if (turmaDaVez != "") {
            listarTurma(turmaDaVez);

            campoNome.value = "";
            campoPeso.value = "";
            campoAltura.value = "";
        } else if (turmaDaVez == "") {
            table.innerHTML += `
            <tr class="linha" >
                <td>${i}</td>
                <td>${tabela[i].nome}</td>
                <td>${tabela[i].turma}</td>
                <td>${imc.toFixed(2)}</td>
                <td>${estado}</td>
                <img src="imagens/Trash.png" onclick="deletar(${i})" class="lixo" />
            </tr>    
            `;

            campoNome.value = "";
            campoPeso.value = "";
            campoAltura.value = "";
            turmaDaVez = tabela[i].turma;
        }
    }

    var turmas = [];
    const divTurmas = document.getElementById("turmas");
    divTurmas.innerHTML = `
          <button class="dsb2" id="todasTurmas" onclick="listarPessoas()">Todas as turmas</button>
    `;
    for (let i = 0; i < tabela.length; i++) {
        if (turmas.includes(tabela[i].turma) == false) {
            turmas.push(tabela[i].turma);

            divTurmas.innerHTML += `
                  <button class="dsb2"  onclick="listarTurma('${tabela[i].turma}')"  id="${tabela[i].turma}">${tabela[i].turma}</button>
            `;
        }
    }
});

function listarTodos(i) {
    const imc = tabela[i].peso / (tabela[i].altura ** 2); // Calcula o IMC
    const ordenado = tabela.sort((a, b) => a.nome.localeCompare(b.nome));

    var estado = "";
    if (imc < 18.5) {
        estado = "MAGREZA";
    } else if (imc > 18.5 && imc < 24.9) {
        estado = "NORMAL";
    } else if (imc > 25 && imc < 29.9) {
        estado = "SOBREPESO";
    } else if (imc > 30 && imc < 39.9) {
        estado = "OBESIDADE";
    } else if (imc > 40) {
        estado = "OBESIDADE";
    }

    table.innerHTML += `
    <tr class="linha" >
        <td>${i}</td>
        <td>${tabela[i].nome}</td>
        <td>${tabela[i].turma}</td>
        <td>${imc.toFixed(2)}</td>
        <td>${estado}</td>
        <td><img src="imagens/Trash.png" onclick="deletar(${i})" class="lixo" /></td>
    </tr>    
    `;
}

function listarTurma(a) {
    table.innerHTML = `
    <tr class ="titulo">
        <th> N° </th>
        <th >Nome</th>   
        <th >Turma</th>   
        <th>IMC</th>
        <th>Condição</th>
        <th>ㅤㅤㅤㅤ</th>
    </tr>
    `;


    campoTurma.value = a
    let cont = 0;
    for (let i = 0; i < tabela.length; i++) {
        if (tabela[i].turma == a) {
            turmaDaVez = tabela[i].turma;
            console.log(turmaDaVez);
            listarTodos(i);
        }
    }
}

var turmaDaVez;

function listarPessoas() {
    console.log("Listando todos...");
    turmaDaVez = "";

    table.innerHTML = `
        <tr class ="titulo">
            <th> N° </th>
            <th >Nome</th> 
            <th> Turma</th>  
            <th>IMC</th>
            <th>Condição</th>
            <th>ㅤㅤㅤㅤ</th>

        </tr>
    `;

    let a = 0;
    while (a < tabela.length) {
        listarTodos(a);
        console.log(tabela[a]);
        a++;
    }

    // Atualiza os botões de seleção de turma
    var turmas = [];
    const divTurmas = document.getElementById("turmas");
    divTurmas.innerHTML = `
        <button class="dsb2" id="todasTurmas" onclick="listarPessoas()">Todas as turmas</button>
    `;
    for (let i = 0; i < tabela.length; i++) {
        if (!turmas.includes(tabela[i].turma)) {
            turmas.push(tabela[i].turma);
            divTurmas.innerHTML += `
                <button class="dsb2" onclick="listarTurma('${tabela[i].turma}')"  id="${tabela[i].turma}">${tabela[i].turma}</button>
            `;
        }
    }
}


function deletar(i) {
    // Excluir o item da lista
    
    checarTurmas = checarTurmas.splice(i,1)
    
    tabela.splice(i, 1);
    


    // Atualiza o localStorage
    localStorage.setItem('tabela', JSON.stringify(tabela));

    // Re-renderizar a tabela com os dados atualizados
    if (turmaDaVez) {
        listarTurma(turmaDaVez);
    } else {
        listarPessoas();
    }

    if (tabela == "") {
        document.getElementById("pdf").style.display = "none"


        const divTurmas = document.getElementById("turmas");

        divTurmas.innerHTML = `
          <button class="dsb2" id="todasTurmas" onclick="listarPessoas()">Todas as turmas</button>
    `;
    }
    atualizaTurmas()




}

buttonPdf = document.getElementById("pdf");

buttonPdf.addEventListener("click", () => {
    console.log("funcionando...");
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const content = document.getElementById('table');
    const rows = [];

    // Extrair os dados da tabela
    for (let i = 1; i < content.rows.length; i++) {
        const row = content.rows[i];
        let rowData = [];
        for (let j = 0; j < row.cells.length; j++) {
            rowData.push(row.cells[j].innerText);
        }
        rows.push(rowData);
    }

    // Gerar o PDF com os dados extraídos
    doc.autoTable({
        head: [['N°', 'Nome', 'Turma', 'IMC', 'Condição']], // Cabeçalho
        body: rows, // Dados da tabela
    });

    // Salvar o PDF
    let titulo = turmaDaVez;

    if (turmaDaVez == "") {
        titulo = "todos alunos";
    } else {
        titulo = turmaDaVez;
    }

    doc.save(`tabela IMC ${titulo} alunos.pdf`);
});

// Renderiza os dados iniciais ao carregar a página
listarPessoas();

