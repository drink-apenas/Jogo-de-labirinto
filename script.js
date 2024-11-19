let previousChoices = [];

function chooseDirection(direction) {
    const description = document.getElementById("description");
    const buttons = document.querySelectorAll("button");

    // Armazena a escolha atual no histórico
    previousChoices.push(direction);

    // Esconde os botões por 1 segundo
    buttons.forEach(button => button.style.visibility = "hidden");

    setTimeout(() => {
        // Verifica se o jogador perdeu
        if (checkDefeat()) {
            description.textContent = "Você se perdeu na floresta e não conseguiu escapar. Você não será lembrado.";
            // Esconde permanentemente os botões ao perder
            buttons.forEach(button => button.style.display = "none");
        } else {
            buttons.forEach(button => button.style.visibility = "visible");
            // Atualiza a descrição e os botões com base nas escolhas anteriores
            updateDescriptionAndButtons(description, direction);
        }
    }, 1000);  // 1 segundo de espera
}

function updateDescriptionAndButtons(description, direction) {
    const buttons = document.querySelectorAll("button");
    const northButton = document.getElementById("norte");
    const southButton = document.getElementById("sul");
    const eastButton = document.getElementById("leste");
    const westButton = document.getElementById("oeste");

    // Condição para o caminho Oeste > Sul > Sul
    if (previousChoices.length === 3) {
        const firstChoice = previousChoices[0];
        const secondChoice = previousChoices[1];
        const thirdChoice = previousChoices[2];

        if (firstChoice === 'oeste' && secondChoice === 'sul' && thirdChoice === 'sul') {
            description.textContent = "Você encontrou o que parece ser uma pedra com escrituras. Deseja ler?";

            // Esconde os botões de Norte e Sul
            northButton.style.visibility = "hidden";
            southButton.style.visibility = "hidden";

            // Substitui Leste e Oeste por Sim e Não
            eastButton.textContent = "Sim";
            westButton.textContent = "Não";

            // Redefinir IDs dos botões
            eastButton.id = "sim";
            westButton.id = "nao";

            // Adiciona os eventos de clique para "Sim" e "Não"
            eastButton.onclick = function () {
                description.textContent = "Não siga as luzes. Elas não são de humanos. Nunca volte ao mesmo lugar.";
                buttons.forEach(button => button.style.display = "none");
            };
            westButton.onclick = function () {
                description.textContent = "Você decidiu não ler as escrituras e seguiu seu caminho.";
                // Restaura os botões originais
                resetButtons();
            };
            return;
        }
    }

    // Caso contrário, usa a função normal de atualização de descrição
    updateDescription(description, direction);
}

function resetButtons() {
    const eastButton = document.getElementById("sim");
    const westButton = document.getElementById("nao");

    if (eastButton && westButton) {
        eastButton.textContent = "Leste";
        eastButton.id = "leste";
        westButton.textContent = "Oeste";
        westButton.id = "oeste";

        // Redefinir eventos de clique
        eastButton.onclick = function () { chooseDirection('leste'); };
        westButton.onclick = function () { chooseDirection('oeste'); };
    }

    // Torna visíveis as direções ocultas
    document.getElementById("norte").style.visibility = "visible";
    document.getElementById("sul").style.visibility = "visible";
}

