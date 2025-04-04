<script lang='ts'>
  import { createEventDispatcher } from 'svelte';
  export let stats;
  export let name;
  export let img;

  const dispatch = createEventDispatcher();

  function onAttributeChange(e: Event, key: string) {
    dispatch('updateAttribute', {
        value: e.target.value,
        key
    })
  }
</script>

<div class="portrait">
    <div class="top">
       {#if name}
          {name}
       {/if}
    </div>
    {#if img}
       <div class="avatar" style="background-image: url({img});"/>
    {/if}
    {#if stats?.sp}
        <div class="bottom">
            <div class="stat"  data-tooltip="Armor class">
                <div class="icon">
                    <i class="fa-solid fa-shield"></i>
                </div>
                {stats.ac.value}
            </div>

            <!-- health -->
            <div class="stat" data-tooltip="Health points">
                <div class="icon">
                    <i class="fa-solid fa-heart"></i>
                </div>
                <div class="field">
                    <input type="number" value={stats.hp.value} on:input={(e) => onAttributeChange(e, 'hp')} />
                    <div class="max">
                        <div>/</div>
                        <div>{stats.hp.max}</div>
                    </div>
                </div>
            </div>

            <div class="stat" data-tooltip="Damage threshold">
                <div class="icon">
                    <i class="fa-solid fa-shield-halved"></i>
                </div>
                {stats.dt.value}
            </div>

            <!-- stamina -->
            <div class="stat" data-tooltip="Stamina points" on:input={(e) => onAttributeChange(e, 'sp')}>
                <div class="icon">
                    <i class="fa-solid fa-droplet"></i>
                </div>
                <div class="field">
                    <input type="number" value={stats.sp.value} />
                    <div class="max">
                        <div>/</div>
                        <div>{stats.sp.max}</div>
                    </div>
                </div>
            </div>

            <div class="stat" data-tooltip="Penalty total">
                <div class="icon">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                {stats.pt}
            </div>

            <!-- action -->
            <div class="stat" data-tooltip="Action points">
                <div class="icon">
                    <i class="fa-solid fa-bolt"></i>
                </div>
                <div class="field">
                    <input type="number" value={stats.ap.value} on:input={(e) => onAttributeChange(e, 'ap')} />
                    <div class="max">
                        <div>/</div>
                        <div>{stats.ap.max}</div>
                    </div>
                </div>
            </div>
        </div>
    {/if}
 </div>

<style lang="scss">
    .portrait {
        background: var(--outer-background);
        border-radius: 5px;
        position: relative;
        height: 100%;
        padding: 0;
        aspect-ratio: 1 / 1;
        pointer-events: all;

        .top {
            position: absolute;
            height: 17px;
            color: white;
            top: 0;
            inset-inline: 0;
            text-align: center;
            background: linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 20%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.6) 80%, rgba(0, 0, 0, 0.3) 100%);
        }

        .avatar {
            inset: 0;
            background-position: center top;
            background-repeat: no-repeat;
            background-size: cover;
            width: 100%;
            height: 100%;
        }

        .bottom {
            color: white;
            position: absolute;
            bottom: 0;
            inset-inline: 0;
            display: grid;
            gap: var(--section-gap);
            background: rgba(33, 33, 33, .7019607843);
            padding: .2em .1em .1em;
            grid-template-columns: repeat(2, 1fr);
            align-items: center;

            .stat {
                display: flex;
                gap: 5px;
                margin: 0 auto;

                .icon {
                    width: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .field {
                    display:flex;
                    align-items: center;
                    gap: 5px;
                    input {
                        height: 20px;
                        background: rgba(33, 33, 33, .7019607843);
                        color: white;
                        width: var(--input-width);
                        text-align: center;
                        border: none;
                        &:focus {
                            box-shadow: 0 0 5px var(--color-shadow-primary);
                        }
                    }

                    .max {
                        display: flex;
                        width: 30px;
                        gap: 5px;
                    }
                }
            }
        }
    }
</style>
