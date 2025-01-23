// NoData.tsx
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { MESSAGES } from '@/app/utils/strings';

interface NoDataProps {
  message?: string; // Optional prop for custom message
  colSpan: number; // columns length
}
const NoTableData: React.FC<NoDataProps> = ({ message = MESSAGES.noData, colSpan }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="pt-4 text-lg text-center">
        {message}
      </TableCell>
    </TableRow>
  );
};

export default NoTableData;