import { useMemo } from 'react';
import { List, useDynamicRowHeight } from 'react-window';
import type { Country } from '../../types';
import styles from './country-list.module.css';
import { CountryRow, type RowProps } from './country-row';

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
};

export const CountryList = ({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) => {
  const filteredCountries = useMemo(() => {
    const filtered = countries.filter((c) => {
      const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
      return matchesSearch && matchesRegion;
    });

    if (sortField === 'population') {
      const popMap = new Map<string, number>();
      filtered.forEach(c => {
        const pop = c.data.find(d => d.year === selectedYear)?.population || 0;
        popMap.set(c.id, pop);
      });

      filtered.sort((a, b) => {
        const popA = popMap.get(a.id) || 0;
        const popB = popMap.get(b.id) || 0;
        return sortOrder === 'asc' ? popA - popB : popB - popA;
      });
      return filtered;
    }

    filtered.sort((a, b) =>
      sortOrder === 'asc'
        ? a.id.localeCompare(b.id)
        : b.id.localeCompare(a.id)
    );

    return filtered;
  }, [countries, searchQuery, selectedRegion, selectedYear, sortField, sortOrder]);

  const rowHeight = useDynamicRowHeight({
    defaultRowHeight: 166.08
  });

  const rowProps = useMemo<RowProps>(() => ({
    items: filteredCountries,
    selectedYear,
    selectedColumns,
  }), [filteredCountries, selectedYear, selectedColumns]);

  return (
    <div className={styles.countryList} style={{ height: '517px' }}>
      <List
        rowComponent={CountryRow}
        rowCount={filteredCountries.length}
        rowHeight={rowHeight}
        rowProps={rowProps}
        overscanCount={1}
      />
    </div>
  );
};
