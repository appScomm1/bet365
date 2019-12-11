import { Injectable } from '@angular/core';

declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class Template {

  // Utilizzata per inizializzare gli elementi Javascript del template;
  // tali elementi non possono venire inizializzati al bootstrap dell'applicazione
  // perchè il dom non è ancora stato inizializzato. Tale procedura dovrà venire
  // effettuata nell'ngOnInit dei singoli componenti.
  // Questa classe è inoltre pensata per raggruppare solamente metodi statici.

  static initDDL() {
    // Inizializzo tutti i dropdown
    $('.notification-button, .profile-button, .translation-button, .dropdown-settings, .dropdown-menu, .drop').dropdown({
       inDuration: 300,
       outDuration: 225,
       constrainWidth: false,
       hover: false,
       gutter: 0,
       coverTrigger: false,
       alignment: 'right'
       // stopPropagation: false
    });
  }

  static initCollapsableMenu(){
     
   //Function menu collapsed
   function menuCollapsed(isCollapsed) {
      if (isCollapsed) {
         $('.sidenav-main').removeClass('nav-lock');
         $('.navbar-main.nav-collapsible')
            .removeClass('sideNav-lock')
            .addClass('nav-expanded');
         $('.navbar-toggler i').html('radio_button_unchecked');
         $('#main').addClass('main-full');
         $('.sidenav-main.nav-collapsible, .navbar .brand-sidebar').trigger('mouseleave');
      } else {
         $('.sidenav-main')
            .addClass('nav-lock')
            .removeClass('nav-collapsed');
         $('.navbar-main.nav-collapsible')
            .addClass('sideNav-lock')
            .removeClass('nav-collapsed');
         $('.navbar-toggler i').html('radio_button_checked');
         $('#main').removeClass('main-full');
         $('.sidenav-main.nav-collapsible, .navbar .brand-sidebar').trigger('mouseenter');
      }
   }

   //Function menu collapsed
   function menuSelection(menu_selection) {
      $('.sidenav-main')
         .removeClass('sidenav-active-square sidenav-active-rounded')
         .addClass(menu_selection);
   }

   $('.nav-collapsible .navbar-toggler').click(function() {
      // Toggle navigation expan and collapse on radio click
      if ($('.sidenav-main').hasClass('nav-expanded') && !$('.sidenav-main').hasClass('nav-lock')) {
         $('.sidenav-main').toggleClass('nav-expanded');
         $('#main').toggleClass('main-full');
      } else {
         $('#main').toggleClass('main-full');
      }
      // Set navigation lock / unlock with radio icon
      if (
         $(this)
            .children()
            .text() === 'radio_button_unchecked'
      ) {
         $(this)
            .children()
            .text('radio_button_checked');
         $('.sidenav-main').addClass('nav-lock');
         $('.navbar .nav-collapsible').addClass('sideNav-lock');
      } else {
         $(this)
            .children()
            .text('radio_button_unchecked');
         $('.sidenav-main').removeClass('nav-lock');
         $('.navbar .nav-collapsible').removeClass('sideNav-lock');
      }
   });

   // Set menu selection type on select
   $('.menu-collapsed-checkbox').click(() => {
      if ($('.menu-collapsed-checkbox').prop('checked')) {
         menuCollapsed(true);
      } else {
         menuCollapsed(false);
      }
   });
  }
}
