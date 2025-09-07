import { useGetExamQuestion, useSubmitExam } from "@/queries/exam.queries";
import { useParams } from "react-router";
import { useState } from "react";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface Question {
    _id: string;
    question: string;
    options: string[];
}

export interface ExamAnswer {
    questionId: string;
    selectedOption: number;
}

const ExamPage = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetExamQuestion(id as string);
    const questions: Question[] = data?.data?.questions || [];
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const submitExam = useSubmitExam();


    if (isLoading) return <p>Loading...</p>;
    if (!questions.length) return <p>No questions found</p>;

    const handleAnswerChange = (questionId: string, optionIndex: number) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: optionIndex
        }));
    };

    const handleSubmit = () => {
        // Check if all questions are answered
        const unansweredQuestions = questions.filter(q => !(q._id in answers));

        if (unansweredQuestions.length > 0) {
            alert(`Please answer all questions. ${unansweredQuestions.length} remaining.`);
            return;
        }

        const examAnswers: ExamAnswer[] = Object.entries(answers).map(([questionId, selectedOption]) => ({
            questionId,
            selectedOption
        }));

        submitExam.mutate({ examId: data?.data?._id, payload: examAnswers })
    };

    const answeredCount = Object.keys(answers).length;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Questions */}
            {questions.map((question, index) => (
                <Card key={question._id}>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-start gap-3">
                            <span className="text-blue-600 font-bold">{index + 1}.</span>
                            <span>{question.question}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup
                            value={answers[question._id]?.toString() || ""}
                            onValueChange={(value) => handleAnswerChange(question._id, parseInt(value))}
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

            {/* Submit Button */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                            Questions answered: {answeredCount} of {questions.length}
                            {answeredCount < questions.length && (
                                <span className="text-red-500 ml-2">
                                    ({questions.length - answeredCount} remaining)
                                </span>
                            )}
                        </div>
                        <Button onClick={handleSubmit} className="px-8">
                            Submit Exam
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ExamPage;