import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from "@tanstack/react-table";
import classnames from "classnames";

interface TableProps<TData> {
  data: TData[];
  columns: TableColumn<TData>[];
  isCompact?: boolean;
}

interface TableColumn<TData> {
  key: keyof TData;
  title?: string | (() => JSX.Element);
  width?: number;
  headerClasses?: string;
  rowClasses?: string;
  showTooltip?: boolean;
}

interface HeaderColumnProps {
  render: JSX.Element | React.ReactNode;
  width?: number;
  classes?: string;
  showTooltip?: boolean;
}

function createColumns<TData>(columns: TableColumn<TData>[]): ColumnDef<TData, any>[] {
  return columns.map((column) => ({
    accessorKey: column.key,
    header: column.title || `${column.key as string}`,
  }));
}

function getColumnProps<TData>(columns: TableColumn<TData>[], index: number, render: JSX.Element | React.ReactNode): HeaderColumnProps {
  const column = columns[index];

  if (!column) {
    return {
      render: null,
    };
  }

  return {
    render,
    width: column.width,
    classes: column.headerClasses,
    showTooltip: column.showTooltip,
  };
}

interface RowCellProps {
  render: JSX.Element | React.ReactNode;
  width?: number;
  classes?: string;
  showTooltip?: boolean;
}

function getRowProps<TData>(columns: TableColumn<TData>[], index: number, render: JSX.Element | React.ReactNode): RowCellProps {
  const column = columns[index];

  if (!column) {
    return {
      render: null,
    };
  }

  return {
    render,
    width: column.width,
    classes: column.rowClasses,
    showTooltip: column.showTooltip,
  };
}

function HeaderColumn(props: HeaderColumnProps) {
  const { render, classes, width } = props;

  const withWidth = (width || 0) > 0;

  const customStyles: React.CSSProperties = {
    width: withWidth ? `${width}px` : "auto",
    maxWidth: withWidth ? `${width}px` : "auto",
    minWidth: withWidth ? `${width}px` : "auto",
  };

  return (
    <th
      style={customStyles}
      title={render?.toString()}
      className={classnames("p-3", "text-sm", "font-semibold", "tracking-wide", "text-left", "overflow-hidden", "overflow-ellipsis", "whitespace-nowrap", classes)}
    >
      {render}
    </th>
  );
}

function RowCell(props: RowCellProps) {
  const { render, width, classes, showTooltip } = props;

  const withWidth = (width || 0) > 0;

  const customStyles: React.CSSProperties = {
    width: withWidth ? `${width}px` : "auto",
    maxWidth: withWidth ? `${width}px` : "auto",
    minWidth: withWidth ? `${width}px` : "auto",
  };

  return (
    <td style={customStyles} className={classnames("group", "p-3", "text-sm", "text-gray-700", "whitespace-nowrap", "overflow-hidden", "overflow-ellipsis", classes)}>
      {render}
      {withWidth && showTooltip ? (
        <div className="bg-black text-white px-2 rounded-lg absolute text-[10px] opacity-0 invisible group-hover:visible group-hover:opacity-100 transition delay-700">{render}</div>
      ) : null}
    </td>
  );
}

function Table<TData extends object>(props: TableProps<TData>) {
  const { data, columns } = props;

  const convertedColumns = createColumns<TData>(columns);

  const table = useReactTable<TData>({
    data: [...data],
    columns: convertedColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-auto rounded-lg shadow m-3">
      <table className="w-full table-fixed">
        <thead className="bg-gray-100 border-b-2 border-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <HeaderColumn key={header.id} {...getColumnProps(columns, header.index, flexRender(header.column.columnDef.header, header.getContext()))} />
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="divide-y divide-gray-100 ">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={`${(row.index + 1) % 2 === 0 ? "bg-gray-200" : "bg-white"}`}>
              {row.getVisibleCells().map((cell, i) => (
                <RowCell key={cell.id} {...getRowProps(columns, i, flexRender(cell.column.columnDef.cell, cell.getContext()))} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
