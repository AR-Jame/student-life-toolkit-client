import { Skeleton } from "@/components/ui/skeleton";
import { useGetBudgets } from "@/queries/budget.queries";
import type { IBudget } from "@/types/budget.type";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { format } from "date-fns";
import { Pen, Trash, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
const Transactions = () => {
    const { data, isLoading } = useGetBudgets()
    console.log(data);
    return (
        <div>
            <h3 className="text-3xl font-medium">Recent Transactions</h3>
            {
                isLoading ?
                    <>
                        <Skeleton />
                    </>
                    :

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.data.map((transaction: IBudget) => (
                                <TableRow key={transaction._id}>
                                    <TableCell className="">{transaction.type === "Income" ? <TrendingUp size={"18px"} color="green" /> : <TrendingDown size={"18px"} color="red" />}</TableCell>
                                    <TableCell className="font-medium">{transaction.type}</TableCell>
                                    <TableCell>{transaction.amount} Tk</TableCell>
                                    <TableCell>{format(transaction.date, "PPp")}</TableCell>
                                    <TableCell className="space-x-1.5">
                                        <Button variant={"secondary"}><Pen /></Button>
                                        <Button variant={"destructive"}><Trash /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
            }
        </div>
    );
};

export default Transactions;