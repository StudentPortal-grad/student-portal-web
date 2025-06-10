"use client";

import TooltipWrapper from "@/components/TooltipWrapper";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

interface ActionBarProps {
  selectedCount: number;
  onSearch: (query: string) => void;
  onDelete: () => void;
}

export function ActionBar({
  selectedCount,
  onSearch,
  onDelete,
}: ActionBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="bg-primary-light flex w-full items-center justify-between rounded-[8px] p-2">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <IconButton onClick={() => router.push("/events")} content="List">
            <ListIcon />
          </IconButton>
          <IconButton
            onClick={() => router.push("/events/calendar")}
            content="Calendar"
          >
            <CalendarIcon />
          </IconButton>
        </div>

        <div className="bg-black-10 h-[20px] w-[1px]"></div>

        <IconButton onClick={() => {}} content="A - Z">
          <Image
            src="/icons/sorting.svg"
            alt="sorting"
            width={20}
            height={20}
          />
        </IconButton>

        <div className="bg-black-10 h-[20px] w-[1px]"></div>

        <span className="text-black-100 text-sm font-medium">
          {selectedCount} Selected
        </span>

        <TooltipWrapper content="Delete">
          <Image
            src="/icons/delete.svg"
            alt="delete"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={onDelete}
          />
        </TooltipWrapper>
      </div>

      <div className="relative flex h-full w-[220px] items-center">
        <span className="absolute top-1/2 left-3 -translate-y-1/2">
          <Image src="/icons/search.svg" alt="search" width={20} height={20} />
        </span>
        <input
          type="text"
          placeholder="Search"
          className="border-black-10 placeholder:text-black-20 h-full w-full rounded-[8px] border bg-white py-2 pr-3 pl-10 text-sm outline-none"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

function CalendarIcon() {
  const pathname = usePathname();
  const isActive = pathname === "/events/calendar";

  return (
    <svg width="14" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_2278_53235)">
        <path
          d="M3 1V2H1.5C0.671875 2 0 2.67188 0 3.5V5H14V3.5C14 2.67188 13.3281 2 12.5 2H11V1C11 0.446875 10.5531 0 10 0C9.44687 0 9 0.446875 9 1V2H5V1C5 0.446875 4.55312 0 4 0C3.44688 0 3 0.446875 3 1ZM14 6H0V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V6Z"
          fill={isActive ? "#2563EB" : "#4B5563"}
        />
      </g>
      <defs>
        <clipPath id="clip0_2278_53235">
          <path d="M0 0H14V16H0V0Z" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ListIcon() {
  const pathname = usePathname();
  const isActive = pathname === "/events";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
    >
      <path
        d="M1.25 0.5C0.834375 0.5 0.5 0.834375 0.5 1.25V2.75C0.5 3.16563 0.834375 3.5 1.25 3.5H2.75C3.16563 3.5 3.5 3.16563 3.5 2.75V1.25C3.5 0.834375 3.16563 0.5 2.75 0.5H1.25ZM6 1C5.44688 1 5 1.44687 5 2C5 2.55312 5.44688 3 6 3H15C15.5531 3 16 2.55312 16 2C16 1.44687 15.5531 1 15 1H6ZM6 6C5.44688 6 5 6.44688 5 7C5 7.55312 5.44688 8 6 8H15C15.5531 8 16 7.55312 16 7C16 6.44688 15.5531 6 15 6H6ZM6 11C5.44688 11 5 11.4469 5 12C5 12.5531 5.44688 13 6 13H15C15.5531 13 16 12.5531 16 12C16 11.4469 15.5531 11 15 11H6ZM0.5 6.25V7.75C0.5 8.16563 0.834375 8.5 1.25 8.5H2.75C3.16563 8.5 3.5 8.16563 3.5 7.75V6.25C3.5 5.83437 3.16563 5.5 2.75 5.5H1.25C0.834375 5.5 0.5 5.83437 0.5 6.25ZM1.25 10.5C0.834375 10.5 0.5 10.8344 0.5 11.25V12.75C0.5 13.1656 0.834375 13.5 1.25 13.5H2.75C3.16563 13.5 3.5 13.1656 3.5 12.75V11.25C3.5 10.8344 3.16563 10.5 2.75 10.5H1.25Z"
        fill={isActive ? "#2563EB" : "#4B5563"}
      />
    </svg>
  );
}

function IconButton({
  children,
  onClick,
  content,
}: {
  children: React.ReactNode;
  onClick: () => void;
  content: string;
}) {
  return (
    <TooltipWrapper content={content}>
      <div
        className="bg-black-5 cursor-pointer rounded-[8px] p-1"
        onClick={onClick}
      >
        {children}
      </div>
    </TooltipWrapper>
  );
}
