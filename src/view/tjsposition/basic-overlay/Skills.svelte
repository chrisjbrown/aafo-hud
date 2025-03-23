<script>
  import SkillPopover from './SkillPopover.svelte';
  import Popover from './Popover.svelte';

  export let actorId = null
  export let skills = null
</script>
  
<Popover component={SkillPopover} props={{ actorId, skills }}>
  <div class="skills">
    <!-- svelte-ignore a11y-missing-attribute -->
    <a data-tooltip="skills" role="button">
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
    }
  </style>
  
  