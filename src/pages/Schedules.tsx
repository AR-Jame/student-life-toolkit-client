import { useGetSchedules } from "@/queries/schedules.queries";
import AddSchedule from "@/components/modules/Schedule/AddSchedule";
import AddSubject from "@/components/modules/Schedule/AddSubject";
import ScheduleAccordion from "@/components/modules/Schedule/ScheduleAccordian";


const Schedules = () => {

    const { data, isLoading } = useGetSchedules();

    return (
        <div className="container mx-auto py-4">
            <div className="flex items-center justify-between mt-4">
                <div>
                    <h3 className="text-4xl pb-2 font-semibold">Daily class schedule tracker</h3>
                    <p className="text-gray-600">Manage your daily classes easily and stand out your academic career</p>
                </div>
                <div className="flex gap-2">
                    <AddSchedule />
                    <AddSubject />
                </div>
            </div>
            <div className="mt-8">
                <ScheduleAccordion data={data} isLoading={isLoading} />
            </div>
        </div>
    );
};

export default Schedules;
