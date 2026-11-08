'use client';

import { useId, useState } from 'react';
import {
  ChevronDownIcon,
  CircleCloseIcon,
  CircleMinusIcon,
  CirclePlusIcon,
  SearchIcon,
} from '@/components/Icons';

export type CalendarProject = { slug: string; name: string };

function ProjectCheckbox({
  project,
  checked,
  onToggle,
}: {
  project: CalendarProject;
  checked: boolean;
  onToggle: (slug: string) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-1.5 text-[1.0625rem] text-[#0f172a]">
      <input
        type="checkbox"
        name="project"
        value={project.slug}
        checked={checked}
        onChange={() => onToggle(project.slug)}
        className="h-5 w-5 shrink-0 cursor-pointer rounded accent-[#006fc2]"
      />
      <span>{project.name}</span>
      <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-[#314158]" />
    </label>
  );
}

export function ProjectFilter({
  root,
  subprojects,
  selected,
  onChange,
}: {
  root: CalendarProject;
  subprojects: CalendarProject[];
  selected: Set<string>;
  onChange: (next: Set<string>) => void;
}) {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const panelId = useId();
  const childrenId = useId();

  const needle = query.trim().toLowerCase();
  const matches = (project: CalendarProject) => project.name.toLowerCase().includes(needle);
  const visibleChildren = needle ? subprojects.filter(matches) : subprojects;
  const showRoot = !needle || matches(root) || visibleChildren.length > 0;

  const toggle = (slug: string) => {
    const next = new Set(selected);
    if (next.has(slug)) next.delete(slug);
    else next.add(slug);
    onChange(next);
  };

  return (
    <section aria-labelledby={`${panelId}-title`} className="px-1">
      <div className="flex items-center gap-4">
        <h3 id={`${panelId}-title`} className="calendar-heading m-0 text-lg">
          Projects
        </h3>
        {selected.size ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-[#6b7280] py-1.5 pl-3 pr-2 text-xs text-white">
            {selected.size} {selected.size === 1 ? 'project' : 'projects'}
            <button
              type="button"
              aria-label="Clear project selection"
              onClick={() => onChange(new Set())}
              className="grid place-items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white"
            >
              <CircleCloseIcon size={16} />
            </button>
          </span>
        ) : null}
        <button
          type="button"
          aria-expanded={panelOpen}
          aria-controls={panelId}
          aria-label={panelOpen ? 'Hide projects' : 'Show projects'}
          onClick={() => setPanelOpen(!panelOpen)}
          className="calendar-icon-button ml-auto grid h-9 w-9 place-items-center lg:hidden"
        >
          {panelOpen ? <CircleMinusIcon size={18} /> : <CirclePlusIcon size={18} />}
        </button>
      </div>

      <div id={panelId} className={`${panelOpen ? 'block' : 'hidden'} lg:block`}>
        <label className="relative mt-5 block">
          <span className="sr-only">Search projects</span>
          <input
            type="search"
            name="project-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Projects"
            className="w-full rounded-md border border-[#cbd5e1] bg-white py-2.5 pl-3 pr-10 text-base text-[#0f172a] placeholder:text-[#64748b] focus:border-[#006fc2] focus:outline-none focus:ring-2 focus:ring-[#006fc2]/30"
          />
          <SearchIcon
            size={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b]"
          />
        </label>

        {showRoot ? (
          <ul className="m-0 mt-2 list-none p-0">
            <li className="m-0">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={childrenId}
                  aria-label={expanded ? `Collapse ${root.name}` : `Expand ${root.name}`}
                  onClick={() => setExpanded(!expanded)}
                  className="calendar-icon-button grid h-7 w-7 place-items-center"
                >
                  <ChevronDownIcon
                    size={16}
                    className={`transition-transform ${expanded ? '' : '-rotate-90'}`}
                  />
                </button>
                <ProjectCheckbox
                  project={root}
                  checked={selected.has(root.slug)}
                  onToggle={toggle}
                />
              </div>
              <ul id={childrenId} hidden={!expanded} className="m-0 list-none py-0 pl-11 pr-0">
                {visibleChildren.map((project) => (
                  <li key={project.slug} className="m-0">
                    <ProjectCheckbox
                      project={project}
                      checked={selected.has(project.slug)}
                      onToggle={toggle}
                    />
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        ) : (
          <p className="m-0 mt-2 text-[#0f172a]">No results found</p>
        )}
      </div>
    </section>
  );
}
