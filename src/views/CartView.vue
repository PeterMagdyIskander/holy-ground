<template>
    <div class="cart">
        <app-header :title="'Rise Of The Kingdom'" :subtitle="'Battlefield'"></app-header>

        <ItemCartCard v-for="item in getCart" :key="item.id" :itemInfo="item" @editQuantity="editQuantity">
        </ItemCartCard>
        <div class="button-container">
            <button class="checkout">Buy, total {{ getTotal() }}</button>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'; import AppHeader from '@/components/Shared/AppHeader.vue';
import ItemCartCard from '@/components/Store/ItemCartCard.vue';
export default {
    name: "cart-view",
    computed: {
        ...mapGetters(['getCart']),
    },
    components: {
        ItemCartCard,
        AppHeader,
    },
    methods: {
        ...mapActions(['addItem', 'removeItem']),
        editQuantity(item, type) {
            switch (type) {
                case "+":
                    this.addItem(item);
                    break;
                case "-":
                    this.removeItem(item.id);
                    break;
            }
        },
         getTotal() {
            let total = 0;
            this.getCart.forEach(item => total += item.quantity * item.price)
            return total
        }
    }
}
</script>

<style lang="scss" scoped>
.button-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.checkout {
    width: 80%;
    height: 40px;
    margin: 25px auto;
    border-radius: 10px;
    background-color: darken($color: #aa0082, $amount: 10);
    border: 1px solid darken($color: #aa0082, $amount: 10);
    color: #fff;
    font-family: 'ptmono';
}
</style>