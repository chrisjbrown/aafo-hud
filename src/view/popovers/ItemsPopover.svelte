<script lang="ts">
  export let actorUuid = ''
  export let equipables = []
  export let consumables = []
  export let id = ''

  function toggleEquip(item) {
    switch (item.type) {
      case 'armor':
      case 'powerArmor':
        Hooks.call('aafohud.toggleEquipArmor', actorUuid, item.id)
        return
      case 'rangedWeapon':
      case 'meleeWeapon':
        Hooks.call('aafohud.toggleEquipWeapon', actorUuid, item.id)
        return
    }
  }

  function reloadWeapon(item) {
    Hooks.call('aafohud.reloadWeapon', actorUuid, item.id)
  }

  function useItem(item) {
    Hooks.call('aafohud.useConsumable', actorUuid, item.id)
  }
</script>

<div id={id} class="popover">
  {#each equipables as equipable}
    <div class="item">
      <div>
        {equipable.name}
        {#if equipable.system?.ammo?.assigned}
          ({`${equipable.system.ammo.capacity.value} / ${equipable.system.ammo.capacity.max}`})
        {/if}
      </div>
      <div>
        <span class="action { equipable.system.itemEquipped ? '' : 'fade' }" data-tooltip={equipable.system.itemEquipped ? 'Unequip' : 'Equip'}>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <i class="fa-solid fa-shirt" on:click={() => toggleEquip(equipable)}></i>
        </span>
        {#if equipable.type === 'rangedWeapon'}
          <span class="action" data-tooltip="Reload">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <i class="fa-solid fa-refresh" on:click={() => reloadWeapon(equipable)}></i>
          </span>
        {/if}
      </div>
      <hr/>
    </div>
  {/each}
  {#each consumables as consumable}
    <div class="item">
      <div>{consumable.name}</div>
      <div>
        <span class="action">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <i class="fa-solid fa-hand" on:click={() => useItem(consumable)}></i>
        </span>
      </div>
      <hr/>
    </div>
  {/each}
</div>
  
<style lang="scss">
  .popover {
    display: flex;
    gap: 3px;
    padding: 10px;
    flex-direction: column;
    border-radius: 1em;
    color: white;
    pointer-events: all;
    border-radius: 5px;
    z-index: var(--z-index-app);
    background: url("../../../ui/denim075.png") repeat #4d4d4d;

    .item {
      padding: 3px;

      .action {
        cursor: pointer;
      }
      .fade {
        opacity: 0.5;
      }
    }
  }
</style>
  