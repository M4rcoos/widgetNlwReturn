//CONTRATO

export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

//criando a interface do feedback
export interface FeedbacksRepository {
  //quais ações a minha aplicação pode fazer com os feedbacks no banco de dados
  //por parametro nos passamos quais dados vamos receber para criar um feedback!
  //toda função asyncrona ela vira uma promise
  create: (data: FeedbackCreateData) => Promise<void>;
}
