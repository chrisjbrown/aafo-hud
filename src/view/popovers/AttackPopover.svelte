<script lang="ts">
  export let actorUuid = null
  export let attacks = null
  export let id = null

  function dispatchAttackRoll(weaponId) {
    Hooks.call("aafohud.attackRoll", actorUuid, weaponId);
  }
</script>

<div id={id} class="popover">
  {#each attacks as attack}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-missing-attribute -->
  <div class="item">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <a on:click={() => dispatchAttackRoll(attack.id)}>{attack.name}</a>
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
  