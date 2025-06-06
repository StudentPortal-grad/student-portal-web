import TooltipWrapper from "@/components/TooltipWrapper";
import Image from "next/image";

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
  return (
    <div className="bg-primary-light flex w-full items-center justify-between rounded-[8px] p-2">
      <div className="flex items-center gap-4">
        <TooltipWrapper content="A - Z">
          <div className="bg-black-5 cursor-pointer rounded-[8px] p-1">
            <Image
              src="/icons/sorting.svg"
              alt="sorting"
              width={20}
              height={20}
            />
          </div>
        </TooltipWrapper>

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
