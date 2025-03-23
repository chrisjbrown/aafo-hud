<script>
    export let img;
    export let name;
    export let stats;
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
                <i class="fa-solid fa-shield"></i>
                {stats.ac.value}
            </div>

            <!-- health -->
            <div class="stat" data-tooltip="Health points">
                <div data-tooltip="health points">
                    <i class="fa-solid fa-heart"></i>
                    {stats.hp.value}/{stats.hp.max}
                </div>
            </div>

            <div class="stat" data-tooltip="Damage threshold">
                <i class="fa-solid fa-shield-halved"></i>
                {stats.dt.value}
            </div>

            <!-- action -->
            <div class="stat" data-tooltip="Action points">
                <i class="fa-solid fa-bolt"></i>
                <div>
                    {stats.ap.value}/{stats.ap.max}   
                </div>
            </div>

            <div class="stat" data-tooltip="Penalty total">
                <i class="fa-solid fa-triangle-exclamation"></i>
                {stats.pt}
            </div>

            <!-- stamina -->
            <div class="stat" data-tooltip="Stamina points">
                <i class="fa-solid fa-droplet"></i>
                <div>
                    {stats.sp.value}/{stats.sp.max}   
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
            }
        }
    }
</style>
