<script>
    import ItemsPopover from './ItemsPopover.svelte';
    import Popover from './Popover.svelte';

    export let actorId = null
    export let items = null
  </script>
  
<Popover component={ItemsPopover} props={{ actorId, items }}>
  <div class="items { items?.length === 0 ? 'fade' : '' }">
    <!-- svelte-ignore a11y-missing-attribute -->
    <a data-tooltip="items" role="button">
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
  
  