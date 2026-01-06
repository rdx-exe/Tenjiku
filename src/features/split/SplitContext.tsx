import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from "react";

export interface Participant {
    name: string;
    amount: number; // Signed balance: positive = gets back, negative = owes
    status: "owes" | "gets back" | "settled";
    initial: string;
}

export interface Expense {
    title: string;
    payer: string;
    date: string;
    timestamp: string;
    amount: number;
    splitType: 'equal' | 'percentage' | 'custom';
}

export interface PaymentEntry {
    from: string;
    to: string;
    amount: number;
    date: string;
    timestamp: string;
    description: string;
}

export interface Activity {
    type: "member_joined" | "expense_added" | "payment_recorded";
    title: string;
    description: string;
    amount?: number;
    date: string;
    timestamp: string;
    user: string;
}

export interface Trip {
    id: string;
    name: string;
    date: string;
    participants: Participant[];
    expenses: Expense[];
    payments: PaymentEntry[];
    activities: Activity[];
    totalExpenses: number;
}

interface SplitContextType {
    currentTripName: string;
    participants: Participant[];
    expenses: Expense[];
    payments: PaymentEntry[];
    activities: Activity[];
    trips: Trip[];
    addParticipant: (name: string) => void;
    addExpense: (title: string, amount: number, payer: string, splitType: 'equal' | 'percentage' | 'custom', splitDetails: { [name: string]: number }) => void;
    recordPayment: (from: string, to: string, amount: number, date: string, description: string) => void;
    markAsPaid: (from: string, to: string, amount: number) => void;
    startNewTrip: (name: string) => void;
    restoreTrip: (id: string) => void;
    deleteTrip: (id: string) => void;
    archiveCurrentTrip: () => void;
}

const SplitContext = createContext<SplitContextType | undefined>(undefined);

