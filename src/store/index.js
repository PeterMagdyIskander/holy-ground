import { createStore } from 'vuex'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { collection, doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';

function areCredentialsValid(credentials) {
  if (!credentials) return false;
  const { token, expiry } = credentials;
  const now = new Date().getTime();
  return token && expiry && now < expiry;
}

function saveCredentials(credentials) {
  localStorage.setItem('userCredentials', JSON.stringify(credentials));
}

function getStoredCredentials() {
  const storedCredentials = localStorage.getItem('userCredentials');
  return storedCredentials ? JSON.parse(storedCredentials) : null;
}

export default createStore({
  state: {
    user: null,
    quests: [],
    cart: [],
    teamData: {},
    loading: false,
    failed: false,
  },
  getters: {
    getUser: (state) => state.user,
    getQuests: (state) => state.quests,
    getCart: (state) => state.cart,
    getTeamData: (state) => state.teamData,
    getLoading: (state) => state.loading,
    getFailed: (state) => state.failed
  },
  mutations: {
    setUser: (state, user) => (state.user = user),
    setQuests: (state, quests) => (state.quests = quests),
    setLoading: (state, loading) => (state.loading = loading),
    setTeamData: (state, teamData) => (state.teamData = teamData),
    setFailed: (state, failed) => (state.failed = failed),
    ADD_ITEM(state, item) {
      // Check if the item is already in the cart
      const existingItem = state.cart.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        // If it is, increase the quantity
        existingItem.quantity += 1;
      } else {
        // If it is not, add the item with quantity 1
        state.cart.push({ ...item, quantity: 1 });
      }
    },
    REMOVE_ITEM(state, itemId) {
      const index = state.cart.findIndex(cartItem => cartItem.id === itemId);

      if (index !== -1) {
        // If the item exists and its quantity is more than 1, decrease the quantity
        if (state.cart[index].quantity > 1) {
          state.cart[index].quantity -= 1;
        } else {
          // If the item exists and its quantity is 1, remove it from the cart
          state.cart.splice(index, 1);
        }
      }
    }
  },
  actions: {
    async login({ commit }) {
      commit('setFailed', false);
      commit('setLoading', true);
    
      const storedCredentials = getStoredCredentials();
      if (areCredentialsValid(storedCredentials)) {
        commit('setUser', storedCredentials.user);
        commit('setLoading', false);
        return Promise.resolve(storedCredentials.user);
      }
    
      const provider = new GoogleAuthProvider();
      try {
        const res = await signInWithPopup(getAuth(), provider);
        const firestore = getFirestore();
        const userCollectionReference = collection(firestore, 'users');
        const assignationCollectionRef = collection(firestore, 'assignation');
    
        const assignationSnapshot = await new Promise((resolve, reject) => {
          onSnapshot(assignationCollectionRef, snapshot => {
            resolve(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          }, reject);
        });
    
        const userSnapshot = await new Promise((resolve, reject) => {
          onSnapshot(userCollectionReference, snapshot => {
            resolve(snapshot.docs.map(doc => doc.id));
          }, reject);
        });
    
        const assignationData = assignationSnapshot;
        const allUsers = userSnapshot;
        let newUser = !allUsers.includes(res.user.uid);
        let user = null;
        const playerData = assignationData.filter(data => data.playerMail === res.user.email)[0];
    
        if (newUser) {
          user = {
            uid: res.user.uid,
            name: res.user.displayName,
            assignedQuestId: "",
            assignedRegionId: "",
            isTeamLead: playerData?.isTeamLead || 'dev',
            teamId: playerData?.teamId || 'dev',
            isAdmin: playerData?.isAdmin || 'dev',
            email: res.user.email,
            humanityPoints: 0
          }
          await setDoc(doc(firestore, "users", res.user.uid), user, { merge: true });
        } else {
          const userDoc = doc(userCollectionReference, res.user.uid);
          const userSnapshot = await new Promise((resolve, reject) => {
            onSnapshot(userDoc, snapshot => {
              resolve(snapshot.data());
            }, reject);
          });
          user = {
            uid: res.user.uid,
            email: res.user.email,
            ...userSnapshot
          };
        }
    
        const credentials = {
          user,
          token: res.user.accessToken,
          expiry: new Date().getTime() + 3600 * 1000 // 1 hour expiry
        };
        saveCredentials(credentials);
        commit('setUser', user);
        return user;
      } catch (err) {
        console.error(err);
        commit('setFailed', true);
      } finally {
        commit('setLoading', false);
      }
    },
    updateUser({ commit }, user) {
      commit('setUser', user);
    },
    setQuests({ commit }) {
      const firestore = getFirestore();
      const questsCollectionReference = collection(firestore, 'quests');
      onSnapshot(questsCollectionReference, snapshot => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        commit('setQuests', data);
      });
    },
    addItem({ commit }, item) {
      commit('ADD_ITEM', item);
    },
    removeItem({ commit }, itemId) {
      commit('REMOVE_ITEM', itemId);
    },
    setTeamData({ commit }, teamId) {
      const firestore = getFirestore();
      const teamCollectionReference = collection(firestore, 'teams');
      const myTeam = doc(teamCollectionReference, teamId)
      onSnapshot(myTeam, snapshot => {
        commit('setTeamData', { ...snapshot.data() })
      })
    },
  },
  modules: {
  }
});