function updateDescription(description, direction) {
    // Se apenas uma escolha foi feita, exibe mensagens simples
    if (previousChoices.length === 1) {
        switch (direction) {
            case 'norte':
                description.textContent = "Você foi para o Norte e ouviu passos atrás de você...";
                break;
            case 'sul':
                description.textContent = "Você foi para o Sul e percebeu um vulto entre as árvores...";
                break;
            case 'leste':
                description.textContent = "Você foi para o Leste e a neblina pareceu ficar mais densa...";
                break;
            case 'oeste':
                description.textContent = "Você foi para o Oeste e sentiu que algo te observa...";
                break;
        }
    }

    // Se duas escolhas foram feitas, altera as mensagens de acordo
    else if (previousChoices.length === 2) {
        const firstChoice = previousChoices[0];
        const secondChoice = previousChoices[1];

      
      // Norte 2
        if (firstChoice === 'norte' && secondChoice === 'oeste') {
            description.textContent = "Ao seguir Oeste depois do Norte, os passos agora parecem mais próximos e o ar está pesado.";
        } else if (firstChoice === 'norte' && secondChoice === 'leste') {
            description.textContent = "Você seguiu para o Leste após o Norte, mas agora vê vultos ao seu redor.";
        } else if (firstChoice === 'norte' && secondChoice === 'norte') {
            description.textContent = "Os passos estão mais perto. Você está cercado.";
        } 
      
      //Sul 2
      else if (firstChoice === 'sul' && secondChoice === 'leste') {
            description.textContent = "Após ir ao Sul, você segue para o Leste e vê sombras se movendo na neblina.";
        } else if (firstChoice === 'sul' && secondChoice === 'oeste') {
            description.textContent = "Após seguir para o Sul, você vai para o Oeste e encontra marcas estranhas no chão.";
        } else if (firstChoice === 'sul' && secondChoice === 'sul') {
            description.textContent = "Você seguiu ainda mais para o Sul, e a sensação de estar sendo seguido é agora mais intensa.";
        } 
      
      // Oeste 2
      else if (firstChoice === 'oeste' && secondChoice === 'norte') {
            description.textContent = "Você seguiu para o Norte após o Oeste, e uma brisa fria passa por você, trazendo um sussurro distante.";
        } else if (firstChoice === 'oeste' && secondChoice === 'sul') {
            description.textContent = "Após ir para o Oeste e depois para o Sul, você escuta a floresta sussurrar, como se estivesse viva.";
        } else if (firstChoice === 'oeste' && secondChoice === 'oeste') {
            description.textContent = "Você continua a seguir para o Oeste, e agora há uma trilha de pegadas que não estavam ali antes.";
          
          
          // Leste 2
        } else if (firstChoice === 'leste' && secondChoice === 'norte') {
            description.textContent = "Após ir para o Leste, você vai para o Norte e sente uma presença ao seu redor, o silêncio é perturbador.";
        } else if (firstChoice === 'leste' && secondChoice === 'sul') {
            description.textContent = "Após ir para o Leste e depois ao Sul, a neblina começa a se dissipar, revelando algo escondido nas sombras.";
        } else if (firstChoice === 'leste' && secondChoice === 'leste') {
            description.textContent = "Você segue ainda mais para o Leste, a neblina está tão densa que é difícil ver além de alguns metros.";
        }
    }
   // três caminhos
    else if (previousChoices.length === 3) {
        const firstChoice = previousChoices[0];
        const secondChoice = previousChoices[1];
        const thirdChoice = previousChoices[2];  
      
        // Norte, norte
        if (firstChoice === 'norte' && secondChoice === 'norte' && thirdChoice === 'norte') {
            description.textContent = "Você encontra pessoas penduradas pelo pescoço em galhos de árvore.";
        }
      else if (firstChoice === 'norte' && secondChoice === 'norte' && thirdChoice === 'leste') {
            description.textContent = "Você encontra um mar de corpos desfigurados.";
        }
      else if (firstChoice === 'norte' && secondChoice === 'norte' && thirdChoice === 'oeste') {
            description.textContent = "Uma névoa cobre tudo ao seu redor. Enxergar é impossível.";
        }
        // Adicione mais combinações conforme necessário
    
  
  
  // Oeste, sul
  else if (firstChoice === 'oeste' && secondChoice === 'sul' && thirdChoice === 'sul') {
            description.textContent = "Você encontrou o que parece ser uma pedra com escrituras. Deseja ler";
        }
    }
    else if (previousChoices.length === 4) {
        const firstChoice = previousChoices[0];
        const secondChoice = previousChoices[1];
        const thirdChoice = previousChoices[2];
        const fourthChoice = previousChoices[3];
      
      // Norte, norte, norte
        if (firstChoice === 'norte' && secondChoice === 'norte' && thirdChoice === 'norte' && fourthChoice === 'norte') {
            description.textContent = "Uma névoa cobre tudo ao seu redor. Enxergar é impossível.";
        }
      else if (firstChoice === 'norte' && secondChoice === 'norte' && thirdChoice === 'norte' && fourthChoice === 'leste') {
            description.textContent = "Você avistou uma luz no sul.";
        }
      else if (firstChoice === 'norte' && secondChoice === 'norte' && thirdChoice === 'norte' && fourthChoice === 'oeste') {
            description.textContent = "Você encontrou um acampamento no norte.";
        }
    }
      
      else if (previousChoices.length === 5) {
        const firstChoice = previousChoices[0];
        const secondChoice = previousChoices[1];
        const thirdChoice = previousChoices[2];
        const fourthChoice = previousChoices[3];
        const fifthChoice = previousChoices[4];
        
      if (firstChoice === 'norte' && secondChoice === 'norte' && thirdChoice === 'norte' && fourthChoice === 'leste' && fifthChoice === 'sul') {
            description.textContent = "A luz era transmitida por um demônio da floresta. Tamanha intensidade lhe cegou.";
        }
        else if (firstChoice === 'norte' && secondChoice === 'norte' && thirdChoice === 'norte' && fourthChoice === 'oeste' && fifthChoice === 'norte') {
            description.textContent = "Você foi pego por demônios da floresta. Eles roubaram a sua visão.";
        }
        else if (firstChoice === 'norte' && secondChoice === 'norte' && thirdChoice === 'norte' && fourthChoice === 'oeste' && fifthChoice === 'oeste') {
            description.textContent = "Você enxerga uma trilha ao oeste. Há pegadas estranhas no chão.";
        }
        else if (firstChoice === 'norte' && secondChoice === 'norte' && thirdChoice === 'norte' && fourthChoice === 'oeste' && fifthChoice === 'sul') {
            description.textContent = "Você escuta gritos de socorro no norte.";
        }
}
  
  else if (previousChoices.length === 6) {
        const firstChoice = previousChoices[0];
        const secondChoice = previousChoices[1];
        const thirdChoice = previousChoices[2];
        const fourthChoice = previousChoices[3];
        const fifthChoice = previousChoices[4];
        const sixthChoice = previousChoices[5];
}
}
function checkDefeat() {
    const defeatPaths = [
        ['norte', 'norte', 'sul'],
        ['sul', 'sul', 'leste'],
        ['sul', 'norte'],
        ['norte', 'sul'],
        ['leste', 'oeste'],
        ['oeste', 'leste'],
        ['norte', 'norte', 'sul'],
        ['norte', 'norte', 'oeste', 'sul'],
        ['norte', 'norte', 'oeste', 'oeste'],
        ['norte', 'norte', 'oeste', 'leste'],
        ['norte', 'norte', 'oeste', 'norte']
    ];

    for (let path of defeatPaths) {
        if (arraysEqual(previousChoices.slice(0, path.length), path)) {
            return true;
        }
    }

    return false;
}

function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}
