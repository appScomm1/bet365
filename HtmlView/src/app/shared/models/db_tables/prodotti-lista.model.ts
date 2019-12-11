import {ProdottiCreazioneModel} from "@app/shared/models/db_tables/prodotti-creazione.model";
import {SuppliersPriceListModel} from "@app/shared/models/db_tables/.suppliers-price-list.model";

export interface ProdottiListaModel extends ProdottiCreazioneModel {
  image: string;
  suppliers_price_list: Array<SuppliersPriceListModel>;
}
