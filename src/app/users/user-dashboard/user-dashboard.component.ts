
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { Payment } from 'src/app/shared/bills/manage-payments/payment.model';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('expensesChart', { static: false }) expensesChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('incomeChart', { static: false }) incomeChart!: ElementRef<HTMLCanvasElement>;

  // User Data
  userName: string = 'User';
  isProcessing: boolean = false;
  transactions: Payment[] = [];
  errorMessage: string = '';

  // Dashboard Data
  totalExpenses: number = 1125;
  expensePeriod: string = 'FEBRUARY';
  positiveIndicator: number = 35;
  negativeIndicator: number = 15;
  
  dailyFrequency: number = 7.1;
  weeklyFrequency: number = 51.0;
  dailyChange: number = 10.5;
  weeklyChange: number = 4.9;
  
  monthlyExpenses: number = 1786;
  monthlyIncome: number = 2490;
  currentMonth: string = 'FEBRUARY';

  availableBalance: number = 12540;
  pendingBillsCount: number = 5;
  monthlySavings: number = 3250;

  // Popular Categories
  popularCategories = [
    { name: 'Food', amount: 340, icon: 'pi pi-shopping-cart', color: '#10B981' },
    { name: 'Restaurant & Cafe', amount: 169, icon: 'pi pi-home', color: '#EF4444' },
    { name: 'Fuel', amount: 420, icon: 'pi pi-car', color: '#F59E0B' },
    { name: 'Kindergarten', amount: 340, icon: 'pi pi-book', color: '#8B5CF6' },
    { name: 'Rent', amount: 234, icon: 'pi pi-building', color: '#06B6D4' },
    { name: 'Other', amount: 160, icon: 'pi pi-ellipsis-h', color: '#6B7280' }
  ];

  // Popular Transactions
  popularTransactions = [
    { name: 'Coffee in Starbucks', type: 'Fuel car in Uno', amount: 340 },
    { name: 'Fuel car in Uno', type: 'Fuel car in Uno', amount: 340 },
    { name: 'Vegetables in Baking', type: 'Vegetables in Baking', amount: 120 },
    { name: 'Phone bill', type: 'Phone bill', amount: 89 },
    { name: 'Internet bill', type: 'Internet bill', amount: 120 },
    { name: 'Rent', type: 'Rent', amount: 1200 }
  ];

  // Recent Transactions (derived from actual data)
  recentTransactions: Payment[] = [];

  // Chart instances
  private expensesChartInstance?: Chart;
  private incomeChartInstance?: Chart;

  constructor(
    private router: Router,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    // Load username from local storage
    const storedUserName = localStorage.getItem('username');
    this.userName = storedUserName ? storedUserName : 'User';

    this.fetchPayments();
    this.calculateDashboardMetrics();
  }

  ngAfterViewInit(): void {
    // Initialize charts after view is ready
    setTimeout(() => {
      this.initializeCharts();
    }, 100);
  }

  /**
   * Fetch all payments and update dashboard
   */
  fetchPayments(): void {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.paymentService.searchPaymentsByUserId(+userId).subscribe({
        next: (data) => {
          this.transactions = data;
          this.recentTransactions = data.slice(0, 6); // Show only recent 6
          this.calculateDashboardMetrics();
        },
        error: (error) => {
          this.errorMessage = `Error fetching transactions: ${error.message}`;
        },
      });
    } else {
      this.errorMessage = 'User not logged in!';
    }
  }

  /**
   * Calculate dashboard metrics from actual data
   */
  calculateDashboardMetrics(): void {
    if (this.transactions.length > 0) {
      // Calculate total expenses from actual data
      this.totalExpenses = this.transactions
        .filter(t => t.paymentStatus === 'Paid')
        .reduce((sum, t) => sum + (t.amount || 0), 0);

      // Calculate pending bills count
      this.pendingBillsCount = this.transactions
        .filter(t => t.paymentStatus === 'Pending').length;

      // Estimate available balance (mock calculation)
      this.availableBalance = Math.max(15000 - this.totalExpenses, 1000);
      
      // Calculate monthly savings (mock)
      this.monthlySavings = Math.max(this.monthlyIncome - this.totalExpenses, 0);
    }
  }

  /**
   * Initialize Chart.js charts
   */
  initializeCharts(): void {
    this.createExpensesChart();
    this.createIncomeChart();
  }

  /**
   * Create expenses chart (area chart)
   */
  createExpensesChart(): void {
    if (!this.expensesChart?.nativeElement) return;

    const ctx = this.expensesChart.nativeElement.getContext('2d');
    if (!ctx) return;

    // Mock data for expenses chart
    const expensesData = [200, 450, 300, 600, 400, 800, 500, 350, 700, 450, 600, 400];
    const averageData = [400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400];

    this.expensesChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Expenses',
            data: expensesData,
            borderColor: '#EF4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#EF4444',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
          },
          {
            label: 'Average',
            data: averageData,
            borderColor: '#6B7280',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            fill: false,
            pointRadius: 0,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            display: false,
            grid: {
              display: false
            }
          },
          y: {
            display: false,
            grid: {
              display: false
            }
          }
        },
        elements: {
          line: {
            borderWidth: 2
          }
        }
      }
    });
  }

  /**
   * Create income vs expenses chart
   */
  createIncomeChart(): void {
    if (!this.incomeChart?.nativeElement) return;

    const ctx = this.incomeChart.nativeElement.getContext('2d');
    if (!ctx) return;

    // Mock data for income/expenses comparison
    const incomeData = [2200, 2400, 2100, 2600, 2300, 2500, 2400, 2300, 2700, 2400, 2500, 2490];
    const expenseData = [1400, 1600, 1300, 1800, 1500, 1700, 1600, 1500, 1900, 1600, 1700, 1786];

    this.incomeChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Income',
            data: incomeData,
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#10B981',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
          },
          {
            label: 'Expenses',
            data: expenseData,
            borderColor: '#EF4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#EF4444',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            display: false,
            grid: {
              display: false
            }
          },
          y: {
            display: false,
            grid: {
              display: false
            }
          }
        },
        elements: {
          line: {
            borderWidth: 2
          }
        }
      }
    });
  }

  /**
   * Navigation methods
   */
  onPayNow(): void {
    this.isProcessing = true;
    // Simulate processing delay
    setTimeout(() => {
      this.isProcessing = false;
      this.router.navigate(['/payment']);
    }, 1500);
  }

  goToViewBills(): void {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.router.navigate(['/bills'], { queryParams: { userId } });
    } else {
      alert('User not logged in!');
    }
  }

  goToPaymentHistory(): void {
    this.router.navigate(['/payment-history']);
  }

  goToAccount(): void {
    this.router.navigate(['/account']);
  }

  logout(): void {
    if (confirm('Are you sure you want to log out?')) {
      localStorage.clear();
      this.router.navigate(['/signin']);
    }
  }

  /**
   * Transaction helper methods
   */
  getTransactionIcon(status: string): string {
    switch (status) {
      case 'Paid': return 'pi pi-check-circle';
      case 'Pending': return 'pi pi-clock';
      case 'Failed': return 'pi pi-times-circle';
      default: return 'pi pi-info-circle';
    }
  }

  getTransactionIconClass(status: string): string {
    switch (status) {
      case 'Paid': return 'transaction-icon success';
      case 'Pending': return 'transaction-icon warning';
      case 'Failed': return 'transaction-icon danger';
      default: return 'transaction-icon info';
    }
  }

  getAmountClass(status: string): string {
    return status === 'Paid' ? 'amount-negative' : 'amount-neutral';
  }

  getAmountPrefix(status: string): string {
    return status === 'Paid' ? '-' : '';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Paid': return 'status-success';
      case 'Pending': return 'status-warning';
      case 'Failed': return 'status-danger';
      default: return 'status-info';
    }
  }

  formatDate(dateString: string | null): string {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'Invalid Date';
    }
  }

  viewTransaction(transaction: Payment): void {
    // Navigate to transaction details or show modal
    alert(`Transaction Details:\nBill ID: ${transaction.bill_id}\nAmount: ₹${transaction.amount}\nStatus: ${transaction.paymentStatus}\nDate: ${this.formatDate(transaction.paymentDate)}`);
  }

  ngOnDestroy(): void {
    // Clean up chart instances
    if (this.expensesChartInstance) {
      this.expensesChartInstance.destroy();
    }
    if (this.incomeChartInstance) {
      this.incomeChartInstance.destroy();
    }
  }
}
