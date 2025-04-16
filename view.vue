<template>
  <header :class="{ 'scrolled-nav': scrolledNav }">
    <nav>
      <div class="branding">
        <img src="/LOGO.png" alt="Money Log Logo"/>
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
    <!-- Navigation Buttons (centered) -->
    <div class="nav-con">
        <button 
            @click="currentView = 'view'" 
            :class="{ active: $route.path === '/view' }">
            Personal Expenses
        </button>
        <router-link to="/groupview" class="link">
            <button :class="{ active: $route.path === '/groupview' }">
                Group Expenses
            </button>
        </router-link>
    </div>

    <!-- Content Based on the Current View -->
    <div v-if="currentView === 'view'" class="budget-section">
      <div class="content-wrapper">
        <!-- Filter Buttons -->
        <div class="filter-buttons">
          <form @submit.prevent>
          <button @click="filterExpenses('Food')" :class="{ active: filterCategory === 'Food' }">Food</button>
          <button @click="filterExpenses('Bill')" :class="{ active: filterCategory === 'Bill' }">Bill</button>
          <button @click="filterExpenses('Transportation')" :class="{ active: filterCategory === 'Transportation' }">Transportation</button>
          <button @click="filterExpenses('Entertainment')" :class="{ active: filterCategory === 'Entertainment' }">Entertainment</button>
          <button @click="filterExpenses('Healthcare')" :class="{ active: filterCategory === 'Healthcare' }">Healthcare</button>
          <button @click="filterExpenses('Personal Care')" :class="{ active: filterCategory === 'Personal Care' }">Personal Care</button>
          <button @click="filterExpenses('Shopping')" :class="{ active: filterCategory === 'Shopping' }">Shopping</button>
          <button @click="filterExpenses('Other')" :class="{ active: filterCategory === 'Other' }">Other</button>
          <button @click="filterExpenses('all')" :class="{ active: filterCategory === 'all' }">View All</button>
            <input type="month" v-model="filterMonth" />
            <button @click="filterExpensesByMonth" title="Search">
                <i class="fa fa-search"></i>
            </button>
          </form>
        </div>

        <!-- Expense Table -->
        <div class="expense-table">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(expense, index) in filteredExpenses" :key="expense.id" :class="{'alternate-row': index % 2 !== 0}">
                <td>{{ expense.category }}</td>
                <td>{{ expense.name }}</td>
                <td>{{ formatCurrency(expense.amount) }}</td> <!-- Use formatCurrency method here -->
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
      
        <!-- Year and Month Picker for PDF generation -->
        <select v-model="selectedYear">
          <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
        </select>

        <select v-model="selectedMonth">
          <option v-for="month in availableMonths" :key="month.value" :value="month.value">{{ month.label }}</option>
        </select>

        <button class="download-button" @click="generatePDF">Download Report</button>
      </div>
    </div>
  </div>
</div>
</template>



<script>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import jsPDF from 'jspdf'; // Import jsPDF

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

