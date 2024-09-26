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


  fcr: [


    {
      accessor: 'invoice_no',
      header: 'INVOICE NO',
      id: 'invoice_no',
      plugins: {
        sort: { disable: false },
        colFilter: {
          fn: ({ filterValue, value }) => value?.toLowerCase().includes(filterValue.toLowerCase()),
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
          fn: ({ filterValue, value }) => value?.toLowerCase().includes(filterValue.toLowerCase()),
          initialFilterValue: '',
        },
      },
    },
    {
      accessor: 'exporters_ref',
      header: 'EXPORTER\'S REF',
      id: 'exporters_ref',
      plugins: {
        sort: { disable: false },
        colFilter: {
          fn: ({ filterValue, value }) => value?.toLowerCase().includes(filterValue.toLowerCase()),
          initialFilterValue: '',
        },
      },
    },
    {
      accessor: 'hs_code',
      header: 'HS CODE',
      id: 'hs_code',
      plugins: {
        sort: { disable: false },
        colFilter: {
          fn: ({ filterValue, value }) => value?.toLowerCase().includes(filterValue.toLowerCase()),
          initialFilterValue: '',
        },
      },
    },
    {
      accessor: 'description',
      header: 'DESCRIPTION',
      id: 'description',
      plugins: {
        sort: { disable: false },
        colFilter: {
          fn: ({ filterValue, value }) => value?.toLowerCase().includes(filterValue.toLowerCase()),
          initialFilterValue: '',
        },
      },
    },
    {
      accessor: 'composition',
      header: 'COMPOSITION',
      id: 'composition',
      plugins: {
        sort: { disable: false },
        colFilter: {
          fn: ({ filterValue, value }) => value?.toLowerCase().includes(filterValue.toLowerCase()),
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
          fn: ({ filterValue, value }) => value?.toLowerCase().includes(filterValue.toLowerCase()),
          initialFilterValue: '',
        },
      },
    },
    {
      accessor: 'po_no',
      header: 'PO NO',
      id: 'po_no',
      plugins: {
        sort: { disable: false },
        colFilter: {
          fn: ({ filterValue, value }) => value?.toLowerCase().includes(filterValue.toLowerCase()),
          initialFilterValue: '',
        },
      },
    },
    {
      accessor: 'country_iso',
      header: 'COUNTRY',
      id: 'country_iso',
      plugins: {
        sort: { disable: false },
        colFilter: {
          fn: ({ filterValue, value }) => value?.toLowerCase().includes(filterValue.toLowerCase()),
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




  booking: [

    
    {
        accessor: 'po_no',
        header: 'PO NO',
        id: 'po_no',
        plugins: {
            sort: { disable: false },
            colFilter: {
                fn: ({ filterValue, value }) => value?.toLowerCase().includes(filterValue.toLowerCase()),
                initialFilterValue: '',
            },
        },
    },
    {
        accessor: 'order_no',
        header: 'ORDER NO',
        id: 'order_no',
        plugins: {
            sort: { disable: false },
            colFilter: {
                fn: ({ filterValue, value }) => value?.toLowerCase().includes(filterValue.toLowerCase()),
                initialFilterValue: '',
            },
        },
    },
    {
        accessor: 'item',
        header: 'ITEM',
        id: 'item',
        plugins: {
            sort: { disable: false },
            colFilter: {
                fn: ({ filterValue, value }) => value?.toLowerCase().includes(filterValue.toLowerCase()),
                initialFilterValue: '',
            },
        },
    },
    {
        accessor: 'gender',
        header: 'GENDER',
        id: 'gender',
        plugins: {
            sort: { disable: false },
            colFilter: {
                fn: ({ filterValue, value }) => value?.toLowerCase().includes(filterValue.toLowerCase()),
                initialFilterValue: '',
            },
        },
    },
    {
        accessor: 'country_iso',
        header: 'COUNTRY',
        id: 'country_iso',
        plugins: {
            sort: { disable: false },
            colFilter: {
                fn: ({ filterValue, value }) => value?.toLowerCase().includes(filterValue.toLowerCase()),
                initialFilterValue: '',
            },
        },
    },
    {
        accessor: 'delivery_time',
        header: 'DELIVERY TIME',
        id: 'delivery_time',
        plugins: {
            sort: { disable: false },
            colFilter: {
                fn: ({ filterValue, value }) => value?.toLowerCase().includes(filterValue.toLowerCase()),
                initialFilterValue: '',
            },
        },
    },
    {
        accessor: 'summary_marks',
        header: 'SUMMARY MARKS',
        id: 'summary_marks',
        plugins: {
            sort: { disable: false },
            colFilter: {
                fn: ({ filterValue, value }) => value?.toLowerCase().includes(filterValue.toLowerCase()),
                initialFilterValue: '',
            },
        },
    },
    {
        accessor: 'summary_desc',
        header: 'SUMMARY DESC',
        id: 'summary_desc',
        plugins: {
            sort: { disable: false },
            colFilter: {
                fn: ({ filterValue, value }) => value?.toLowerCase().includes(filterValue.toLowerCase()),
                initialFilterValue: '',
            },
        },
    },
    {
        accessor: 'no_of_pcs_in_pack',
        header: 'PCS',
        id: 'no_of_pcs_in_pack',
        plugins: {
            sort: { disable: false },
            colFilter: {
              fn: ({ filterValue, value }) => value?.toLowerCase().includes(filterValue.toLowerCase()),
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
