import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import type { TypeAggregation } from "@/types/budget.type"

export const description = "A simple pie chart"

const chartConfig = {
    Income: {
        label: "Income",
        color: "var(--chart-1)",
    },
    Expense: {
        label: "Expense",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function ChartPie({ data }: { data: TypeAggregation[] }) {
    const something = data?.map(item => item._id === "Expense" ? item = { ...item, fill: "var(--chart-1)" } : item = { ...item, fill: "var(--chart-2)" })
    console.log(something);
    const chartData = something
    console.log(something);
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Pie Chart</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie data={chartData} dataKey="totalAmount" nameKey="_id" />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}
