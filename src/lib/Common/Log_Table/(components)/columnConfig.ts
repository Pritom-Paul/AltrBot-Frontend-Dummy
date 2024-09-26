// Version 1
// // columnConfig.ts

// export type ColumnConfig = {
//   accessor: string;
//   header: string;
//   id: string;
//   plugins?: {
//     sort?: { disable?: boolean };
//     colFilter?: {
//       fn?: (args: { filterValue: string; value: string }) => boolean;
//       initialFilterValue?: string | string[];
//       render?: (args: { filterValue: string }) => string;
//     };
//   };
// };

// // Adjusted to be a proper object with keys and arrays
// export const columnsConfig: Record<string, ColumnConfig[]> = {

//   log_columns: [
    
//     {
//       accessor: 'bot',
//       header: 'Bot',
//       id: 'bot',
//       plugins: {
//         sort: { disable: false },
//         colFilter: {
//           fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
//           initialFilterValue: '',
//         },
//       },
//     },
//     {
//       accessor: 'activity',
//       header: 'Activity',
//       id: 'activity',
//       plugins: {
//         sort: { disable: false },
//         colFilter: {
//           fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
//           initialFilterValue: '',
//         },
//       },
//     },
//     {
//       accessor: 'activity_type',
//       header: 'Activity Type',
//       id: 'activity_type',
//       plugins: {
//         sort: { disable: false },
//         colFilter: {
//           fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
//           initialFilterValue: '',
//         },
//       },
//     },
//     {
//       accessor: 'activity_time',
//       header: 'Activity Time',
//       id: 'activity_time',
//       plugins: {
//         sort: { disable: false },
//         colFilter: {
//           fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
//           initialFilterValue: '',
//         },
//       },
//     },
//   ],
// };




// Version 2
// export const columnsConfig: Record<string, ColumnConfig[]> = {
//   log_columns: [
//     {
//       accessor: 'bot',
//       header: 'Bot',
//       id: 'bot',
//       plugins: {
//         sort: { disable: false },
//         colFilter: {
//           fn: ({ filterValue, value }) => {
//             if (value == null || filterValue == null) return "indeterminate"; // Handle null and undefined
//             return value.toLowerCase().includes(filterValue.toLowerCase());
//           },
//           initialFilterValue: '',
//         },
//       },
//     },
//     {
//       accessor: 'activity',
//       header: 'Activity',
//       id: 'activity',
//       plugins: {
//         sort: { disable: false },
//         colFilter: {
//           fn: ({ filterValue, value }) => {
//             if (value == null || filterValue == null) return "indeterminate";
//             return value.toLowerCase().includes(filterValue.toLowerCase());
//           },
//           initialFilterValue: '',
//         },
//       },
//     },
//     {
//       accessor: 'activity_type',
//       header: 'Activity Type',
//       id: 'activity_type',
//       plugins: {
//         sort: { disable: false },
//         colFilter: {
//           fn: ({ filterValue, value }) => {
//             if (value == null || filterValue == null) return "indeterminate";
//             return value.toLowerCase().includes(filterValue.toLowerCase());
//           },
//           initialFilterValue: '',
//         },
//       },
//     },
//     {
//       accessor: 'activity_time',
//       header: 'Activity Time',
//       id: 'activity_time',
//       plugins: {
//         sort: { disable: false },
//         colFilter: {
//           fn: ({ filterValue, value }) => {
//             if (value == null || filterValue == null) return "indeterminate";
//             return value.toLowerCase().includes(filterValue.toLowerCase());
//           },
//           initialFilterValue: '',
//         },
//       },
//     },
//   ],
// };


// From data table col config
// columnConfig.ts

export type ColumnConfig = {
  accessor: string;
  header: string;
  id: string;
  plugins?: {
    sort?: { disable?: boolean };
    colFilter?: {
      fn?: (args: { filterValue: string; value: string }) => boolean;
      initialFilterValue?: string | string[];
      render?: (args: { filterValue: string }) => string;
    };
  };
};

