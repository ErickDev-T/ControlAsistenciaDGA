//npm run test:e2e:headed // se abre la pesta;a
//npm run test:e2e        // sin
//npm run test:e2e:ui     // GUI jevi jevi xd

//npx playwright test --repeat-each=3           // 3 veces sin ver
//npx playwright test --headed --repeat-each=3  // 3 veces viendo

import { test, expect } from '@playwright/test';

test('DIFFERENT DAY', async ({ page }) => {
  await page.goto('http://localhost:5174/FormStandar');
  const rows = page.locator('tbody tr');

  for (let i = 0; i < 1; i++) {
    if (i > 0) {
      // agrega una nueva fila y espera a que exista
      await page.getByTestId('add-row-btn').click();
      await expect(rows).toHaveCount(i + 1);
    }

    const row = rows.nth(i); // 👈 scope a la fila i
    await row.getByPlaceholder('Ej.: 1001').fill(`1001`);
    await row.locator('input[type="date"]').first().fill('2025-09-04'); // entryDate
    await row.locator('input[type="time"]').first().fill('08:00');      // entryTime
    await row.locator('input[type="date"]').nth(1).fill('2025-09-04');  // exitDate
    await row.locator('input[type="time"]').nth(1).fill('16:00');       // exitTime
    await row.getByTestId('file-input').setInputFiles('tests/fixtures/test.png');
  }

  await page.getByTestId('submit-btn').click();
  await expect(page.getByText(/Se guardaron/i)).toBeVisible();
});

test('SAMEDAY', async({page}) => {
    await page.goto('http://localhost:5174/FormSameDay');
  const rows = page.locator('tbody tr');

  for (let i = 0; i < 1; i++) {
    if (i > 0) {
      // agrega una nueva fila y espera a que exista
      await page.getByTestId('add-row-btn').click();
      await expect(rows).toHaveCount(i + 1);
    }

    const row = rows.nth(i); //  para cada fila new

    await row.getByPlaceholder('Ej.: 1001').fill(`1001`);
    await row.locator('input[type="date"]').first().fill('2025-09-04'); 
    await row.locator('input[type="time"]').first().fill('08:00');      // entryTime
    await row.locator('input[type="time"]').nth(1).fill('16:00');       // exitTime

    await row.getByTestId('file-input').setInputFiles('tests/fixtures/test.png');
  }

  await page.getByTestId('submit-btn').click();
  await expect(page.getByText(/Se guardaron/i)).toBeVisible();
});