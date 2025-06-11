import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase-client';
import AuthGuard from '../components/AuthGuard';

export default function Dashboard() {
  const [signals, setSignals] = useState<any[]>([]);

  useEffect(() => {
    const fetchSignals = async () => {
      const { data, error } = await supabase.from('signals').select('*');
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