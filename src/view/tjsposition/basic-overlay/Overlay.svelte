<script>
   import { getContext }            from 'svelte';

   import { EmptyApplicationShell } from '#runtime/svelte/component/application';
   import Panel from './Panel.svelte'
   import Skills from './Skills.svelte'
   import Attacks from './Attacks.svelte'
   import Items from './Items.svelte'
   import Portrait from './Portrait.svelte'

   export let elementRoot = void 0;
   let actor = null;
   let abilities = [];
   let stats = null
   let skills = null
   let attacks = null
   let equipables = null
   let consumables = null

   function getActor() {
      if (game.user.isGM) {
         if (canvas.tokens.controlled.length === 0) return actor || null
         return canvas.tokens.controlled[0].document.actor
      }

      try {
         return game.actors.get(game.user.character.id)
      } catch (error) {
         console.error(error)
         ui.notifications.warn('AAFO-HUD: Actor not found, have you assigned a player character to this user in the user configuration?')
         return null
      }
   }

   function setActor() {
      actor = getActor()
      if (actor) {
         abilities = Object.values(actor.system.abilities).map((a) => {
            return {
               key: a.abbr,
               label: a.label,
               value: a.value,
               mod: a.mod,
               iconClass: `fa-solid fa-circle-${a.label[0].toLowerCase()}`
            }
         })
         stats = {
            ap: actor.system.actionPoints,
            hp: actor.system.health,
            sp: actor.system.stamina,
            dt: actor.system.damageThreshold,
            ac: actor.system.armorClass,
            pt: actor.system.penaltyTotal,
         }
         skills = Object.values(actor.system.skills)
         attacks = actor.items.filter(item => item.system.itemEquipped).filter(item => ['meleeWeapon', 'rangedWeapon'].includes(item.type))
         equipables = actor.items.filter(item => ['meleeWeapon', 'rangedWeapon', 'armor', 'powerArmor'].includes(item.type))
         consumables = actor.items.filter(item => ['chem'].includes(item.type) && item.system.quantity > 0)
      }
   }

   Hooks.on('controlToken', setActor);
   Hooks.on('updateActor', setActor);
   Hooks.on('refreshToken', setActor);

   function onAbilityClick(ability) {
      actor.abilityRoll(ability.key)
   }
   
</script>

<svelte:options accessors={true}/>

