import {ServerTrackingData} from '@app/shared/models/server-tracking-data';
import {IndirizziModel} from "@app/shared/models/db_tables/.indirizzi.model";
import {ContiBancariModel} from "@app/shared/models/db_tables/.conti-bancari.model";
import {ReferentsModel} from "@app/shared/models/db_tables/.referents.model";

export interface FornitoriListaModel extends ServerTrackingData {
  id: number;
  r_sociale: string;
  piva: string;
  indirizzo_consegna: string;
  tel: string;
  email: string;
  website: string;
  payment_term: number;
  delivery_term: number;
  companiesId: number;
  notification_level: string;
  email_type: string;
  email2: string;
  addresses: Array<IndirizziModel>;
  bank_accounts: Array<ContiBancariModel>;
  referents: Array<ReferentsModel>;
  price_list: any;
}
