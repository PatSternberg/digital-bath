
import { React, useEffect, useMemo, useState } from 'react'
import AxiosInstance from './Axios'
import { MaterialReactTable } from 'material-react-table'
import Dayjs from 'dayjs'
import { Box, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function Home() {

  const [myData, setMyData] = useState()
  const [loading, setLoading] = useState(true)

  function GetData(data) {
    AxiosInstance.get('project/').then((res) => {
      setMyData(res.data)
      console.log(res.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    GetData();
  },[])

    const columns = useMemo(
      () => [
        {
          accessorKey: 'name',
          header: 'Name',
          size: 150,
        },
  
        {
          accessorKey: 'status',
          header: 'Status',
          size: 150,
        },
  
        {
          accessorKey: 'comments', //normal accessorKey
          header: 'Comments',
          size: 200,
        },
  
        {
          accessorFn: (row) => Dayjs(row.start_date).format('DD-MM-YYYY'),
          header: 'Start date',
          size: 150,
        },
  
        {
          accessorFn: (row) => Dayjs(row.end_date).format('DD-MM-YYYY'),
          header: 'End date',
          size: 150,
        },
  
      ],
  
      [],
  
    );
  

  return (
    <div>Home
      { loading ? <p>Loading data...</p> :
      <MaterialReactTable 
        columns={columns}
        data={myData}
        enableRowActions
        renderRowActions={({row}) => (

          <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>

            <IconButton
              color="green"
              component={Link}
              to={`edit/${row.original.id}`}
              >
              <EditIcon />
            </IconButton>

            <IconButton
              color="error"
              component={Link}
              to={`delete/${row.original.id}`}
              >
              <DeleteIcon />
            </IconButton>
          </Box>

        )}
      />
    }
    </div>
  )
}

export default Home