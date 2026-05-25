import type { CharacterSchema } from '@/types/interfaces';

export const downloadCharactersCSV = (characters: CharacterSchema[]): void => {
  if (characters.length === 0) return;

  const headers = [
    'ID',
    'Name',
    'Status',
    'Species',
    'Gender',
    'Type',
    'Origin',
    'Last Location',
    'Image URL',
  ];

  const rows = characters.map((char) => [
    char.id,
    char.name,
    char.status,
    char.species,
    char.gender,
    char.type || 'Unknown',
    char.origin.name,
    char.location.name,
    char.image,
  ]);

  const csvContent = [headers, ...rows]
    .map((row) =>
      row
        .map((field) => {
          const readyField = String(field).replaceAll('"', '""');
          return `"${readyField}"`;
        })
        .join(',')
    )
    .join('\n');

  const blob = new Blob(['\uFEFF' + csvContent], {
    type: 'text/csv;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${characters.length}_characters.csv`;

  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};
