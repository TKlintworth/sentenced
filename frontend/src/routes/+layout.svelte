<script>
    import "../app.css";
    import Header from "../components/Header.svelte";
    import Footer from "../components/Footer.svelte";
    import Button from "../components/Button.svelte";
    import Landing from "../components/Landing.svelte";
    
</script>

<!-- <slot /> -->

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap" rel="stylesheet">

<div class="grid_container">
    <Header></Header>
    <slot></slot>
    <Footer></Footer>
</div>

<style>
    .grid_container {
        display: grid;
        grid-template-rows: auto 1fr auto;
        grid-template-columns: 100%;
        min-height: 100vh;
    }

    * {
        font-family: "Fredoka";
    }
</style>