import React from 'react';

import './rewards-tabel.styles.scss';

const RewardsTable = ({categoryData}) =>(

    <div className = 'table-main-div'>
        <table>
            <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Shop</th>
                    <th>Link</th>
                </tr>
            {categoryData.map((data, index) => (
                <tr Key={index}>
                    <td>{index +1}</td>
                    <td>{data.Name}</td>
                    <td>{data.Price}</td>
                    <td>{data.Shop}</td>
                    <td>{data.Link ?(<a href = {data.Link}>Go To Website</a>):(<div></div>)}</td>
                    <td><button>Claim</button></td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default RewardsTable;