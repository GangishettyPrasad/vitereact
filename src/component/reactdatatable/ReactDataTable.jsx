import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FcAutomotive } from "react-icons/fc";
import { Link } from 'react-router-dom';
const ReactDataTable = () => {
    
    
    const [pending, setPending] = React.useState(true);   // loading pursose if true loading on 
  
  
  
  
  
  
  //---------===---------- disable drag and drop -----------=====-----//

    useEffect(() => {
    // Disable drag events globally within this component
    const preventDragHandler = (e) => {
      e.preventDefault();
    };

    const table = document.querySelector('.rdt_Table');
    if (table) {
      table.addEventListener('dragstart', preventDragHandler);
    }
setTimeout(()=>{
    setPending(false)
},2000)
    return () => {
      if (table) {
        table.removeEventListener('dragstart', preventDragHandler);
      }
    };
  }, []);
//-----------------------------------===================----------//



//-----------=====-----------------data -------------=====---------//

  const [data,setData] = useState( [
    { id: 1, title: 'prasad', year: '1995' },
    { id: 2, title: 'sagar', year: '1996' },
    { id: 3, title: 'r', year: '12' },
    { id: 4, title: 'a', year: '57' },
    { id: 5, title: 'h', year: '222' },
    { id: 6, title: 'a', year: '1111' },
    { id: 7, title: 'rr', year: '546' },
    { id: 8, title: 'm', year: '2345' },
    { id: 9, title: '.', year: '1435' },
    { id: 10, title: 'i', year: '68787' },
    { id: 11, title: 'rw', year: '69879' },
    

  ]);
  //-----------------------------------===================----------//



//------------- on row function calls -------------------------//
    

    const onCurrentValue = (a)=>{console.log(a)}
    const onCurrentRowValue = (b)=>{console.log(b)}
    const userWishValue = (c)=>{console.log(c)}
  //-----------------------------------===================----------//


  //--------------------------- columns data -----========----------//

    // ✅ Add new row
    const addRow = () => {
        const newRow = {
          id: Date.now(), // unique id
          title: 'New Title',
          year: '2025',
        };
        setData(prev => [...prev, newRow]);
      };
    
      // ✅ Update selected row
      const update = (rowData) => {
        const updatedTitle = "Updated Title";
    
        const updatedData = data.map(item =>
          item.id === rowData.id ? { ...item, title: updatedTitle } : item
        );
    
        setData(updatedData);
      };
    
      // ✅ Delete selected row
      const deleteData = (rowData) => {
        const filteredData = data.filter(item => item.id !== rowData.id);
        setData(filteredData);
      };



  //--------------------------- columns data ------=========---------//

  const columns = [
    {
      name: 'Title',
      cell: row => (
        <div className="no-drag-select">{row.title}</div>
      ),
      sortable: true,
    },
    {
      name: 'Year',
      cell: row => (<>
        <div className="no-drag-select"><button>{row.year}</button></div>
        <div className="no-drag-select"><button onClick={(d)=>{
            onCurrentValue(row)
            onCurrentRowValue(d)
            userWishValue('prasad')
        }}>{row.year}</button></div>
        </>
      ),
      sortable: true,
    },

    {
        name: 'Actions',
        cell: row => ( <>
            <div className="no-drag-select">
              <button onClick={() => update(row)}>UPDATE</button>
            </div>
            <div className="no-drag-select">
              <button onClick={() => deleteData(row)}>DELETE</button>
            </div>
          </>
        ),
        sortable: true,
        width:"200px"
      },


  ];
//-----------------------------------===================----------//



//-----========------------- selectable rows  -------================---//

const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    console.log('Selected Rows: ', selectedRows);
  };
//-----------------------------------===================----------//



//-----========------------- pagination -------================---//

  const paginationComponentOptions = {
	rowsPerPageText: 'prasad all pages ',
	rangeSeparatorText: 'from',
	selectAllRowsItem: true,
	selectAllRowsItemText: 'All',
};


//-----------------------------------===================----------//



  return (
    <div className="data-table-container">

        {/* ✅ Add Button */}
      <button onClick={addRow} style={{ marginBottom: '10px' }}>ADD User in Data Table</button>

      
      {/* ✅ DataTable */}
      <DataTable
        columns={columns}   // columns 
        data={data}         // data 
       
        highlightOnHover={true}   // over effect 
        pointerOnHover={true}  // over pointer like hand 


        selectableRows={true}
        onSelectedRowsChange={handleChange}
        
        
        progressPending={pending}  // loading 
        progressComponent={<FcAutomotive style={{ fontSize: '40px', color: 'red' }} />}

        //
        pagination                // pagination 
		paginationComponentOptions={paginationComponentOptions}

      />

<h5> back to react <Link   to = '/myTabs'>react</Link> </h5>
    </div>
  );
};

export default ReactDataTable;


