import { Page } from '@playwright/test';

// Common functions that can be used in multiple tests

/**
 * Checks if a checkbox is not checked and checks it if necessary.
 * @param checkbox The checkbox element to check
 */
export async function checkIfNotChecked(checkbox: any) {
  if (!(await checkbox.isChecked())) {
    console.log('Checkbox is not checked, checking it now...');
    await checkbox.check();
  }
}

/**
 * Generates random data based on the parameters provided.
 * @param params Array of objects: { type: string; count: number; }
 * Supported types: 'string', 'number', 'email', 'boolean', 'date'
 * @returns Object with arrays of generated data for each type
 */
export function generateRandomData(params: { type: string; count: number }[]) {
  const result: Record<string, any[]> = {};
  for (const param of params) {
    const { type, count } = param;
    result[type] = [];
    for (let i = 0; i < count; i++) {
      switch (type) {
        case 'string':
          result[type].push(Math.random().toString(36).substring(2, 10));
          break;
        case 'number':
          result[type].push(Math.floor(Math.random() * 100000));
          break;
        case 'email':
          result[type].push(`user${Date.now()}${Math.floor(Math.random()*1000)}@example.com`);
          break;
        case 'boolean':
          result[type].push(Math.random() < 0.5);
          break;
        case 'date':
          result[type].push(new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0]);
          break;
        default:
          result[type].push(null);
      }
    }
  }
  console.log('Generated data:', result);
  return result;
}
