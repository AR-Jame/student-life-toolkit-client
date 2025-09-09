import GenerateExam from "@/components/modules/Exam/GenerateExam";
import { useGetPrevExam } from "@/queries/exam.queries";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { format } from "date-fns";
import { useNavigate } from "react-router";

const Exam = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useGetPrevExam();
    console.log(data);
    if (isLoading) return <p>loading</p>
    return (
        <div>
            <div className="container mx-auto py-4">
                <div className="flex items-center justify-between mt-4">
                    <div>
                        <h3 className="text-4xl pb-2 font-semibold">Give mock tests and boost your knowledge</h3>
                        <p className="text-gray-600">Manage your daily classes easily and stand out your academic career</p>
                    </div>
                    <div className="flex gap-2">
                        <GenerateExam />
                    </div>
                </div>
            </div>
            <div className="container mx-auto">
                <Table className="text-base">
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead>Serial No</TableHead>
                            <TableHead>Exam ID</TableHead>
                            <TableHead>Topic</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Finish at</TableHead>
                            {/* <TableHead className="text-right">Balance</TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data?.data?.map((exam, idx) => (
                                <TableRow key={exam._id}>
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell onClick={() => navigate(`/result/${exam._id}`)} className="hover:underline hover:text-blue-300 cursor-pointer" >{exam._id}</TableCell>
                                    <TableCell>{exam.subject}</TableCell>
                                    <TableCell>{exam.status === "INIT" ? "Not Submitted" : exam.status}</TableCell>
                                    <TableCell>{format(exam.finishedAt, "PPp")}</TableCell>
                                    {/* <TableCell className="text-right">{exam.balance}</TableCell> */}
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Exam;
