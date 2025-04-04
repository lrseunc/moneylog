<template>
  <header :class="{ 'scrolled-nav': scrolledNav }">
    <nav>
      <div class="branding">
        <p class="money-log-title">Money Log</p>
      </div>
      <ul v-show="!mobile" class="navigation">
        <li><router-link class="link" to="/home">HOME</router-link></li>
        <li><router-link class="link" to="/personal">PERSONAL</router-link></li>
        <li><router-link class="link" to="/group">GROUP</router-link></li>
        <li><router-link class="link" to="/view">VIEW</router-link></li>
        <li><router-link class="link" to="/about">ABOUT</router-link></li>
        <router-link to="/profile" class="profile-trigger" aria-label="Profile">
          <i class="fas fa-user-circle" style="font-size: 30px; cursor: pointer;"></i>
        </router-link>
      </ul>
    <div class="icon">
        <i @click="toggleMobileNav" v-show="mobile" class="far fa-bars" :class="{'icon-active': mobileNav }"></i>
      </div>
      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
          <li><router-link class="link" to="/home">HOME</router-link></li>
          <li><router-link class="link" to="/personal">PERSONAL</router-link></li>
          <li><router-link class="link" to="/group">GROUP</router-link></li>
          <li><router-link class="link" to="/view">VIEW</router-link></li>
          <li><router-link class="link" to="/about">ABOUT US</router-link></li>
          <router-link to="/profile" class="user" aria-label="Profile">
            <i class="fas fa-user-circle" style="font-size: 30px; cursor: pointer;"></i>
          </router-link>
        </ul>
      </transition>
    </nav>
  </header>

  <div class="con">
    <div class="con-container">
    <div class="nav-con">
      <router-link to="/view" class="link">
            <button :class="{ active: $route.path === '/view' }">
                Personal Expenses
            </button>
        </router-link>
        <button @click="currentView = 'groupview'" :class="{ active: $route.path === '/groupview' }">
            Group Expenses
        </button>
    </div>

    <div v-if="currentView === 'view'" class="budget-section">
      <div class="content-wrapper">
        <!-- Filter Section -->
        <div class="filter-buttons">
          <form @submit.prevent>
            <button @click="filterExpenses('Food')" :class="{ active: filterCategory === 'Food' }">Food</button>
            <button @click="filterExpenses('Bill')" :class="{ active: filterCategory === 'Bill' }">Bill</button>
            <button @click="filterExpenses('Transportation')" :class="{ active: filterCategory === 'Transportation' }">Transportation</button>
            <button @click="filterExpenses('Other')" :class="{ active: filterCategory === 'Other' }">Other</button>
            <button @click="filterExpenses('all')" :class="{ active: filterCategory === 'all' }">View All</button>
            
            <!-- Member Search -->
            <input type="text" v-model="searchMember" placeholder="Search Member" />
            <input type="date" v-model="filterDate" />
            <button @click="filterExpensesByDate" title="Search">
                <i class="fa fa-search"></i>
            </button>
          </form>
        </div>

        <!-- Expense Table -->
        <div class="expense-table">
          <table>
            <thead>
              <tr>
                <th>Member</th>
                <th>Category</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(expense, index) in filteredExpenses" :key="expense.id" :class="{'alternate-row': index % 2 !== 0}">
                <td>{{ expense.member }}</td>
                <td>{{ expense.category }}</td>
                <td>{{ expense.name }}</td>
                <td>{{ formatCurrency(expense.amount) }}</td>
                <td>{{ expense.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Display Total Amount -->
        <div class="total-amount">
          <p>Total: {{ formatCurrency(totalAmount) }}</p>
        </div>

        <div>
          <pie-chart :data="chartData" 
          :options="chartOptions" 
          style="height: 400px; width: auto; justify-self: center;"/>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

export default {
  name: "Navigation",
  components: {
    PieChart: Pie
  }, 
  data() {
    return {
      scrolledNav: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
      currentView: 'view',
      searchMember: '', // Member search filter
      filterCategory: 'all',
      filterDate: '',
      expenses: [
        { id: 1, member: 'John', category: 'Food', name: 'Lunch', amount: 12.99, date: '2024-03-30' },
        { id: 2, member: 'Anne', category: 'Bill', name: 'Water', amount: 120, date: '2024-03-30' },
        { id: 3, member: 'Sam', category: 'Transportation', name: 'Jeep', amount: 13, date: '2024-03-30' },
        { id: 4, member: 'Luke', category: 'Food', name: 'Lunch', amount: 12.99, date: '2025-03-30' },
        { id: 5, member: 'Anne', category: 'Food', name: 'Lunch', amount: 12.99, date: '2025-03-30' },
        { id: 6, member: 'Sam', category: 'Food', name: 'Lunch', amount: 12.99, date: '2025-03-30' },
        { id: 7, member: 'Luke', category: 'Food', name: 'Lunch', amount: 12.99, date: '2025-03-30' },
        { id: 8, member: 'John', category: 'Transportation', name: 'Bus Ticket', amount: 2.50, date: '2025-03-31' },
        { id: 9, member: 'Anne', category: 'Bill', name: 'Electricity Bill', amount: 50.00, date: '2025-03-29' },
        { id: 10, member: 'Sam', category: 'Other', name: 'Coffee', amount: 3.50, date: '2025-03-28' },
      ],
      filterCategory: 'all', // Default filter is 'all'
      filterDate: '', // Default date filter is empty
      chartData: {
        labels: ['Food', 'Bill', 'Transportation', 'Other'], // Categories for the pie chart
        datasets: [{
          label: 'Expense Categories',
          data: [0, 0, 0, 0], // Initial data for the chart
          backgroundColor: ['#90fefb', '#febee9', '#aefda3', '#f5fda3'], // Segment colors
          borderColor: ['#90fefb', '#febee9', '#aefda3', '#f5fda3'],
          borderWidth: 1
        }]
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw;
              }
            }
          }
        }
      },
    };
  },
  computed: {
    filteredExpenses() {
      return this.expenses.filter(expense => {
        let categoryMatch = this.filterCategory === 'all' || expense.category === this.filterCategory;
        let dateMatch = !this.filterDate || expense.date === this.filterDate;
        let memberMatch = !this.searchMember || expense.member.toLowerCase().includes(this.searchMember.toLowerCase());
        return categoryMatch && dateMatch && memberMatch;
      });
    },
    totalAmount() {
      return this.filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    }
  },
  created() {
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
    this.updateChartData(); // Update chart data on creation
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    updateScroll() {
      const scrollPosition = window.scrollY;
      this.scrolledNav = scrollPosition > 50;
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      this.mobile = this.windowWidth <= 750;
      if (!this.mobile) {
        this.mobileNav = false;
      }
    },
    filterExpenses(category) {
      this.filterCategory = category;
    },
    filterExpensesByDate() {
      if (this.filterDate) {
        this.filterCategory = 'all';
      }
    },
    formatCurrency(value) {
      return value ? `₱${parseFloat(value).toFixed(2)}` : '₱0.00';
    },
    updateChartData() {
      // Update the data for the pie chart based on filtered expenses
      const categoryCounts = {
        Food: 0,
        Bill: 0,
        Transportation: 0,
        Other: 0,
      };
      this.filteredExpenses.forEach(expense => {
        categoryCounts[expense.category] = categoryCounts[expense.category] + expense.amount || expense.amount;
      });
      this.chartData.datasets[0].data = [
        categoryCounts.Food,
        categoryCounts.Bill,
        categoryCounts.Transportation,
        categoryCounts.Other,
      ];
    }
  },
};
</script>



