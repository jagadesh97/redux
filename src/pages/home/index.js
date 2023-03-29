
import { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { DataTable } from '../../component'
import { fetchProducts } from "../../actions/fetchData";
const HomePage = (props) => {

    const [paginationConfig, setpaginationConfig] = useState({
        count: 200,
        activePage: 1,
        rangeDisplayed: 10
    });

    const [beersData, setBeersData] = useState([])
    const [searchText, setSearchText] = useState('')



    const columnData = [
        {
            field: "name",
            label: "Name"
        },
        {
            field: "tagline",
            label: "Tagline"
        },
        {
            field: "first_brewed",
            label: "First Brewed"
        },
        {
            field: "contributed_by",
            label: "Contributed by"
        }];



    useEffect(() => {
        handleAPiCall(1);
    }, []);

    useEffect(() => {
        setBeersData(props.item)
    }, [props.item]);


    const handleAPiCall = (pageNumber) => {
        props.dispatch(fetchProducts(pageNumber));

    }



    const handlePaginationChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        setpaginationConfig({
            ...paginationConfig,
            activePage: pageNumber
        });
        props.dispatch(fetchProducts(pageNumber));
    };

    const handleSeach = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setSearchText(value);

        if (value?.length > 0) {
            let res = props.item.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()))
            setBeersData(res)
        } else {
            props.dispatch(fetchProducts(paginationConfig.activePage));
        }


    }


    return (

        <div className="container mt-5">
            <div className='row'>
                <div className='col-md-4'>
                    <div className="mb-3">
                        <input type="text" value={searchText} className="form-control" onChange={handleSeach} placeholder="Search Name" />
                    </div>
                </div>
            </div>
            <DataTable columnData={columnData} pagination={paginationConfig}
                paginationChange={handlePaginationChange} >
                {beersData.map((data) =>
                    <tr>
                        <td>{data.name}</td>
                        <td>{data.tagline}</td>
                        <td>{data.first_brewed}</td>
                        <td>{data.contributed_by}</td>
                    </tr>
                )}

            </DataTable>
        </div>

    )



};

const mapStateToProps = state => ({
    item: state?.beers.item,
    loading: state.beers.loading,
    error: state.beers.error
});

export default connect(mapStateToProps)(HomePage);
