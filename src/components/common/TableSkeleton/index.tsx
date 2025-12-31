'use client';

import React from 'react';

interface TableSkeletonProps {
  columns: number;
  rows?: number;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({ columns, rows = 5 }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, idx) => (
              <th key={idx} className="p-3 text-left bg-gray-100">
                <div className="h-4 bg-gray-300 rounded animate-pulse w-24"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <tr key={rowIdx} className="border-b">
              {Array.from({ length: columns }).map((_, colIdx) => (
                <td key={colIdx} className="p-3">
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
