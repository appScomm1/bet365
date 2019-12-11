import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ImportcsvService} from '@app/dashboard/importcsv/importcsv.service';
import {map} from "rxjs/operators";
import {UtilityService} from "@app/shared/utility.service";
import { NgxDropzoneModule } from 'ngx-dropzone';

declare const  M: any;
declare const $: any;

@Component({
  selector: 'app-import',
  templateUrl: './importcsv.component.html',
  styleUrls: ['./importcsv.component.scss']
})
export class ImportcsvComponent implements OnInit, AfterViewInit {

  isLoaded = false;
  @ViewChild('dropzone') drop: ElementRef;
  @ViewChild('select') selecthtml: ElementRef;
  selectArray = [];
  select = {};
  table = null;
  esporta = [];

  filename = [];
  file = [];
  idAllegato;
  commentoRev;
  checkRevisione = false;

  constructor(private importService: ImportcsvService,
              private utilityService: UtilityService,
              private ngxDropZOne: NgxDropzoneModule) { }

  ngOnInit() {
  this.utilityService.Navigation.push({title: 'Import CSV', path: '/import'});

  }

  ngAfterViewInit(): void {
  }

  loadfile() {
    console.log(this.drop.nativeElement.files.length);
    if (this.drop.nativeElement.files.length > 0) {
      this.isLoaded = true;
    }
    this.importService.GetImport().subscribe((res: any) => {
      this.table = res.data;

      this.table.colonne_src.forEach((r: any) => {

        this.esporta.push({
          db: '',
          src: r.label,
        });
      });
      console.log(this.esporta);
      }
    );
  }

  importa() {

    console.log(this.esporta);

  }

  ShowModalUpload(name?) {
    if (name) {
      this.idAllegato = name;
    }
    $('#ModalUpAllegati').modal('open');
  }

  onFilesAdded(files, type) {
    console.log(files.addedFiles);
    if (type === 'add') {
      files.addedFiles.forEach(file => {
        this.file.push({name: file.name, last_update: file.lastModified, descr: null, revisioni: {}});
        this.filename.push(file.name);
      });
    } else {
      files.addedFiles.forEach(file => {
        this.file.forEach( f => {
          if (this.idAllegato === f.name) {
            f.revisioni = {name: file.name, commento: this.commentoRev, last_update: file.lastModified};
          }
        });
      });
    }

    console.log(this.file);
  }

  ShowAllegati(type, idrow?) {
    if (type === 'allegati') {
      // api per allegati
    } else {
      // api per revisioni
    }
    $('#AllegatiModal').modal('open');
  }

  discardFile(i) {
    this.file.splice(i, 1);

    console.log(this.file);
  }

  Showdescription() {
    setTimeout(() => { M.textareaAutoResize($('#textareaDescription')); }, 10);
  }

  SaveFile() {
    // chiamata api per Salvare
     this.filename = [];
     console.log(this.checkRevisione);
   }

  onRemove(event) {
    console.log('elemento rimossso');
    this.file.splice(this.file.indexOf(event), 1);
  }
}
