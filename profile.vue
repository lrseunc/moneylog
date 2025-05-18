<template>
  <navigation />

  <div class="content-wrapper">
    <div class="profile-container">
      <div class="logout-wrapper">
        <button class="logout-icon" @click="showLogoutModal = true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round" class="icon">
            <path d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0
                    005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0
                    002.25-2.25V15m0-3H3m0 0l3-3m-3 3l3 3" />
          </svg>
        </button>
      </div>
      <h2>PROFILE INFORMATION</h2>
      <div class="info">
        <p><strong>Name: {{ userName }}</strong></p>
        <p><strong>Email: {{ userEmail }}</strong></p>
      </div>

      <div class="columns">
        <!-- PERSONAL SUMMARY PER MONTH -->
        <div class="column1">
          <h3 class="section-title">Personal Log Overview</h3>
          <div class="year-selector">
            <label>Year:</label>
            <select v-model="selectedYear">
              <option v-for="year in availableYears" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>

          <div class="months-grid">
            <div v-for="(m, idx) in monthStats" :key="idx" class="month-card">
              <h4>{{ m.label }}</h4>
              <p><strong>Budget:</strong> {{ m.budget }}</p>
              <p><strong>Total Expenses:</strong> {{ m.expenses }}</p>
              <p><strong>Remaining Budget:</strong> {{ m.remaining }}</p>
            </div>
          </div>
        </div>

        <!-- GROUP SUMMARY -->
        <div class="column">
          <div class="infos">
            <h3 class="section-title">Group Log Overview</h3>
            <div class="group-selector">
              <label for="group">Group Name:</label>
              <select v-model="selectedGroup" @change="onGroupChange">
                <option v-for="group in availableGroups" :key="group.id" :value="group">
                  {{ group.group_name }}
                </option>
              </select>
            </div>
            <p><strong>Group Budget: {{ parseFloat(groupBudget) }}</strong></p>
            <p><strong>Group Expenses: {{ parseFloat(groupExpenses) }}</strong></p>
            <p><strong>Remaining Budget: {{ parseFloat(groupRemainingDisplay) }}</strong></p>
          </div>
          </div>
      </div>

        <div v-if="showLogoutModal" class="modal-backdrop" @click.self="closeModal">
        <div class="modal-card">
          <h3>Log out?</h3>
          <p>Are you sure you want to log out?</p>

          <div class="btn-row">
            <button class="btn cancel" @click="closeModal">Cancel</button>
            <button class="btn confirm" @click="performLogout">Yes, log out</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Navigation from "./navigation.vue";

