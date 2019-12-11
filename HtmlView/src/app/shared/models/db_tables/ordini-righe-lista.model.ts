import {OrderModel} from "@app/shared/models/db_tables/.order.model";

export interface OrdiniRigheListaModel {
  oldFields: any;
  id: number;
  ordersId: number;
  productsId: number;
  sku: string;
  tipo: string;
  delivery_date: string;
  descr: string;
  qty: number;
  price: number;
  order: Array<OrderModel>;
}
