import TooltipWrapper from "@/components/TooltipWrapper";
import Image from "next/image";
import Link from "next/link";

interface ActionBarProps {
  onSearch: (query: string) => void;
}

export function ActionBar({ onSearch }: ActionBarProps) {
  return (
    <div className="bg-primary-light flex w-full items-center justify-between rounded-[8px] p-2">
      <div className="flex items-center gap-4">
        <div className="bg-black-10 h-[20px] w-[1px]"></div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative flex h-full w-[220px] items-center">
          <span className="absolute top-1/2 left-3 -translate-y-1/2">
            <Image
              src="/icons/search.svg"
              alt="search"
              width={20}
              height={20}
            />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="border-black-10 placeholder:text-black-20 h-full w-full rounded-[8px] border bg-white py-2 pr-3 pl-10 text-sm outline-none"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Link
          href="/communities/new"
          className="bg-primary-blue-base flex items-center gap-1 rounded-[8px] px-4 py-2"
        >
          <Image
            src="/icons/plus.svg"
            alt="New Community"
            width={18}
            height={18}
          />
          <span className="text-sm font-medium text-white">New Community</span>
        </Link>
      </div>
    </div>
  );
}
