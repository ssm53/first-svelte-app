<script>
    import { loading } from "../store/store";

</script>



{#if $loading}
<div class=" fixed bg-yellow-700 rounded-3xl h-6 w-6">

</div>

{/if}

<style>
    div {
        inset: calc(50% - calc(24px/2));
        animation: moveLoader 1s infinite alternate;
    }

    @keyframes moveLoader {
        from {
            transform: translate3d(100px, 0, 0);
        }
        to {
            transform: translate3d(-100px, 0, 0);
        }
    }
</style>
