'use client';
import { useState, useEffect, useMemo } from 'react';
import { onSnapshot, Query, DocumentData, QuerySnapshot } from 'firebase/firestore';

export function useCollection(query: Query | null) {
  const [data, setData] = useState<DocumentData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Memoize the query to prevent re-renders from creating new query objects
  const memoizedQuery = useMemo(() => query, [query]);

  useEffect(() => {
    if (!memoizedQuery) {
      setData(null);
      setLoading(false);
      return;
    }
    
    setLoading(true);

    const unsubscribe = onSnapshot(
      memoizedQuery,
      (querySnapshot: QuerySnapshot) => {
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(docs);
        setLoading(false);
      },
      (err: Error) => {
        console.error("Error fetching collection:", err);
        setError(err);
        setLoading(false);
      }
    );

    // Unsubscribe from the listener when the component unmounts or the query changes
    return () => unsubscribe();
  }, [memoizedQuery]);

  return { data, loading, error };
}
