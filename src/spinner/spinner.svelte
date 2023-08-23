<script>
    import { loading } from "../store/store";

</script>



{#if $loading}
<!-- <div class=" fixed bg-yellow-700 rounded-3xl h-6 w-6">

</div> -->
<div class="loader"></div>

{/if}

<style>

    .loader {
        position: fixed;
        top:0;
        left:0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: black;
        transition: opacity 0.75s, visibility 0.75s;
    }

    .loader::after {
        content: "";
        width: 75px;
        height: 75px;
        border: 15px solid lightgrey;
        border-top-color: darkviolet ;
        border-radius: 50%;
        animation: loading 0.75s ease infinite;
    }

    @keyframes loading {
        from{
            transform: rotate(0turn);
        } 
        to{
            transform: rotate(1turn);
        }
    }






    /* div {
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
    } */

</style>
