import { type FC, useMemo } from "react";
import { Autocomplete, Badge } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import type { TimelineData, TimelineSearchOption } from "@/components/case-studies/timeline.types";
import {
  buildTimelineSearchOptions,
  filterTimelineSearchOptions,
  groupTimelineSearchOptions,
} from "@/components/case-studies/timeline.utils";

export interface TimelineSearchAutocompleteProps {
  /** Timeline dataset used to build search options. */
  data: TimelineData;
  /** Current search input value (also used to dim non-matching dots). */
  searchQuery: string;
  /** Invoked on every keystroke in the search field. */
  onSearchChange: (value: string) => void;
  /** Invoked when the user picks a milestone or event from the dropdown. */
  onOptionSelect: (option: TimelineSearchOption) => void;
}

/**
 * Autocomplete search across all milestone eras and their events.
 * Selecting an option focuses that item on the timeline.
 */
export const TimelineSearchAutocomplete: FC<TimelineSearchAutocompleteProps> = ({
  data,
  searchQuery,
  onSearchChange,
  onOptionSelect,
}) => {
  const { t } = useTranslation();

  const allOptions = useMemo(() => buildTimelineSearchOptions(data), [data]);
  const optionById = useMemo(
    () => new Map(allOptions.map((option) => [option.id, option])),
    [allOptions],
  );

  const filteredOptions = useMemo(
    () => filterTimelineSearchOptions(allOptions, data, searchQuery),
    [allOptions, data, searchQuery],
  );

  const comboboxData = useMemo(
    () => groupTimelineSearchOptions(filteredOptions),
    [filteredOptions],
  );

  return (
    <Autocomplete
      size="xs"
      placeholder={t("caseStudies.searchPlaceholder")}
      leftSection={<IconSearch size={14} />}
      value={searchQuery}
      onChange={onSearchChange}
      onOptionSubmit={(value) => {
        const option = optionById.get(value);
        if (option) onOptionSelect(option);
      }}
      data={comboboxData}
      limit={24}
      maxDropdownHeight={320}
      comboboxProps={{ withinPortal: true }}
      renderOption={({ option }) => {
        const entry = optionById.get(option.value);
        if (!entry) return option.label;

        return (
          <div className="py-0.5 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-medium text-neutral-800 dark:text-neutral-100 truncate">
                {entry.label}
              </span>
              <Badge
                size="xs"
                variant="light"
                color={entry.kind === "milestone" ? "cyan" : "gray"}
                className="shrink-0"
              >
                {entry.kind === "milestone"
                  ? t("caseStudies.milestone")
                  : t("caseStudies.searchEventType")}
              </Badge>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-2 leading-snug">
              {entry.description}
            </p>
          </div>
        );
      }}
      nothingFoundMessage={t("caseStudies.searchNoResults")}
    />
  );
};
