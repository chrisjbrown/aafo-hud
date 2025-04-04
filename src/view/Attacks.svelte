<script lang="ts">
    import AttackPopover from './popovers/AttackPopover.svelte';
    import Popover from './popovers/Popover.svelte';

    export let actorUuid = ''
    export let attacks = []
  </script>
  
<Popover component={AttackPopover} props={{ actorUuid, attacks }}>
  <div class="attacks { attacks?.length === 0 ? 'fade' : '' }">
    <!-- svelte-ignore a11y-missing-attribute -->
    <a data-tooltip="Attacks" role="button">
      <i class="fa-solid fa-sword"></i>
    </a>
  </div>
</Popover>
  
  <style lang="scss">
    .attacks {
      pointer-events: all;
      color: white;
      padding: 5px;
      min-width: 24px;
      &.fade {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }
  </style>
  
  