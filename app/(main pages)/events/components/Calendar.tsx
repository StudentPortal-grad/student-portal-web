"use client";
import React from "react";
import { ActionBar } from "./ActionBar";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Image from "next/image";

export default function Calendar() {
  return (
    <div className="flex h-[calc(100vh-120px)] flex-col gap-4">
      <ActionBar selectedCount={0} onSearch={() => {}} onDelete={() => {}} />
      <div className="flex-1 overflow-hidden rounded-lg bg-white p-4 shadow-sm">
        <div className="h-full">
          <BigCalendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            components={{
              event: EventComponent,
            }}
            eventPropGetter={(event) => ({
              className:
                "!p-0 [&_.rbc-event-label]:!hidden [&_.rbc-event-content]:!m-0 [&_.rbc-event-content]:!p-0",
            })}
            className="rounded-lg [&_.rbc-event]:!bg-transparent [&_.rbc-event]:!p-0 [&_.rbc-event-content]:!m-0 [&_.rbc-event-content]:!p-0"
          />
        </div>
      </div>
    </div>
  );
}

const localizer = momentLocalizer(moment);

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  description?: string;
  attendees?: number;
  location?: string;
}

const myEventsList: CalendarEvent[] = [
  {
    title: "Team Meeting",
    start: new Date(),
    description: "Weekly team sync to discuss project progress and blockers",
    attendees: 15,
    location: "Room 101, Building A",
    end: new Date(new Date().setHours(new Date().getHours() + 2)),
  },
  {
    title: "Workshop: React Best Practices",
    start: new Date(new Date().setDate(new Date().getDate() + 1)),
    description:
      "Learn about React best practices and performance optimization",
    attendees: 25,
    location: "Conference Room B",
    end: new Date(
      new Date().setDate(new Date().getDate() + 1) + 3 * 60 * 60 * 1000,
    ),
  },
  {
    title: "Code Review Session",
    start: new Date(new Date().setDate(new Date().getDate() + 2)),
    description: "Review recent pull requests and discuss code improvements",
    attendees: 8,
    location: "Virtual Meeting Room",
    end: new Date(
      new Date().setDate(new Date().getDate() + 2) + 1 * 60 * 60 * 1000,
    ),
  },
  {
    title: "Project Planning",
    start: new Date(new Date().setDate(new Date().getDate() + 3)),
    description: "Plan next sprint and assign tasks to team members",
    attendees: 12,
    location: "Room 303, Building C",
    end: new Date(
      new Date().setDate(new Date().getDate() + 3) + 2 * 60 * 60 * 1000,
    ),
  },
];

const EventComponent = ({ event }: { event: CalendarEvent }) => (
  <div className="h-full rounded-lg border border-gray-100 bg-white p-2 shadow-sm transition-shadow hover:shadow-md">
    <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent flex h-full flex-col gap-1 overflow-y-auto">
      <div className="flex items-center justify-between">
        <h3 className="truncate text-sm font-semibold text-gray-900">
          {event.title}
        </h3>
        {event.attendees && (
          <div className="flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1">
            <Image
              src="/icons/users.svg"
              alt="attendees"
              width={12}
              height={12}
              className="text-gray-500"
            />
            <span className="text-xs text-gray-600">{event.attendees}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <Image
            src="/icons/time.svg"
            alt="time"
            width={12}
            height={12}
            className="text-gray-500"
          />
          <span className="text-xs text-gray-600">
            {moment(event.start).format("h:mm A")} -{" "}
            {moment(event.end).format("h:mm A")}
          </span>
        </div>
        {event.location && (
          <div className="flex items-center gap-1">
            <Image
              src="/icons/location.svg"
              alt="location"
              width={12}
              height={12}
              className="text-gray-500"
            />
            <span className="text-xs text-gray-600">{event.location}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);
