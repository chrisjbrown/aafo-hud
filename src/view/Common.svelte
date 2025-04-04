<script lang="ts">
    import CommonPopover from './popovers/CommonPopover.svelte';
    import Popover from './popovers/Popover.svelte';
    
    export let actorUuid: string
</script>
    
  <Popover component={CommonPopover} props={{ actorUuid }}>
    <div class="common">
      <!-- svelte-ignore a11y-missing-attribute -->
      <a data-tooltip="Common" role="button">
          <i class="fa-solid fa-boot"></i>
      </a>
    </div>
  </Popover>
    
    <style lang="scss">
      .common {
          pointer-events: all;
          color: white;
          padding: 5px;
          min-width: 24px;
      }
    </style>
    
    