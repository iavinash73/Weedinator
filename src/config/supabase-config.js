import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://phcgvwqhpmhjljmmgsrh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoY2d2d3FocG1oamxqbW1nc3JoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5OTQyMzgzNywiZXhwIjoyMDE0OTk5ODM3fQ.OrkEqGjOuFoJ0d5HSx0DbHb4R_GN7HrFSyuNAXM5j_0';

export const supabase = createClient(supabaseUrl, supabaseKey);



