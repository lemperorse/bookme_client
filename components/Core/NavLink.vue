<template>
    <v-list-item>
        <v-list-item-icon>
            <v-icon :size="iconSize">{{icon}}</v-icon>
        </v-list-item-icon> 
        <v-list-item-content>
            <v-list-item-title >{{name}}</v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
export default {
    props:{
        name: {
            type: String,
            default: 'default'
        },
        icon: {
            type: String,
            default: 'mdi-account'
        },
        iconSize: {
            type: String,
            default: '24'
        },
    }
}
</script>

<style>

</style>