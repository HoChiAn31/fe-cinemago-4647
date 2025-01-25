import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToExcel = (
	dataSheets: { sheetName: string; data: any[] }[],
	fileName: string,
) => {
	const wb = XLSX.utils.book_new();

	dataSheets.forEach((sheet) => {
		const ws = XLSX.utils.json_to_sheet(sheet.data);
		XLSX.utils.book_append_sheet(wb, ws, sheet.sheetName);
	});

	const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
	saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${fileName}.xlsx`);
};
