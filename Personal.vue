<template>
    <v-app>
    <nav>
      <div>
        <p class="title">MoneyLog</p>
      </div>

      <ul>
        <li><router-link to="/home">HOME</router-link></li>
        <li><router-link to="/personal">PERSONAL</router-link></li>
        <li><router-link to="/group">GROUP</router-link></li>
        <li><router-link to="/view">VIEW</router-link></li>
        <li><router-link to="/about">ABOUT US</router-link></li>
        <li><router-link to="/profile"><img src="profile.jpg" alt=""></router-link></li>
      <!-- Corrected Vue.js event binding -->
      </ul>
    </nav>

    <!-- Personal Form -->
    <div class="home-bg"> 
    <div class="container">
      <div class="content-wrapper">
        <div v-if="successMessage" class="success-message">{{ successMessage }}</div>

        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Expense Type:</label>
            <select v-model="expenseType" required>
              <option value="Food">Food</option>
              <option value="Bill">Bill</option>
              <option value="Transportation">Transportation</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div class="form-group" v-if="expenseType === 'Other'">
            <label>Custom Expense Type:</label>
            <input v-model="customExpenseType" type="text" placeholder="Enter custom expense type" />
          </div>

          <div class="form-group">
            <label>Item Name:</label>
            <input v-model="itemName" type="text" placeholder="Enter item name" required />
          </div>

          <div class="form-group">
            <label>Item Price:</label>
            <input v-model="itemPrice" type="number" placeholder="Enter item price" required step="0.01" />
          </div>

          <button type="submit">{{ editMode ? 'Save Changes' : 'Add Expense' }}</button>
        </form>

        <!-- Expenses List -->
        <div>
          <h3>Your Expenses</h3>
          <table>
            <tr>
              <th>Type</th>
              <th>Item</th>
              <th>Price</th>
            </tr>
            <tr v-for="(expense, index) in expenses" :key="index">
                <td>{{ expense.type }}</td>
                <td>{{ expense.name }}</td>
                <td>₱{{ expense.price }}</td>
            </tr>

          </table>
        </div>
      </div>

      <!-- Total -->
      <div class="total">
        Total: ₱{{ totalExpense }} (≈ ${{ (totalExpense / 50).toFixed(2) }})
      </div>
    </div>
</div>
</v-app> 
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    // Reactive variables
    const showSidebar = ref(false);
    const successMessage = ref("");
    const expenseType = ref("");
    const customExpenseType = ref("");
    const itemName = ref("");
    const itemPrice = ref("");
    const expenses = ref([]);

    // Computed property for total expense
    const totalExpense = computed(() =>
      expenses.value.reduce((sum, expense) => sum + Number(expense.price), 0)
    );

    // Form submission
    const handleSubmit = () => {
      if (!itemName.value || !itemPrice.value) return;
      const newExpense = {
        type: expenseType.value === "Other" ? customExpenseType.value : expenseType.value,
        name: itemName.value,
        price: itemPrice.value
      };
      expenses.value.push(newExpense);

      // Reset form
      expenseType.value = "";
      customExpenseType.value = "";
      itemName.value = "";
      itemPrice.value = "";
      successMessage.value = "Expense added successfully!";
      setTimeout(() => (successMessage.value = ""), 2000);
    };

    return {
      showSidebar,
      successMessage,
      expenseType,
      customExpenseType,
      itemName,
      itemPrice,
      expenses,
      totalExpense,
      handleSubmit
    };
  }
};
</script>

<style scoped>
/* Add your styles here */
body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  height: 100vh;
}

.personal-bg {
    background-image: url('/public/circle.png') !important;
    background-size: cover; /* Makes sure it covers the whole screen */
    background-position: center; /* Centers the image */
    background-repeat: no-repeat; /* Prevents tiling */
    height: 100vh; /* Ensure it takes the full viewport height */
    width: 100vw; /* Ensure it takes the full viewport width */
}

.container {
  background-color: white;
  padding: 20px;
  max-width: 1200px;
  margin: 20px auto;
  border-radius: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 750px;
}

nav {
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1px 50px;
  box-sizing: border-box;
}

nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: flex-end;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 10px 15px;
  border-radius: 5px;
  transition: color 0.3s ease;
}

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  height: 300px;
  width: 250px;
  background-color: white;
  box-shadow: -10px 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5%;
  list-style: none;
  display: none;
  flex-direction: column;
}

.sidebar li {
  width: 100%;
}

@media(max-width: 1200px) {
    .container {
        padding-left: 10px;
        width: 90%;
    }

    table th, table td {
        font-size: 0.9em;
    }

    .form-group label {
        font-size: 1em;
    }

    .content-wrapper {
        padding-left: 40px;
        width: 90%;
    }

    .form-group input,
    .form-group select {
        font-size: 0.9em;
    }

    .success-message {
        font-size: 13px;
        margin-left: 100px;
        margin-top: 10px;
    }

    .total {
        margin-left: 40px;
    }
}


.total {
  font-size: 18px;
  font-weight: bold;
  color: green;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-top: 20px;
  position: sticky;
  bottom: 0;
  width: 100%;
}
</style>
