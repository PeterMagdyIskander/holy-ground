<template>
    <div class="card-container" @click="reroute">
        <div class="item">
            <p class="item-icon">{{ itemInfo.icon }}</p>
            <div class="item-more-info">
                <p class="item-name">{{ itemInfo.name }}</p>
                <p class="item-price">{{ itemInfo.price }}<span>.99</span></p>

            </div>
        </div>
        <div class="buttons-container">
            <button class="decrease" v-if="itemInfo.quantity > 0" @click="editQuantity('-')">
                <p>-</p>
            </button>
            <p class="quantity" v-if="itemInfo.quantity > 0">{{ itemInfo.quantity }}</p>
            <button class="increase" @click="editQuantity('+')">
                <p>+</p>
            </button>
        </div>
    </div>
</template>

<script>
import router from '@/router'
export default {
    name: "item-cart-card",
    props: {
        itemInfo: {
            type: Object,
            required: true,
        },
    },
    methods: {
        editQuantity(type){
            this.$emit('editQuantity',this.itemInfo,type)
        }
    }
}
</script>

<style lang="scss" scoped>
p,
button {
    all: unset;
    padding: 0;
    margin: 0;
}

.card-container {
    width: 100%;
    display: flex;
    align-items: center;
    height: 62px;
    cursor: pointer;
    background-color: #162041;
    margin: 18px 0;
    padding: 0 10px;
    & .item {
        width: 77%;
        height: 100%;
        display: flex;
        align-items: center;
        column-gap: 15px;
        &-icon {
            font-size: 32px;
        }

        &-more-info {
            display: flex;
            flex-direction: column;
        }

        &-price {
            font-size: 16px;

            span {
                font-size: 12px;
            }
        }

        &-name {
            font-size: 20px;
        }
    }

    .buttons-container {
        display: flex;

        justify-content: flex-end;
        column-gap: 10px;

        right: 0;
        bottom: 45px;
        padding: 3px;

        background-color: #fff;
        border-radius: 16px;
        button {
            display: flex;
            justify-content: center;
            align-items: center;


        }

        .increase {
            width: 25px;
            height: 25px;
            background-color: #162041;
            border-radius: 50%;
            position: relative;
            z-index: 2;

            p {
                font-size: 24px;
                padding-bottom: 6px;
            }
        }
        .quantity {
            font-size: 16px;
            font-weight: bold;
            font-family: 'ptmono';
            color: #162041;
        }
        .decrease {
            width: 25px;
            height: 25px;
            background-color: lighten($color: #162041, $amount: 70);
            border-radius: 50%;
            position: relative;
            z-index: 2;

            p {
                font-size: 24px;
                padding-bottom: 6px;
                color: #162041;
            }
        }
    }
}
</style>