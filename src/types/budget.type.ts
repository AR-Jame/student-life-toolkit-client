export interface IBudget {
    _id: string;
    type: "Expense" | "Income";
    date: Date;
    category: string;
    amount: number;
    createAt: Date;
    updateAt: Date
}

export interface TypeAggregation {
    _id: 'Income' | 'Expense';
    totalAmount: number;
    fill: string
}

export interface CategoryItem {
    category: string;
    amount: number;
}

export interface CategoryAggregation {
    _id: 'Income' | 'Expense';
    categories: CategoryItem[];
}

export interface BudgetAggregationResult {
    byType: TypeAggregation[];
    byCategory: CategoryAggregation[];
}