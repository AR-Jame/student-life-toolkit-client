import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useBudget } from "@/queries/budget.queries";

export const BudgetSchema = z
    .object({
        type: z.enum(["Income", "Expense"]),
        category: z.enum(["allowance", "job", "scholarship", "food", "transport", "books", "entertainment", "otherIncome", "otherExpense"], { error: "Select a category" }),
        date: z.date(),
        amount: z.string().min(1, "Amount is required"),
    })

const AddTransaction = () => {
    const [open, setOpen] = useState<boolean>(false)
    const addBudget = useBudget()

    const form = useForm<z.infer<typeof BudgetSchema>>({
        resolver: zodResolver(BudgetSchema),
        defaultValues: {
            type: undefined,
            category: undefined,
            date: undefined,
            amount: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof BudgetSchema>) => {
        const budgetInfo = {
            ...data,
            date: new Date(data.date),
            amount: Number(data.amount)
        }
        console.log(budgetInfo);
        addBudget.mutate({ data: budgetInfo, setOpen, reset: form.reset })

    }

    const getCategoriesForType = (type: string) => {
        if (type === "Income") {
            return [
                { value: "allowance", label: "Allowance" },
                { value: "job", label: "Job" },
                { value: "scholarship", label: "Scholarship" },
                { value: "otherIncome", label: "Other Income" }
            ];
        } else {
            return [
                { value: "food", label: "Food" },
                { value: "transport", label: "Transport" },
                { value: "books", label: "Books" },
                { value: "entertainment", label: "Entertainment" },
                { value: "otherExpense", label: "Other Expense" }
            ];
        }
    };

    const selectedType = form.watch("type");

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div>
                <DialogTrigger asChild>
                    <Button className="cursor-pointer" variant="default">
                        <Plus className="mr-2 h-4 w-4" /> Add Transaction
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>ADD NEW TRANSACTION</DialogTitle>
                        <DialogDescription>
                            Add a new income or expense transaction to track your budget.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 w-full">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" id="add-transaction">
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground">
                                                Type
                                            </FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl className="w-full">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select transaction type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Income">Income</SelectItem>
                                                    <SelectItem value="Expense">Expense</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground">
                                                Category
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                disabled={!selectedType}
                                            >
                                                <FormControl className="w-full">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {selectedType && getCategoriesForType(selectedType).map((category) => (
                                                        <SelectItem key={category.value} value={category.value}>
                                                            {category.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel className="text-foreground">
                                                Date
                                            </FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground">
                                                Amount
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="0.00"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" form="add-transaction">Add Transaction</Button>
                    </DialogFooter>
                </DialogContent>
            </div>
        </Dialog>
    );
};

export default AddTransaction;