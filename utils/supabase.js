import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pugywdcmabkozgnfjdgi.supabase.co';
const supabaseKey = 'sb_publishable_ed0ebkBsw-1WgbJ2Cckcnw_TylL62YY';

export const supabase = createClient(supabaseUrl, supabaseKey);
