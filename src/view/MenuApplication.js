import {
   SvelteApp }                from '#runtime/svelte/application';

import { deepMerge }          from '#runtime/util/object';

import MenuAppShell           from './MenuAppShell.svelte';


import {
   PositionBasicOverlayApp }      from './tjsposition';

export class MenuApplication extends SvelteApp
{
   /**
    * Default Application options
    *
    * @returns {SvelteApp.Options} options - SvelteApp options.
    * @see https://typhonjs-fvtt-lib.github.io/api-docs/interfaces/_runtime_svelte_application.SvelteApp.Options.html
    */
   static get defaultOptions()
   {
      return deepMerge(super.defaultOptions, {
         id: 'aafo-hud',
         classes: ['aafo-hud'],
         headerButtonNoClose: true,
         resizable: false,
         popOut: false,
         width: 275,
         height: 'auto',
         positionOrtho: false,
         transformOrigin: null,
         title: 'EssentialESM.apps.menu.title',
         zIndex: 95,

         svelte: {
            class: MenuAppShell,
            target: document.body,
            intro: true,
            props: {
               sections: this.#createSections()
            }
         }
      });
   }

   /**
    * @returns {{}[]} Section / entry data for demo menu display.
    */
   static #createSections()
   {
      const sections = [
         {
            title: 'TJSPosition',
            entries: [
               { title: 'Empty App / Basic Overlay', class: PositionBasicOverlayApp },
            ]
         },
      ];

      return sections;
   }
}
