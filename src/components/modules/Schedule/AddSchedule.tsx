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
import { useAddSchedule, useGetSubjects } from "@/queries/schedules.queries";
import type { ISubject } from "@/types/schedules.types";
import { Textarea } from "@/components/ui/textarea";


const subjectSchema = z
    .object({
        title: z.string().min(4, { error: "Subject name is too short" }),
        date: z.date(),
        startTime: z.string(),
        endTime: z.string(),
        subjectId: z.string(),
        location: z.string().optional(),
        notes: z.string().optional(),
        instructor: z.string().optional(),
    })

const AddSchedule = () => {

    const [open, setOpen] = useState<boolean>(false)
    const { data, isLoading } = useGetSubjects();
    const addSchedule = useAddSchedule();

    const form = useForm<z.infer<typeof subjectSchema>>({
        resolver: zodResolver(subjectSchema),
        defaultValues: {
            title: "",
            date: undefined,
            startTime: "",
            endTime: "",
            subjectId: "",
            location: "",
            notes: "",
            instructor: "",

        },
    });

    const onSubmit = async (data: z.infer<typeof subjectSchema>) => {
        console.log(data);
        addSchedule.mutate({ data, reset: form.reset, setOpen })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div>
                <DialogTrigger asChild>
                    <Button className="cursor-pointer" variant="default"><Plus /> Add Schedule</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Schedule class</DialogTitle>
                        <DialogDescription>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet inventore ?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" id="add-schedule">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground">Title<span className="text-red-500 -ml-1.5">*</span></FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g. Physics"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex gap-2">
                                    <FormField
                                        control={form.control}
                                        name="date"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col w-full">
                                                <FormLabel className="text-foreground">Date<span className="text-red-500 -ml-1.5">*</span></FormLabel>
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
                                    <FormField
                                        control={form.control}
                                        name="subjectId"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel className="text-foreground">Choose a subject<span className="text-red-500 -ml-1.5">*</span></FormLabel>
                                                <Select onValueChange={field.onChange}>
                                                    <FormControl className="w-full">
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Choose a subject" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {
                                                            isLoading && <p>Loading</p>
                                                        }
                                                        {
                                                            !isLoading &&
                                                            data?.map((subject: ISubject) => (
                                                                <SelectItem key={subject._id} value={subject._id as string}>{subject.name}</SelectItem>
                                                            ))
                                                        }

                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <FormField
                                        control={form.control}
                                        name="startTime"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel className="text-foreground">Start Time<span className="text-red-500 -ml-1.5">*</span></FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="time"
                                                        className="w-full"
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
                                        name="endTime"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel className="text-foreground">End Time<span className="text-red-500 -ml-1.5">*</span></FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="time"
                                                        className="w-full"
                                                        {...field}
                                                        value={field.value || ""}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="instructor"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground">Instructor</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Abdur Rahman"
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
                                    name="notes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground">Notes</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell us a little bit about yourself"
                                                    className="resize-none"
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
                        <Button type="submit" form="add-schedule">Add</Button>
                    </DialogFooter>
                </DialogContent>
            </div>
        </Dialog>
    );
};

export default AddSchedule;