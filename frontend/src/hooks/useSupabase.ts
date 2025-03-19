import { useState } from "react";
import { dataService } from "../services/api/data";

interface UseSupabaseOptions {
    tableName: string;
}

export function useSupabase<T>({ tableName }: UseSupabaseOptions) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await dataService.getData(tableName);
            return result as T[];
        } catch (err) {
            setError(err as Error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const createData = async (data: Partial<T>) => {
        try {
            setLoading(true);
            return await dataService.createData(tableName, data);
        } catch (err) {
            setError(err as Error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const updateData = async (id: number, data: Partial<T>) => {
        try {
            setLoading(true);
            return await dataService.updateData(tableName, id, data);
        } catch (err) {
            setError(err as Error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const deleteData = async (id: number) => {
        try {
            setLoading(true);
            return await dataService.deleteData(tableName, id);
        } catch (err) {
            setError(err as Error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        fetchData,
        createData,
        updateData,
        deleteData,
    };
}
