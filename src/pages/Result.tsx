import { useGetPrevExamDetails } from "@/queries/exam.queries";
import { useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

/**
 * 1. if no id available then navigate to 404 page
 * */

const Result = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetPrevExamDetails(id as string);
    console.log(data?.data?.questions);
    if (isLoading) return <p>loading</p>
    return (
        <div>
            <div className="max-w-4xl mx-auto p-6 space-y-6">
                {/* Questions */}
                {data?.data?.questions?.map((question, index) => (
                    <Card key={question._id}>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-start gap-3">
                                <span className="text-blue-600 font-bold">{index + 1}.</span>
                                <span>{question.question}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <RadioGroup
                                value={data[question._id]?.toString() || ""}
                                className="space-y-3"
                            >
                                {question.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="flex items-center space-x-3 pl-3 rounded-lg border hover:bg-muted transition-colors">
                                        <RadioGroupItem
                                            value={optionIndex.toString()}
                                            id={`${question._id}-${optionIndex}`}
                                        />
                                        <Label
                                            htmlFor={`${question._id}-${optionIndex}`}
                                            className="flex-1 cursor-pointer py-3"
                                        >
                                            {option}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Result;