// Adjusted to be a proper object with keys and arrays
export const columnsConfig: Record<string, ColumnConfig[]> = {

  exp_download: [


    
    {
      accessor: 'ad_code',
      header: 'AD CODE',
      id: 'ad_code',
      plugins: {
        sort: { disable: false },
        colFilter: {
          fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
          initialFilterValue: '',
        },
      },
    },
    {
      accessor: 'exp_serial',
      header: 'EXP SERIAL',
      id: 'exp_serial',
      plugins: {
        sort: { disable: false },
        colFilter: {
          fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
          initialFilterValue: '',
        },
      },
    },
    {
      accessor: 'exp_year',
      header: 'EXP YEAR',
      id: 'exp_year',
      plugins: {
        sort: { disable: false },
        colFilter: {
          fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
          initialFilterValue: '',
        },
      },
    },
    {
      accessor: 'invoice_no',
      header: 'INVOICE NO',
      id: 'invoice_no',
      plugins: {
        sort: { disable: false },
        colFilter: {
          fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
          initialFilterValue: '',
        },
      },
    },
    {
      accessor: 'status',
      header: 'STATUS',
      id: 'status',
      plugins: {
        colFilter: {
          fn: ({ filterValue, value }) => {
            if (filterValue.length === 0) return true;
            if (!Array.isArray(filterValue) || typeof value !== 'string') return true;
            return filterValue.some((filter) => value.includes(filter));
          },
          initialFilterValue: [],
        },
      },
    },
  ],



  exp_issuance: [


    {
      accessor: 'lc_no',
      header: 'LC NO',
      id: 'lc_no',
      plugins: {
        sort: { disable: false },
        colFilter: {
          fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
          initialFilterValue: '',
        },
      },
    },
    {
      accessor: 'commodity',
      header: 'COMMODITY',
      id: 'commodity',
      plugins: {
        sort: { disable: false },
        colFilter: {
          fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
          initialFilterValue: '',
        },
      },
    },
    {
      accessor: 'incoterm',
      header: 'INCOTERM',
      id: 'incoterm',
      plugins: {
        sort: { disable: false },
        colFilter: {
          fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
          initialFilterValue: '',
        },
      },
    },
    {
      accessor: 'country',
      header: 'COUNTRY',
      id: 'country',
      plugins: {
        sort: { disable: false },
        colFilter: {
          fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
          initialFilterValue: '',
        },
      },
    },
    {
      accessor: 'unit',
      header: 'UNIT',
      id: 'unit',
      plugins: {
        sort: { disable: false },
        colFilter: {
          fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
          initialFilterValue: '',
        },
      },
    },
    {
      accessor: 'quantity',
      header: 'QUANTITY',
      id: 'quantity',
      plugins: {
        sort: { disable: false },
        colFilter: {
          fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
          initialFilterValue: '',
        },
      },
    },
    {
      accessor: 'invoice_no',
      header: 'INVOICE NO',
      id: 'invoice_no',
      plugins: {
        sort: { disable: false },
        colFilter: {
          fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
          initialFilterValue: '',
        },
      },
    },
    {
      accessor: 'invoice_date',
      header: 'INVOICE DATE',
      id: 'invoice_date',
      plugins: {
        sort: { disable: false },
        colFilter: {
          fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
          initialFilterValue: '',
        },
      },
    },
    {
      accessor: 'invoice_amount',
      header: 'INVOICE AMOUNT',
      id: 'invoice_amount',
      plugins: {
        sort: { disable: false },
        colFilter: {
          fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
          initialFilterValue: '',
        },
      },
    },
    {
      accessor: 'trans_doc',
      header: 'TRANS DOC',
      id: 'trans_doc',
      plugins: {
        sort: { disable: false },
        colFilter: {
          fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
          initialFilterValue: '',
        },
      },
    },
    {
      accessor: 'port',
      header: 'PORT',
      id: 'port',
      plugins: {
        sort: { disable: false },
        colFilter: {
          fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
          initialFilterValue: '',
        },
      },
    },
    {
      accessor: 'signatory',
      header: 'SIGNATORY',
      id: 'signatory',
      plugins: {
        sort: { disable: false },
        colFilter: {
          fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
          initialFilterValue: '',
        },
      },
    },
    {
      accessor: 'status',
      header: 'STATUS',
      id: 'status',
      plugins: {
        colFilter: {
          fn: ({ filterValue, value }) => {
            if (filterValue.length === 0) return true;
            if (!Array.isArray(filterValue) || typeof value !== 'string') return true;
            return filterValue.some((filter) => value.includes(filter));
          },
          initialFilterValue: [],
        },
      },
    },
  ],
};
