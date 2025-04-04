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
                    <span><i class="{ability.iconClass}"></i></span>
                    <span>{ability.value}</span>
                </a>
            {/each}
        </div>
    </Panel>
</div>

 <style lang="scss">
    .abilities {
       width: var(--special-width);
       border-radius: 5px;
       height: calc(var(--hotbar-height) + var(--hud-height));

       .ability {
          display: flex;
          gap: 5px;
          padding-top: 5px;
          justify-content: center;
       }
    }
 </style>
 