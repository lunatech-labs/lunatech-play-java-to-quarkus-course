import React from "react";

class Catalogue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            products: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/products")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        products: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, products } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <h2>Catalogue</h2>
                    <ul>
                        {products.map(product => (
                            <li key={product.id}>
                                <strong>
                                    <a href={'/products/' + product.id}>{product.name}</a> (€ {product.price})</strong>
                                <p>{product.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }

}

export default Catalogue