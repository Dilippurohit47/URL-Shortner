import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = "https://encjodphuaxoutcfuall.supabase.co/";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuY2pvZHBodWF4b3V0Y2Z1YWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0OTc1NjUsImV4cCI6MjA0MjA3MzU2NX0.nOb57Q1tcq4EJLGXdqMPu7bzINlYDJTWS0ctVCYi8Tk"
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase