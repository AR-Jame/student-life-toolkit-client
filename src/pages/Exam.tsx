import GenerateExam from "@/components/modules/Exam/GenerateExam";

const Exam = () => {
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
        </div>
    );
};

export default Exam;