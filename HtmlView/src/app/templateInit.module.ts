import {NgModule} from '@angular/core';

declare const $: any;

@NgModule({

})
export class TemplateInitModule {

  static templateInit() {

    // Javascript per il sidenav
    // Expand navigation on mouseenter event
    $(".sidenav-main.nav-collapsible, .navbar .brand-sidebar").mouseenter(function() {
      if (!$(".sidenav-main.nav-collapsible").hasClass("nav-lock")) {
        $(".sidenav-main.nav-collapsible, .navbar .nav-collapsible")
          .addClass("nav-expanded")
          .removeClass("nav-collapsed");
        $("#slide-out > li.close > a")
          .parent()
          .addClass("open")
          .removeClass("close");

        setTimeout(function() {
          // Open only if collapsible have the children
          if ($(".collapsible .open").children().length > 1) {
            $(".collapsible").collapsible("open", $(".collapsible .open").index());
          }
        }, 100);
      }
    });

    // Collapse navigation on mouseleave event
    $(".sidenav-main.nav-collapsible, .navbar .brand-sidebar").mouseleave(function() {
      if (!$(".sidenav-main.nav-collapsible").hasClass("nav-lock")) {
        var openLength = $(".collapsible .open").children().length;
        $(".sidenav-main.nav-collapsible, .navbar .nav-collapsible")
          .addClass("nav-collapsed")
          .removeClass("nav-expanded");
        $("#slide-out > li.open > a")
          .parent()
          .addClass("close")
          .removeClass("open");
        setTimeout(function() {
          // Open only if collapsible have the children
          if (openLength > 1) {
            $(".collapsible").collapsible("close", $(".collapsible .close").index());
          }
        }, 100);
      }
    });

    // Javascript per dropdown
    // Commom, Translation & Horizontal Dropdown
    $(".dropdown-trigger, .generic-ddl, .dropdown-content").dropdown();

    // Commom, Translation
    $(".dropdown-button, .generic-ddl, .dropdown-content").dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false,
      hover: true,
      gutter: 0,
      coverTrigger: true,
      alignment: "left"
      // stopPropagation: false
    });

    // Notification, Profile, Translation, Settings Dropdown & Horizontal Dropdown
    $(".notification-button, .profile-button, .translation-button, .dropdown-settings, .dropdown-menu, .generic-ddl, .dropdown-content").dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false,
      hover: false,
      gutter: 0,
      coverTrigger: false,
      alignment: "right"
      // stopPropagation: false
    });
  }
}