export default {
  components: { Navigation },

  data() {
    return {
      showLogoutModal: false,
      userEmail: "",
      userName: "",
      selectedYear: new Date().getFullYear().toString(),
      selectedMonth: (new Date().getMonth() + 1).toString().padStart(2, "0"),

      expenses: [],        
      availableGroups: [],
      selectedGroup: null,
      groupName: "",
      groupBudget: {},
      groupExpenses: {},
      groupRemainingDisplay: {},
    };
  },

  computed: {
    availableYears() {
      if (this.expenses.length === 0) return [this.selectedYear];
      const yrs = new Set(
        this.expenses
          .filter(e => e.expense_date)
          .map(e => e.expense_date.split("-")[0])
      );
      return Array.from(yrs).sort().reverse();
    },
    monthYear() {
      return `${this.selectedYear}-${this.selectedMonth}`;
    },
    totalExpenses() {
      return this.$store.getters.getTotalAmountForMonth(this.monthYear);
    },
    currentBudget() {
      const budgetObj = this.$store.getters.getCurrentBudget(this.monthYear);
      return Number(budgetObj.budget_amount) || 0;
    },
    remainingBudget() {
      return (this.currentBudget - this.totalExpenses).toFixed(2);
    },
    monthStats() {
      const labels = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
      ];

      const allBudgets = this.$store.getters.getPersonalBudgets || [];
      const allExpenses = this.expenses || [];


      console.log('▶ allExpenses:', allExpenses);
      console.log('▶ allBudgets :', allBudgets);


      return labels.map((label, i) => {
        const monthNum  = String(i + 1).padStart(2, "0");
        const key = `${this.selectedYear}-${monthNum}`;
        const bEntry    = allBudgets.find(b => b.month_year === key);
        const budget    = Number(bEntry?.budget_amount || 0);

        const monthTotal = allExpenses
        .filter(e => {
          if (!e.expense_date) return false;
          const yearMonth = e.expense_date.substring(0, 7);
          return yearMonth === key; 
        })
        .reduce((sum, e) => sum + Number(e.item_price || 0), 0);

        const remaining = budget - monthTotal;

        return {
          label,
          budget:    budget.toFixed(2),
          expenses:  monthTotal.toFixed(2),
          remaining: remaining.toFixed(2)
        };
      });
    },
  },

  watch: {
    selectedYear() {
      this.reloadLocal();       
    }
  },

  methods: {  
    async loadAllGroupsData() {
      try {
        const token = localStorage.getItem('jsontoken');
        const groupListResponse = await this.$axios.get(
          'http://localhost:3000/api/grp_expenses/my-groups',
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (
          groupListResponse.data?.success === 1 &&
          Array.isArray(groupListResponse.data.data) &&
          groupListResponse.data.data.length > 0
        ) {
          const groups = groupListResponse.data.data;
          this.availableGroups = groups;
          localStorage.setItem('all_groups', JSON.stringify(groups));

          await this.loadYear();

          for (const group of groups) {
            const groupId = group.id;

            await this.$store.dispatch('fetchGroup', groupId);
            const budgetData = await this.$store.dispatch('group/fetchGroupBudget', groupId);

            const monthYear = `${this.selectedYear}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`;
            await this.$store.dispatch('group/fetchExpenses', { groupId, monthYear });

            const groupBudgetAmount = budgetData?.budget_amount || 0;
            const groupExpensesList = this.$store.state.group.expenses || [];
            const groupTotalExpense = groupExpensesList.reduce(
              (sum, item) => sum + Number(item.item_price),
              0
            );
            const groupRemaining = groupBudgetAmount - groupTotalExpense;

            // Instead of localStorage, save in reactive state:
            this.groupBudgets = {
              ...this.groupBudgets,
              [groupId]: groupBudgetAmount,
            };
            this.groupExpensesByGroup = {
              ...this.groupExpensesByGroup,
              [groupId]: groupTotalExpense,
            };
            this.groupRemainingByGroup = {
              ...this.groupRemainingByGroup,
              [groupId]: groupRemaining,
            };
          }
          this.selectedGroup = groups[0];
          this.setGroupData(this.selectedGroup);
        } else {
          console.warn('No groups found for user.');
        }
      } catch (error) {
        console.error('Failed to load group data:', error);
      }
    },

    setGroupData(group) {
      if (!group || !group.id) return;
      const id = group.id;

      this.groupBudget = this.groupBudgets[id] || 0;
      this.groupExpenses = this.groupExpensesByGroup[id] || 0;
      this.groupRemainingDisplay = this.groupRemainingByGroup[id] || 0;
    },

    async loadYear() {
    await this.$store.dispatch('fetchPersonalBudgets', this.selectedYear);
    await this.$store.dispatch('fetchViewExpenses', { year: this.selectedYear });

    const fresh = this.$store.getters.getViewExpenses || [];
    localStorage.setItem('personal_expenses', JSON.stringify(fresh));
    this.expenses = fresh;
  },
    reloadLocal() {
      this.expenses = JSON.parse(localStorage.getItem("personal_expenses")) || [];
    },

    onGroupChange() {
      this.setGroupData(this.selectedGroup);
    },
    closeModal() {
    this.showLogoutModal = false;
    },
    performLogout() {
        localStorage.clear();
        this.$store.dispatch("logout");  
        this.showLogoutModal = false;
        this.$router.push("/login");
      },
    },

    async mounted() {
    await this.loadYear(); 
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      this.userEmail = userData.email;
      this.userName  = userData.name;
    }

    await this.loadAllGroupsData();
  },
};
</script>

  
<style scoped>

  * {
    box-sizing: border-box;
  }

  
  .content-wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 60px; 
    width: 100%;
    overflow-x: hidden;
  }
  
  .profile-container {
    position: relative;
    margin-top: 70px;
    margin-bottom: 20px;
    background-color: #ffffff;
    border: 2px solid #115208;
    border-radius: 15px;
    padding: 0px 15px;
    width: 90%;
    height: auto;
    text-align: center;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  }
  
  .profile-container h2 {
    font-family: 'Poppins', sans-serif;
    font-size: 30px;
    margin-bottom: 20px;
  }
  
  .profile-container p {
    margin: 10px 0;
    font-family: 'Poppins', sans-serif;
    font-style: italic;
    font-size: 16px;
    margin-bottom: 16px;
  }

  .columns {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-top: 10px;
    padding: 0 10px 10px;
    width: 100%;
  }

  .column1 {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
    padding: 10px;
    width: 100%;
    box-shadow: 0 0 8px 0 rgba(21, 90, 3, 0.6);
    border-radius: 10px;
    flex: 1;
    margin-bottom: 20px;
  }

  .column {
    border-radius: 10px;
    box-shadow: 0 0 8px 0 rgba(21, 90, 3, 0.6);
    flex: 1;
    height: 250px;
    margin-top: 1rem;
    margin-bottom: 20px;
    max-width: 30%;
  }

  .info strong{
    font-style: normal;
  }

  .infos{
    gap: 1.5rem;
    margin-top: 20px;
    margin-left: 15px;
    text-align: start;
  }
  
  .infos strong{
    font-size: 14px;
  }


