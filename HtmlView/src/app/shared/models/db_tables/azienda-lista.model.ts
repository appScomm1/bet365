import {IndirizziModel} from '@app/shared/models/db_tables/.indirizzi.model';

export interface AziendaListaModel {
  id: number;
  r_sociale: string;
  vat: string;
  response_term: number;
  currency: string;
  tel: number;
  email: string;
  fax: number;
  website: string;
  Addresses: Array<IndirizziModel>;
  attachments_exts: [];
}
