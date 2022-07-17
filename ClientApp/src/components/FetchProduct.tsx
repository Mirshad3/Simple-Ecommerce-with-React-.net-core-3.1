import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface FetchProductDataState {
    empList: ProductData[];
    loading: boolean;
}

export default class FetchProduct extends React.Component<RouteComponentProps<{}>, FetchProductDataState> {
    constructor() {
        super();
        this.state = { empList: [], loading: true };

        fetch('api/Product/Index')
            .then(response => response.json() as Promise<ProductData[]>)
            .then(data => {
                this.setState({ empList: data, loading: false });
            });

        // This binding is necessary to make "this" work in the callback  
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderProductTable(this.state.empList);

        return <div>
            <h1>Products</h1> 
            <p>
                <Link to="/addProduct">Create New</Link>
            </p>
            {contents}
        </div>;
    }

    // Handle Delete request for an Product  
    private handleDelete(id: number) {
        if (!confirm("Do you want to delete Product with Id: " + id))
            return;
        else {
            fetch('api/Product/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        empList: this.state.empList.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
        }
    }

    private handleEdit(id: number) {
        this.props.history.push("/Product/edit/" + id);
    }

    // Returns the HTML table to the render() method.  
    private renderProductTable(empList: ProductData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>ProductId</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>ProductCode</th>
                    <th>Price</th>
                    <th>MinQuantity</th>
                    <th>DiscountRate</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {empList.map(emp =>
                    <tr key={emp.id}>
                        <td></td>
                        <td>{emp.id}</td>
                        <td>{emp.name}</td>
                        <td>{emp.category}</td>
                        <td>{emp.productCode}</td>
                        <td>{emp.price}</td>
                        <td>{emp.minQuantity}</td>
                        <td>{emp.discountRate}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(emp.id)}>Edit</a>  |
                            <a className="action" onClick={(id) => this.handleDelete(emp.id)}>Delete</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

export class ProductData {
    id: number = 0;
    category: string = "";
    productCode: string = "";
    name: string = "";
    image: string = "";
    price: number = 0;
    minQuantity: number = 0;
    discountRate: number = 0;
}