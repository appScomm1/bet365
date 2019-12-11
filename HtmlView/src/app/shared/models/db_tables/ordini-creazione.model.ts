import {OrdiniListaModel} from "@app/shared/models/db_tables/ordini-lista.model";
import {RowsModel} from "@app/shared/models/db_tables/.rows.model";

export interface OrdiniCreazioneModel extends OrdiniListaModel {
row: Array<RowsModel>;
}
