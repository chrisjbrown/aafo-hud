<script>
  export let actor = null
  let skills = Object.keys(actor.system.skills).map((skill) => skill.charAt(0).toUpperCase() + String(skill).slice(1).replace('_', ' '))

  function dispatchSkillRoll(skill) {
    Hooks.callAll("aafo.skillRoll", actor, skill);
  }
</script>

<div id="modal">
  {#each skills as skill}
    <button on:click={() => dispatchSkillRoll(skill)}>{skill}</button>
  {/each}
</div>
  
<style>
  #modal {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20vw;
    flex-direction: column;
    border-radius: 1em;
    color: white;
    pointer-events: all;
    background: url(../ui/denim075.png) repeat;
    border-radius: 5px;
  }
</style>
  