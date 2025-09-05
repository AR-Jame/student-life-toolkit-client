import { Accordion as AccordionPrimitive } from "radix-ui"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion"
import { format } from "date-fns";
import { Clock, PlusIcon } from "lucide-react";
import type { ISchedule } from "@/types/schedules.types";
import { Skeleton } from "./ui/skeleton";


interface IProps {
  data: ISchedule[] | undefined;
  isLoading: boolean
}

export default function ScheduleAccordion({ data, isLoading }: IProps) {
  const uniqueDates = [...new Set(data?.map(schedule => schedule.date))];
  const today = new Date().toISOString();

  const orderedDates = [
    today,
    ...uniqueDates.filter(e => new Date(e).toDateString() !== today)
  ];

  if (isLoading) return (
    <>
      <Skeleton className="h-20 w-full mb-2 rounded-lg" />
      <Skeleton className="h-20 w-full mb-2 rounded-lg" />
      <Skeleton className="h-20 w-full mb-2 rounded-lg" />
      <Skeleton className="h-20 w-full mb-2 rounded-lg" />
    </>
  )
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full space-y-2"
      defaultValue="0"
    >
      {orderedDates.map((item, idx) => (
        <AccordionItem
          value={idx.toString()}
          key={idx}
          className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-md border px-4 py-1 outline-none last:border-b has-focus-visible:ring-[3px]"
        >
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between text-xl rounded-md py-5 text-left leading-6 font-semibold transition-all outline-none focus-visible:ring-0 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
              {format(item, "PP")}
              <PlusIcon
                size={16}
                className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
                aria-hidden="true"
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionContent className="text-muted-foreground pb-2">
            {(() => {
              const filteredSchedules = data?.filter(e => e.date === item);

              if (filteredSchedules?.length === 0) {
                return (
                  <div className="text-center text-sm text-gray-500 py-4">
                    No schedules for this day.
                  </div>
                );
              }

              return filteredSchedules?.map(e => (
                <div
                  key={e._id}
                  className="w-full p-4 rounded-lg mb-2 cursor-pointer flex items-center gap-5"
                // style={{
                //   backgroundColor:
                //     typeof e.subjectId === "object" && e.subjectId?.color
                //       ? e.subjectId.color
                //       : undefined
                // }}
                >
                  <div className="rounded-full w-5 h-5"
                    style={{
                      backgroundColor:
                        typeof e.subjectId === "object" && e.subjectId?.color
                          ? e.subjectId.color
                          : undefined
                    }}
                  />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {typeof e.subjectId === "object" && e.subjectId?.name
                        ? e.subjectId.name
                        : String(e.subjectId)}
                    </h3>
                    <p className="text-sm flex items-center gap-1">
                      <Clock size={"1rem"} /> {e.startTime} - {e.endTime}
                    </p>
                    <p className="text-xs">Instructor: {e.instructor}</p>
                  </div>
                </div>
              ));
            })()}
          </AccordionContent>
        </AccordionItem>
      ))
      }
    </Accordion >
  )
}
