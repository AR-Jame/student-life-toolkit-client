import { useState } from 'react';
import { ChevronDown, ChevronRight, Target, Calendar, CheckCircle2, Circle } from 'lucide-react';
import { useGetPlanner, useToggleTask } from '@/queries/planner.queries';
import { format } from 'date-fns';
import type { Milestone, Planner, Task } from '@/types/planner.types';
import AddPlanner from '@/components/modules/planner/AddPlanner';
import AddMilestone from '@/components/modules/planner/AddMilestone';
import AddTask from '@/components/modules/planner/AddTask';

const StudyJourneyPlanner = () => {
    const [expandedGoals, setExpandedGoals] = useState(new Set());
    const [expandedMilestones, setExpandedMilestones] = useState(new Set());
    const { data, isLoading } = useGetPlanner();
    const toggleTask = useToggleTask();
    if (isLoading) return <p>Loading</p>

    const goals = data?.data

    const handleToggleTask = ({ plannerId, milestoneId, taskId }: { plannerId: string, milestoneId: string, taskId: string }) => {
        toggleTask.mutate({ plannerId, milestoneId, taskId })
    }

    const isOverdue = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const toggleGoalExpansion = (goalId: string) => {
        const newExpanded = new Set(expandedGoals);
        if (newExpanded.has(goalId)) {
            newExpanded.delete(goalId);
        } else {
            newExpanded.add(goalId);
        }
        setExpandedGoals(newExpanded);
    };

    const toggleMilestoneExpansion = (milestoneId: string) => {
        const newExpanded = new Set(expandedMilestones);
        if (newExpanded.has(milestoneId)) {
            newExpanded.delete(milestoneId);
        } else {
            newExpanded.add(milestoneId);
        }
        setExpandedMilestones(newExpanded);
    };

    const getMilestoneProgress = (milestone: Milestone) => {
        if (milestone.tasks.length === 0) return 0;
        const completedTasks = milestone.tasks.filter((task: Task) => task.isCompleted).length;
        return Math.round((completedTasks / milestone.tasks.length) * 100);
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex items-center justify-between mt-4">
                <div>
                    <h3 className="text-4xl pb-2 font-semibold">Track your income and expenses</h3>
                    <p className="text-gray-600">Manage your daily classes easily and stand out your academic career</p>
                </div>
                <div className="flex gap-2">
                    <AddPlanner />
                </div>
            </div>

            {/* Goals List */}
            <div className="space-y-4">
                {goals.map((goal: Planner) => (
                    <div key={goal._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {/* Goal Header */}
                        <div
                            className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white cursor-pointer hover:from-indigo-700 hover:to-purple-700 transition-all"
                            onClick={() => toggleGoalExpansion(goal._id)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {expandedGoals.has(goal._id) ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                    <Target size={20} />
                                    <div>
                                        <h2 className="text-xl font-bold">{goal.title}</h2>
                                        {goal.description && <p className="text-indigo-100 text-sm mt-1">{goal.description}</p>}
                                        <div className="flex items-center gap-4 text-sm text-indigo-100 mt-1">
                                            <span className="bg-indigo-500 px-2 py-1 rounded">
                                                {goal.priority} Priority
                                            </span>
                                            <span className="bg-indigo-500 px-2 py-1 rounded">
                                                {goal.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold">{goal.progressPercentage}%</div>
                                    <div className="text-sm text-indigo-100">Progress</div>
                                </div>
                            </div>
                        </div>

                        {/* Milestones */}
                        {expandedGoals.has(goal._id) && (
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-700">Milestones</h3>
                                    <AddMilestone id={goal._id} />
                                </div>

                                <div className="space-y-3">
                                    {goal.milestones.map((milestone, index) => (
                                        <div key={milestone._id} className="relative">
                                            {/* Milestone Header */}
                                            <div
                                                className={`p-3 rounded-lg cursor-pointer transition-all ${milestone.isCompleted
                                                    ? 'bg-green-50 border-2 border-green-200'
                                                    : 'bg-gray-50 border-2 border-gray-200 hover:border-blue-300'
                                                    }`}
                                                onClick={() => toggleMilestoneExpansion(milestone._id)}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${milestone.isCompleted
                                                                ? 'bg-green-500 '
                                                                : 'bg-blue-500'
                                                                }`}>
                                                                {index + 1}
                                                            </div>
                                                            {expandedMilestones.has(milestone._id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-gray-800">{milestone.title}</h4>
                                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                                <Calendar size={14} />
                                                                <span className={isOverdue(milestone.deadline) ? 'text-red-600 font-semibold' : ''}>
                                                                    Due: {format(milestone.deadline, "PPp")}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-lg font-bold text-gray-700">{getMilestoneProgress(milestone)}%</div>
                                                        <div className="text-xs text-gray-500">{milestone.tasks.filter(t => t.isCompleted).length}/{milestone.tasks.length} tasks</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Tasks */}
                                            {expandedMilestones.has(milestone._id) && (
                                                <div className="ml-8 mt-2 space-y-2">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm font-semibold text-gray-600">Daily Tasks</span>
                                                        <AddTask milestoneId={milestone._id} plannerId={goal._id} />
                                                    </div>

                                                    {milestone.tasks.length === 0 ? (
                                                        <div className="text-gray-500 text-sm italic p-2">No tasks yet. Add some daily tasks!</div>
                                                    ) : (
                                                        milestone.tasks.map((task) => (
                                                            <div
                                                                key={task._id}
                                                                className={`flex items-center justify-between p-2 rounded border ${task.isCompleted
                                                                    ? 'bg-green-50 border-green-200 text-green-800'
                                                                    : isOverdue(task.date)
                                                                        ? 'bg-red-50 border-red-200'
                                                                        : 'bg-white border-gray-200'
                                                                    }`}
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <button
                                                                        className={`transition-colors ${task.isCompleted ? 'text-green-600' : 'text-gray-400 hover:text-blue-600'}`}
                                                                        onClick={() => handleToggleTask({ plannerId: goal._id, milestoneId: milestone._id, taskId: task._id })}
                                                                    >
                                                                        {task.isCompleted ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                                                                    </button>
                                                                    <span className={task.isCompleted ? 'line-through text-green-700' : ''}>{task.title}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2 text-sm">
                                                                    <span className={`${isOverdue(task.date) && !task.isCompleted ? 'text-red-600 font-semibold' : 'text-gray-600'
                                                                        }`}>
                                                                        {format(task.date, "PPp")}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {goal.milestones.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">
                                        <Target className="mx-auto mb-2 opacity-50" size={48} />
                                        <p>No milestones yet. Break down your goal into smaller steps!</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {
                goals.length === 0 && (
                    <div className="text-center py-12">
                        <Target className="mx-auto mb-4 text-gray-400" size={64} />
                        <h2 className="text-2xl font-bold text-gray-600 mb-2">Ready to Start Your Journey?</h2>
                        <p className="text-gray-500 mb-4">Create your first goal and break it down into manageable milestones.</p>
                    </div>
                )
            }
        </div >
    );
};

export default StudyJourneyPlanner;