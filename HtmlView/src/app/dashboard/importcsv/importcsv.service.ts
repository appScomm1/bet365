/*
 * File name: importcsv.service.ts
 * Author: Daniel Zarioiu
 * Copyright (c) 2018 Namirial SPA. All Rights reserved.
 * Date: 2019-04-29
 */
import { Injectable } from '@angular/core';
import { BaseService } from '@app/base.service';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import {HttpClient} from '@angular/common/http';

declare const moment: any;

@Injectable({
  providedIn: 'root'
})
export class ImportcsvService extends BaseService {


  getListaSelect() {

  }

  GetImport() {
    return this.mockService(
      {
      data: {
        colonne_src: [
          {
            label: 'partita iva'
          },
          {
            label: 'ragione sociale'
          },
        ],
        righe_src: [
            ['1234567890', 'digimark'],
            ['1234567890', 'jonny corp']

        ],
        colonne_db: [
          {
            label: 'Partita IVA',
            value: 'piva'
          },
          {
            label: 'ragione sociale',
            value: 'ragione_sociale'
          },

        ]
      }
    });
  }
}
