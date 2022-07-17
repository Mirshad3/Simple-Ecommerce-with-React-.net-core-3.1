import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { ProductData } from './FetchProduct';

interface AddProductDataState {
    title: string;
    loading: boolean; 
    empData: ProductData;
}

export default class AddProduct extends React.Component<RouteComponentProps<{}>, AddProductDataState> {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true,  empData: new ProductData };

       

        var empid = this.props.match.params["empid"];

        // This will set state for Edit Product  
        if (empid > 0) {
            fetch('api/Product/Details/' + empid)
                .then(response => response.json() as Promise<ProductData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, empData: data });
                });
        }

        // This will set state for Add Product  
        else {
            this.state = { title: "Create", loading: false,  empData: new ProductData };
        }

        // This binding is necessary to make "this" work in the callback  
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return <div>
            <h1>{this.state.title}</h1>
            <h3>Product</h3>
            <hr />
            {contents}
        </div>;
    }

    // This will handle the submit form event.  
    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        // PUT request for Edit Product.  
        if (this.state.empData.id) {
            fetch('api/Product/Edit', {
                method: 'PUT',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchProduct");
                })
        }

        // POST request for Add Product.  
        else {
            fetch('api/Product/Create', {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchProduct");
                })
        }
    }

    // This will handle Cancel button click event.  
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchProduct");
    }

    // Returns the HTML Form to the render() method.  
    private renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="Id" value={this.state.empData.id} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.empData.name} required />
                    </div>
                </div >
                 
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Category" >Category</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Category" defaultValue={this.state.empData.category} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="ProductCode" >ProductCode</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="ProductCode" defaultValue={this.state.empData.productCode} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Price" >Price</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Price" defaultValue={this.state.empData.price} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="MinQuantity" >MinQuantity</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="MinQuantity" defaultValue={this.state.empData.minQuantity} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="DiscountRate" >DiscountRate</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="DiscountRate" defaultValue={this.state.empData.discountRate} required />
                    </div>
                </div> 
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }
}