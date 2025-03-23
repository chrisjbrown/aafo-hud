<script>
    import AttackPopover from './AttackPopover.svelte';
    import Popover from './Popover.svelte';

    export let actorId = null
    export let attacks = null
  </script>
  
<Popover component={AttackPopover} props={{ actorId, attacks }}>
  <div class="attacks">
    <!-- svelte-ignore a11y-missing-attribute -->
    <a data-tooltip="attacks" role="button">
        <i class="fa-solid fa-hand-fist"></i>
    </a>
  </div>
</Popover>
  
  <style lang="scss">
    .attacks {
        pointer-events: all;
        color: white;
        padding: 5px;
        min-width: 24px;
    }
  </style>
  
  