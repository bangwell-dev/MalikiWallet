/**
 * MalikiWallet - Central State Management & Data Store
 * Sesuai Audit 1 & 5: Sinkronisasi data terpusat antar-halaman & State Kosongan (Default Empty State)
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'malikiwallet_db_v1';

  // State awal 100% KOSONG sesuai permintaan pengguna
  const EMPTY_STATE = {
    user: {
      name: '',
      nim: '',
      university: 'UIN Maulana Malik Ibrahim Malang',
      faculty: '',
      major: '',
      semester: '',
      email: '',
      phone: '',
      residence: 'kos',
      address: '',
      avatar: '',
      balance: 0,
      monthly_income: 0,
      monthly_expense: 0,
      ukt_target: 0,
      ukt_saved: 0,
      beasiswa: ''
    },
    budgets: [],
    transactions: [],
    isInitialized: true
  };

  // Data Demo / Dummy (dapat dimuat kapan saja dengan 1 klik atau di-reset ke kosong)
  const DEMO_FIXTURE = {
    user: {
      name: 'Muhammad Wildan',
      university: 'UIN Maulana Malik Ibrahim Malang',
      faculty: 'Sains dan Teknologi',
      major: 'Teknik Informatika',
      semester: 4,
      nim: '210605110000',
      email: 'wildan@student.uin-malang.ac.id',
      phone: '+62 812-3456-7890',
      residence: 'kos',
      address: 'Jl. Sunan Kalijaga No. 18, RT 03 / RW 04, Dinoyo, Lowokwaru, Malang',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      balance: 2450000,
      monthly_income: 3200000,
      monthly_expense: 1850000,
      ukt_target: 3200000,
      ukt_saved: 2850000,
      beasiswa: 'Tahfidz'
    },
    budgets: [
      {
        id: 'BDG001',
        category: 'Makanan & Minuman',
        allocated: 800000,
        spent: 680000,
        percentage: 85,
        icon: 'restaurant',
        color: '#0F5132'
      },
      {
        id: 'BDG002',
        category: 'Pendidikan & Kuliah',
        allocated: 400000,
        spent: 200000,
        percentage: 50,
        icon: 'menu_book',
        color: '#C59B27'
      },
      {
        id: 'BDG003',
        category: 'Transportasi',
        allocated: 300000,
        spent: 245000,
        percentage: 81,
        icon: 'local_gas_station',
        color: '#2563EB'
      },
      {
        id: 'BDG004',
        category: 'Kebutuhan Kos',
        allocated: 350000,
        spent: 310000,
        percentage: 88,
        icon: 'home',
        color: '#7C3AED'
      },
      {
        id: 'BDG005',
        category: 'Hiburan & Refreshing',
        allocated: 200000,
        spent: 215000,
        percentage: 107,
        icon: 'coffee',
        color: '#E11D48'
      }
    ],
    transactions: [
      {
        id: 'TRX001',
        title: 'Makan Siang Warteg Gajayana',
        category: 'Makanan & Minuman',
        type: 'expense',
        amount: 22000,
        date: '2026-09-25',
        time: '12:45',
        note: 'Makan siang setelah praktikum algo',
        method: 'QRIS Mandiri',
        receipt_scanned: true
      },
      {
        id: 'TRX002',
        title: 'Beasiswa Prestasi Tahfidz',
        category: 'Honor & Beasiswa',
        type: 'income',
        amount: 1500000,
        date: '2026-09-24',
        time: '09:30',
        note: 'Cair dari rektorat semester 4',
        method: 'BSI Mobile',
        receipt_scanned: false
      },
      {
        id: 'TRX003',
        title: 'Bensin Vario & Servis Ringan',
        category: 'Transportasi',
        type: 'expense',
        amount: 45000,
        date: '2026-09-24',
        time: '16:15',
        note: 'Isi pertalite pom Dinoyo',
        method: 'Cash / Tunai',
        receipt_scanned: false
      },
      {
        id: 'TRX004',
        title: 'Print Modul Kuliah & Buku Diktat',
        category: 'Pendidikan & Kuliah',
        type: 'expense',
        amount: 35000,
        date: '2026-09-23',
        time: '14:10',
        note: 'Fotocopy samping gerbang UIN Malang',
        method: 'Cash / Tunai',
        receipt_scanned: true
      },
      {
        id: 'TRX005',
        title: 'Kiriman Uang Saku Bulanan',
        category: 'Honor & Beasiswa',
        type: 'income',
        amount: 1700000,
        date: '2026-09-20',
        time: '08:00',
        note: 'Transfer dari orang tua',
        method: 'BSI Mobile',
        receipt_scanned: false
      },
      {
        id: 'TRX006',
        title: 'Kopi & Wifi Nugas di Kafe Soehat',
        category: 'Hiburan & Refreshing',
        type: 'expense',
        amount: 28000,
        date: '2026-09-19',
        time: '20:30',
        note: 'Diskusi kelompok tugas web',
        method: 'ShopeePay / GoPay',
        receipt_scanned: false
      }
    ],
    isInitialized: true
  };

  const subscribers = [];

  function loadState() {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      if (!serialized) {
        // Inisialisasi awal adalah STATE KOSONG
        saveState(EMPTY_STATE);
        return JSON.parse(JSON.stringify(EMPTY_STATE));
      }
      const parsed = JSON.parse(serialized);
      // Validasi struktur minimal
      if (!parsed.user || !Array.isArray(parsed.budgets) || !Array.isArray(parsed.transactions)) {
        saveState(EMPTY_STATE);
        return JSON.parse(JSON.stringify(EMPTY_STATE));
      }
      return parsed;
    } catch (e) {
      console.warn('Gagal membaca LocalStorage, memuat state kosongan:', e);
      return JSON.parse(JSON.stringify(EMPTY_STATE));
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      notifySubscribers(state);
    } catch (e) {
      console.error('Gagal menyimpan data ke LocalStorage:', e);
    }
  }

  function notifySubscribers(state) {
    const currentState = state || loadState();

    // Sinkronisasi otomatis data identitas di menu navigasi (sidebar & header)
    if (typeof MalikiStore !== 'undefined' && typeof MalikiStore.syncNavIdentity === 'function') {
      try {
        MalikiStore.syncNavIdentity(currentState);
      } catch (err) {
        console.error('Error saat syncNavIdentity di MalikiStore:', err);
      }
    }

    subscribers.forEach((fn) => {
      try {
        fn(currentState);
      } catch (err) {
        console.error('Error saat menjalankan subscriber MalikiStore:', err);
      }
    });
    // Trigger custom event untuk modul lain
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof CustomEvent === 'function') {
      try {
        window.dispatchEvent(
          new CustomEvent('maliki-store-update', {
            detail: currentState
          })
        );
      } catch (err) {}
    }
  }

  // Dengarkan perubahan antar-tab/window browser
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      notifySubscribers(loadState());
    }
  });

  const MalikiStore = {
    // Ambil seluruh state
    getState: function () {
      return loadState();
    },

    // Reset ke kosongan
    resetToEmpty: function () {
      const emptyCopy = JSON.parse(JSON.stringify(EMPTY_STATE));
      saveState(emptyCopy);
      return emptyCopy;
    },

    // Muat data demo untuk testing bila diinginkan
    loadDemoData: function () {
      const demoCopy = JSON.parse(JSON.stringify(DEMO_FIXTURE));
      saveState(demoCopy);
      return demoCopy;
    },

    // Cek apakah data masih kosong
    isEmpty: function () {
      const state = loadState();
      const hasNoUser = !state.user.name && !state.user.nim;
      const hasNoTx = !state.transactions || state.transactions.length === 0;
      const hasNoBudget = !state.budgets || state.budgets.length === 0;
      return hasNoUser && hasNoTx && hasNoBudget;
    },

    // Profil Pengguna
    getUser: function () {
      return loadState().user;
    },

    updateUser: function (fields) {
      const state = loadState();
      state.user = Object.assign({}, state.user, fields);
      saveState(state);
      return state.user;
    },

    // Transaksi
    getTransactions: function () {
      const state = loadState();
      return (state.transactions || []).sort((a, b) => {
        const timeA = new Date(a.date + ' ' + (a.time || '00:00')).getTime() || 0;
        const timeB = new Date(b.date + ' ' + (b.time || '00:00')).getTime() || 0;
        return timeB - timeA;
      });
    },

    addTransaction: function (tx) {
      const state = loadState();
      const newTx = Object.assign(
        {
          id: 'TRX' + Date.now().toString().slice(-6),
          date: new Date().toISOString().slice(0, 10),
          time: new Date().toTimeString().slice(0, 5),
          receipt_scanned: false,
          method: 'BSI Mobile'
        },
        tx
      );

      // Pastikan nominal bertipe angka
      newTx.amount = Math.abs(parseInt(newTx.amount, 10) || 0);

      // Tambahkan ke transaksi
      state.transactions.unshift(newTx);

      // Hitung ulang saldo
      if (newTx.type === 'income') {
        state.user.balance = (state.user.balance || 0) + newTx.amount;
        state.user.monthly_income = (state.user.monthly_income || 0) + newTx.amount;
      } else {
        state.user.balance = Math.max(0, (state.user.balance || 0) - newTx.amount);
        state.user.monthly_expense = (state.user.monthly_expense || 0) + newTx.amount;
      }

      saveState(state);
      return newTx;
    },

    deleteTransaction: function (id) {
      const state = loadState();
      const index = state.transactions.findIndex((t) => t.id === id);
      if (index !== -1) {
        const removed = state.transactions[index];
        state.transactions.splice(index, 1);

        // Kembalikan saldo
        if (removed.type === 'income') {
          state.user.balance = Math.max(0, (state.user.balance || 0) - removed.amount);
          state.user.monthly_income = Math.max(0, (state.user.monthly_income || 0) - removed.amount);
        } else {
          state.user.balance = (state.user.balance || 0) + removed.amount;
          state.user.monthly_expense = Math.max(0, (state.user.monthly_expense || 0) - removed.amount);
        }

        saveState(state);
        return true;
      }
      return false;
    },

    // Budgets
    getBudgets: function () {
      const state = loadState();
      const budgets = state.budgets || [];
      const txs = state.transactions || [];

      // Hitung realisasi pengeluaran dinamis dari transaksi
      return budgets.map((b) => {
        const spent = txs
          .filter((t) => t.type === 'expense' && (t.category || '').toLowerCase().includes(b.category.toLowerCase().split(' ')[0]))
          .reduce((sum, t) => sum + (t.amount || 0), 0);

        const allocated = b.allocated || 1;
        const percentage = Math.round((spent / allocated) * 100);

        return Object.assign({}, b, {
          spent: spent,
          percentage: percentage,
          remaining: Math.max(0, allocated - spent)
        });
      });
    },

    addBudget: function (budget) {
      const state = loadState();
      const newBudget = Object.assign(
        {
          id: 'BDG' + Date.now().toString().slice(-4),
          icon: 'category',
          color: '#0F5132',
          allocated: 0
        },
        budget
      );
      newBudget.allocated = parseInt(newBudget.allocated, 10) || 0;
      state.budgets.push(newBudget);
      saveState(state);
      return newBudget;
    },

    updateBudget: function (id, fields) {
      const state = loadState();
      const budget = state.budgets.find((b) => b.id === id);
      if (budget) {
        Object.assign(budget, fields);
        saveState(state);
        return budget;
      }
      return null;
    },

    deleteBudget: function (id) {
      const state = loadState();
      const idx = state.budgets.findIndex((b) => b.id === id);
      if (idx !== -1) {
        state.budgets.splice(idx, 1);
        saveState(state);
        return true;
      }
      return false;
    },

    // Kalkulasi Finansial Terpadu
    getFinancials: function () {
      const state = loadState();
      const txs = state.transactions || [];
      const budgets = this.getBudgets();

      const totalIncome = txs.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
      const totalExpense = txs.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

      // Saldo dihitung dari saldo awal user + akumulasi transaksi masuk - keluar
      const balance = (this.isEmpty() && txs.length === 0)
        ? 0
        : (state.user.balance !== undefined && state.user.balance !== 0) 
          ? state.user.balance 
          : Math.max(0, totalIncome - totalExpense);

      const totalBudgetAllocated = budgets.reduce((sum, b) => sum + (b.allocated || 0), 0);
      const totalBudgetSpent = budgets.reduce((sum, b) => sum + (b.spent || 0), 0);
      const remainingBudget = Math.max(0, totalBudgetAllocated - totalBudgetSpent);
      const budgetPercent = totalBudgetAllocated > 0 ? Math.round((totalBudgetSpent / totalBudgetAllocated) * 100) : 0;

      const dailyAvg = totalExpense > 0 ? Math.round(totalExpense / 30) : 0;
      const expenseRatio = totalIncome > 0 ? ((totalExpense / totalIncome) * 100).toFixed(1) : 0;

      return {
        balance,
        totalIncome,
        totalExpense,
        monthly_income: totalExpense > 0 || totalIncome > 0 ? totalIncome : (state.user.monthly_income || 0),
        monthly_expense: totalExpense > 0 ? totalExpense : (state.user.monthly_expense || 0),
        totalBudgetAllocated,
        totalBudgetSpent,
        remainingBudget,
        budgetPercent,
        dailyAvg,
        expenseRatio,
        txCount: txs.length
      };
    },

    // Format Rupiah standar Indonesia
    formatRupiah: function (amount) {
      const num = parseInt(amount, 10) || 0;
      return 'Rp' + num.toLocaleString('id-ID');
    },

    // Subscribe ke pembaruan data
    subscribe: function (callback) {
      if (typeof callback === 'function') {
        subscribers.push(callback);
        // Panggil langsung pada inisialisasi awal
        callback(loadState());
      }
      return function unsubscribe() {
        const idx = subscribers.indexOf(callback);
        if (idx !== -1) subscribers.splice(idx, 1);
      };
    },

    // Sinkronisasi data identitas navigasi (Sidebar, Header, Mobile Header) ke seluruh halaman
    syncNavIdentity: function (customState) {
      if (typeof document === 'undefined') return;
      const state = customState || loadState();
      const user = (state && state.user) ? state.user : {};

      const hasName = Boolean(user.name && user.name.trim());
      const hasNim = Boolean(user.nim && user.nim.trim());
      const hasMajor = Boolean(user.major && user.major.trim());

      const displayName = hasName ? user.name.trim() : 'Mahasiswa UIN';
      const displayMajor = hasMajor
        ? (user.major.trim() + (user.semester ? ' • Semester ' + user.semester : ''))
        : (user.faculty ? user.faculty.trim() : 'UIN Maulana Malik Ibrahim');
      const displayNim = hasNim ? ('NIM ' + user.nim.trim()) : 'Lengkapi Profil';

      const initials = hasName
        ? user.name
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .map(function (w) { return w[0]; })
            .join('')
            .slice(0, 2)
            .toUpperCase()
        : '';

      const avatarHtml = initials
        ? initials
        : '<span class="material-symbols-outlined text-[18px]">person</span>';

      // 1. Sidebar Elements
      const sideName = document.getElementById('sidebar-user-name');
      const sideMajor = document.getElementById('sidebar-user-major');
      const sideAvatar = document.getElementById('sidebar-user-avatar');

      if (sideName) sideName.textContent = displayName;
      if (sideMajor) sideMajor.textContent = displayMajor;
      if (sideAvatar) sideAvatar.innerHTML = avatarHtml;

      // 2. Header Desktop/Tablet Elements
      const headName = document.getElementById('header-user-name');
      const headNim = document.getElementById('header-user-nim');
      const headAvatar = document.getElementById('header-user-avatar');

      if (headName) headName.textContent = displayName;
      if (headNim) headNim.textContent = displayNim;
      if (headAvatar) headAvatar.innerHTML = avatarHtml;

      // 3. Header Mobile Avatar
      const headAvatarMob = document.getElementById('header-user-avatar-mobile');
      if (headAvatarMob) headAvatarMob.innerHTML = avatarHtml;
    }
  };

  // Universal Mobile Navigation Helper - Menangani navigasi responsif & scroll-to-top jika di halaman yang sama
  window.malikiNavigate = function (event, targetUrl) {
    if (event) {
      try {
        event.preventDefault();
        event.stopPropagation();
      } catch (err) {}
    }

    const btn = event && event.currentTarget ? event.currentTarget : null;
    if (btn) {
      btn.style.transform = 'scale(0.88)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 180);
    }

    const currentPath = window.location.pathname.replace(/\\/g, '/').toLowerCase();
    const cleanTarget = targetUrl.replace(/\\/g, '/').toLowerCase();
    
    // Deteksi apakah target adalah halaman yang sedang aktif
    let isCurrentPage = false;
    if (cleanTarget.includes('dashboard') && (currentPath.includes('/dashboard/') || currentPath.endsWith('/dashboard/index.html') || currentPath.endsWith('index.html') && !currentPath.includes('/budget/') && !currentPath.includes('/daftartransaksi/') && !currentPath.includes('/profil/') && !currentPath.includes('/analisis/') && !currentPath.includes('/scannota/'))) {
      isCurrentPage = true;
    } else if (cleanTarget.includes('daftartransaksi') && currentPath.includes('/daftartransaksi/')) {
      isCurrentPage = true;
    } else if (cleanTarget.includes('budget') && currentPath.includes('/budget/')) {
      isCurrentPage = true;
    } else if (cleanTarget.includes('profil') && currentPath.includes('/profil/')) {
      isCurrentPage = true;
    } else if (cleanTarget.includes('analisis') && currentPath.includes('/analisis/')) {
      isCurrentPage = true;
    }

    if (isCurrentPage) {
      // Halaman sama: scroll halus ke puncak
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 80);
    }
  };

  // Ekspos ke global window
  window.MalikiStore = MalikiStore;

  // Enhance all mobile nav links on page load for instant tactile feedback
  function initMobileNavFeedback() {
    const mobileLinks = document.querySelectorAll('.lg\\:hidden nav a, nav[data-mobile-bar] a');
    mobileLinks.forEach(link => {
      link.classList.add('cursor-pointer', 'select-none', 'transition-transform', 'active:scale-90');
      const href = link.getAttribute('href');
      if (href && !link.getAttribute('onclick')) {
        link.addEventListener('click', (e) => {
          window.malikiNavigate(e, href);
        });
      }
    });
  }

  // Render widget saklar Data Kosongan / Demo di pojok layar untuk kemudahan inspeksi
  function injectDataModeWidget() {
    if (document.getElementById('maliki-data-switcher')) return;

    const widget = document.createElement('div');
    widget.id = 'maliki-data-switcher';
    widget.className =
      'fixed top-20 right-3 z-30 bg-surface-container-lowest/95 backdrop-blur-md border border-surface-container-high rounded-2xl shadow-xl p-2 sm:p-2.5 flex items-center gap-1.5 sm:gap-2 text-xs transition-all duration-300';
    widget.innerHTML = `
      <div class="flex items-center gap-1.5 pl-1 pr-2">
        <span class="w-2 h-2 rounded-full ${MalikiStore.isEmpty() ? 'bg-amber-500' : 'bg-primary'} animate-pulse"></span>
        <span class="font-bold text-on-surface text-[11px]">${MalikiStore.isEmpty() ? 'Status: Data Kosong' : 'Status: Data Terisi'}</span>
      </div>
      <button id="btn-toggle-demo" type="button" class="px-2.5 py-1 rounded-lg ${MalikiStore.isEmpty() ? 'bg-primary text-on-primary font-semibold hover:bg-primary-container' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'} transition-colors cursor-pointer text-[11px]">
        ${MalikiStore.isEmpty() ? '+ Muat Data Contoh' : '↺ Reset Kosong'}
      </button>
    `;

    document.body.appendChild(widget);

    document.getElementById('btn-toggle-demo').addEventListener('click', () => {
      if (MalikiStore.isEmpty()) {
        MalikiStore.loadDemoData();
      } else {
        if (confirm('Kosongkan kembali seluruh data (grafik, profil, transaksi, budget)?')) {
          MalikiStore.resetToEmpty();
        }
      }
    });

    // Update widget saat data berubah
    MalikiStore.subscribe(() => {
      const btn = document.getElementById('btn-toggle-demo');
      const statusText = widget.querySelector('span.font-bold');
      const dot = widget.querySelector('span.w-2.h-2');
      if (btn && statusText && dot) {
        if (MalikiStore.isEmpty()) {
          dot.className = 'w-2 h-2 rounded-full bg-amber-500 animate-pulse';
          statusText.textContent = 'Status: Data Kosong';
          btn.className = 'px-2.5 py-1 rounded-lg bg-primary text-on-primary font-semibold hover:bg-primary-container transition-colors cursor-pointer text-[11px]';
          btn.textContent = '+ Muat Data Contoh';
        } else {
          dot.className = 'w-2 h-2 rounded-full bg-primary animate-pulse';
          statusText.textContent = 'Status: Data Terisi';
          btn.className = 'px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer text-[11px]';
          btn.textContent = '↺ Reset Kosong';
        }
      }
    });
  }

  // Inisialisasi widget & navigasi mobile saat DOM siap
  function initStoreUI() {
    initMobileNavFeedback();
    if (typeof MalikiStore !== 'undefined' && typeof MalikiStore.syncNavIdentity === 'function') {
      MalikiStore.syncNavIdentity();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStoreUI);
  } else {
    initStoreUI();
  }
})();
