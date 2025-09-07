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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useState } from "react";
import { useGenerateExam } from "@/queries/exam.queries";

export const examSchema = z
    .object({
        topic: z.enum(['Math', 'Programming', 'History', 'English', "GK"], { error: "Enter a valid topic" }),
        difficulty: z.enum(["Easy", "Medium", "Hard"], { error: "Enter a valid level" })
    })

const GenerateExam = () => {

    const [open, setOpen] = useState<boolean>(false)

    const generateExam = useGenerateExam();

    const form = useForm<z.infer<typeof examSchema>>({
        resolver: zodResolver(examSchema),
        defaultValues: {
            topic: undefined,
            difficulty: undefined,
        },
    });

    const onSubmit = async (data: z.infer<typeof examSchema>) => {
        console.log(data);
        generateExam.mutate({ data, setOpen, reset: form.reset })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div>
                <DialogTrigger asChild>
                    <Button className="cursor-pointer" variant="secondary"><Plus />New Exam</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Generate new Exam</DialogTitle>
                        <DialogDescription>
                            Add a new subject that you can use to create your schedules.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" id="generate-exam">
                                <FormField
                                    control={form.control}
                                    name="topic"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Topic</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl className="w-full">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a topic" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="GK">General Knowledge</SelectItem>
                                                    <SelectItem value="Math">Math</SelectItem>
                                                    <SelectItem value="English">English</SelectItem>
                                                    <SelectItem value="Programming">Programming</SelectItem>
                                                    <SelectItem value="History">History</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="difficulty"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Difficulty</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl className="w-full">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select difficulty level" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Easy">Easy</SelectItem>
                                                    <SelectItem value="Medium">Medium</SelectItem>
                                                    <SelectItem value="Hard">Hard</SelectItem>
                                                </SelectContent>
                                            </Select>
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
                        <Button type="submit" form="generate-exam">Add</Button>
                    </DialogFooter>
                </DialogContent>
            </div>
        </Dialog>
    );
};

export default GenerateExam