export async function fetchData(url: string, options?: RequestInit) {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
            (error as any).status = response.status;
            throw error;
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export async function fetcher(url: string) {
    const res = await fetch(url, { credentials: 'include' });
    const data = await res.json();

    if (!res.ok || !data.success) {
        const error = new Error(data.message || 'Erro na requisição');
        (error as any).status = res.status;
        throw error;
    }

    return data;
}