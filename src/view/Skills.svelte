<script lang="ts">
  import SkillPopover from './popovers/SkillPopover.svelte';
  import Popover from './popovers/Popover.svelte';

  export let actorUuid = ''
  export let skills = []
</script>
  
<Popover component={SkillPopover} props={{ actorUuid, skills }}>
  <div class="skills { skills?.length === 0 ? 'fade' : '' }">
    <!-- svelte-ignore a11y-missing-attribute -->
    <a data-tooltip="Skills" role="button">
        <i class="fa-solid fa-hand"></i>
    </a>
  </div>
</Popover>
  
  <style lang="scss">
    .skills {
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
  
  