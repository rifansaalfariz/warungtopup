
export interface Game {
  id: string;
  name: string;
  image: string;
  description: string;
  nominals: Nominal[];
  category: 'MOBA' | 'Battle Royale' | 'RPG' | 'FPS' | 'Others';
}

export interface Nominal {
  id: string;
  amount: string;
  price: number;
}

export interface Transaction {
  id?: number;
  game_name: string;
  user_id: string;
  player_name?: string; // optional in-game username / display name
  nominal: string;
  price: number;
  payment_method?: string;
  status: 'pending' | 'completed' | 'failed';
  created_at?: string;
}
