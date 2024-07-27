<template>
    <div class="cart">
        <app-header :title="'Holy Ground'" :subtitle="'Store'"></app-header>

        <ItemCartCard v-for="item in getCart" :key="item.id" :itemInfo="item" @editQuantity="editQuantity">
        </ItemCartCard>
        <div class="button-container">
            <button class="checkout" @click="buy">Buy, total {{ getTotal() }}</button>
        </div>
    </div>
</template>

<script>

import { getFirestore, doc, setDoc, increment } from 'firebase/firestore';
import { mapGetters, mapActions } from 'vuex'; import AppHeader from '@/components/Shared/AppHeader.vue';
import ItemCartCard from '@/components/Store/ItemCartCard.vue';
export default {
    name: "cart-view",
    computed: {
        ...mapGetters(['getUser', 'getCart', 'getTeamData']),
    },
    components: {
        ItemCartCard,
        AppHeader,
    },
    methods: {
        ...mapActions(['addItem', 'removeItem', 'setEmptyCart']),
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
        },
        async buy() {
            if (this.getTotal() === 0)
                return alert("Please buy any items")
            if (this.getTeamData.gold >= this.getTotal()) {
                try {
                    const firestore = getFirestore();
                    const teamRef = doc(firestore, 'teams', this.getUser.teamId);
                    await setDoc(teamRef, { items: [...this.getTeamData.items, ...this.getCart], gold: increment(this.getTotal() * -1) }, { merge: true });
                    this.setEmptyCart();
                    alert("Items bought successfuly")
                } catch (error) {
                    console.error('Error writing to Firestore: ', error);
                }
            } else {
                alert("Your team doesn't have enough gold")
            }
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
    background-color: #162041;
    border: 1px solid #162041;
    color: #fff;
    font-family: 'ptmono';
}
</style>