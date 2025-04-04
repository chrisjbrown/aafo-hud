<script lang="ts">
    import ItemsPopover from './popovers/ItemsPopover.svelte';
    import Popover from './popovers/Popover.svelte';

    export let actorUuid = ''
    export let equipables = []
    export let consumables = []
  </script>
  
<Popover component={ItemsPopover} props={{ actorUuid, equipables, consumables }}>
  <div class="items { [...equipables, ...consumables]?.length === 0  ? 'fade' : '' }">
    <!-- svelte-ignore a11y-missing-attribute -->
    <a data-tooltip="Items" role="button">
      <i class="fa-solid fa-backpack"></i>
    </a>
  </div>
</Popover>
  
  <style lang="scss">
    .items {
      pointer-events: all;
      cursor: pointer;
      color: white;
      padding: 5px;
      min-width: 24px;
      &.fade {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }
  </style>
  
  