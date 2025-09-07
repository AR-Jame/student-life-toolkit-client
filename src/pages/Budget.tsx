import AddTransaction from "@/components/modules/Budget/AddTransaction";
import { Chart } from "@/components/modules/Budget/Chart";
import { ChartPie } from "@/components/modules/Budget/ChartPie";
import Transactions from "@/components/modules/Budget/Transactions";
import { useGetBudgetSummary } from "@/queries/budget.queries";
import type { CategoryAggregation, TypeAggregation } from "@/types/budget.type";


/** TODO:
 * 1. Update, delete transaction
 * 2. monthly and yearly data toggle
 * 3. pagination
 * 4. checking responsiveness
 * */

const Budget = () => {

    const { data: summary, isLoading } = useGetBudgetSummary(false);

    if (isLoading) return <p>loading</p>

    const pieData: TypeAggregation[] = summary?.data?.[0]?.byType || [];
    const incomeData: CategoryAggregation[] = summary?.data?.[0]?.byCategory?.find((item: CategoryAggregation) => item._id === "Income")?.categories || [];
    const expenseData: CategoryAggregation[] = summary?.data?.[0]?.byCategory?.find((item: CategoryAggregation) => item._id === "Expense")?.categories || [];



    return (
        <div className="container mx-auto py-4">
            <div className="flex items-center justify-between mt-4">
                <div>
                    <h3 className="text-4xl pb-2 font-semibold">Track your income and expenses</h3>
                    <p className="text-gray-600">Manage your daily classes easily and stand out your academic career</p>
                </div>
                <div className="flex gap-2">
                    <AddTransaction />
                </div>
            </div>
            <div className="mt6 flex flex-wrap justify-between items-center gap-3">
                <div className="flex-1">
                    <Chart title="Your Income" data={incomeData} />
                </div>
                <div className="flex-1">
                    <Chart title="Your Expense" data={expenseData} />
                </div>
                <div className="flex-1">
                    <ChartPie data={pieData} />
                </div>
            </div>
            <div>
                <Transactions />
            </div>
        </div>
    );
};

export default Budget;