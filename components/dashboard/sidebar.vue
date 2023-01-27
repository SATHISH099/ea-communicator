<template>
    <div>
        <button @click="SidebarState.sidebarOpen = !SidebarState.sidebarOpen">Toggle Sidebar</button>
        <div :class="{ 'sidebar': true, 'open': SidebarState.sidebarOpen }">
            <nav>
                <ul>
                    <li v-for="item in items" :key="item.link">
                        <NuxtLink :to="item.link">{{ item.text }}</NuxtLink>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script lang="ts" setup>

const items = [
    { text: 'Home', link: '/' },
    { text: 'About', link: '/' },
    { text: 'Contact', link: '/' },
];

const SidebarState = reactive({
    sidebarOpen: false
})

</script>

<style lang="scss">
.sidebar {
    position: absolute;
    width: 90px;
    height: 100vh;
    background: red;
    z-index: 1;
    transition: 0.3s;

    &.open {
        width: 317px;
    }
}
</style>