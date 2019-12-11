import {IndirizziModel} from "@app/shared/models/db_tables/.indirizzi.model";
import {ReferentsModel} from "@app/shared/models/db_tables/.referents.model";
import {ContiBancariModel} from "@app/shared/models/db_tables/.conti-bancari.model";

export interface FornitoriCreazioneModel {
  companiesId: number;
  id: number;
  r_sociale: string;
  piva: string;
  indirizzo_consegna: string;
  tel: string;
  email: string;
  email2: string;
  website: string;
  payment_term: number;
  delvery_term: number;
  notification_level: number;
  email_type: string;
  address: Array<IndirizziModel>;
  bank_account: Array<ContiBancariModel>;
  referents: Array<ReferentsModel>;

}
