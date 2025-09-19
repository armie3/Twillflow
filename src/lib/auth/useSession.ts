'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export function useSession() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, sess) => {
      setSession(sess);
      setLoading(false);
    });
    return () => { sub.subscription.unsubscribe(); };
  }, []);

  return { session, loading };
}
