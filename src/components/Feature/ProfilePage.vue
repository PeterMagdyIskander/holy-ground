<template>
    <div>
        <app-header :title="'Holy Ground'" :subtitle="`Hi ${getUser.name.split(' ')[0]}!`"></app-header>

        <div class="home-container">
            <div class="more-info">
                <div class="more-info-info">
                    <p class="title">Team's Gold</p>
                    <div class="more-info-info-hp">
                        <p class="info">{{ getTeamData?.gold }}</p>
                        <img src="@/assets/gold-icon.svg" alt="">
                    </div>

                </div>
                <div class="more-info-separator"></div>
                <div class="more-info-info">
                    <p class="title">Your Gold</p>
                    <div class="more-info-info-hp">
                        <p class="info">{{ getUser.gold }}</p>
                        <img src="@/assets/gold-icon.svg" alt="">
                    </div>
                </div>
            </div>
            <div class="team-container">
                <div class="item-container">
                    <p v-for="item in fashionShowItems" :key="item.name" :class="{ 'not-found': !item.isFound }">{{
            item.icon }}</p>
                </div>

                <h1 class="team-title" :class="getUser.teamId">{{ getUser.teamId }}</h1>
            </div>
            <div class="navigation-section">
                <div class="navigation-section-item" @click="navigateTo('/Store')">
                    <span class="material-symbols-outlined">
                        shopping_bag
                    </span>

                </div>
                <div class="navigation-section-item" @click="navigateTo('/QuestCenter')">
                    <img src="@/assets/quest-center-icon.svg" alt="quest-center-icon">

                </div>
                <div class="navigation-section-item" @click="navigateTo('/MyQuest')">
                    <img src="@/assets/my-quest-icon.svg" alt="my-quest-icon">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppHeader from '../Shared/AppHeader.vue';

import { mapGetters } from 'vuex';
export default {
    name: "profile-page",
    components: { AppHeader },
    computed: mapGetters(['getUser', 'getTeamData']),
    mounted() {
        this.fashionShowItems.forEach(item => {
            item.isFound = false;
        })
        console.log(this.fashionShowItems)
        this.getTeamData.items.forEach(item => {
            this.fashionShowItems.forEach(showItem => {
                if (showItem.name === item.name) {
                    showItem.isFound = true;
                }
            });
        })
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
    }
}
</script>

<style lang="scss" scoped>
p {
    padding: 0;
    margin: 0;
}

.home-container {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}



.more-info {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 20px;
    background-color: #162041;
    border: 1px solid #F5F5F5;
    border-radius: 6px;
    z-index: 0;
    position: relative;
    margin-bottom: 30px;

    &-separator {
        z-index: 3;
        border-left: 1px solid #fff;
        height: 40px;
    }

    &-info {
        z-index: 3;
        padding: 10px 0;
        display: flex;
        flex-direction: column;
        text-align: center;

        & .title {
            font-family: 'ptmono';
            font-size: 14px;
            color: #E5E5E5;
        }

        &-hp {
            display: flex;
            align-items: center;
            column-gap: 10px;

            & .info {
                font-family: 'pressstart2p';
                font-size: 17px;
                color: #E5E5E5;
            }

            img {
                width: 24px;
            }
        }

        & .info {
            font-family: 'pressstart2p';
            font-size: 17px;
            color: #E5E5E5;
        }
    }
}


.team-container {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #162041;
    border-radius: 6px;
    padding: 15px 0;
    margin-bottom: 45px;

    .item-container {
        width: 80%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        column-gap: 25px;
        row-gap: 15px;
        margin-bottom: 32px;

        p {
            font-size: 24px;
        }

        .not-found {
            filter: brightness(0.3);
        }
    }

    .team-title {
        font-family: 'pressstart2p';
        color: #f4ee80;
        text-shadow: 1px 2px #a14759;
    }
}

.navigation-section {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 25px;
    margin-bottom: 45px;

    &-item {
        width: 70px;
        height: 45px;
        border: 2px solid #F5F5F5;
        background-color: #162041;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.75rem;
    }
}

.material-symbols-outlined {
    font-size: 34px;
}
</style>