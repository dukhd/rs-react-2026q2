import type { RowComponentProps } from 'react-window';
import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';

export type RowProps = {
  items: Country[];
  selectedYear: number;
  selectedColumns: string[];
};

export const CountryRow = (({
  index,
  style,
  items,
  selectedYear,
  selectedColumns,
}: RowComponentProps<RowProps>) => {
  const country = items[index];

  if (!country) {
    return null;
  };

  return (
    <div style={style}>
      <CountryCard
        key={country.id}
        country={country}
        selectedYear={selectedYear}
        selectedColumns={selectedColumns}
      />
    </div>
  );
});