<EmptyApplicationShell bind:elementRoot>
   <!--
    * width & height will be what you set in app options.
    *
    * You are in control of adding the draggable action to whatever element that you want to be the drag handle.
    * In this case it is added to the entire `drag-target` content div therefore to allow focusable elements like the
    * included input element you should limit draggable targets by `hasTargetClassList`.
    *
    * You may choose to have a specific drag handle element that is smaller than the content area and can apply the
    * draggable action to that without the need for `hasTargetClassList`.
   -->
   <div class="overlay" role="application">
      <Portrait actor={actor} stats={stats}/>
      <Panel>
         <div class="abilities">
            <!-- svelte-ignore a11y-missing-attribute -->
            <div class="app panel">
               { #each abilities as ability}
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <a
                     class="section"
                     data-tooltip="{ability.label}"
                     role="button"
                     tabindex="0"
                     on:click={() => onAbilityClick(ability)}
                  >
                     <span><i class="{ability.iconClass}"></i></span>
                     <span>{ability.value}</span>
                  </a>
               {/each}
            </div>
         </div>
      </Panel>
      {#if actor}
         <Panel>
            <div class="horizontal">
               <Skills actorId={actor.id} skills={skills} />
               <Attacks actorId={actor.id} attacks={attacks} />
               <Items actorId={actor.id} equipables={equipables} consumables={consumables} />
            </div>
         </Panel>
      {/if}
      <!-- <Panel>
         <div class="group infos">
            <div class="app panel">
               <div class="info section" data-section="level" data-tooltip="PF2E.CharacterLevelLabel">
                  <i class="fa-solid fa-user-graduate"></i>
               </div>
               <div class="info section" data-section="level" data-tooltip="PF2E.CharacterLevelLabel">
                  <i class="fa-solid fa-user-graduate"></i>
               </div>
               <div class="info section" data-section="level" data-tooltip="PF2E.CharacterLevelLabel">
                  <i class="fa-solid fa-user-graduate"></i>
               </div>
               <div class="info section" data-section="level" data-tooltip="PF2E.CharacterLevelLabel">
                  <i class="fa-solid fa-user-graduate"></i>
               </div>
            </div>
         </div>
      </Panel> -->
      <!-- <div class="main">
         <div class="group primary">
            <div class="app panel header">
               <div class="section" data-section="level" data-tooltip="PF2E.CharacterLevelLabel">
                  <span><i class="fa-solid fa-user-graduate"></i></span>
                  <span>1</span>
               </div>
               <div class="section" data-section="level" data-tooltip="PF2E.CharacterLevelLabel">
                  <span><i class="fa-solid fa-user-graduate"></i></span>
                  <span>1</span>
               </div>
            </div>
         </div>
         <div class="group stretch">
            <div class="top">
               <div class="panel app sidebars">
                  <a data-section="sidebar" data-sidebar="actions" data-tooltip="pf2e-hud.sidebars.actions.title" class="sidebar" data-action="open-sidebar">
                      <i class="fa-solid fa-sword"></i>
                  </a>
                  <a data-section="sidebar" data-sidebar="items" data-tooltip="pf2e-hud.sidebars.items.title" class="sidebar" data-action="open-sidebar">
                      <i class="fa-solid fa-backpack"></i>
                  </a>
                  <a data-section="sidebar" data-sidebar="spells" data-tooltip="pf2e-hud.sidebars.spells.title" class="sidebar" data-action="open-sidebar">
                      <i class="fa-solid fa-wand-magic-sparkles"></i>
                  </a>
                  <a data-section="sidebar" data-sidebar="skills" data-tooltip="pf2e-hud.sidebars.skills.title" class="sidebar" data-action="open-sidebar">
                      <i class="fa-solid fa-hand"></i>
                  </a>
                  <a data-section="sidebar" data-sidebar="extras" data-tooltip="pf2e-hud.sidebars.extras.title" class="sidebar" data-action="open-sidebar">
                      <i class="fa-solid fa-cubes"></i>
                  </a>
                  <hr>
                  <a class="effects-toggle" data-section="effects" data-action="toggle-effects" data-tooltip="pf2e-hud.persistent.main.effects.toggle">
                      <i class="fa-solid fa-person-rays"></i>
                  </a>
              </div>
            </div>
            <div class="bottom"></div>
         </div>
      </div> -->
   </div>
</EmptyApplicationShell>

<style lang="scss">
   .overlay {
      display: flex;
      align-items: flex-start;
      font-size: var(--font-size);
      gap: var(--aafo-hud-panel-gap);
      height: calc(var(--hotbar-height) + var(--hud-height));
      margin: var(--interface-margin);
      z-index: var(--z-index-app);
      width: var(--players-width);
      padding: 0;

      .abilities {
         width: var(--special-width);
         height: calc(var(--hotbar-height) + var(--hud-height));
         border-radius: 5px;

         .section {
            display: flex;
            gap: 5px;
         }
      }

      .horizontal {
         display: flex;
      }

      .main {
         --info-width: 2.24em;
         --primary-width: 7.6em;
         --one-three-rows: 1.1fr 3fr 0;
         --attack-background: #171f6999;
         --attack-border-color: #2e3a9c;
         --damage-background: #6d101078;
         --damage-border-color: #a41414;
         --variant-background: #4f4732;
         --variant-border-color: #9f916e;
         --shortcut-title-border-color: #999999;
         --shortcut-title-background: #121212;
         position: relative;
         display: flex;
         width: fit-content;
         width: fit-content;
         height: var(--hud-height);
         gap: var(--aafo-hud-panel-gap);

         .group {
            display: grid;
            grid-template-rows: var(--one-three-rows);
            gap: var(--aafo-hud-panel-gap);

            &.abilities {
               width: var(--info-width);
               height: calc(var(--hotbar-height) + var(--hud-height));
            }

            &.primary {
               width: var(--primary-width);
               grid-template-columns: 1fr 1fr;

               .header {
                  grid-template-columns: repeat(2, 1fr);
                  grid-column: 1 / span 2;
               }
            }

            &.infos {
               width: var(--info-width);
               margin: 0;

               .panel {
                  grid-row: 1 / span 2;
                  
                  .section {
                     display: grid;
                     grid-template-columns: auto;
                     align-items: center;
                     gap: var(--inline-gap);
                  }
               }

               .info {
                  cursor: help;
                  grid-template-columns: auto;
                  margin: 0 auto;
               }
            }
            
            .panel {
               padding: var(--panel-padding-block) calc(var(--panel-padding-inline) + .1em) var(--panel-padding-block) var(--panel-padding-inline);

               .section {
                  display: grid;
                  grid-template-columns: auto auto;
                  align-items: center;
                  gap: var(--inline-gap);
               }
            }

            &.stretch {
               flex: 1;

               .top {
                  display: flex;
                  gap: var(--aafo-hud-panel-gap);

                  .sidebars {
                     min-width: 11.708em;
                     grid-auto-flow: column;
                     justify-content: start;
                     width: -moz-fit-content;
                     width: fit-content;
                  }
               }
            }
         }
      }
   }

   .panel {
      pointer-events: all;
      line-height: 1.4;
      display: grid;
      gap: var(--section-gap);
   }
</style>
