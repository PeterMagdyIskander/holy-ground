<template>
    <div class="store-container">

        <app-header :title="'Rise Of The Kingdom'" :subtitle="'Store'"></app-header>
        <span class="material-symbols-outlined" @click="navigateToCart">
            <span class="check" v-if="isCartNotEmpty()">{{this.getCart.length}}</span>
            shopping_bag
        </span>
        <div class="item-container">
            <item v-for="item in fashionShowItems" :key="item.name" :itemInfo="item" @editQuantity="editQuantity">
            </item>

        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'; import AppHeader from '@/components/Shared/AppHeader.vue';
import Item from '@/components/Store/Item.vue'
export default {
    name: "battlefield-view",
    computed: {
        ...mapGetters(['getUser', 'getCart']),
    },
    components: {
        AppHeader,
        Item
    },
    data() {
        return {
            fashionShowItems: [
                { id: 1, icon: "👗", name: "Dress", price: 120, quantity: 0 },
                { id: 2, icon: "👠", name: "High heels", price: 80, quantity: 0 },
                { id: 3, icon: "🕶️", name: "Sunglasses", price: 60, quantity: 0 },
                { id: 4, icon: "👜", name: "Handbag", price: 150, quantity: 0 },
                { id: 5, icon: "👒", name: "Hat", price: 40, quantity: 0 },
                { id: 6, icon: "👕", name: "T-shirt", price: 30, quantity: 0 },
                { id: 7, icon: "👖", name: "Jeans", price: 70, quantity: 0 },
                { id: 8, icon: "👚", name: "Blouse", price: 45, quantity: 0 },
                { id: 9, icon: "👞", name: "Dress shoes", price: 90, quantity: 0 },
                { id: 10, icon: "👢", name: "Boots", price: 100, quantity: 0 },
                { id: 11, icon: "🎩", name: "Top hat", price: 55, quantity: 0 },
                { id: 12, icon: "💍", name: "Ring", price: 200, quantity: 0 },
                { id: 13, icon: "👓", name: "Glasses", price: 50, quantity: 0 },
                { id: 14, icon: "⌚", name: "Watch", price: 180, quantity: 0 },
                { id: 15, icon: "🧥", name: "Jacket", price: 130, quantity: 0 },
                { id: 16, icon: "👔", name: "Tie", price: 25, quantity: 0 },
                { id: 17, icon: "🧣", name: "Scarf", price: 35, quantity: 0 },
                { id: 18, icon: "🧤", name: "Gloves", price: 25, quantity: 0 },
                { id: 19, icon: "🧦", name: "Socks", price: 10, quantity: 0 },
                { id: 20, icon: "👡", name: "Sandals", price: 60, quantity: 0 },
                { id: 21, icon: "👟", name: "Sneakers", price: 85, quantity: 0 },
                { id: 22, icon: "👛", name: "Clutch", price: 65, quantity: 0 },
                { id: 23, icon: "🧳", name: "Suitcase", price: 250, quantity: 0 },
                { id: 24, icon: "🌂", name: "Umbrella", price: 20, quantity: 0 }]
        }
    },
    mounted() { },
    methods: {
        ...mapActions(['addItem', 'removeItem']),
        editQuantity(item, type) {
            switch (type) {
                case "+":
                    this.addItem(item);
                    item.quantity++;
                    break;
                case "-":
                    this.removeItem(item.id);
                    item.quantity--;
                    break;
            }
        },
        navigateToCart() {
            this.$router.push("/cart")
        },
        isCartNotEmpty() {
            return this.getCart.length > 0;
        }
    }
}
</script>
<style lang="scss" scoped>
.store-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.item-container {
    width: 350px;
    display: flex;
    flex-wrap: wrap;
    column-gap: 25px;
    row-gap: 15px;
}

.material-symbols-outlined {
    align-self: flex-end;
    margin: 0 10px;
    position: relative;
    font-size: 40px;
    color: #162041;

    .check {
        position: absolute;
        width: 20px;
        height: 20px;
        background-color: #162041;
        border-radius: 50%;
        right: -2px;
        top: 3px;
        font-size: 20px;
        font-family: 'ptmono';
        text-align:center;
        color: #fff;
    }
}
</style>