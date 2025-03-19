"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataService = void 0;
const supabase_1 = require("../config/supabase");
exports.dataService = {
    async getData(tableName, filters) {
        let query = supabase_1.supabase.from(tableName).select("*");
        if (filters) {
            if (filters.user_type) {
                query = query.eq("user_type", filters.user_type);
            }
            if (filters.grade) {
                query = query.eq("grade", filters.grade);
            }
        }
        const { data, error } = await query;
        if (error)
            throw error;
        return data;
    },
    async createData(tableName, data) {
        const { data: result, error } = await supabase_1.supabase
            .from(tableName)
            .insert(data)
            .select();
        if (error)
            throw error;
        return result;
    },
    async updateData(tableName, id, data) {
        const { data: result, error } = await supabase_1.supabase
            .from(tableName)
            .update(data)
            .eq("id", id)
            .select();
        if (error)
            throw error;
        return result;
    },
    async deleteData(tableName, id) {
        const { error } = await supabase_1.supabase.from(tableName).delete().eq("id", id);
        if (error)
            throw error;
        return true;
    },
};
