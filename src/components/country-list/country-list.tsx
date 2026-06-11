import { useMemo } from 'react';
import { List } from 'react-window';
import type { Country } from '../../types';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';
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
    return countries
      .filter((c) => {
        const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
        return matchesSearch && matchesRegion;
      })
      .sort((a, b) => {
        if (sortField === 'name') {
          return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
        } else {
          const popA = getPopulationForYear(createYearDataMap(a.data), selectedYear) || 0;
          const popB = getPopulationForYear(createYearDataMap(b.data), selectedYear) || 0;
          return sortOrder === 'asc' ? popA - popB : popB - popA;
        }
      });
  }, [countries, searchQuery, selectedRegion, selectedYear, sortField, sortOrder]);


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
        rowHeight={280.08}
        rowProps={rowProps}
        overscanCount={1}
      />
    </div>
  );
};
