
<template>
        <div id="app">
                <My mypros="alex2222"></My>
                <My2></My2>
        </div>
</template>

<script>

import My from    "./components/My";
import My2 from  "./components/My2";

export default {
        name: "App",
        components: {
                My,
                My2
        }
};
</script>

<style>
</style>