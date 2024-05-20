import entradaDados from "readline-sync";
import listaDeFrutas from "./dados.js";
import {
  atualizarPalavraOculta,
  validarLetraDigitada,
  verificarLetraPresenteNaPalavra,
  jogadasRestantes,
  verificarJogoGanho,
  exibirMensagemFimDeJogo,
} from "./funcoes.js";

function jogarForca() {

  const palavraEscolhida =
    listaDeFrutas[Math.floor(Math.random(0, 1) * listaDeFrutas.length)];
  console.log(palavraEscolhida);

  let primeiraLetra = palavraEscolhida[0];
  let underline = "_".repeat(palavraEscolhida.length - 1);
  let palavraOculta = primeiraLetra + underline;

  let erros = 0;
  let statusJogo = "andamento";

  console.log("\n------------JOGO DA FORCA------------\n");
  console.log(`Nome da fruta com ${palavraEscolhida.length} letras:\n`);

  while (statusJogo === "andamento") {
    console.log(`\nFruta: ${palavraOculta} `);
    const letraDigitada = entradaDados
      .question("Digite uma letra:")
      .toLowerCase();

    if (validarLetraDigitada(letraDigitada)) {
      if (verificarLetraPresenteNaPalavra(palavraEscolhida, letraDigitada)) {
        palavraOculta = atualizarPalavraOculta(
          palavraOculta,
          letraDigitada,
          palavraEscolhida
        );
        if (verificarJogoGanho(palavraOculta, palavraEscolhida)) {
          statusJogo = "venceu";
        }
      } else {
        erros++

        const chances = jogadasRestantes(erros);

        if (chances > 0) {
          console.log(`OPÇÃO ERRADA! Você ainda tem ${chances} chance(s)!`);
        } else {
          statusJogo = "perdeu";
        }
      }
    } else {
      console.log("Por favor, digite uma letra válida.");
    }
  }
  exibirMensagemFimDeJogo(statusJogo);
}

jogarForca();
