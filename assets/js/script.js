    const adicionar = document.querySelector('.adicionar');
    const listaTarefas = document.querySelector('.tarefas');
    const inputElemento = document.querySelector('.elemento');

    function criarLi(){
        const li = document.createElement('li');
        return li;
    }

    function criaTarefa(tarefa){
        const li = criarLi();
        li.innerText = tarefa;
        listaTarefas.appendChild(li);
        limpaInput();
        criaBotaoApagar(li);
        salvarTarefas();
    }

    function limpaInput(){
        inputElemento.value = '';
        inputElemento.focus();
    }

    function criaBotaoApagar(li){
        li.innerText += ' ';
        const botaoApagar = document.createElement('button');
        botaoApagar.innerText = 'Apagar';
        botaoApagar.setAttribute('class', 'apagar');
        li.appendChild(botaoApagar);
    }

    function salvarTarefas(){
        const liTarefas = listaTarefas.querySelectorAll('li');
        const tarefas = [];

        for(let tarefa of liTarefas){
            let tarefaTexto = tarefa.innerText;
            tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
            listaTarefas.push(tarefaTexto);
        }

        const tarefasJSON = JSON.stringify(tarefas);
        localStorage.setItem('tarefas', tarefasJSON);
    }

    adicionar.addEventListener('click', function(){  
        if (!inputElemento.value) return; 
        criaTarefa(inputElemento.value);
    });
    
    inputElemento.addEventListener('keypress', function(e){
        if (e.keyCode === 13){
            if (!inputElemento.value) return; 
            criaTarefa(inputElemento.value);
        }
    });

    document.addEventListener('click', function(e){
        const el = e.target;

        if (el.classList.contains('apagar')){
            el.parentElement.remove();
            salvarTarefas();
        }
    });

    function adicionaTarefasSalvas(){
        const tarefas = localStorage.getItem('tarefas');
        const listaDeTarefas = JSON.parse(tarefas);

        for(let tarefa of listaDeTarefas){
            criaTarefa(tarefa);
        }
    }

    adicionaTarefasSalvas();