<style scoped>
header {
  background-color: #2a4935;
  z-index: 99;
  width: 100%;
  position: sticky;
  transition: .5s ease all;
  color: #f6f8d5;
}
.branding {
    display: flex;
}

.money-log-title {
    white-space: nowrap;
    margin-left: -10px;
    font-size: 40px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.branding {
  display: flex;
}

  p.title {
  color: #f6f8d5;
  margin-left: -10px;
  font-size: 40px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

nav {
  display: flex;
  flex-direction: row;
  padding: 6px 0;
  width: 90%;
  margin: 0 auto;
}

.navigation {
  display: flex;
  flex: 1;
  justify-content: flex-end;
}

.link {
  font-size: 16px;
  color: #f6f8d5;
  text-decoration: none;
  padding: 14px;
  transition: .5s ease all;
}

.link:hover {
  color: black;
  border-color: black;
}

.profile-trigger {
  font-size: 30px;
  color: #f6f8d5;
  margin-left: 10px;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
}

.profile-trigger:hover {
  transform: scale(1.1);
  color: black;
}

.icon {
  position: absolute;
  top: 0;
  right: 24px;
  height: 100%;
  display: flex;
  align-items: center;
}

.icon i {
  cursor: pointer;
  font-size: 24px;
  transition: .8s ease all;
}

.icon-active {
  transform: rotate(180deg);
}

.dropdown-nav .link,
.dropdown-nav .profile-trigger {
  color: #2a4935; /* Sidebar text color */
  font-size: 18px;
  padding: 10px;
}

.scrolled-nav {
  background-color: #2a4935;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.con {
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    min-height: 654px;
}

.con-container {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 90%; /* Keep it responsive */
  margin: 20px auto; /* Centers the container */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.nav-con {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
}


button {
  padding: 15px 30px;
  position: relative;
  font-size: 20px;
  border: 2px solid #ccc;
  background-color: #f4f4f4;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.active {
  background-color: #2a4935;
  color: white;
}

button:hover {
  background-color: #ddd;
}

.budget-section {
  text-align: center;
  margin-top: 20px;
  min-height: 654px;
  word-wrap: break-word; /* Break long words to prevent overflow */
  overflow-wrap: break-word; /* Additional word-wrap compatibility */
}

.budget-section h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.budget-section p {
  font-size: 24px;
  color: red;
}

/* Filter Buttons Styling */
.filter-buttons button {
  position: relative;
  padding: 12px 20px;
  margin: 5px;
  border-radius: 5px;
  background-color: #f2feed;
  border: 2px solid #ccc;
  transition: all 0.3s ease;
}

.filter-buttons button.active {
  background-color: #2a4935;
  color: white;
  border-color: #2a4935;
}

.filter-buttons button:hover {
  background-color: #ddd;
}

/* Expense Table Styling */
.expense-table table {
  position: relative;
  width: 92%;
  margin-top: 20px;
  border-collapse: collapse;
  table-layout: fixed;
  justify-self: center;
}

.expense-table th, .expense-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #000000;
  vertical-align: top;
}

.expense-table th {
  background-color: #2a4935;
  color: white;
}

.expense-table tr {
  background-color: white;
}

/* Alternate Row Color */
.expense-table tr.alternate-row {
  background-color: #d2fcfe;
}

/* Total Amount Styling */
.total-amount {
  margin-top: 20px;
  font-weight: bold;
}
</style>