export function SplitProvider({ children }: { children: ReactNode }) {
    // Persistent State
    const [trips, setTrips] = useState<Trip[]>(() => {
        try {
            const saved = localStorage.getItem("split_trips");
            return saved ? JSON.parse(saved) : [];
        } catch (e) { console.error("Failed to load trips", e); return []; }
    });

    const [currentTripName, setCurrentTripName] = useState(() => {
        return localStorage.getItem("split_current_name") || "My Trip";
    });

    const [participants, setParticipants] = useState<Participant[]>(() => {
        try {
            const saved = localStorage.getItem("split_participants");
            return saved ? JSON.parse(saved) : [];
        } catch (e) { return []; }
    });

    const [expenses, setExpenses] = useState<Expense[]>(() => {
        try {
            const saved = localStorage.getItem("split_expenses");
            return saved ? JSON.parse(saved) : [];
        } catch (e) { return []; }
    });

    const [payments, setPayments] = useState<PaymentEntry[]>(() => {
        try {
            const saved = localStorage.getItem("split_payments");
            return saved ? JSON.parse(saved) : [];
        } catch (e) { return []; }
    });

    const [activities, setActivities] = useState<Activity[]>(() => {
        try {
            const saved = localStorage.getItem("split_activities");
            return saved ? JSON.parse(saved) : [];
        } catch (e) { return []; }
    });

    // 1. Persist TRIPS (History) separately - only runs when history changes
    useEffect(() => {
        localStorage.setItem("split_trips", JSON.stringify(trips));
    }, [trips]);

    // 2. Persist CURRENT TRIP DATA separately - runs when current trip changes
    useEffect(() => {
        localStorage.setItem("split_current_name", currentTripName);
        localStorage.setItem("split_participants", JSON.stringify(participants));
        localStorage.setItem("split_expenses", JSON.stringify(expenses));
        localStorage.setItem("split_payments", JSON.stringify(payments));
        localStorage.setItem("split_activities", JSON.stringify(activities));
    }, [currentTripName, participants, expenses, payments, activities]);

    const archiveCurrentTrip = (newTripName: string = "My Trip") => {
        // Only archive if there's actual data to avoid "Empty/Demo" trips in history
        const hasData = participants.length > 0 || expenses.length > 0;

        if (hasData) {
            const previousTrip: Trip = {
                id: Date.now().toString(),
                name: currentTripName,
                date: new Date().toLocaleDateString(),
                participants: [...participants],
                expenses: [...expenses],
                payments: [...payments],
                activities: [...activities],
                totalExpenses: expenses.reduce((sum, e) => sum + e.amount, 0)
            };
            setTrips(prev => [previousTrip, ...prev]);
        }

        // Reset current trip state
        setCurrentTripName(newTripName);
        setParticipants([]);
        setExpenses([]);
        setPayments([]);
        setActivities([]);
    };

    const startNewTrip = (name: string) => {
        archiveCurrentTrip(name);
    };

    const restoreTrip = (id: string) => {
        const tripToRestore = trips.find(t => t.id === id);
        if (!tripToRestore) return;

        // 1. Create a snapshot of the current active trip ONLY if it has data
        const hasData = participants.length > 0 || expenses.length > 0;

        if (hasData) {
            const currentTripSnapshot: Trip = {
                id: Date.now().toString(),
                name: currentTripName,
                date: new Date().toLocaleDateString(),
                participants: [...participants],
                expenses: [...expenses],
                payments: [...payments],
                activities: [...activities],
                totalExpenses: expenses.reduce((sum, e) => sum + e.amount, 0)
            };
            // Swap current active into history, and take target out of history
            setTrips(prev => [currentTripSnapshot, ...prev.filter(t => t.id !== id)]);
        } else {
            // Just remove target from history since nothing is being swapped out
            setTrips(prev => prev.filter(t => t.id !== id));
        }

        // 2. Load the selected trip into active state
        setCurrentTripName(tripToRestore.name);
        setParticipants(tripToRestore.participants);
        setExpenses(tripToRestore.expenses);
        setPayments(tripToRestore.payments);
        setActivities(tripToRestore.activities);
    };

    const deleteTrip = (id: string) => {
        setTrips(prev => prev.filter(t => t.id !== id));
    };

    const addParticipant = (name: string) => {
        if (!name) return;
        const now = new Date();
        const newPart: Participant = {
            name,
            amount: 0,
            status: "settled",
            initial: name.charAt(0).toUpperCase(),
        };

        setParticipants((prev) => [...prev, newPart]);

        setActivities((prev) => [{
            type: "member_joined",
            title: `${name} joined the group`,
            description: "New participant added",
            date: now.toLocaleDateString(),
            timestamp: now.toISOString(),
            user: name
        }, ...prev]);
    };

    const addExpense = (title: string, amount: number, payer: string, splitType: 'equal' | 'percentage' | 'custom', splitDetails: { [name: string]: number }) => {
        if (!title || !amount || !payer || payer === "Select who paid") return;
        const now = new Date();

        const newExp: Expense = {
            title,
            amount,
            payer,
            date: now.toLocaleDateString(),
            timestamp: now.toISOString(),
            splitType,
        };

        setExpenses((prev) => [newExp, ...prev]);

        setActivities((prev) => [{
            type: "expense_added",
            title: title,
            description: `Paid by ${payer} (${splitType} split)`,
            amount: amount,
            date: now.toLocaleDateString(),
            timestamp: now.toISOString(),
            user: payer
        }, ...prev]);

        setParticipants((prev) => {
            if (prev.length === 0) return prev;

            return prev.map((p) => {
                let pShare = 0;
                if (splitType === 'equal') {
                    pShare = amount / prev.length;
                } else if (splitType === 'percentage') {
                    const percent = splitDetails[p.name] || 0;
                    pShare = (percent / 100) * amount;
                } else if (splitType === 'custom') {
                    pShare = splitDetails[p.name] || 0;
                }

                let currentBalance = p.amount;
                if (p.name === payer) {
                    currentBalance += (amount - pShare);
                } else {
                    currentBalance -= pShare;
                }

                return {
                    ...p,
                    amount: currentBalance,
                    status: currentBalance > 0.01 ? "gets back" : currentBalance < -0.01 ? "owes" : "settled",
                };
            });
        });
    };

    const markAsPaid = (from: string, to: string, amount: number) => {
        recordPayment(from, to, amount, new Date().toISOString().split('T')[0], "Settled from summary");
    };

    const recordPayment = (from: string, to: string, amount: number, date: string, description: string) => {
        if (!from || !to || !amount || from === to) return;
        const now = new Date();

        const newPayment: PaymentEntry = { from, to, amount, date, timestamp: now.toISOString(), description };
        setPayments((prev) => [newPayment, ...prev]);

        setActivities((prev) => [{
            type: "payment_recorded",
            title: `Payment: ${from} → ${to}`,
            description: "Settlement payment",
            amount: amount,
            date: now.toLocaleDateString(),
            timestamp: now.toISOString(),
            user: from
        }, ...prev]);

        setParticipants((prev) => prev.map((p) => {
            if (p.name === from) {
                const newBalance = p.amount + amount;
                return {
                    ...p,
                    amount: newBalance,
                    status: newBalance > 0.01 ? "gets back" : newBalance < -0.01 ? "owes" : "settled",
                };
            }
            if (p.name === to) {
                const newBalance = p.amount - amount;
                return {
                    ...p,
                    amount: newBalance,
                    status: newBalance > 0.01 ? "gets back" : newBalance < -0.01 ? "owes" : "settled",
                };
            }
            return p;
        }));
    };

    const value = useMemo(() => ({
        currentTripName,
        participants,
        expenses,
        payments,
        activities,
        trips,
        addParticipant,
        addExpense,
        recordPayment,
        markAsPaid,
        startNewTrip,
        restoreTrip,
        deleteTrip,
        archiveCurrentTrip
    }), [currentTripName, participants, expenses, payments, activities, trips]);

    return (
        <SplitContext.Provider value={value}>
            {children}
        </SplitContext.Provider>
    );
}

export function useSplit() {
    const context = useContext(SplitContext);
    if (context === undefined) {
        throw new Error("useSplit must be used within a SplitProvider");
    }
    return context;
}
