import { createContext, useContext, useState, type Context, type ReactNode } from "react";
import type { ChurchEvent } from "../types/types";
import useSWR, { type KeyedMutator } from "swr";
import { fetcher } from "../utils/fetcher";
import { API_URL } from "../utils/env";

type EventsCalendarDate = {
    month: number;
    year: number;
};

type EventsProviderValue = {
    currentDate: EventsCalendarDate,
    events:ChurchEvent[], 
    nextMonth: VoidFunction, 
    previousMonth: VoidFunction, 
    isLoading:boolean,
    today: Date;
    error: any;
    mutate: KeyedMutator<any>
}

const EventsContext: Context<EventsProviderValue | undefined> = createContext<EventsProviderValue | undefined>(undefined);

export function EventsProvider({ children }: { children: ReactNode }) {
    
    function previousMonth(){
        let month = currentDate.month - 1;
        let year = currentDate.year;

        if (month == 0) {
            month = 12;
            year = year - 1;
        }

        setCurrentDate({
            year,
            month,
        });
    };

    function nextMonth(){
        let month = currentDate.month + 1;
        let year = currentDate.year;

        if (month == 13) {
            month = 1;
            year = year + 1;
        }

        setCurrentDate({
            year,
            month,
        });
    };
    
    const today = new Date();

    const [currentDate, setCurrentDate] = useState<EventsCalendarDate>({
        year: today.getFullYear(),
        month: today.getMonth() + 1,
    });

    const {data:response, error, isLoading, mutate} = useSWR(
        `${API_URL}/api/v1/events?month=${currentDate.month}&year=${currentDate.year}`,
        fetcher,
    )

    return <EventsContext.Provider value={{currentDate, events:response?.data, nextMonth, previousMonth, mutate, isLoading, today, error}}>{children}</EventsContext.Provider>
}

export function useEvents(){
    const ctx = useContext(EventsContext);
    if (!ctx) throw new Error("useEvents must be used within EventsProvider");
    return ctx;
}