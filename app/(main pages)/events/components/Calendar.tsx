"use client";
import React, { useState, useEffect } from "react";
import { ActionBar } from "./ActionBar";
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
  View,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Image from "next/image";

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  description?: string;
  attendees?: number;
  location?: string;
}

interface CalendarProps {
  events: CalendarEvent[];
}

export default function Calendar({ events }: CalendarProps) {
  const [localizer, setLocalizer] = useState<any>(null);
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setLocalizer(momentLocalizer(moment));
  }, []);

  if (!localizer) {
    return (
      <div className="flex h-[calc(100vh-120px)] flex-col gap-4">
        <ActionBar selectedCount={0} onSearch={() => {}} onDelete={() => {}} />
        <div className="flex-1 overflow-hidden rounded-lg bg-white p-4 shadow-sm">
          <div className="flex h-full items-center justify-center">
            <div className="text-gray-500">Loading calendar...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-120px)] flex-col gap-4">
      <ActionBar selectedCount={0} onSearch={() => {}} onDelete={() => {}} />
      <div className="flex-1 overflow-hidden rounded-lg bg-white p-4 shadow-sm">
        <div className="h-full">
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            view={view}
            onView={setView}
            date={date}
            onNavigate={setDate}
            components={{
              event: EventComponent,
            }}
            eventPropGetter={(event) => ({
              className:
                "!p-0 [&_.rbc-event-label]:!hidden [&_.rbc-event-content]:!m-0 [&_.rbc-event-content]:!p-0",
            })}
            className="[&_.rbc-day-content]:!scrollbar-thin [&_.rbc-day-content]:!scrollbar-thumb-gray-300 [&_.rbc-day-content]:!scrollbar-track-transparent rounded-lg [&_.rbc-date-cell]:!overflow-visible [&_.rbc-day-bg]:!overflow-visible [&_.rbc-day-content]:!max-h-[120px] [&_.rbc-day-content]:!overflow-y-auto [&_.rbc-event]:!bg-transparent [&_.rbc-event]:!p-0 [&_.rbc-event-content]:!m-0 [&_.rbc-event-content]:!p-0 [&_.rbc-month-row]:!overflow-visible [&_.rbc-month-view]:!overflow-visible"
            dayLayoutAlgorithm="no-overlap"
            popup
            selectable
            onSelectEvent={(event) => {
              console.log("Selected event:", event);
            }}
            onSelectSlot={(slotInfo) => {
              console.log("Selected slot:", slotInfo);
            }}
            messages={{
              showMore: (total) => `+${total} more`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

const EventComponent = ({ event }: { event: CalendarEvent }) => (
  <div className="mb-1 rounded border border-gray-200 bg-white p-1 shadow-sm transition-shadow hover:shadow-md">
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center justify-between">
        <h3 className="truncate text-xs font-semibold text-gray-900">
          {event.title}
        </h3>
        <div className="flex items-center gap-1 rounded-full bg-gray-50 px-1 py-0.5">
          <Image
            src="/icons/users.svg"
            alt="attendees"
            width={10}
            height={10}
            className="text-gray-500"
          />
          <span className="text-xs text-gray-600">{event.attendees}</span>
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1">
          <Image
            src="/icons/time.svg"
            alt="time"
            width={10}
            height={10}
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
              width={10}
              height={10}
              className="text-gray-500"
            />
            <span className="truncate text-xs text-gray-600">
              {event.location}
            </span>
          </div>
        )}
      </div>
    </div>
  </div>
);
