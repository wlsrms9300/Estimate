import { supabase } from "../supabase/client";

export const dataService = {
    // 데이터 조회
    async getData(tableName: string) {
        const { data, error } = await supabase.from(tableName).select("*");

        if (error) throw error;
        return data;
    },

    // 데이터 생성
    async createData(tableName: string, data: any) {
        const { data: result, error } = await supabase
            .from(tableName)
            .insert(data)
            .select();

        if (error) throw error;
        return result;
    },

    // 데이터 수정
    async updateData(tableName: string, id: number, data: any) {
        const { data: result, error } = await supabase
            .from(tableName)
            .update(data)
            .eq("id", id)
            .select();

        if (error) throw error;
        return result;
    },

    // 데이터 삭제
    async deleteData(tableName: string, id: number) {
        const { error } = await supabase.from(tableName).delete().eq("id", id);

        if (error) throw error;
        return true;
    },
};
