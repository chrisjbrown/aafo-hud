<script>
    import Panel from './Panel.svelte'
    import SkillPopover from './SkillPopover.svelte';
    import { popover } from './PopperAction.ts';

    export let actor = null
  </script>
  
 <Panel>
     <!-- svelte-ignore a11y-click-events-have-key-events -->
     <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="skills"  use:popover={{ component: SkillPopover, actor }}>
        <!-- svelte-ignore a11y-missing-attribute -->
        <a data-tooltip="skills" role="button">
            <i class="skills fa-solid fa-hand"></i>
         </a>
    </div>
 </Panel>
  
  <style lang="scss">
    .skills {
        pointer-events: all;
        color: white;
        padding: 5px;
    }
  </style>
  
  