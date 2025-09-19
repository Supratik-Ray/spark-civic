import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zblcahzfdovaaozcwzns.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpibGNhaHpmZG92YWFvemN3em5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyOTg3MzEsImV4cCI6MjA3Mzg3NDczMX0.xLBdCn9lTf6sf5iQ_Z0-2Jsawf5EaGyQ60Laeg98g4Y";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
