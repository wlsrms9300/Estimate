import { supabase } from '../config/supabase';

export const dataService = {
    async getData(tableName: string, filters?: { user_type?: string; grade?: string }) {
        let query = supabase.from(tableName).select("*"); 
        if (filters) {
            if (filters.user_type) {
                query = query.eq("user_type", filters.user_type);
            }
            if (filters.grade) {
                query = query.eq("grade", filters.grade);
            }
        }
        
        const { data, error } = await query;
        if (error) throw error;
        return data;
    },

    async createData(tableName: string, data: any) {
        const { data: result, error } = await supabase
            .from(tableName)
            .insert(data)
            .select();
        if (error) throw error;
        return result;
    },

    async updateData(tableName: string, id: number, data: any) {
        const { data: result, error } = await supabase
            .from(tableName)
            .update(data)
            .eq("id", id)
            .select();
        if (error) throw error;
        return result;
    },

    async deleteData(tableName: string, id: number) {
        const { error } = await supabase.from(tableName).delete().eq("id", id);
        if (error) throw error;
        return true;
    },
};