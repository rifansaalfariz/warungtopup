
import React, { useState, useEffect, useMemo } from 'react';
import { GameList } from './components/GameList';
import { TopUpForm } from './components/TopUpForm';
import { Dashboard } from './components/Dashboard';
import { TransactionTracker } from './components/TransactionTracker';
import { AdminLogin } from './components/AdminLogin';
import { Game } from './types';

const GAMES: Game[] = [
  { 
    id: 'ml', 
    name: 'Mobile Legends', 
    category: 'MOBA',
    // User-provided Mobile Legends image (external link). If it fails to load the app will fall back to the local SVG.
    image: 'https://www.apkmirror.com/wp-content/themes/APKMirror/ap_resize/ap_resize.php?src=https%3A%2F%2Fdownloadr2.apkmirror.com%2Fwp-content%2Fuploads%2F2025%2F11%2F75%2F690ad3103886b_com.mobile.legends.png&w=192&h=192&q=100',
    description: 'Top up Diamond instant 24/7',
    nominals: [
      { id: 'ml1', amount: '86 Diamonds', price: 20000 },
      { id: 'ml2', amount: '172 Diamonds', price: 40000 },
      { id: 'ml3', amount: '257 Diamonds', price: 60000 },
      { id: 'ml4', amount: '706 Diamonds', price: 160000 },
    ]
  },
  { 
    id: 'ff', 
    name: 'Free Fire', 
    category: 'Battle Royale',
    // Use image from VIVA article
    image: 'https://thumb.viva.id/vivadigital/1265x711/2025/05/21/682d1c9a4a2fd-free-fire_digital.jpg', 
    description: 'Diamond FF termurah & legal',
    nominals: [
      { id: 'ff1', amount: '70 Diamonds', price: 10000 },
      { id: 'ff2', amount: '140 Diamonds', price: 20000 },
      { id: 'ff3', amount: '355 Diamonds', price: 50000 },
      { id: 'ff4', amount: '720 Diamonds', price: 100000 },
    ]
  },
  { 
    id: 'gi', 
    name: 'Genshin Impact', 
    category: 'RPG',
    // User-provided Genshin packshot
    image: 'https://gmedia.playstation.com/is/image/SIEPDC/genshin-impact-packshot-01-en-18jun21?$1600px$', 
    description: 'Genesis Crystal via Login/UID',
    nominals: [
      { id: 'gi1', amount: '60 Genesis Crystals', price: 16000 },
      { id: 'gi2', amount: '300 Genesis Crystals', price: 79000 },
      { id: 'gi3', amount: '980 Genesis Crystals', price: 249000 },
      { id: 'gi4', amount: 'Blessing of the Welkin Moon', price: 79000 },
    ]
  },
  { 
    id: 'val', 
    name: 'Valorant', 
    category: 'FPS',
    // User-provided Valorant image
    image: 'https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/valo2.png', 
    description: 'VP diproses hitungan detik',
    nominals: [
      { id: 'v1', amount: '475 Points', price: 50000 },
      { id: 'v2', amount: '1000 Points', price: 100000 },
      { id: 'v3', amount: '2050 Points', price: 200000 },
    ]
  },
  { 
    id: 'pubg', 
    name: 'PUBG Mobile', 
    category: 'Battle Royale',
    image: 'https://www.apkmirror.com/wp-content/themes/APKMirror/ap_resize/ap_resize.php?src=https%3A%2F%2Fdownloadr2.apkmirror.com%2Fwp-content%2Fuploads%2F2025%2F09%2F03%2F68b8f42815eab_com.pubg.krmobile.png&w=192&h=192&q=100', 
    description: 'UC PUBG Global & Indo',
    nominals: [
      { id: 'p1', amount: '60 UC', price: 14500 },
      { id: 'p2', amount: '325 UC', price: 72500 },
      { id: 'p3', amount: '660 UC', price: 145000 },
      { id: 'p4', amount: '1800 UC', price: 365000 },
      { id: 'p5', amount: '3850 UC', price: 725000 },
    ]
  },
  { 
    id: 'codm', 
    name: 'CODM', 
    category: 'FPS',
    image: 'https://upload.wikimedia.org/wikipedia/id/0/07/CODM_logo.png', 
    description: 'CP CODM Garena & Global',
    nominals: [
      { id: 'c1', amount: '31 CP', price: 5000 },
      { id: 'c2', amount: '63 CP', price: 10000 },
      { id: 'c3', amount: '128 CP', price: 20000 },
      { id: 'c4', amount: '320 CP', price: 50000 },
    ]
  },
  {
    id: 'rb',
    name: 'Roblox',
    category: 'Others',
    image: 'https://4kwallpapers.com/images/walls/thumbs_3t/20143.jpg',
    description: 'Top up Robux cepat & aman',
    nominals: [
      { id: 'rb1', amount: '40 Robux', price: 5000 },
      { id: 'rb2', amount: '100 Robux', price: 12000 },
      { id: 'rb3', amount: '400 Robux', price: 45000 },
      { id: 'rb4', amount: '1000 Robux', price: 100000 },
    ]
  }
];

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'topup' | 'admin' | 'tracker'>('home');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featuredGames = useMemo(() => GAMES.slice(0, Math.min(GAMES.length, 6)), []);

  // Per-game voucher definitions — change values as needed
  const voucherMap = useMemo(() => ({
    ml: 'Voucher Rp 15.000',
    ff: 'Voucher Rp 10.000',
    gi: 'Voucher Rp 20.000',
    val: 'Voucher Rp 10.000',
    pubg: 'Voucher Rp 5.000',
    codm: 'Bonus 2x CP',
    rb: 'Bonus 50 Robux'
  }), []);

  const currentFeatured = featuredGames[featuredIndex];
  const voucherText = currentFeatured ? (voucherMap[currentFeatured.id] || 'Voucher Rp 10.000') : 'Voucher Rp 10.000';

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'name' | 'id'>('name');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (featuredGames.length === 0) return;
    const t = setInterval(() => {
      setFeaturedIndex((i) => (i + 1) % featuredGames.length);
    }, 5000);
    return () => clearInterval(t);
  }, [featuredGames.length]);

  const handleSelectGame = (game: Game) => {
    setSelectedGame(game);
    setView('topup');
    setSearchQuery('');
    window.scrollTo(0, 0);
  };

  const filteredGames = useMemo(() => {
    return GAMES
      .filter(game => {
        const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return a.id.localeCompare(b.id);
      });
  }, [searchQuery, selectedCategory, sortBy]);

  const categories = ['All', 'MOBA', 'Battle Royale', 'RPG', 'FPS'];

  return (
    <div className="flex flex-col min-h-screen selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-md py-3 shadow-2xl' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center neon-glow">
              <span className="font-extrabold text-xl">W</span>
            </div>
            <h1 className="text-xl font-extrabold tracking-tighter">WARUNG<span className="text-indigo-500">TOPUP</span></h1>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-medium text-sm">
            <button onClick={() => { setView('home'); setTimeout(() => document.getElementById('games')?.scrollIntoView(), 100); }} className="hover:text-indigo-400 transition">Games</button>
            <button onClick={() => setView('tracker')} className={`hover:text-indigo-400 transition ${view === 'tracker' ? 'text-indigo-500 font-bold' : ''}`}>Cek Transaksi</button>
            <button 
              onClick={() => setView('admin')}
              className={`px-5 py-2 rounded-full border transition-all ${view === 'admin' ? 'bg-indigo-600 border-indigo-600' : 'border-slate-700 hover:border-indigo-500'}`}
            >
              {isAdminLoggedIn ? 'Admin Panel' : 'Login Admin'}
            </button>
          </div>

          <button className="md:hidden text-2xl">☰</button>
        </div>
      </nav>

      <main className="flex-grow">
        {view === 'home' && (
          <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-32 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 blur-[100px] rounded-full -z-10"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/15 blur-[100px] rounded-full -z-10"></div>
              <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full text-indigo-400 text-sm font-semibold">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                    Fitur Pembeli & Admin Terintegrasi
                  </div>
                  <h2 className="text-5xl md:text-7xl font-extrabold leading-[1.1]">
                    Top-Up Game <br />
                    <span className="text-gradient">Mudah & Aman</span> <br />
                    untuk Semua.
                  </h2>
                  <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
                    Pembeli bisa top-up instan dan cek status pesanan. Admin bisa kelola seluruh transaksi dengan dashboard yang intuitif.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => document.getElementById('games')?.scrollIntoView()} className="bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 neon-glow">
                      Mulai Top-Up
                    </button>
                    <button onClick={() => setView('tracker')} className="bg-slate-800 hover:bg-slate-700 px-8 py-4 rounded-2xl font-bold text-lg border border-slate-700 transition-all">
                      Cek Pesanan Saya
                    </button>
                  </div>
                </div>
                <div className="relative hidden lg:block">
                  {featuredGames.length > 0 && (
                    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl group border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300">
                      <img
                        src={featuredGames[featuredIndex].image}
                        alt={featuredGames[featuredIndex].name}
                        loading="lazy"
                        onClick={() => handleSelectGame(featuredGames[featuredIndex])}
                        onError={(e) => {
                          const img = e.currentTarget as HTMLImageElement;
                          const fid = featuredGames[featuredIndex].id;
                          const fallbacks: Record<string, string> = {
                            ml: '/assets/mobile-legends.svg',
                            ff: '/assets/free-fire.svg',
                            val: '/assets/valorant.svg',
                            pubg: '/assets/pubg.svg',
                            codm: '/assets/codm.svg',
                            gi: '/assets/genshin.svg'
                          };
                          const fallback = fallbacks[fid];
                          if (fallback && img.src !== fallback) img.src = fallback;
                        }}
                        className="w-full h-96 object-cover group-hover:scale-105 transition-all duration-500 cursor-pointer"
                      />

                      <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-transparent"></div>

                      {/* Enhanced floating promo card */}
                      <div className="absolute left-6 bottom-6 w-80 md:w-96 bg-gradient-to-br from-indigo-950/90 to-purple-950/90 backdrop-blur-lg border border-indigo-500/30 rounded-2xl p-5 text-white shadow-2xl flex items-center gap-4 transform transition-all duration-300 hover:-translate-y-3 hover:border-indigo-500/60 hover:shadow-indigo-500/20">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center p-2 border border-indigo-400/20">
                          <img
                            src={featuredGames[featuredIndex].image}
                            alt={featuredGames[featuredIndex].name}
                            onError={(e) => {
                              const img = e.currentTarget as HTMLImageElement;
                              const fid = featuredGames[featuredIndex].id;
                              const fallbacks: Record<string, string> = {
                                ml: '/assets/mobile-legends.svg',
                                ff: '/assets/free-fire.svg',
                                val: '/assets/valorant.svg',
                                pubg: '/assets/pubg.svg',
                                codm: '/assets/codm.svg',
                                gi: '/assets/genshin.svg',
                                rb: '/assets/roblox.svg'
                              };
                              const fallback = fallbacks[fid];
                              if (fallback && img.src !== fallback) img.src = fallback;
                            }}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="text-xs font-semibold text-indigo-300 tracking-widest uppercase">✨ Promo & Bonus</div>
                          <h4 className="text-base font-extrabold mt-2 text-white leading-tight">Top Up {featuredGames[featuredIndex].name}</h4>
                          <p className="text-[12px] mt-1 text-indigo-200/80">Dapatkan bonus & voucher eksklusif</p>

                          <div className="mt-3 flex items-center gap-2">
                            <div className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-xs font-extrabold text-white shadow-lg">{voucherText}</div>
                            <button onClick={(e) => { e.stopPropagation(); handleSelectGame(featuredGames[featuredIndex]); }} className="ml-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-4 py-2 rounded-lg text-xs font-bold text-white shadow-lg transition-all">Top Up</button>
                          </div>
                        </div>

                        <button onClick={(e) => { e.stopPropagation(); setFeaturedIndex((i) => (i + 1) % featuredGames.length); }} className="absolute -right-3 -top-3 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-indigo-500/50 flex items-center justify-center transition-all hover:scale-110">➜</button>
                      </div>

                      <div className="absolute left-6 bottom-6 text-white">
                        <h3 className="text-2xl font-extrabold">{featuredGames[featuredIndex].name}</h3>
                        <p className="text-sm text-slate-200/80 max-w-md">{featuredGames[featuredIndex].description}</p>
                      </div>

                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                        <button onClick={(e) => { e.stopPropagation(); setFeaturedIndex((i) => (i - 1 + featuredGames.length) % featuredGames.length); }} className="p-2 bg-slate-800/60 rounded text-white">◀</button>
                        <button onClick={(e) => { e.stopPropagation(); setFeaturedIndex((i) => (i + 1) % featuredGames.length); }} className="p-2 bg-slate-800/60 rounded text-white">▶</button>
                      </div>

                      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2">
                        {featuredGames.map((_, idx) => (
                          <button key={idx} onClick={(e) => { e.stopPropagation(); setFeaturedIndex(idx); }} className={`w-2 h-2 rounded-full ${idx === featuredIndex ? 'bg-indigo-500' : 'bg-slate-700/50'}`}></button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Games Grid */}
            <section id="games" className="py-24">
              <div className="container mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                  <h3 className="text-4xl font-extrabold">Daftar Game</h3>
                  <p className="text-slate-400">Temukan game favoritmu dan mulai top-up sekarang</p>
                </div>
                {/* Search and Filters UI */}
                <div className="mb-12 space-y-8">
                  <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="relative w-full md:max-w-md group">
                      <input 
                        type="text" 
                        placeholder="Cari game..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (filteredGames.length > 0) {
                              handleSelectGame(filteredGames[0]);
                            }
                          }
                        }}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)}
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-6 pr-6 focus:outline-none focus:border-indigo-500 transition-all"
                      />

                      {searchQuery.trim() && filteredGames.length > 0 && isSearchFocused && (
                        <div className="absolute left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-lg z-50 max-h-56 overflow-auto">
                          {filteredGames.slice(0,5).map(g => (
                            <button key={g.id} onMouseDown={(ev) => { ev.preventDefault(); handleSelectGame(g); }} className="w-full text-left px-4 py-3 hover:bg-slate-800 transition flex items-center gap-3">
                              <img src={g.image} alt={g.name} className="w-10 h-10 object-cover rounded-md" />
                              <div>
                                <div className="text-sm font-semibold">{g.name}</div>
                                <div className="text-[11px] text-slate-500">{g.category}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'name' | 'id')}
                        className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm"
                      >
                        <option value="name">Nama (A-Z)</option>
                        <option value="id">Terbaru</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                          selectedCategory === cat ? 'bg-indigo-600' : 'bg-slate-900 border border-slate-800'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <GameList games={filteredGames} onSelect={handleSelectGame} />
              </div>
            </section>
          </>
        )}

        {view === 'topup' && selectedGame && (
          <div className="max-w-5xl mx-auto pt-32 pb-20 px-6">
            <button onClick={() => setView('home')} className="mb-8 text-indigo-400">← Kembali</button>
            <TopUpForm game={selectedGame} onSuccess={() => setView('tracker')} />
          </div>
        )}

        {view === 'tracker' && (
          <div className="max-w-4xl mx-auto pt-32 pb-20 px-6">
            <TransactionTracker />
          </div>
        )}

        {view === 'admin' && (
          <div className="pt-32 pb-20 px-6">
            {isAdminLoggedIn ? (
              <Dashboard onLogout={() => setIsAdminLoggedIn(false)} />
            ) : (
              <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />
            )}
          </div>
        )}
      </main>

      <footer className="bg-slate-950 py-10 border-t border-slate-900 text-center text-slate-600 text-sm">
        <p>&copy; 2024 Warung Top-Up Game Premium. Fitur Pembeli & Admin Aktif.</p>
      </footer>
    </div>
  );
};

export default App;