export default {
name: 'Navigation',
components: {
  PieChart: Pie,
},
data() {
  return {
    scrolledNav: null,
    mobile: null,
    mobileNav: null,
    windowWidth: null,
    currentView: 'view', // Default view is personal budget
    expenses: [
      { id: 1, category: 'Food', name: 'Lunch', amount: 50, date: '2024-03-30' },
      { id: 2, category: 'Bill', name: 'Water', amount: 120, date: '2024-03-30' },
      { id: 3, category: 'Bill', name: 'Water', amount: 120, date: '2024-03-30' },
      { id: 4, category: 'Transportation', name: 'Jeep', amount: 13, date: '2024-03-30' },
      { id: 5, category: 'Entertainment', name: 'Movie', amount: 200, date: '2025-03-30' },
      { id: 6, category: 'Healthcare', name: 'Doctor Appointment', amount: 500, date: '2025-03-30' },
      { id: 7, category: 'Personal Care', name: 'Haircut', amount: 150, date: '2025-03-30' },
      { id: 8, category: 'Shopping', name: 'Clothes', amount: 300, date: '2025-03-30' },
      { id: 9, category: 'Transportation', name: 'Bus Ticket', amount: 200, date: '2025-03-31' },
      { id: 10, category: 'Bill', name: 'Electricity Bill', amount: 50.00, date: '2025-03-29' },
      { id: 11, category: 'Other', name: 'Gas', amount: 1000, date: '2025-03-28' },
    ],
    filterCategory: 'all', // Default filter is 'all'
    filterMonth: '', 
    selectedYear: '2025', // Default year selected for PDF
    selectedMonth: '03', // Default month selected for PDF
    chartData: {
      labels: ['Food', 'Bill', 'Transportation', 'Entertainment', 'Healthcare','Personal Care', 'Shopping', 'Other'], // Categories for the pie chart
      datasets: [{
        label: 'Expense Categories',
        data: [0, 0, 0, 0], // Initial data for the chart
        backgroundColor: ['#90fefb', '#febee9', '#aefda3', '#f5fda3', '#ecbefe', '#fefdad', '#feadad', '#adb5fe'  ], // Segment colors
        borderColor: ['#90fefb', '#febee9', '#aefda3', '#f5fda3', '#ecbefe', '#fefdad', '#feadad', '#adb5fe'],
        borderWidth: 1,
      }],
    },
    chartOptions: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.label + ': ' + tooltipItem.raw;
            },
          },
        },
      },
    },
  };
},
computed: {
  availableYears() {
    const years = new Set(); // To get unique years
    this.expenses.forEach(expense => {
      const year = expense.date.split('-')[0];
      years.add(year);
    });
    return Array.from(years).sort(); // Convert to array and sort
  },
  availableMonths() {
    return [
      { value: '01', label: 'January' },
      { value: '02', label: 'February' },
      { value: '03', label: 'March' },
      { value: '04', label: 'April' },
      { value: '05', label: 'May' },
      { value: '06', label: 'June' },
      { value: '07', label: 'July' },
      { value: '08', label: 'August' },
      { value: '09', label: 'September' },
      { value: '10', label: 'October' },
      { value: '11', label: 'November' },
      { value: '12', label: 'December' },
    ];
  },
  filteredExpenses() {
    return this.expenses.filter(expense => {
      let categoryMatch = this.filterCategory === 'all' || expense.category === this.filterCategory;
      let dateMatch = !this.filterMonth || expense.date.startsWith(this.filterMonth);
      return categoryMatch && dateMatch;
    });
  },
  totalAmount() {
    return this.filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  },
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
    this.updateChartData(); // Update chart data when the filter is changed
  },
  filterExpensesByDate() {
    this.filterCategory = 'all'; // Reset category filter
    this.updateChartData(); // Refresh chart with filtered data
  },
  formatCurrency(value) {
    if (value == null || isNaN(value)) return '₱0.00'; // Ensure valid numbers
    return '₱' + parseFloat(value).toFixed(2); // Format to 2 decimal places with currency symbol
  },
  updateChartData() {
  // Prepare a map to hold category totals
  const categoryCounts = {
    Food: 0,
    Bill: 0,
    Transportation: 0,
    Entertainment: 0,
    Healthcare: 0,
    'Personal Care': 0,
    Shopping: 0,
    Other: 0,
  };

  // Apply month and category filters here
  this.expenses.forEach(expense => {
    const matchesMonth = !this.filterMonth || expense.date.startsWith(this.filterMonth);
    const matchesCategory = this.filterCategory === 'all' || expense.category === this.filterCategory;

    if (matchesMonth && matchesCategory) {
      categoryCounts[expense.category] += expense.amount;
    }
  });

  // Update the chart data
  this.chartData.datasets[0].data = [
      categoryCounts.Food,
      categoryCounts.Bill,
      categoryCounts.Transportation,
      categoryCounts.Entertainment,
      categoryCounts.Healthcare,
      categoryCounts['Personal Care'],
      categoryCounts.Shopping,
      categoryCounts.Other,
    ];
  },
  generatePDF() {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text('Expense Report', 20, 20);

    // Add the total amount
    doc.setFontSize(12);
    doc.text(`Total Expenses: ${this.formatCurrency(this.totalAmount)}`, 20, 30);

    // Add a table with filtered expense details
    let yOffset = 40;

    // Filter expenses based on selected month and year for the PDF
    const filteredForPDF = this.expenses.filter(expense => {
      return expense.date.startsWith(`${this.selectedYear}-${this.selectedMonth}`);
    });

    filteredForPDF.forEach((expense) => {
      doc.text(`${expense.date} - ${expense.category} - ${expense.name}: ${this.formatCurrency(expense.amount)}`, 20, yOffset);
      yOffset += 10;
    });

    // Wait for the chart to render before capturing it
    this.$nextTick(() => {
      const chartCanvas = document.querySelector('canvas'); // Assuming the pie chart is rendered on a <canvas> element
      if (chartCanvas) {
        const chartImage = chartCanvas.toDataURL('image/png'); // Convert canvas to image
        doc.addImage(chartImage, 'PNG', 20, yOffset, 160, 100); // Add chart image below the table
        doc.save('expense-report.pdf'); // Save the PDF
      } else {
        console.error("Chart not found");
      }
    });
  },
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

img {
    width: 128px;
    transition: .5s ease all;
    margin-left: -10px;
}

nav {
  display: flex;
  flex-direction: row;
  padding: 8px 0;
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
  padding-bottom: 1px;
  transition: .5s ease all;
  border-bottom: 2px solid transparent;
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

.dropdown-nav {
  margin-top: 0px;
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
  height: 82vh; /* Full screen height */
  overflow-y: auto;
  display: flex; 
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -11px;
}

.con-container {
height:   80vh; /* Adjust based on your header height */
overflow-y: auto;
padding-right: 10px; /* Optional: prevent hidden scrollbar */
background: rgb(255, 255, 255);
padding: 20px;
border-radius: 10px;
max-width: 90%; /* Keep it responsive */
width: 1100px;
margin: 30px auto; /* Centers the container */
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
  width: 90%;
  justify-self: center;
  margin-top: 20px;
  border-collapse: collapse;
  table-layout: fixed;
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

.download-button {
padding: 10px 20px;
font-size: 16px;
background-color: #2a4935;
color: white;
border: none;
cursor: pointer;
margin-top: 20px;
}

.download-button:hover {
background-color: #1e3731;
}

canvas {
  max-width: 100%;
  height: 400px !important;
}
</style> 
