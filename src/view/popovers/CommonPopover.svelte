<script lang="ts">
    export let actorUuid: string
    export let id = null

    type Action = {
        label: string
        cost?: string
        callback: Function
    }

    const actions: Action[] = [
        {
            label: 'Recycle AP',
            callback: () => {
                const actor = fromUuidSync(actorUuid)
                actor.recycleAp()
            },
        },
        {
            label: 'Grapple',
            cost: '3',
            callback: () => {
                const actor = fromUuidSync(actorUuid)
                actor.applyApCost('3')
            }
        },
        {
            label: 'Escape',
            cost: '5',
            callback: () => {
                const actor = fromUuidSync(actorUuid)
                actor.applyApCost('5')
            }
        },
        {
            label: 'Help',
            cost: '6',
            callback: () => {
                const actor = fromUuidSync(actorUuid)
                actor.applyApCost('6')
            }
        },
        {
            label: 'Unarmed strike',
            cost: '3',
            callback: () => {
                const actor = fromUuidSync(actorUuid)
                actor.applyApCost('3')
            }
        },
        {
            label: 'Interact',
            cost: '3',
            callback: () => {
                const actor = fromUuidSync(actorUuid)
                actor.applyApCost('3')
            }
        },
        {
            label: 'Shove',
            cost: '4',
            callback: () => {
                const actor = fromUuidSync(actorUuid)
                actor.applyApCost('4')
            }
        },
        {
            label: 'Dodge',
            cost: '6',
            callback: () => {
                const actor = fromUuidSync(actorUuid)
                actor.applyApCost('6')
            }
        },
        {
            label: 'Stand up',
            cost: '5',
            callback: () => {
                const actor = fromUuidSync(actorUuid)
                actor.applyApCost('5')
            }
        },
        {
            label: 'Ready',
            cost: '2',
            callback: () => {
                const actor = fromUuidSync(actorUuid)
                actor.applyApCost('2')
            }
        },
        {
            label: 'Take cover',
            cost: '3',
            callback: () => {
                const actor = fromUuidSync(actorUuid)
                actor.applyApCost('3')
            }
        }
    ]
  
    function dispatchAction(action) {
        action.callback()
    }
  </script>
  
  <div id={id} class="popover">
    {#each actions as action}
      <div class="item">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-missing-attribute -->
        <a on:click={() => dispatchAction(action)}>
            {action.label} 
            {#if action.cost}{`(AP: ${action.cost})`}{/if}
        </a>
      </div>
    {/each}
  </div>
    
  <style lang="scss">
    .popover {
      display: flex;
      gap: 3px;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-radius: 1em;
      color: white;
      pointer-events: all;
      border-radius: 5px;
      z-index: var(--z-index-app);
      background: url("../../../ui/denim075.png") repeat #4d4d4d;
  
      .item {
        margin: 5px;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  </style>
    