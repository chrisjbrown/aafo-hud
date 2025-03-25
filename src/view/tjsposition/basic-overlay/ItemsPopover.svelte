<script>
  export let actorId = null
  export let items = null
  export let id = null

  function dispatchAttackRoll(weaponId) {
    // Hooks.call("aafohud.attackRoll", actorId, weaponId);
  }
</script>

<div id={id} class="popover">
  {#each items as item}
    <button on:click={() => dispatchAttackRoll(item.id)}>{item.name}</button>
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

    button {
      width: auto;
    }
  }
</style>
  