/* eslint-disable react-refresh/only-export-components */
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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useAddPlanner } from "@/queries/planner.queries";


export const plannerSchema = z
    .object({
        title: z.string().min(4, { error: "Title  is too short" }),
        description: z.string(),
        targetCompletionDate: z.date(),
        priority: z.enum(['Low', 'Medium', 'High', 'Critical']),
    })

const AddPlanner = () => {
    const addPlanner = useAddPlanner();
    const [open, setOpen] = useState<boolean>(false)

    const form = useForm<z.infer<typeof plannerSchema>>({
        resolver: zodResolver(plannerSchema),
        defaultValues: {
            title: "",
            description: "",
            targetCompletionDate: undefined,
            priority: "Medium"

        },
    });

    const onSubmit = async (data: z.infer<typeof plannerSchema>) => {
        console.log(data);
        addPlanner.mutate({ data, reset: form.reset, setOpen })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div>
                <DialogTrigger asChild>
                    <Button className="cursor-pointer" variant="default"><Plus /> Add Planner</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Planner</DialogTitle>
                        <DialogDescription>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet inventore ?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" id="add-planner">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground">Title<span className="text-red-500 -ml-1.5">*</span></FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g. Learn web dev..."
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground">Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Little description about this Goal"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="priority"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Priority</FormLabel>
                                            <Select onValueChange={field.onChange}>
                                                <FormControl className="w-full">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="set a priority level" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        ['Low', 'Medium', 'High', 'Critical'].map(item => (
                                                            <SelectItem key={item} value={item}>{item}</SelectItem>
                                                        ))
                                                    }

                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="targetCompletionDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col w-full">
                                            <FormLabel className="text-foreground">Target for completion<span className="text-red-500 -ml-1.5">*</span></FormLabel>
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
                                                                format(field.value, "PP")
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
                                                        disabled={(date: Date) =>
                                                            date < new Date()
                                                        }
                                                        captionLayout="dropdown"
                                                    />
                                                </PopoverContent>
                                            </Popover>
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
                        <Button type="submit" form="add-planner">Add</Button>
                    </DialogFooter>
                </DialogContent>
            </div>
        </Dialog>
    );
};

export default AddPlanner;