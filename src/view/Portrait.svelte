<script lang='ts'>
    export let stats;
    export let actor;

    let timer: NodeJS.Timeout
    function onChange(event: any, attribute: string) {
        if (event.target.value) {
            debounceUpdateActor(Number(event.target.value), attribute)
        }
    }

    function getAttribute(attribute: string) {
        switch (attribute) {
            case 'hp':
                return 'system.health.value'
            case 'sp':
                return 'system.stamina.value'
            case 'ap':
                return 'system.actionPoints.value'
            default:
                return ''
        }
    }

    const debounceUpdateActor = (newValue: number, attribute: string) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            const attrKey = getAttribute(attribute)
            try {
                actor.update({ [attrKey]: newValue })
            } catch (error) {
                console.error('AAFO-HUD', `Error updating actor attribute: ${attribute}`, error)
            }
        }, 750);
    }
</script>

<div class="portrait">
    <div class="top">
       {#if actor?.name}
          {actor.name}
       {/if}
    </div>
    {#if actor?.img}
       <div class="avatar" style="background-image: url({actor.img});"/>
    {/if}
    {#if stats?.sp}
        <div class="bottom">
            <div class="stat"  data-tooltip="Armor class">
                <i class="fa-solid fa-shield"></i>
                {stats.ac.value}
            </div>

            <!-- health -->
            <div class="stat" data-tooltip="Health points">
                <div class="field" data-tooltip="health points">
                    <i class="fa-solid fa-heart"></i>
                    <input type="number" value={stats.hp.value} on:input={(e) => onChange(e, 'hp')} />
                    <div>/</div>
                    <div>{stats.hp.max}</div>
                </div>
            </div>

            <div class="stat" data-tooltip="Damage threshold">
                <i class="fa-solid fa-shield-halved"></i>
                {stats.dt.value}
            </div>

            <!-- stamina -->
            <div class="stat" data-tooltip="Stamina points" on:input={(e) => onChange(e, 'sp')}>
                <i class="fa-solid fa-droplet"></i>
                <div class="field">
                    <input type="number" value={stats.sp.value} />
                    <div>/</div>
                    <div>{stats.sp.max}</div>
                </div>
            </div>

            <div class="stat" data-tooltip="Penalty total">
                <i class="fa-solid fa-triangle-exclamation"></i>
                {stats.pt}
            </div>

            <!-- action -->
            <div class="stat" data-tooltip="Action points">
                <i class="fa-solid fa-bolt"></i>
                <div class="field">
                    <input type="number" value={stats.ap.value} on:input={(e) => onChange(e, 'ap')} />
                    <div>/</div>
                    <div>{stats.ap.max}</div>
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
            margin: 2px;
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

            .stat {
                display: flex;
                gap: 5px;
                margin: 0 auto;

                .field {
                    display:flex;
                    align-items: center;
                    gap: 5px;
                    input {
                        background: rgba(33, 33, 33, .7019607843);
                        color: white;
                        width: var(--input-width);
                        text-align: center;
                        border: none;
                        &:focus {
                            box-shadow: 0 0 5px var(--color-shadow-primary);
                        }
                    }
                }
            }
        }
    }
</style>
