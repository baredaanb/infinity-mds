'use server';

import fs from 'fs/promises';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'internal-projects.json');

export type DynamicTrackerData = {
  columns: string[];
  rows: Record<string, string>[];
  columnWidths?: Record<string, number>;
};

export async function getProjects(): Promise<DynamicTrackerData> {
  try {
    const data = await fs.readFile(dataFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading projects:', error);
    return { columns: [], rows: [] };
  }
}

export async function saveProjects(data: DynamicTrackerData): Promise<{success: boolean, error?: string}> {
  try {
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
    await fs.writeFile(dataFile, JSON.stringify(data, null, 2), 'utf8');
    return { success: true };
  } catch (error: any) {
    console.error('Error saving projects:', error);
    return { success: false, error: error.message };
  }
}
