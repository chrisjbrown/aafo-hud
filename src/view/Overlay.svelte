<script lang="ts">
   import { EmptyApplicationShell } from '#runtime/svelte/component/application';
   import Panel from './Panel.svelte'
   import Skills from './Skills.svelte'
   import Attacks from './Attacks.svelte'
   import Items from './Items.svelte'
   import Portrait from './Portrait.svelte'
   import Special from './Special.svelte'

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

   function onAbilityClick(event: any) {
      actor.abilityRoll(event.detail.key)
   }

   let timer: NodeJS.Timeout
    function onAttributeChange(event: any) {
         debounceUpdateActor(Number(event.detail.value), event.detail.key)
    }

    function getAttribute(attribute: string) {
        switch (attribute) {
            case 'hp':
                return 'system.health.value'
            case 'sp':
                return 'system.stamina.value'
            case 'ap':
                return 'system.actionPoints.value'
            default:
                return ''
        }
    }

    const debounceUpdateActor = (newValue: number, attribute: string) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            const attrKey = getAttribute(attribute)
            try {
                actor.update({ [attrKey]: newValue })
            } catch (error) {
                console.error('AAFO-HUD', `Error updating actor attribute: ${attribute}`, error)
            }
        }, 750);
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
      <Portrait name={actor?.name} img={actor?.img} stats={stats} on:updateAttribute={onAttributeChange} />
      <Special abilities={abilities} on:abilityCheck={onAbilityClick} />
      {#if actor}
         <div>
            <Panel>
               <div class="horizontal">
                  <Skills actorUuid={actor.uuid} skills={skills} />
                  <Attacks actorUuid={actor.uuid} attacks={attacks} />
                  <Items actorUuid={actor.uuid} equipables={equipables} consumables={consumables} />
               </div>
            </Panel>
            <Panel>
               <div class="penalties" data-section="level" data-tooltip="Caps">
                  <i class="fa-solid fa-user-graduate"></i>
               </div>
            </Panel>
         </div>
      {/if}
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

      .penalties {
         color: white;
         margin-top: 5px;
         display: flex;
      }

   }

   .panel {
      pointer-events: all;
      line-height: 1.4;
      display: grid;
      gap: var(--section-gap);
   }
</style>
