"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataService = void 0;
const supabase_1 = require("../config/supabase");
exports.dataService = {
    async getData(tableName) {
        const { data, error } = await supabase_1.supabase.from(tableName).select("*");
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
    }
};
