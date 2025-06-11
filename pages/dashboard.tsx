import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase-client';
import AuthGuard from '../components/AuthGuard';

// Define a type for your signal
type Signal = {
  id: string;
  currency_pair: string;
  direction: 'BUY' | 'SELL';
  entry_price: number;
  created_at: string;
};

export default function Dashboard() {
  const [signals, setSignals] = useState<Signal[]>([]);

  useEffect(() => {
    const fetchSignals = async () => {
      const { data, error } = await supabase
        .from('signals')
        .select('*');
      
      if (error) console.error('Error fetching signals:', error);
      if (data) setSignals(data);
    };
    fetchSignals();
  }, []);

  return (
    <AuthGuard>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Latest Trade Signals</h1>
        {signals.map((signal) => (
          <div key={signal.id} className="p-4 border rounded my-2">
            <p>{signal.currency_pair} - {signal.direction}</p>
          </div>
        ))}
      </div>
    </AuthGuard>
  );
}