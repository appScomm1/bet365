export interface UtenteAutenticatoModel {
  _id: string;
  nome: string;
  cognome: string;
  namespace: string;
  role: string;
  username: string;
  password: string;
  email: string;
  group: string;
  contractId: string;
  userMongoId: string;
}
