import React from 'react';

import './rewards-tabel.styles.scss';

import { RiCloseCircleFill } from 'react-icons/ri';

class RewardsTable extends React.Component{

    constructor(props){
        super(props);
        this.state = ({
            categoryData : null,
            isOpen : true
        });
    }


    render(){
        if(!this.props.isOpen) return null
        
    return(
        <div className = 'popupStyle'>
            {this.props.isOpen?( <div className = 'table-main-div'>
                <RiCloseCircleFill size = {32} onClick = {() => this.props.colsePopUp()} className = 'closeIcon'/>
                <table>
                    <tbody>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Shop</th>
                            <th>Link</th>
                        </tr>
                    {this.props.filteredCategoryData.map((data, index) => (
                        <tr key={index}>
                            <td>{index +1}</td>
                            <td>{data.Name}</td>
                            <td>{data.Price}</td>
                            <td>{data.Shop}</td>
                            <td>{data.Link ?(<a href = {data.Link} rel="noreferrer" target="_blank">Go To Website</a>):(<div>No Data</div>)}</td>
                            <td><button className = 'pageActionButton'>Claim</button></td>
                        </tr>
                        ))}
                </tbody>
            </table>
        </div>):(
            <div>Nope</div>
        )}
           
    </div>
    )
    }
}

export default RewardsTable;