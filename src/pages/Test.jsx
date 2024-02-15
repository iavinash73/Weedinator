import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase-config';

export default function Test() {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
          const { data, error } = await supabase.from('test').select();
    
          if (error) {
            console.error(error);
          } else {
            const studentLogs = data.map((item) => ({
              id: item.id,
              type: item.type,
              frame: item.frame,
              videostamp: item.videostamp,
              created_at: item.created_at,
            }));
    
            setData(studentLogs);
          }
        }
    
        fetchData();
      }, []);
  return (
    <div>
         {data.map((item) => (
            <>
            <div>{item.id}</div>
            <div>{item.type}</div>
            <img src={`data:image/jpeg;base64,${item.frame}`} />
            <div>{item.videostamp}</div>
            <div>{item.created_at}</div>
            </>
           ))}
    </div>
  )
}
