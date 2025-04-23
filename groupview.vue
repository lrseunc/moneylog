<template>
<navigation/>

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
              <button @click="filterExpenses('Entertainment')" :class="{ active: filterCategory === 'Entertainment' }">Entertainment</button>
              <button @click="filterExpenses('Healthcare')" :class="{ active: filterCategory === 'Healthcare' }">Healthcare</button>
              <button @click="filterExpenses('Personal Care')" :class="{ active: filterCategory === 'Personal Care' }">Personal Care</button>
              <button @click="filterExpenses('Shopping')" :class="{ active: filterCategory === 'Shopping' }">Shopping</button>
              <button @click="filterExpenses('Other')" :class="{ active: filterCategory === 'Other' }">Other</button>
              <button @click="filterExpenses('all')" :class="{ active: filterCategory === 'all' }">View All</button>

              <!-- Member Search -->
              <input type="text" v-model="searchMember" placeholder="Search Member" />
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

          <!-- Pie Chart -->
          <div>
            <pie-chart :data="chartData" :options="chartOptions" style="height: 400px; width: auto; justify-self: center;"/>
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
import Navigation from "./navigation.vue"; 
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import jsPDF from 'jspdf';  

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

export default {
  components: {
    Navigation,
    PieChart: Pie,
  },
  data() {
    return {
      scrolledNav: null,
      currentView: 'view',
      searchMember: '', // Member search filter
      filterCategory: 'all',
      filterDate: '',
      expenses: [
      { id: 1, member: 'Anne', category: 'Food', name: 'Lunch', amount: 50, date: '2024-03-30' },
      { id: 2, member: 'John', category: 'Bill', name: 'Water', amount: 120, date: '2024-03-30' },
      { id: 3, member: 'Sam', category: 'Bill', name: 'Water', amount: 120, date: '2024-03-30' },
      { id: 4, member: 'Mae', category: 'Transportation', name: 'Jeep', amount: 13, date: '2024-03-30' },
      { id: 5, member: 'Anne', category: 'Entertainment', name: 'Movie', amount: 200, date: '2025-03-30' },
      { id: 6, member: 'John', category: 'Healthcare', name: 'Doctor Appointment', amount: 500, date: '2025-03-30' },
      { id: 7, member: 'Sam', category: 'Personal Care', name: 'Haircut', amount: 150, date: '2025-03-30' },
      { id: 8, member: 'Mae', category: 'Shopping', name: 'Clothes', amount: 300, date: '2025-03-30' },
      { id: 9, member: 'Anne', category: 'Transportation', name: 'Bus Ticket', amount: 200, date: '2025-03-31' },
      { id: 10, member: 'John', category: 'Bill', name: 'Electricity Bill', amount: 50.00, date: '2025-03-29' },
      { id: 11, member: 'Sam', category: 'Other', name: 'Gas', amount: 1000, date: '2025-03-28' },
    ],
      filterCategory: 'all', // Default filter is 'all'
      filterDate: '', // Default date filter is empty
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
    this.updateChartData(); // Update chart data on creation
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
  methods: {
    updateScroll() {
      const scrollPosition = window.scrollY;
      this.scrolledNav = scrollPosition > 50;
    },
    filterExpenses(category) {
      this.filterCategory = category;
      this.updateChartData(); 
    },
    filterExpensesByDate() {
      if (this.filterDate) {
        this.filterCategory = 'all'; // Reset category filter when searching by date
        const yearMonth = this.filterDate.slice(0, 7); // Extract the year and month (e.g., "2025-03")
        this.filteredExpenses = this.expenses.filter(expense => expense.date.slice(0, 7) === yearMonth); // Filter by year-month
      }
    },
    formatCurrency(value) {
      if (value == null || isNaN(value)) return '₱0.00'; // Ensure valid numbers
      return '₱' + parseFloat(value).toFixed(2); // Format to 2 decimal places with currency symbol
    },
    updateChartData() {
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
      this.filteredExpenses.forEach(expense => {
        categoryCounts[expense.category] += expense.amount;
      });

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

      // Add title at the top of the PDF
      doc.setFontSize(18);
      doc.text('Expense Report', 20, 20);

      // Add the total amount to the PDF (formatted with currency)
      doc.setFontSize(12);
      doc.text(`Total Expenses: ${this.formatCurrency(this.totalAmount)}`, 20, 30);

      // Initialize the Y offset for rows
      let yOffset = 40;

      // Filter expenses based on the selected month and year for the PDF
      const filteredForPDF = this.filteredExpenses.filter(expense => {
        return expense.date.startsWith(`${this.selectedYear}-${this.selectedMonth}`);
      });

      // Add each filtered expense as a row in the PDF
      filteredForPDF.forEach((expense) => {
        doc.text(`${expense.member} - ${expense.category} - ${expense.name} - ${expense.date}: ${this.formatCurrency(expense.amount)}`, 20, yOffset);
        yOffset += 10; // Increment the Y offset for the next row
      });

      // Wait for the chart to be fully rendered
      this.$nextTick(() => {
        const chartCanvas = document.querySelector('canvas'); // Assuming the pie chart is in a <canvas> element
        if (chartCanvas) {
          const chartImage = chartCanvas.toDataURL('image/png'); // Convert the canvas to a PNG image
          // Add the pie chart image below the table rows
          doc.addImage(chartImage, 'PNG', 20, yOffset, 160, 100); // Adjust width and height of the chart image as needed
          doc.save('expense-report.pdf'); // Save the PDF as a file
        } else {
          console.error("Chart not found");
        }
      });
    },
  }
};
</script>



<style scoped>

.con {
  height: 85vh; /* Full screen height */
  overflow-y: auto;
  display: flex; 
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.con-container {
overflow-y: auto;
padding-right: 10px;
background: white;
padding: 20px;
border-radius: 10px;
max-width: 1000px; /* Keep it responsive */
width: 90%;
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
