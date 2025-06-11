import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase-client';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push('/login');
    });
  }, []);

  return <>{children}</>;
}