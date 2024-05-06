import * as moment from "moment";
export class ColumnsConstructor {
  public CrearString(
    header: string,
    fieldValue: string,
    size: number = 150,
    flt: boolean = true,
    editable = false
  ) {
    const def = {
      headerName: header,
      field: fieldValue,
      filter: flt,
      width: size,
      minWidth: size,
      editable: editable,
      cellStyle(params) {
        if (params.value == null || params.value == undefined) {
          return { color: "white" };
        } else {
          return null;
        }
      },
      // maxWidth: size
    };
    return def;
  }

  public CrearBoton(header: string, functions: any, bindthis: any, size: number = 110, type: number = 0) {
    return {
      headerName: '',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: functions.bind(bindthis),
        label: header,
        type:type
      },
      maxWidth: size,
    };
  }

  public CrearBoolean(
    header: string,
    fieldValue: string,
    size: number = 120,
    flt: boolean = true
  ) {
    return {
      headerName: header,
      field: fieldValue,
      filter: flt,
      editable: false,
      width: size,
      minWidth: size,
      headerClass: "ag-center-aligned-header",
      cellClass: 'ag-center-aligned-cell',
    
      //   maxWidth: size,
      cellRenderer: (params) => {
        if (params.value != null && params.value != undefined) {
          return `<input type='checkbox' onclick="return false;"  
          ${params.value ? "checked" : ""} />`;
        }
      },

      cellStyle(params) {
        if (params.value == null || params.value == undefined) {
          return { color: "white" };
        } else {
          return null;
        }
      },
    };
  }

  public CrearMoneda(
    header: string,
    fieldValue: string,
    size: number = 115,
    flt: boolean = true,
    decimal: number = 2,
    edit = false
  ) {
    return {
      headerName: header,
      field: fieldValue,
      minWidth: size,
      //    maxWidth: 150,
      width: size,
      editable: edit,
      headerClass: "ag-center-aligned-header" ,
      type: 'rightAligned',
      filter: flt ? "agNumberColumnFilter" : false,
      valueFormatter:
        params => '$' + params.value.toFixed(decimal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),

      // this.currencyFormatter,// params => params.data.number.toFixed(2),
      //   this.currencyFormatter('value==null || value==undefined?"0": "$" + value.toFixed(' + decimal + ').toString()'),
      valueParser: "Number(newValue)",

      cellStyle(params) {
        if (params.value == null || params.value == undefined) {
          return { color: "white" };
        } else {
          return null;
        }
      },
    };
  }

  /**Metodo para crear una columna con formato de numero
   *
   * @param header Encabezado
   * @param fieldValue Valor del campo
   * @param size Tamaño en pixeles de la columna
   * @param flt Filtro
   * @param decimal Numero de decimales permitidos (Default: 2)
   * @param edit Si la columna es editable o no
   */
  public CrearNumero(
    header: string,
    fieldValue: string,
    size: number = 115,
    flt: boolean = true,
    decimal: number = 2,
    edit = false
  ) {
    return {
      headerName: header,
      field: fieldValue,
      filter: flt ? "agNumberColumnFilter" : false,
      //  maxWidth: 150,
      width: size,
      minWidth: size,
      editable: edit,
      valueFormatter:
        'value==null || value==undefined?"": value.toFixed(' +
        decimal +
        ").toString()",
      valueParser: "Number(newValue)",
      cellStyle(params) {
        if (params.value == null || params.value == undefined) {
          return { color: "white" };
        } else {
          return null;
        }
      },
    };
  }

  public CrearPorcentaje(
    header: string,
    fieldValue: string,
    size: number = 115,
    flt: boolean = true,
    decimal: number = 2
  ) {
    return {
      headerName: header,
      field: fieldValue,
      //   maxWidth: 150,
      width: size,
      minWidth: size,
      filter: flt ? "agNumberColumnFilter" : false,
      valueFormatter:
        'value==null || value==undefined?"0": (value*100).toFixed(' + decimal + ').toString()+"%"',
      valueParser: "Number(newValue)",
      cellStyle(params) {
        if (params.value == null || params.value == undefined) {
          return { color: "white" };
        } else {
          return null;
        }
      },
    };
  }

  public CrearFecha(header: string, fieldValue: string, size: number = 115,
    flt: boolean = true) {
    const format = moment(fieldValue).format('yyyy-MM-dd')
    return {

      headerName: header,
      field: fieldValue,
      width: size,
      minWidth: size,
      //   maxWidth: size,
      filter: flt ? 'agDateColumnFilter' : false,
      valueFormatter: (data) => moment(data.value).format('DD/MM/YYYY'),
      //  valueFormatter: 'value.toFixed(' + decimal + ').toString()+"%"',
      filterParams: {
        comparator(filterLocalDateAtMidnight, cellValue) {
          const dateAsString = cellValue;
          if (dateAsString == null) { return -1; }
          const dateParts = moment(dateAsString).format('DD/MM/YYYY').split('/');
          const cellDate = new Date(
            Number(dateParts[2]),
            Number(dateParts[1]) - 1,
            Number(dateParts[0])
          );
          // tslint:disable-next-line: triple-equals
          if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
            return 0;
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        },
        browserDatePicker: true,
      },

      cellStyle(params) {
        if (params.value == null || params.value == undefined) {
          return { color: "transparent" };
        } else {
          return null;
        }
      },
    };
  }

  public CrearFechaLarga(
    header: string,
    fieldValue: string,
    size: number = 115,
    flt: boolean = true
  ) {
    return {
      headerName: header,
      field: fieldValue,
      width: size,
      minWidth: size,
      //  maxWidth: size,
      filter: flt ? "agDateColumnFilter" : false,
      valueFormatter: (data) =>
        moment(data.value).format("DD/MM/YYYY hh:mm:ss"),
      //  valueFormatter: 'value.toFixed(' + decimal + ').toString()+"%"',
      filterParams: {
        comparator(filterLocalDateAtMidnight, cellValue) {
          const dateAsString = cellValue;
          if (dateAsString == null) {
            return -1;
          }
          const dateParts = moment(dateAsString)
            .format("DD/MM/YYYY")
            .split("/");
          const cellDate = new Date(
            Number(dateParts[2]),
            Number(dateParts[1]) - 1,
            Number(dateParts[0])
          );
          // tslint:disable-next-line: triple-equals
          if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
            return 0;
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        },
        browserDatePicker: true,
      },

      cellStyle(params) {
        if (params.value == null || params.value == undefined) {
          return { color: "transparent" };
        } else {
          return null;
        }
      },
    };
  }

  public CrearHora(header: string, fieldValue: string,
    size: number = 100, flt: boolean = false) {

    return {
      headerName: header,
      field: fieldValue,
      width: size,
      minWidth: size,
      filter: flt ? 'agDateColumnFilter' : false,
      valueFormatter: (data) => moment(data.value).format('HH:mm'),
      //  valueFormatter: 'value.toFixed(' + decimal + ').toString()+"%"',
    };
  }



  public CrearLista(
    list: string[],
    header: string,
    fieldValue: string,
    size: number = 50,
    flt: boolean = true,
    edit = false
  ) {
    return {
      headerName: header,
      field: fieldValue,
      minWidth: size,
      width: size,
      editable: edit,
      filter: flt,
      cellEditorSelector: function (params) {
        return {
          component: 'agSelectCellEditor',
          params: {
            values: list
          }
        };

      }
    };
  }


}
