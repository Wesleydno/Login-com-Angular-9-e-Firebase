import { FirebaseError } from '../models/firebase-error.model';

export function FirebaseError(methodName: string, err: FirebaseError) {
  let msg: string;
  switch (err.code) {
    case 'auth/invalid-email':
      msg = 'endereço de e-mail inválido';
      break;
    case 'auth/user-not-found':
      msg =
        'Endereço de e-mail não encontrado. Crie uma conta para entrar no sistema.';
      break;
    case 'auth/wrong-password':
      msg = 'senha inválida!';
      break;
    case 'auth/weak-password':
      msg = 'a senha deve ter no mínimo 6 caracteres';
      break;
    case 'auth/email-already-in-use':
      msg = 'O e-mail já está sendo utilizado por outra conta';
      break;
    case 'auth/network-request-failed':
      msg = 'Falha de conexão com a rede';
      break;
    case 'auth/popup-closed-by-user':
      msg =
        'A janela de login foi finalizada pelo usuário antes de concluir a operação.';
      break;
    case 'auth/account-exists-with-different-credential':
      msg =
        'Já existe uma conta com o mesmo endereço de e-mail mas de outro provedor associado.';
      break;
    case 'auth/invalid-api-key':
      msg = 'A chave da API está incorreta.';
      break;
    case 'auth/too-many-requests':
      msg =
        'Bloqueamos todas as solicitações deste dispositivo devido a atividades incomuns. Tente novamente mais tarde.';
      break;
    case 'auth/requires-recent-login':
      msg =
        'Esta operação é confidencial e requer autenticação recente. Faça login novamente antes de tentar outra vez.';
      break;
    case 'messaging/permission-blocked':
      msg =
        'As notificações estão bloqueadas! Isso pode comprometer a comunicação do sistema.';
      break;
    default:
      msg = 'Ooops! Ocorreu algum problema. Veja o log para mais informações.';
      break;
  }
  console.log(`Método "${methodName}" : `, msg, err);
  return msg;
}
