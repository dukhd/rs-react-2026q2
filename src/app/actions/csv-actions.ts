'use server';

import type { CharacterSchema } from '@/types/interfaces';

export interface CSVState {
  success: boolean;
  data: string | null;
  error: string | null;
}

export async function generateCSVAction(
  characters: CharacterSchema[]
): Promise<CSVState> {
  try {
    if (!characters || characters.length === 0) {
      return { success: false, data: null, error: 'No characters selected' };
    }

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

    return {
      success: true,
      data: '\uFEFF' + csvContent,
      error: null,
    };
  } catch (err) {
    return {
      success: false,
      data: null,
      error:
        err instanceof Error
          ? err.message
          : 'Unknown error during CSV generation',
    };
  }
}
