/*
* Developer: Daniel Zarioiu
* Date: 21/08/2018
* Property of DIGIMARK SRL
* */
// model per ddl


import {BaseEntity} from "@app/shared/models/base-entity";

export interface GenericDdl extends BaseEntity {
  nome: string;
  note: string;
}