.group-selector {
  display: flex;
  flex-wrap: wrap;
  font-family: 'Poppins', sans-serif;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
}

.group-selector label {
  font-weight: bold;
  font-size: 14px;
  min-width: 100px;
}

.group-selector select {
  padding: 6px 12px;
  font-size: 14px;
  border: 1px solid #2a4935;
  border-radius: 5px;
  font-family: 'Poppins', sans-serif;
  max-width: 140px;
}

.section-title {
  width: 100%;
  margin-bottom: 10px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
}

.year-selector {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 10px;
    font-family: "Poppins", sans-serif;
    width: 100%;
  }

  .year-selector select {
    padding: 6px 10px;
    border: 1px solid #2a4935;
    border-radius: 5px;
    font-family: "Poppins", sans-serif;
  }
  
  .months-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    width: 100%;
    padding: 0 20px 20px;
  }

  .month-card {
    background: #e9f9e7a8;
    border-bottom: 3px solid rgb(21, 90, 3);
    border-radius: 5px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    padding: 8px 10px;
    text-align: left;
    font-family: "Poppins", sans-serif;
  }
  .month-card h4 {
    margin: 0 0 6px 0;
    font-size: 15px;
    text-align: center;
  }
  .month-card p {
    margin: 2px 0;
    font-size: 13px;
  }

.logout-wrapper {
  position: absolute;
  top: 15px;    /* Adjust top spacing */
  right: 15px;  /* Adjust right spacing */
  z-index: 10;
}

.logout-icon {
  background: #d80303;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  margin: 0; /* Remove bottom margin since it is now absolute */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.logout-icon .icon {
  width: 24px;
  height: 24px;
  stroke: #ffffff;
  transition: transform 0.2s;
}

.logout-icon:hover .icon {
  transform: scale(1.1);
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-card {
  background: #fff;
  width: 90%;
  max-width: 340px;
  padding: 20px 24px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0,0,0,.2);
  font-family: "Poppins", sans-serif;
}
.modal-card h3 { margin: 0 0 8px; font-size: 20px; }
.modal-card p  { margin: 0 0 20px; font-size: 14px; }

.btn-row {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.btn {
  flex: 1;
  padding: 8px 0;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
}
.btn.cancel  { background: #ccc; color: #333; }
.btn.confirm { background: #c50303; color: #fff; }
.btn:hover   { filter: brightness(.95); }

  
  /* Responsive Design */
  @media screen and (max-width: 1048px) {
    .content-wrapper {
      padding-top: 70px;
      padding-left: 20px;
      padding-right: 20px;
    }
  
    .profile-container p {
      font-size: 15px;
    }
  }
  
  @media screen and (max-width: 768px) {
    .content-wrapper {
      padding-top: 60px;
      padding-left: 10px;
      padding-right: 10px;
    }

    .columns {
      flex-direction: column;
    }
    .column,
    .column1 {
      max-width: 100% !important;
    }

    .months-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
    .profile-container {
      padding: 16px 12px;
    }
  
    .profile-container p {
      font-size: 14px;
    }
  }
  
  @media screen and (max-width: 480px) {
    .content-wrapper {
      padding-top: 60px;
      padding-left: 5px;
      padding-right: 5px;
    }
  
    .profile-container {
      padding: 12px 10px;
    }

    .profile-container h2 {
      font-size: 24px;
    }
  
    .profile-container p {
      font-size: 14px;
    }

    .months-grid {
    grid-template-columns: repeat(2, 1fr);
  }

    .infos strong {
      font-size: 13px;
    }
  }
  </style>
