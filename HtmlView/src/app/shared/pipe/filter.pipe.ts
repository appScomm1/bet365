/*
 * File name: filter.pipe.ts
 * Author: Daniel Zarioiu
 * Copyright (c) 2018 Namirial SPA. All Rights reserved.
 * Date: 2019-07-08
 */
import { Pipe, PipeTransform, Injectable } from '@angular/core';
@Pipe({
  name: 'filterObject',
  pure: false
})
@Injectable()
export class MySearchPipe implements PipeTransform {
  /*
     * @param items object from array
     * @param term term's search
     * @param objectFieldName (optional)
     */
  transform(items: any, term: string, objectFieldName: string): any {
    if ( !term || !items ) {return items; }
    return MySearchPipe.filter(items, term, objectFieldName);
  }
  /*
     * @param items List of items to filter
     * @param term  a string term to compare with every property of the list
     * @param objectFieldName
     */
  static filter(items: Array<{ [ key: string ]: any }>, term: string, objectFieldName: string): Array<{ [ key: string ]: any }> {
    const toCompare = term.toLowerCase();
    if ( objectFieldName === null || objectFieldName === undefined ) { // Object Field not defined so loop over object
      return items.filter( (item: any) => {
        for ( const property in item ) {
          if ( item[ property ] === null || item[ property ] === undefined ) {
            continue;
          }
          if ( item[ property ].toString().toLowerCase().includes(toCompare) ) {
            return true;
          }
        }
        return false;
      });
    }
    return items.filter( function(item:any) {
      console.log(objectFieldName);
      if (objectFieldName === 'supplier' ) {
        return (item[objectFieldName]['r_sociale'].toString().toLowerCase().includes(toCompare));
      } else {
        return (item[objectFieldName].toString().toLowerCase().includes(toCompare));
      }
    });
  }
}
