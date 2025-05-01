<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Panel from './Panel.svelte';
  export let abilities = null
  const dispatch = createEventDispatcher();

</script>
<div>
    <Panel>
        <!-- svelte-ignore a11y-missing-attribute -->
        <div class="abilities">
            { #each abilities as ability}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <a
                    class="ability"
                    data-tooltip="{ability.label}"
                    role="button"
                    tabindex="0"
                    on:click={() => dispatch('abilityCheck', ability)}
                >
                    <span class="special"><i class="{ability.iconClass}"></i></span>
                    <span class="value">{ability.value}</span>
                </a>
            {/each}
        </div>
    </Panel>
</div>

 <style lang="scss">
    .abilities {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 5px;
        width: var(--special-width);
        border-radius: 5px;
        height: calc(var(--hotbar-height) + var(--hud-height));

       .ability {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          justify-content: center;
          align-items: center;

          .special {
            min-width: 15px;
            text-align: center;
          }
          .value {
            min-width: 15px;
            text-align: center;
          }
       }
    }
 </style>
 