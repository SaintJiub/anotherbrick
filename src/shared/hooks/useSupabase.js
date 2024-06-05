import {useEffect, useState} from "react";
import {createClient} from "@supabase/supabase-js";
import {supabaseKey, supabaseUrl} from "../../app/config/config.js";


export function useSupabase() {
    const [supabase, setSupabase] = useState(null);

    useEffect(() => {
        const supabaseClient = createClient(supabaseUrl, supabaseKey);
        setSupabase(supabaseClient);
    }, []);

    return supabase;
}