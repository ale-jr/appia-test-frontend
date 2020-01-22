<template>
    <div class="grid-row">
    <slot />
    </div>
</template>
<style>

.grid-row{
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
}
</style>
