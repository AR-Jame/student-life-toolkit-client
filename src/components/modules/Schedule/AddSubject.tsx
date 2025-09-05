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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { HexColorPicker } from "react-colorful"
import { useAddSubject } from "@/queries/schedules.queries";
import { useState } from "react";

const subjectSchema = z
    .object({
        name: z.string().min(4, { error: "Subject name is too short" }),
        color: z.string().length(7, { error: "Color code invalid" }),
    })

const AddSubject = () => {

    const [open, setOpen] = useState<boolean>(false)

    const addSubject = useAddSubject();

    const form = useForm<z.infer<typeof subjectSchema>>({
        resolver: zodResolver(subjectSchema),
        defaultValues: {
            name: "",
            color: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof subjectSchema>) => {
        console.log(data);
        addSubject.mutate({ data, setOpen, reset: form.reset })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div>
                <DialogTrigger asChild>
                    <Button className="cursor-pointer" variant="secondary"><Plus /> Add Subject</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add a new subject</DialogTitle>
                        <DialogDescription>
                            Add a new subject that you can use to create your schedules.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" id="add-subject">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Subject name</FormLabel>
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

                                <FormField
                                    control={form.control}
                                    name="color"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pick a Color</FormLabel>
                                            <FormDescription>Click on the box below and pick a color</FormDescription>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        type="button"
                                                        className="w-full cursor-pointer h-10 p-0 rounded"
                                                        style={{ backgroundColor: field.value }}
                                                    />
                                                </PopoverTrigger>
                                                <PopoverContent className="p-2">
                                                    <HexColorPicker
                                                        color={field.value}
                                                        onChange={field.onChange}
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
                        <Button type="submit" form="add-subject">Add</Button>
                    </DialogFooter>
                </DialogContent>
            </div>
        </Dialog>
    );
};

export default AddSubject;