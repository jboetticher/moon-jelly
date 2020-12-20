import React, { ReactElement } from 'react'
import DataTable, { IDataTableProps } from 'react-data-table-component'
import Loader from './Loader'
import styles from './Table.module.css'

function Empty(message) {
  return <div className={styles.empty}>{message || 'No results found'}</div>
}

let Table = props => {
  return (
    <DataTable
      columns={props.columns}
      data={props.data}
      className={styles.table}
      noHeader
      pagination={props.pagination || props.data?.length >= 9}
      paginationPerPage={props.paginationPerPage || 10}
      paginationComponentOptions={{ noRowsPerPage: true }}
      noDataComponent={<Empty message={props.emptyMessage} />}
      progressPending={props.isLoading}
      progressComponent={<Loader />}
      {...props}
    />
  )
}

export default Table;