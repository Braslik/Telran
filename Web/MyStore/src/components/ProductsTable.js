import React, {useState} from "react";
import {useSelector} from "react-redux";
import columnsMediaObject from "../config/columnsMediaConfig";
import MaterialTable from "material-table";
import _ from "lodash";
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';



export default function ProductsTable(props) {
    const products = useSelector(state=>state.items);
    console.log(products);
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };
    const columnValues = Object.values(columnsMediaObject);
    const maxColumns = Math.max(...columnValues);
    function removeProduct(productNumber) {
            props.itemsService.deleteItem(productNumber)
                .then(() => {
                })
    }
    function addProduct(item) {
        const index = _.findIndex(products,p => p.id === item.id);
        if (index >= 0) {
            return false;
        }
        if(window.confirm('you are going to add item with number = ' + item.id)) {
            props.itemsService.addItem(item)
                .then(() => {
                        alert(`item with number ${item.id} added successfully`)
                    }
                    , error => {
                        alert(`item with number ${item.id} already exists`)
                    })
        }
            return true;
    }
    function updateProduct(item) {
            props.itemsService.addItem(item)
                .then(() => {
                    })

        return true;
    }
    const { useState } = React;

    const [columns, setColumns] = useState([

        { title: 'ID', field: 'id', cellStyle:{width: 50}, headerStyle:{width: 50}},
        { title: '', field: 'img', cellStyle:{width: 200},headerStyle:{width: 200},
            render: (row) => (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100px',
                        width: '120px',
                        padding:0,
                    }}
                >
                    <img
                        style={{ height: '90px', width: '100px' }}
                        src={(
                            row.img
                        )
                        }
                    />
                </div>
            )},
        { title: 'Title', field: 'title',cellStyle:{width: 600},headerStyle:{width: 600}},
        { title: 'Price', field: 'price', cellStyle:{width: 50},headerStyle:{width: 50}},
        { title: 'Description', field: 'description',
            cellStyle:{width: 800},headerStyle:{width: 800}},
            ]);

    const [data, setData] = useState(products.map((item)=>({id: item.id, title:
        item.title, price:item.price, description:item.description,img:
                item.img
    })))


    return  (
        <MaterialTable style={{marginTop:'50px'}}
                       icons={tableIcons}
            title="- Products - "
                       options={{
                           headerStyle:{fontWeight:"bold", fontSize:16},
                           cellStyle:{padding:0},
                       }}
            columns={columns}
            data = {data}

            editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const newItems = [...data];
                            if(addProduct(newData)){
                                newItems.push(newData)
                                setData([...newItems]);
                            }else{
                                alert(`item with number ${newData.id} already exists`)
                            }

                            resolve();
                        }, 1000)
                    }),
                onRowUpdate: (newData,oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            if(window.confirm(`You are going to update item with number ${oldData.id}`)) {
                                removeProduct(oldData.id);
                                updateProduct(newData);
                                const dataDelete = [...data];
                                const index = oldData.tableData.id;
                                dataDelete.splice(index, 1);
                                dataDelete.push(newData);
                                setData([...dataDelete]);
                            }
                            resolve();
                        }, 1000)
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            removeProduct(oldData.id);
                            setData([...dataDelete]);
                            resolve()
                        }, 1000)
                    }),
            }}
                            />


            )
}

