<script lang="ts" setup>
const { current } = useThemeStoreRefs()
const { themeNames, switchTheme } = useThemeStore()
</script>

<template>
    <client-only>
        <div v-if="themeNames.length" class="theme-toggler">
            <v-btn-toggle :model-value="current" density="compact" divided>
                <v-btn v-for="t in themeNames" size="small" :active="t === current" @click="switchTheme(t)">
                    {{ t }}
                </v-btn>
            </v-btn-toggle>
        </div>
    </client-only>
</template>

<style lang="scss" scoped>
.theme-toggler {
    z-index: 3000;
    position: fixed;
    top: 1rem;
    right: 1rem;
}
</style>
