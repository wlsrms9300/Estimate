import { supabase } from '../config/supabase';

export const dataService = {
    async getData(tableName: string) {
        const { data, error } = await supabase.from(tableName).select("*");
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
    }
};