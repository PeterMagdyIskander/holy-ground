<template>
    <div class="item">
        <span class="item-icon">
            {{ itemInfo.icon }}
        </span>
        <p class="item-price">{{ itemInfo.price }}<span>.99</span></p>
        <p class="item-name">{{ itemInfo.name }}</p>
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
export default {
    name: "item",
    props: {
        itemInfo: {
            type: Object,
            required: true,
        }
    },
    methods:{
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
    margin: 0;
    padding: 0;
}

.item {
    width: 100px;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 5px;

    &-icon {
        font-size: 64px;
    }

    &-price {
        font-size: 16px;

        span {
            font-size: 12px;
        }
    }

    &-name {
        font-size: 14px;
    }

    .buttons-container {
        position: absolute;
        display: flex;

        justify-content: flex-end;
        column-gap: 10px;

        right: 0;
        bottom: 45px;
        padding: 3px;

        button {
            display: flex;
            justify-content: center;
            align-items: center;


        }

        .increase {
            width: 25px;
            height: 25px;
            background-color: darken($color: #aa0082, $amount: 10);
            border-radius: 50%;
            position: relative;
            z-index: 2;

            p {
                font-size: 24px;
                padding-bottom: 6px;
            }
        }

        .decrease {
            width: 25px;
            height: 25px;
            background-color: #efc3e5;
            border-radius: 50%;
            position: relative;
            z-index: 2;

            p {
                font-size: 24px;
                padding-bottom: 6px;
                color: darken($color: #aa0082, $amount: 10);
            }
        }
    }
}
</style>